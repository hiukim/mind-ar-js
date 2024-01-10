// TODO: delete opencv Mat
// ref: https://github.com/google/mediapipe/blob/master/mediapipe/modules/face_geometry/libs/geometry_pipeline.cc#L72-L290
//
import {positions as canonicalMetricLandmarks, landmarkBasis} from "./face-data.js";
import {opencv} from "../../libs/opencv-helper.js";

const landmarkWeights = [];
for (let i = 0; i < canonicalMetricLandmarks.length; i++) {
  landmarkWeights[i] = 0;
}
landmarkBasis.forEach(([index, w]) => {
  landmarkWeights[index] = w;
});

const sqrtWeights = [];
for (let i = 0; i < landmarkWeights.length; i++) {
  sqrtWeights[i] = Math.sqrt(landmarkWeights[i]); 
}

const majorLandmarkIndexes = [33,263,61,291,199]; // for computing solvePnP
landmarkBasis.forEach(([index, w]) => {
  if (!majorLandmarkIndexes.includes(index)) {
    majorLandmarkIndexes.push(index);
  }
});
majorLandmarkIndexes.sort((a, b) => a-b);

let leftMostLandmarkIndex = 0;
let rightMostLandmarkIndex = 0;
for (let i = 0; i < canonicalMetricLandmarks.length; i++) {
  if (canonicalMetricLandmarks[i][0] < canonicalMetricLandmarks[leftMostLandmarkIndex][0]) {
    leftMostLandmarkIndex = i;
  }
  if (canonicalMetricLandmarks[i][0] > canonicalMetricLandmarks[rightMostLandmarkIndex][0]) {
    rightMostLandmarkIndex = i;
  }
}

class Estimator {
  constructor(input) {
    const near = 1;
    const far = 10000;
    const frameHeight = input.height;
    const frameWidth = input.width;
    const focalLength = frameWidth;
    const fov = 2 * Math.atan(frameHeight / (2 * focalLength));
    const nearHeight = 2 * near * Math.tan(0.5 * fov);
    const nearWidth = frameWidth * nearHeight / frameHeight;

    this.near = near;
    this.far = far; 
    this.frameHeight = frameHeight;
    this.frameWidth = frameWidth;
    this.focalLength = focalLength;
    this.fov = fov;
    this.left = -0.5 * nearWidth;
    this.right = 0.5 * nearWidth;
    this.bottom = -0.5 * nearHeight;
    this.top = 0.5 * nearHeight;
    this.focalLength = focalLength;
    this.center = [frameWidth/2, frameHeight/2];
    //console.log("new estimator", this);
  }

