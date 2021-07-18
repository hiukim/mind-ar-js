const tf = require('@tensorflow/tfjs');
const {buildModelViewProjectionTransform, computeScreenCoordiate} = require('../estimation/utils.js');

const AR2_DEFAULT_TS = 6;
const AR2_DEFAULT_TS_GAP = 1;
const AR2_SEARCH_SIZE = 10;
const AR2_SEARCH_GAP = 1;
const AR2_SIM_THRESH = 0.8;

const TRACKING_KEYFRAME = 1; // 0: 256px, 1: 128px

// For some mobile device, only 16bit floating point texture is supported
//   ref: https://www.tensorflow.org/js/guide/platform_environment#precision
// Empirical results shows that modelViewProjectTransform can go up beyond that, resulting in error
// We get around this by dividing the transform matrix by 1000, and then multiply back inside webgl program
const PRECISION_ADJUST = 1000;

class Tracker {
  constructor(markerDimensions, trackingDataList, projectionTransform, inputWidth, inputHeight, debugMode=false) {
    this.markerDimensions = markerDimensions;
    this.trackingDataList = trackingDataList;
    this.projectionTransform = projectionTransform;
    this.debugMode = debugMode;

    this.trackingKeyframeList = [];
    for (let i = 0; i < trackingDataList.length; i++) {
      this.trackingKeyframeList.push(trackingDataList[i][TRACKING_KEYFRAME]);
    }

    // prebuild feature and marker pixel tensors
    let maxCount = 0;
    for (let i = 0; i < this.trackingKeyframeList.length; i++) {
      maxCount = Math.max(maxCount, this.trackingKeyframeList[i].points.length);
    }
    this.featurePointsListT = [];
    this.imagePixelsListT = [];
    this.imagePropertiesListT = [];

    for (let i = 0; i < this.trackingKeyframeList.length; i++) {
      const {featurePoints, imagePixels, imageProperties} = this._prebuild(this.trackingKeyframeList[i], maxCount);
      this.featurePointsListT[i] = featurePoints;
      this.imagePixelsListT[i] = imagePixels;
      this.imagePropertiesListT[i] = imageProperties;
    }

    this.kernelCaches = {};
  }

  dummyRun(inputT) {
    let transform = [[1,1,1,1], [1,1,1,1], [1,1,1,1]];
    for (let targetIndex = 0; targetIndex < this.featurePointsListT.length; targetIndex++) {
      this.track(inputT, [transform, transform, transform], targetIndex);
    }
  }

  // rotate angle and scale at center cx, cy, then translate dx, dy
  // https://en.wikipedia.org/wiki/Transformation_matrix
  _buildFurtherTransform(m, angle, scale, cx, cy, dx, dy) {
    const cos = Math.cos(angle * Math.PI / 180);
    const sin = Math.sin(angle * Math.PI / 180);
    const mat = [
      [scale * cos, -scale * sin, -cx*scale*cos + cy*scale*sin + cx + dx],
      [scale * sin,  scale * cos, -cx*scale*sin - cy*scale*cos + cy + dy],
      [0, 0, 1]
    ]
    const result = [
      [mat[0][0] * m[0][0] + mat[0][1] * m[1][0] + mat[0][2] * m[2][0], mat[0][0] * m[0][1] + mat[0][1] * m[1][1] + mat[0][2] * m[2][1], 0, mat[0][0] * m[0][3] + mat[0][1] * m[1][3] + mat[0][2] * m[2][3]], 

      [mat[1][0] * m[0][0] + mat[1][1] * m[1][0] + mat[1][2] * m[2][0], mat[1][0] * m[0][1] + mat[1][1] * m[1][1] + mat[1][2] * m[2][1], 0, mat[1][0] * m[0][3] + mat[1][1] * m[1][3] + mat[1][2] * m[2][3]], 

      [mat[2][0] * m[0][0] + mat[2][1] * m[1][0] + mat[2][2] * m[2][0], mat[2][0] * m[0][1] + mat[2][1] * m[1][1] + mat[2][2] * m[2][1], 0, mat[2][0] * m[0][3] + mat[2][1] * m[1][3] + mat[2][2] * m[2][3]], 
    ]
    return result;
  }