  estimate(landmarks) {
    landmarks = landmarks.slice(0, canonicalMetricLandmarks.length); // in new mediapipe version, there is 10 extra landmarks for iris (which we don't have in canonical model)

    //console.log("landmarks", landmarks);
    const screenLandmarks = this._projectToScreen(landmarks);
    //console.log("screenLandmarks", screenLandmarks);

    let intermediateLandmarks = this._cloneLandmarks(screenLandmarks);
    this._changeHandedness(intermediateLandmarks);

    const depthOffset = screenLandmarks.reduce((a, l) => {
      return a + l[2];
    }, 0) / screenLandmarks.length;

    const firstIterationScale = this._estimateScale(intermediateLandmarks);

    intermediateLandmarks = this._cloneLandmarks(screenLandmarks);
    this._moveAndRescaleZ(depthOffset, firstIterationScale, intermediateLandmarks);
    this._unprojectScreen(intermediateLandmarks)
    this._changeHandedness(intermediateLandmarks);

    const secondIterationScale = this._estimateScale(intermediateLandmarks);
    //console.log("estimator secondIterationScale", secondIterationScale);

    let metricLandmarks = this._cloneLandmarks(screenLandmarks);
    const totalScale = firstIterationScale * secondIterationScale;
    this._moveAndRescaleZ(depthOffset, totalScale, metricLandmarks);
    this._unprojectScreen(metricLandmarks);
    this._changeHandedness(metricLandmarks);

    const poseTransformMat = this._solveWeightedOrthogonal(canonicalMetricLandmarks, metricLandmarks, sqrtWeights);
    //console.log("estimator poseTransformMat", poseTransformMat);

    const poseTransformMatCV = opencv.matFromArray(4, 4, opencv.CV_64F, [
      poseTransformMat[0][0], poseTransformMat[0][1], poseTransformMat[0][2], poseTransformMat[0][3],
      poseTransformMat[1][0], poseTransformMat[1][1], poseTransformMat[1][2], poseTransformMat[1][3],
      poseTransformMat[2][0], poseTransformMat[2][1], poseTransformMat[2][2], poseTransformMat[2][3],
      poseTransformMat[3][0], poseTransformMat[3][1], poseTransformMat[3][2], poseTransformMat[3][3],
    ]);
    //console.log("estimator poseTransformMatCV", poseTransformMatCV.data64F);
    const invPoseTransformMatCV = poseTransformMatCV.inv(0); // argument is method?. 0=DECOMP_LU?
    //console.log("estimator __inv", invPoseTransformMatCV);

    const invPoseTransformData = invPoseTransformMatCV.data64F;
    const invPoseTransformMat = [
      [invPoseTransformData[0], invPoseTransformData[1], invPoseTransformData[2], invPoseTransformData[3]],
      [invPoseTransformData[4], invPoseTransformData[5], invPoseTransformData[6], invPoseTransformData[7]],
      [invPoseTransformData[8], invPoseTransformData[9], invPoseTransformData[10], invPoseTransformData[11]],
      [invPoseTransformData[12], invPoseTransformData[13], invPoseTransformData[14], invPoseTransformData[15]],
    ];

    //const invPoseTransformMat = mlMatrix.inverse(new mlMatrix.Matrix(poseTransformMat)).data;

    //console.log("estimator invPoseTransformMat", invPoseTransformMat);
    const newMetricLandmarks = [];
    for (let l = 0; l < metricLandmarks.length; l++) {
      newMetricLandmarks[l] = [];
      for (let k = 0; k < 3; k++) {
	newMetricLandmarks[l][k] = invPoseTransformMat[k][3];
	for (let i = 0; i < 3; i++) {
	  newMetricLandmarks[l][k] += invPoseTransformMat[k][i] * metricLandmarks[l][i];
	}
      }
    }
    //console.log("estimator canonicalMetricLandmarks", canonicalMetricLandmarks);
    //console.log("estimator newMetricLandmarks", newMetricLandmarks);

    const modelPoints = [];
    const imagePoints = [];
    majorLandmarkIndexes.forEach((idx) => {
      modelPoints.push(newMetricLandmarks[idx][0], newMetricLandmarks[idx][1], newMetricLandmarks[idx][2]);
      //modelPoints.push(canonicalMetricLandmarks[idx][0], canonicalMetricLandmarks[idx][1], canonicalMetricLandmarks[idx][2]);
      imagePoints.push(landmarks[idx][0] * this.frameWidth , landmarks[idx][1] * this.frameHeight);
    });
    //console.log("estimator modelPoints", modelPoints);
    //console.log("estimator imagePoints", imagePoints);

    const modelPointsMat = opencv.matFromArray(modelPoints.length/3, 3, opencv.CV_64F, modelPoints);
    const imagePointsMat = opencv.matFromArray(imagePoints.length/2, 2, opencv.CV_64F, imagePoints);

    const cameraMatrix = opencv.matFromArray(3, 3, opencv.CV_64F, [
      this.focalLength, 0, this.center[0],
      0, this.focalLength, this.center[1],
      0, 0, 1
    ]);

    const distCoeffs = opencv.Mat.zeros(4, 1, opencv.CV_64F); // Assuming no lens distortion

    const rvecs = new opencv.Mat(3, 1, opencv.CV_64F);
    const tvecs = new opencv.Mat(3, 1, opencv.CV_64F);
    const rvecs2 = new opencv.Mat(3, 3, opencv.CV_64F);

    opencv.solvePnP(modelPointsMat, imagePointsMat, cameraMatrix, distCoeffs, rvecs, tvecs, false);
    opencv.Rodrigues(rvecs, rvecs2);

    const m = [
      rvecs2.data64F[0], rvecs2.data64F[1], rvecs2.data64F[2], tvecs.data64F[0],
      -rvecs2.data64F[3], -rvecs2.data64F[4], -rvecs2.data64F[5], -tvecs.data64F[1],
      -rvecs2.data64F[6], -rvecs2.data64F[7], -rvecs2.data64F[8], -tvecs.data64F[2],
      0, 0, 0, 1
    ];
    const faceScale = (newMetricLandmarks[rightMostLandmarkIndex][0] - newMetricLandmarks[leftMostLandmarkIndex][0]);

    return {metricLandmarks: newMetricLandmarks, faceMatrix: m, faceScale};
  }