  track(inputImageT, lastModelViewTransforms, targetIndex) {
    console.log("tracker4");
    let debugExtra = {};

    const trialModelViewProjectionTransforms = [];
    const modelViewProjectionTransform = buildModelViewProjectionTransform(this.projectionTransform, lastModelViewTransforms[0]);
    const modelViewProjectionTransformT = this._buildAdjustedModelViewTransforms([modelViewProjectionTransform]); // squeezed

    const markerWidth = this.markerDimensions[targetIndex][0];
    const markerHeight = this.markerDimensions[targetIndex][1];
    const keyframeWidth = this.trackingKeyframeList[targetIndex].width; 
    const keyframeHeight = this.trackingKeyframeList[targetIndex].height; 

    const center = computeScreenCoordiate(modelViewProjectionTransform, markerWidth/2, markerHeight/2);
    const leftCenter = computeScreenCoordiate(modelViewProjectionTransform, 0, markerHeight/2);
    const topCenter = computeScreenCoordiate(modelViewProjectionTransform, markerWidth/2, 0);
    const markerWidthInScreen = 2 * Math.sqrt( (center.x - leftCenter.x) * (center.x - leftCenter.x) + (center.y - leftCenter.y) * (center.y - leftCenter.y));
    const markerHeightInScreen = 2 * Math.sqrt( (center.x - topCenter.x) * (center.x - topCenter.x) + (center.y - topCenter.y) * (center.y - topCenter.y));

    trialModelViewProjectionTransforms.push(modelViewProjectionTransform);

    // translate x
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 1, center.x, center.y, markerWidthInScreen/10, 0));

    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 1, center.x, center.y, 2*markerWidthInScreen/10, 0));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 1, center.x, center.y, -markerWidthInScreen/10, 0));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 1, center.x, center.y, -2*markerWidthInScreen/10, 0));

    // translate y
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 1, center.x, center.y, 0, markerHeightInScreen/10));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 1, center.x, center.y, 0, 2*markerHeightInScreen/10));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 1, center.x, center.y, 0, -markerHeightInScreen/10));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 1, center.x, center.y, 0, -2*markerHeightInScreen/10));

    // rotate
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 5, 1, center.x, center.y, 0, 0));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 10, 1, center.x, center.y, 0, 0));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, -5, 1, center.x, center.y, 0, 0));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, -10, 1, center.x, center.y, 0, 0));

    // scale
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 1.1, center.x, center.y, 0, 0));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 1.2, center.x, center.y, 0, 0));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 0.9, center.x, center.y, 0, 0));
    trialModelViewProjectionTransforms.push(this._buildFurtherTransform(modelViewProjectionTransform, 0, 0.8, center.x, center.y, 0, 0));

    const trialModelViewProjectionTransformsT = this._buildAdjustedModelViewTransforms(trialModelViewProjectionTransforms);

    const featurePointsT = this.featurePointsListT[targetIndex];
    const imagePixelsT = this.imagePixelsListT[targetIndex];
    const imagePropertiesT = this.imagePropertiesListT[targetIndex];

    const projectedImagesT = this._computeProjection(trialModelViewProjectionTransformsT, inputImageT, targetIndex);

    const {matchingPointsT, simT} = this._computeMatching(featurePointsT, imagePixelsT, imagePropertiesT, projectedImagesT);

    //console.log("dum match", matchingPointsT.slice([0,0], [1,1]).arraySync());
    //return {worldCoords: [], screenCoords: [], debugExtra};
    
    const trackingFrame = this.trackingKeyframeList[targetIndex];

    const sim = simT.arraySync();

    const goodTracks = [];
    const avgSims = [];
    for (let i = 0; i < sim.length; i++) {
      const goodTrack = [];
      let sumSim = 0;
      for (let j = 0; j < trackingFrame.points.length; j++) {
	if (sim[i][j] > AR2_SIM_THRESH) {
	  goodTrack.push(j);
	  sumSim += sim[i][j];
	}
      }
      goodTracks.push(goodTrack);
      avgSims.push(sumSim / goodTrack.length);
    }

    let bestProjectedIndex = 0;
    for (let i = 1; i < sim.length; i++) {
      if (goodTracks[i].length > goodTracks[bestProjectedIndex].length || (goodTracks[i].length === goodTracks[bestProjectedIndex].length && avgSims[i] > avgSims[bestProjectedIndex])) {
	bestProjectedIndex = i;
      }
    }

    const bestMatchingPointsT = this._getBestMatchingPoints(matchingPointsT, bestProjectedIndex);
    const bestMatchingPoints = bestMatchingPointsT.arraySync();

    const worldCoords = [];
    const screenCoords = [];
    const isTrackedPoints = [];
    goodTracks[bestProjectedIndex].forEach((i) => {
      isTrackedPoints[i] = true;
    });
    for (let i = 0; i < bestMatchingPoints.length; i++) {
      if (isTrackedPoints[i]) {
	const point = computeScreenCoordiate(trialModelViewProjectionTransforms[bestProjectedIndex], bestMatchingPoints[i][0], bestMatchingPoints[i][1]);
	screenCoords.push(point);
	worldCoords.push({x: trackingFrame.points[i].x / trackingFrame.scale, y: trackingFrame.points[i].y / trackingFrame.scale, z: 0});
      }
    }

    if (this.debugMode) {
      debugExtra = {
	center,
	projectedImages: projectedImagesT.arraySync(),
	matchingPoints: matchingPointsT.arraySync(),
	goodTracks,
	avgSims,
	bestProjectedIndex,
	trackedPoints: screenCoords
      }
    }

    // tensors cleanup
    trialModelViewProjectionTransformsT.dispose();
    projectedImagesT.dispose();
    modelViewProjectionTransformT.dispose();
    matchingPointsT.dispose();
    bestMatchingPointsT.dispose();
    simT.dispose();

    return {worldCoords, screenCoords, debugExtra};
  }

  _getBestMatchingPoints(matchingPointsT, bestProjectedIndex) {
    if (!this.kernelCaches.getBestMatchingPoints) {
      const kernel = {
	variableNames: ['matchingPoints', 'bestProjectedIndex'],
	outputShape: [matchingPointsT.shape[1], matchingPointsT.shape[2]],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();
	    int projectedIndex = int(getBestProjectedIndex(0));
	    setOutput( getMatchingPoints(projectedIndex, coords[0], coords[1]) );
	  }
	`
      }
      this.kernelCaches.getBestMatchingPoints = [kernel];
    }
    return tf.tidy(() => {
      const bestIndexT = tf.tensor([bestProjectedIndex]);
      const programs = this.kernelCaches.getBestMatchingPoints;
      const bestMatchingPointsT = this._compileAndRun(programs[0], [matchingPointsT, bestIndexT]);
      return bestMatchingPointsT;
    });
  }

  _markerPointToScreen(pointsT, modelViewProjectionTransformT) {
    if (!this.kernelCaches.markerPointToScreen) {
      const kernel = {
	variableNames: ['point', 'M'],
	outputShape: pointsT.shape,
	userCode: `
	  void main() {
	      ivec2 coords = getOutputCoords();

	      // Note that all elements of M is scaled by the factor ${PRECISION_ADJUST}
	      //   e.g. float m00 = getM(0, 0) * ${PRECISION_ADJUST};
	      //   but the computation somehow offset each other
	      float m00 = getM(0, 0);
	      float m01 = getM(0, 1);
	      float m03 = getM(0, 3);
	      float m10 = getM(1, 0);
	      float m11 = getM(1, 1);
	      float m13 = getM(1, 3);
	      float m20 = getM(2, 0);
	      float m21 = getM(2, 1);
	      float m23 = getM(2, 3);

	      float x = getPoint(coords.x, 0);
	      float y = getPoint(coords.x, 1);
	      float uz = (x * m20) + (y * m21) + m23;

	      if (coords.y == 0) {
		  float ux = (x * m00) + (y * m01) + m03;
		  setOutput(ux / uz);
	      }
	      if (coords.y == 1) {
		  float uy = (x * m10) + (y * m11) + m13;
		  setOutput(uy / uz);
	      }
	    }
	`
      };
      const program = kernel;
      this.kernelCaches.markerPointToScreen = program;
    }

    return tf.tidy(() => {
      const program = this.kernelCaches.markerPointToScreen;
      const result = this._compileAndRun(program, [pointsT, modelViewProjectionTransformT]);
      return result;
    });
  }

  _computeMatching(featurePointsT, imagePixelsT, imagePropertiesT, projectedImagesT) {
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;
    const templateGap = AR2_DEFAULT_TS_GAP;
    const searchOneSize = AR2_SEARCH_SIZE * templateGap;
    const searchGap = AR2_SEARCH_GAP;
    const searchSize = searchOneSize * 2 + 1;
    const targetHeight = projectedImagesT.shape[1];
    const targetWidth = projectedImagesT.shape[2];

    const projectedCount = projectedImagesT.shape[0];
    const featureCount = featurePointsT.shape[0];

    if (!this.kernelCaches.computeMatching) {
      const kernel1 = {
	variableNames: ['features', 'markerPixels', 'markerProperties', 'targetPixels'],
	outputShape: [projectedCount, featureCount, searchSize * searchSize],
	userCode: `
	  void main() {
	    ivec3 coords = getOutputCoords();

	    int projectedIndex = coords[0];
	    int featureIndex = coords[1];
	    int searchOffsetIndex = coords[2];

	    int markerWidth = int(getMarkerProperties(0));
	    int markerHeight = int(getMarkerProperties(1));
	    float markerScale = getMarkerProperties(2);

	    int searchOffsetX = imod(searchOffsetIndex, ${searchSize}) * ${searchGap};
	    int searchOffsetY = searchOffsetIndex / ${searchSize} * ${searchGap};

	    int sCenterX = int(getFeatures(featureIndex, 0) * markerScale);
	    int sCenterY = int(getFeatures(featureIndex, 1) * markerScale);

	    int sx = sCenterX + searchOffsetX - ${searchOneSize};
	    int sy = sCenterY + searchOffsetY - ${searchOneSize};

	    if (sx < ${templateOneSize} || sx >= (${targetWidth} - ${templateOneSize}) || sy < ${templateOneSize} || sy >= (${targetHeight} - ${templateOneSize})) {
	      setOutput(-2.);
	    } 
	    else {
	      float sumPoint = 0.;
	      float sumPointSquare = 0.;
	      float sumTemplate = 0.;
	      float sumTemplateSquare = 0.;
	      float sumPointTemplate = 0.;

	      for (int templateOffsetY = 0; templateOffsetY < ${templateSize}; templateOffsetY++) {
		for (int templateOffsetX = 0; templateOffsetX < ${templateSize}; templateOffsetX++) {
		  int fx2 = sCenterX + templateOffsetX - ${templateOneSize};
		  int fy2 = sCenterY + templateOffsetY - ${templateOneSize};

		  int sx2 = sx + templateOffsetX - ${templateOneSize};
		  int sy2 = sy + templateOffsetY - ${templateOneSize};

		  int markerPixelIndex = fy2 * markerWidth + fx2;
		  float markerPixel = getMarkerPixels(markerPixelIndex);
		  float targetPixel = getTargetPixels(projectedIndex, sy2, sx2);

		  sumTemplate += markerPixel;
		  sumTemplateSquare += markerPixel * markerPixel;
		  sumPoint += targetPixel;
		  sumPointSquare += targetPixel * targetPixel;
		  sumPointTemplate += targetPixel * markerPixel;
		}
	      }

/*
              for (int i = 0; i < ${templateSize} * ${templateSize}; i++) {
		int templateOffsetX = imod(i, ${templateSize}) * ${templateGap};
		int templateOffsetY = i / ${templateSize} * ${templateGap};

		int fx2 = sCenterX + templateOffsetX - ${templateOneSize};
		int fy2 = sCenterY + templateOffsetY - ${templateOneSize};

		int sx2 = sx + templateOffsetX - ${templateOneSize};
		int sy2 = sy + templateOffsetY - ${templateOneSize};

		int markerPixelIndex = fy2 * markerWidth + fx2;
		float markerPixel = getMarkerPixels(markerPixelIndex);
		float targetPixel = getTargetPixels(projectedIndex, sy2, sx2);

	      	sumTemplate += markerPixel;
	      	sumTemplateSquare += markerPixel * markerPixel;
		sumPoint += targetPixel;
		sumPointSquare += targetPixel * targetPixel;
		sumPointTemplate += targetPixel * markerPixel;
	      }
	      */
	      
	      // Normalized cross-correlation
	      // !important divide first avoid overflow (e.g. sumPoint / count * sumPoint)
	      float count = float(${templateSize} * ${templateSize});
	      float pointVariance = sqrt(sumPointSquare - sumPoint / count * sumPoint);
	      float templateVariance = sqrt(sumTemplateSquare - sumTemplate / count * sumTemplate);

	      if (pointVariance < 0.0000001) {
		setOutput(-3.);
	      } else if (templateVariance < 0.0000001) {
		//setOutput(sumTemplate);
		setOutput(-4.);
	      } else {
		sumPointTemplate -= sumPoint / count * sumTemplate;
		float sim = sumPointTemplate / pointVariance / templateVariance;  
		setOutput(sim);
	      }
	    }
	  }
	`
      };

      const kernel2 = {
	variableNames: ['featurePoints', 'markerProperties', 'maxIndex'],
	outputShape: [projectedCount, featureCount, 2], // [x, y]
	userCode: `
	  void main() {
	    ivec3 coords = getOutputCoords();

	    float markerScale = getMarkerProperties(2);

	    int projectedIndex = coords[0];
	    int featureIndex = coords[1];

	    int maxIndex = int(getMaxIndex(projectedIndex, featureIndex));
	    int searchLocationIndex = maxIndex / ${searchSize * searchSize};
	    int searchOffsetIndex = imod(maxIndex, ${searchSize * searchSize});

	    if (coords[2] == 0) {
	      int searchOffsetX = imod(searchOffsetIndex, ${searchSize}) * ${searchGap};
	      setOutput(getFeaturePoints(featureIndex, 0) + float(searchOffsetX - ${searchOneSize}) / markerScale);
	    }
	    else if (coords[2] == 1) {
	      int searchOffsetY = searchOffsetIndex / ${searchSize} * ${searchGap};
	      setOutput(getFeaturePoints(featureIndex, 1) + float(searchOffsetY - ${searchOneSize}) / markerScale);
	    }
	  }
	`
      }

      const kernel3 = {
	variableNames: ['sims', 'maxIndex'],
	outputShape: [projectedCount, featureCount],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();
	    int projectedIndex = coords[0];
	    int featureIndex = coords[1];
	    int maxIndex = int(getMaxIndex(projectedIndex, featureIndex));
	    setOutput(getSims(projectedIndex, featureIndex, maxIndex));
	  }
	`
      }

      this.kernelCaches.computeMatching = [kernel1, kernel2, kernel3];
    }

    return tf.tidy(() => {
      const programs = this.kernelCaches.computeMatching;
      const allSims = this._compileAndRun(programs[0], [featurePointsT, imagePixelsT, imagePropertiesT, projectedImagesT]);
      const maxIndex = allSims.argMax(2);
      const matchingPointsT = this._compileAndRun(programs[1], [featurePointsT, imagePropertiesT, maxIndex]);
      const simT = this._compileAndRun(programs[2], [allSims, maxIndex]);
      return {matchingPointsT, simT};
    });
  }

  _computeProjection(modelViewProjectionTransformsT, inputImageT, targetIndex) {
    if (!this.kernelCaches.computeProjection) {
      this.kernelCaches.computeProjection = [];
    }

    if (!this.kernelCaches.computeProjection[targetIndex]) {
      const markerWidth = this.trackingKeyframeList[targetIndex].width;
      const markerHeight = this.trackingKeyframeList[targetIndex].height;
      const markerScale = this.trackingKeyframeList[targetIndex].scale;

      const kernel = {
	variableNames: ['M', 'pixel'],
	outputShape: [modelViewProjectionTransformsT.shape[0], markerHeight, markerWidth],
	userCode: `
	  void main() {
	      ivec3 coords = getOutputCoords();
	      int m = coords[0];

	      float m00 = getM(m, 0, 0) * ${PRECISION_ADJUST}.;
	      float m01 = getM(m, 0, 1) * ${PRECISION_ADJUST}.;
	      float m03 = getM(m, 0, 3) * ${PRECISION_ADJUST}.;
	      float m10 = getM(m, 1, 0) * ${PRECISION_ADJUST}.;
	      float m11 = getM(m, 1, 1) * ${PRECISION_ADJUST}.;
	      float m13 = getM(m, 1, 3) * ${PRECISION_ADJUST}.;
	      float m20 = getM(m, 2, 0) * ${PRECISION_ADJUST}.;
	      float m21 = getM(m, 2, 1) * ${PRECISION_ADJUST}.;
	      float m23 = getM(m, 2, 3) * ${PRECISION_ADJUST}.;

	      //float y = float( ${markerHeight} - coords[1]) / float(${markerScale});
	      float y = float(coords[1]) / float(${markerScale});
	      float x = float(coords[2]) / float(${markerScale});
	      float uz = (x * m20) + (y * m21) + m23;
	      float oneOverUz = 1. / uz;

	      float ux = (x * m00) + (y * m01) + m03;
	      float uy = (x * m10) + (y * m11) + m13;

	      ux = floor(ux * oneOverUz + 0.5);
	      uy = floor(uy * oneOverUz + 0.5);
	      setOutput(getPixel( int(uy), int(ux)));

	      /*
	      float yp = uy * oneOverUz;
	      float xp = ux * oneOverUz;
	      int x0 = int(floor(xp));
	      int x1 = x0 + 1;
	      int y0 = int(floor(yp));
	      int y1 = y0 + 1;
	      float f1 = getPixel(y0, x0);
	      float f2 = getPixel(y0, x1);
	      float f3 = getPixel(y1, x0);
	      float f4 = getPixel(y1, x1);
	      float x1f = float(x1);
	      float y1f = float(y1);
	      float x0f = float(x0);
	      float y0f = float(y0);

	      // ratio for interpolation between four neighbouring points
	      float value = (x1f - xp) * (y1f - yp) * f1
			  + (xp - x0f) * (y1f - yp) * f2
			  + (x1f - xp) * (yp - y0f) * f3
			  + (xp - x0f) * (yp - y0f) * f4;
	      setOutput(value);
	      */
	    }
	`
      };

      this.kernelCaches.computeProjection[targetIndex] = kernel;
    }

    return tf.tidy(() => {
      const program = this.kernelCaches.computeProjection[targetIndex];
      const result = this._compileAndRun(program, [modelViewProjectionTransformsT, inputImageT]);
      return result;
    });
  }
  
  _buildAdjustedModelViewTransforms(modelViewProjectionTransforms) {
    return tf.tidy(() => {
      let modelViewProjectionTransformAdjusteds = [];

      for (let k = 0; k < modelViewProjectionTransforms.length; k++) {
	let modelViewProjectionTransform = modelViewProjectionTransforms[k];

	let modelViewProjectionTransformAdjusted = [];
	for (let i = 0; i < modelViewProjectionTransform.length; i++) {
	  modelViewProjectionTransformAdjusted.push([]);
	  for (let j = 0; j < modelViewProjectionTransform[i].length; j++) {
	    modelViewProjectionTransformAdjusted[i].push(modelViewProjectionTransform[i][j]/PRECISION_ADJUST);
	  }
	}
	modelViewProjectionTransformAdjusteds.push(modelViewProjectionTransformAdjusted);
      }

      // squeeze first dimension if only one modelViewProjectionTransform
      let t = tf.tensor(modelViewProjectionTransformAdjusteds, [modelViewProjectionTransforms.length, 3, 4]);
      if (t.shape[0] === 1) {
	t = t.squeeze([0]);
      }
      return t;
    });
  }
  
  _buildAdjustedModelViewTransform(modelViewProjectionTransform) {
    return tf.tidy(() => {
      let modelViewProjectionTransformAdjusted = [];
      for (let i = 0; i < modelViewProjectionTransform.length; i++) {
	modelViewProjectionTransformAdjusted.push([]);
	for (let j = 0; j < modelViewProjectionTransform[i].length; j++) {
	  modelViewProjectionTransformAdjusted[i].push(modelViewProjectionTransform[i][j]/PRECISION_ADJUST);
	}
      }
      return tf.tensor(modelViewProjectionTransformAdjusted, [3, 4]);
    });
  }

  _prebuild(trackingFrame, maxCount) {
    return tf.tidy(() => {
      const scale = trackingFrame.scale;

      const p = [];
      for (let k = 0; k < maxCount; k++) {
	if (k < trackingFrame.points.length) {
	  p.push([trackingFrame.points[k].x / scale, trackingFrame.points[k].y / scale]);
	} else {
	  p.push([-1, -1]);
	}
      }
      const imagePixels = tf.tensor(trackingFrame.data, [trackingFrame.width * trackingFrame.height]);
      const imageProperties = tf.tensor([trackingFrame.width, trackingFrame.height, trackingFrame.scale], [3]);
      const featurePoints = tf.tensor(p, [p.length, 2], 'float32');

      return {
	featurePoints,
	imagePixels,
	imageProperties
      }
    });
  }

  _compileAndRun(program, inputs) {
    const outInfo = tf.backend().compileAndRun(program, inputs);
    return tf.engine().makeTensorFromDataId(outInfo.dataId, outInfo.shape, outInfo.dtype);
  }
}

module.exports = {
  Tracker
};