  _estimateScale(landmarks) {
    const transformMat = this._solveWeightedOrthogonal(canonicalMetricLandmarks, landmarks, sqrtWeights)
    const scale = Math.sqrt(transformMat[0][0] * transformMat[0][0] + 
      transformMat[0][1] * transformMat[0][1] + 
      transformMat[0][2] * transformMat[0][2]);
    return scale;
  }

  // Orthogonal Procrustes solver
  _solveWeightedOrthogonal(sources, targets, sqrtWeights) {
    const weightedSources = [];
    const weightedTargets = [];
    
    for (let i = 0; i < sources.length; i++) {
      weightedSources.push([sources[i][0] * sqrtWeights[i], sources[i][1] * sqrtWeights[i], sources[i][2] * sqrtWeights[i]]);
      weightedTargets.push([targets[i][0] * sqrtWeights[i], targets[i][1] * sqrtWeights[i], targets[i][2] * sqrtWeights[i]]);
    }
    const totalWeight = sqrtWeights.reduce((a, w) => a + w * w, 0);

    const twiceWeightedSources = [];
    for (let i = 0; i < weightedSources.length; i++) {
      twiceWeightedSources[i] = [
	weightedSources[i][0] * sqrtWeights[i],
	weightedSources[i][1] * sqrtWeights[i],
	weightedSources[i][2] * sqrtWeights[i],
      ]
    }
    const sourceCenterOfMass = [0,0,0];
    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < twiceWeightedSources.length; i++) {
	sourceCenterOfMass[k] += twiceWeightedSources[i][k];
      }
      sourceCenterOfMass[k] /= totalWeight;
    }

    const centeredWeightedSources = [];
    for (let i = 0; i < twiceWeightedSources.length; i++) {
      centeredWeightedSources[i] = [];
      for (let k = 0; k < 3; k++) {
	centeredWeightedSources[i][k] = weightedSources[i][k] - sourceCenterOfMass[k] * sqrtWeights[i];
      }
    }

    const designMatrix = [[0,0,0],[0,0,0],[0,0,0]];
    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
	for (let i = 0; i < weightedTargets.length; i++) {
	  designMatrix[k][l] += weightedTargets[i][k] * centeredWeightedSources[i][l];
	}
      }
    }
    //console.log("estimator design Matrix", designMatrix);

    const rotation = this._computeOptimalRotation(designMatrix);

    //console.log("estimator rotation", rotation);
    const scale = this._computeOptimalScale(centeredWeightedSources, weightedSources, weightedTargets, rotation);
    //console.log("estimator scale", scale);

    const rotationAndScale = [[],[],[]];
    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
	rotationAndScale[k][l] = scale * rotation[k][l];
      }
    }

    const pointwiseDiffs = [];
    for (let l = 0; l < weightedSources.length; l++) {
      pointwiseDiffs[l] = [];
      for (let k = 0; k < 3; k++) {
	pointwiseDiffs[l][k] = weightedTargets[l][k];
	for (let i = 0; i < 3; i++) {
	  pointwiseDiffs[l][k] -= rotationAndScale[k][i] * weightedSources[l][i];
	}
      }
    }

    const weightedPointwiseDiffs = [];
    for (let l = 0; l < pointwiseDiffs.length; l++) {
      weightedPointwiseDiffs[l] = [];
      for (let k = 0; k < 3; k++) {
	weightedPointwiseDiffs[l][k] = pointwiseDiffs[l][k] * sqrtWeights[l]; 
      }
    }

    const translation = [0, 0, 0];
    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < weightedPointwiseDiffs.length; i++) {
	translation[k] += weightedPointwiseDiffs[i][k];
      }
      translation[k] /= totalWeight;
    }

    const transformMat = [
      [rotationAndScale[0][0], rotationAndScale[0][1], rotationAndScale[0][2], translation[0]],
      [rotationAndScale[1][0], rotationAndScale[1][1], rotationAndScale[1][2], translation[1]],
      [rotationAndScale[2][0], rotationAndScale[2][1], rotationAndScale[2][2], translation[2]],
      [0, 0, 0, 1]
    ];
    //console.log("estimator transformMat", transformMat);

    return transformMat;
  }

  _computeOptimalRotation(design_matrix) {
    const designMatrixMat = opencv.matFromArray(3, 3, opencv.CV_64F, [
      design_matrix[0][0], design_matrix[0][1], design_matrix[0][2],
      design_matrix[1][0], design_matrix[1][1], design_matrix[1][2],
      design_matrix[2][0], design_matrix[2][1], design_matrix[2][2]
    ]);
    const wMat = new opencv.Mat(3, 1, opencv.CV_64F);
    const uMat = new opencv.Mat(3, 3, opencv.CV_64F);
    const vtMat = new opencv.Mat(3, 3, opencv.CV_64F);
    opencv.SVDecomp(designMatrixMat, wMat, uMat, vtMat);

    const rotation = [[0,0,0], [0,0,0], [0,0,0]];
    for (let k = 0; k < 3; k++) {
      for (let l = 0; l < 3; l++) {
	for (let i = 0; i < 3; i++) {
	  rotation[k][l] += uMat.data64F[k*3+i] * vtMat.data64F[i*3+l];
	}
      }
    }
    return rotation;
  }

  _computeOptimalScale(centeredWeightedSources, weightedSources, weightedTargets, rotation) {
    const rotatedCenteredWeightedSources = [];
    for (let l = 0; l < centeredWeightedSources.length; l++) {
      rotatedCenteredWeightedSources[l] = [];
      for (let k = 0; k < 3; k++) {
	rotatedCenteredWeightedSources[l][k] = 0;
	for (let i = 0; i < 3; i++) {
	  rotatedCenteredWeightedSources[l][k] += rotation[k][i] * centeredWeightedSources[l][i];
	}
      }
    }
    let numerator = 0;
    for (let l = 0; l < rotatedCenteredWeightedSources.length; l++) {
      for (let k = 0; k < 3; k++) {
	numerator += rotatedCenteredWeightedSources[l][k] * weightedTargets[l][k];
      }
    }
    let denominator = 0;
    for (let l = 0; l < centeredWeightedSources.length; l++) {
      for (let k = 0; k < 3; k++) {
	denominator += centeredWeightedSources[l][k] * weightedSources[l][k];
      }
    }
    const scale = numerator / denominator;
    return scale;
  }

  _projectToScreen(landmarks) {
    const ret = [];

    const xScale = this.right - this.left;
    const yScale = this.top - this.bottom;
    const xTranslation = this.left;
    const yTranslation = this.bottom;

    for (let i = 0; i < landmarks.length; i++) {
      ret.push([
	landmarks[i][0] * xScale + xTranslation,
	(1-landmarks[i][1]) * yScale + yTranslation,
	landmarks[i][2] * xScale
      ]);
    }
    return ret;
  }

  _cloneLandmarks(landmarks) {
    const ret = [];
    for (let i = 0; i < landmarks.length; i++) {
      ret[i] = [landmarks[i][0], landmarks[i][1], landmarks[i][2]];
    }
    return ret;
  }

  _changeHandedness(landmarks) {
    for (let i = 0; i < landmarks.length; i++) {
      landmarks[i][2] *= -1;
    }
  }

  _moveAndRescaleZ(depthOffset, scale, landmarks) {
    for (let k = 0; k < landmarks.length; k++) {
      landmarks[k][2] = (landmarks[k][2] - depthOffset + this.near) / scale;
    }
  }

  _unprojectScreen(landmarks) {
    for (let k = 0; k < landmarks.length; k++) {
      landmarks[k][0] = landmarks[k][0] * landmarks[k][2] / this.near;
      landmarks[k][1] = landmarks[k][1] * landmarks[k][2] / this.near;
    }
  }
}

export {
  Estimator
}
