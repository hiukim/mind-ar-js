const tf = require('@tensorflow/tfjs');
const {buildModelViewProjectionTransform, computeScreenCoordiate} = require('../estimation/utils.js');

const AR2_DEFAULT_TS = 6;
const AR2_DEFAULT_TS_GAP = 1;
//const AR2_DEFAULT_TS = 22;
//const AR2_SEARCH_SIZE = 6;
const AR2_SEARCH_SIZE = 10;
const AR2_SEARCH_GAP = 1;
const AR2_SIM_THRESH = 0.8;

// For some mobile device, only 16bit floating point texture is supported
//   ref: https://www.tensorflow.org/js/guide/platform_environment#precision
// Empirical results shows that modelViewProjectTransform can go up beyond that, resulting in error
// We get around this by dividing the transform matrix by 1000, and then multiply back inside webgl program
const PRECISION_ADJUST = 1000;

class Tracker {
  constructor(trackingDataList, imageListList, projectionTransform, inputWidth, inputHeight, debugMode=false) {
    this.trackingDataList = trackingDataList;
    this.imageListList = imageListList;
    this.projectionTransform = projectionTransform;
    this.debugMode = debugMode;

    // prebuild feature and marker pixel tensors
    let maxCount = 0;
    for (let i = 0; i < trackingDataList.length; i++) {
      for (let j = 0; j < trackingDataList[i].length; j++) {
	maxCount = Math.max(maxCount, trackingDataList[i][j].points.length);
      }
    }
    this.featurePointsListT = [];
    this.imagePixelsListT = [];
    this.imagePropertiesListT = [];
    for (let i = 0; i < trackingDataList.length; i++) {
      const {featureList, imagePixelsList, imagePropertiesList} = this._prebuild(trackingDataList[i], imageListList[i], maxCount);
      this.featurePointsListT[i] = featureList;
      this.imagePixelsListT[i] = imagePixelsList;
      this.imagePropertiesListT[i] = imagePropertiesList;
    }

    this.kernelCaches = {};
  }

  dummyRun(inputT) {
    let transform = [[1,1,1,1], [1,1,1,1], [1,1,1,1]];
    for (let targetIndex = 0; targetIndex < this.featurePointsListT.length; targetIndex++) {
      for (let i = 0; i < this.featurePointsListT[targetIndex].length; i++) {
	this.track(inputT, [transform, transform, transform], targetIndex, i);
      }
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

  track(inputImageT, lastModelViewTransforms, targetIndex, inputKeyframeIndex) {
    let debugExtra = {};

    const trialModelViewProjectionTransforms = [];
    const modelViewProjectionTransform = buildModelViewProjectionTransform(this.projectionTransform, lastModelViewTransforms[0]);
    const modelViewProjectionTransformT = this._buildAdjustedModelViewTransforms([modelViewProjectionTransform]); // squeezed

    const markerWidth = this.imageListList[targetIndex][0].width;
    const markerHeight = this.imageListList[targetIndex][0].height;
    const keyframeIndex = this.imageListList[targetIndex].length - 1;
    //const keyframeIndex = inputKeyframeIndex;
    const keyframeWidth = this.imageListList[targetIndex][keyframeIndex].width; 
    const keyframeHeight = this.imageListList[targetIndex][keyframeIndex].height; 

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

    const featurePointsT = this.featurePointsListT[targetIndex][keyframeIndex];
    const imagePixelsT = this.imagePixelsListT[targetIndex][keyframeIndex];
    const imagePropertiesT = this.imagePropertiesListT[targetIndex][keyframeIndex];

    const projectedImagesT = this._computeProjection(trialModelViewProjectionTransformsT, inputImageT, targetIndex, keyframeIndex);

    const {matchingPointsT, simT} = this._computeMatching(featurePointsT, imagePixelsT, imagePropertiesT, projectedImagesT);
    
    const featureSet = this.trackingDataList[targetIndex][keyframeIndex];

    const sim = simT.arraySync();

    const goodTracks = [];
    const avgSims = [];
    for (let i = 0; i < sim.length; i++) {
      const goodTrack = [];
      let sumSim = 0;
      for (let j = 0; j < featureSet.points.length; j++) {
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
	worldCoords.push({x: featureSet.points[i].x / featureSet.scale, y: featureSet.points[i].y / featureSet.scale, z: 0});
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

  _track(inputImageT, lastModelViewTransforms, targetIndex, inputKeyframeIndex=-1) {
    let debugExtra = null;

    const modelViewProjectionTransforms = [];
    const modelViewProjectionTransformsT = [];
    for (let i = 0; i < lastModelViewTransforms.length; i++) {
      modelViewProjectionTransforms.push(buildModelViewProjectionTransform(this.projectionTransform, lastModelViewTransforms[i]));
      modelViewProjectionTransformsT.push(this._buildAdjustedModelViewTransform(modelViewProjectionTransforms[i]));
    }
    const modelViewProjectionTransform = modelViewProjectionTransforms[0];
    const modelViewProjectionTransformT = modelViewProjectionTransformsT[0];

    // expected keyframe, if not provided in input, compute the expected.
    const keyframeIndex = inputKeyframeIndex !== -1? inputKeyframeIndex: this._computeExpectedKeyframe(modelViewProjectionTransform, targetIndex);

    // prebuilt tensors for current keyframe
    const featurePointsT = this.featurePointsListT[targetIndex][keyframeIndex];
    const imagePixelsT = this.imagePixelsListT[targetIndex][keyframeIndex];
    const imagePropertiesT = this.imagePropertiesListT[targetIndex][keyframeIndex];

    //console.log("dummy mvp", modelViewProjectionTransformsT[2].slice([0,0], [1,1]).sum().arraySync());
    //return {worldCoords: [], screenCoords: [], debugExtra: null};
    //

    // project the input image into the marker according to previous transform
    const projectedImageT = this._computeProjection(modelViewProjectionTransformT, inputImageT, targetIndex, keyframeIndex);

    const keyframeWidth = this.imageListList[targetIndex][keyframeIndex].width; 
    const keyframeHeight = this.imageListList[targetIndex][keyframeIndex].height; 
    const rotatedModelViewProjectionTransform = this._buildRotatedModelViewProjectionTransform(modelViewProjectionTransform, keyframeWidth, keyframeHeight);
    const rotatedModelViewProjectionTransformT = this._buildAdjustedModelViewTransform(rotatedModelViewProjectionTransform);
    const rotatedProjectedImageT = this._computeProjection(rotatedModelViewProjectionTransformT, inputImageT, targetIndex, keyframeIndex);

    //console.log("dummy projected", projectedImageT.slice([0,0], [1,1]).sum().arraySync());
    //return {worldCoords: [], screenCoords: [], debugExtra: null};

    // compute a few expected locations for each feature points according to previous 3 transforms 
    const searchPointsT = this._computeSearchPoints(featurePointsT, modelViewProjectionTransformsT);

    //console.log("dummy search", searchPointsT.slice([0,0], [1,1]).sum().arraySync());
    //return {worldCoords: [], screenCoords: [], debugExtra: null};

    //console.log("dummy search", searchPointsT.slice([0,0], [1,1]).sum().arraySync());
    //return {worldCoords: [], screenCoords: [], debugExtra: null};

    // find a best matching point around the neithbours of the expected locations for each feature points
    //   normalized cross-correlation (similarity should be in range [-1, 1]
    const {matchingPointsT, simT} = this._computeMatching(featurePointsT, searchPointsT, imagePixelsT, imagePropertiesT, projectedImageT);

    const {matchingPointsT: matchingPointsT2, simT: simT2} = this._computeMatching(featurePointsT, searchPointsT, imagePixelsT, imagePropertiesT, rotatedProjectedImageT);
    console.log("match2", matchingPointsT2.arraySync(), simT2.arraySync());

    //console.log("dummy matchingPointsT", matchingPointsT.slice([0,0], [1,1]).sum().arraySync());
    //return {worldCoords: [], screenCoords: [], debugExtra: null};

    // re-project matching positions back to input positions 
    const trackedPointsT = this._markerPointToScreen(matchingPointsT, modelViewProjectionTransformT); 

    const trackedPointsT2 = this._markerPointToScreen(matchingPointsT2, rotatedModelViewProjectionTransformT); 

    const combinedT = this._combine(trackedPointsT, simT);

    if (this.debugMode) {
      debugExtra = {
        keyframeIndex,
	matchingPoints: matchingPointsT.arraySync(),
	matchingPoints2: matchingPointsT2.arraySync(),
	trackedPoints: trackedPointsT.arraySync(),
	trackedPoints2: trackedPointsT2.arraySync(),
	searchPoints: searchPointsT.arraySync(),
	projectedImage: projectedImageT.arraySync(),
	rotatedProjectedImage: rotatedProjectedImageT.arraySync(),
	sim: simT.arraySync(),
      }
    }

    // download data for further CPU computatio
    const combinedArr = combinedT.arraySync();

    // tensors cleanup
    modelViewProjectionTransformsT.forEach((modelViewProjectionTransformT) => {
      modelViewProjectionTransformT.dispose();
    });
    searchPointsT.dispose();
    projectedImageT.dispose();
    modelViewProjectionTransformT.dispose();
    matchingPointsT.dispose();
    trackedPointsT.dispose();
    simT.dispose();
    combinedT.dispose();

    // tracking features set if similarity exceed certain threshold
    const featureSet = this.trackingDataList[targetIndex][keyframeIndex];

    const screenCoords = [];
    const worldCoords = [];
    for (let i = 0; i < featureSet.points.length; i++) {
      if (combinedArr[i][2] > AR2_SIM_THRESH) {
	screenCoords.push({x: combinedArr[i][0], y: combinedArr[i][1]});
	worldCoords.push({x: featureSet.points[i].x / featureSet.scale, y: featureSet.points[i].y / featureSet.scale, z: 0});
      }
    }

    return {worldCoords, screenCoords, debugExtra};
  }

  _combine(trackedPointsT, similaritiesT) {
    return tf.tidy(() => {
      const combinedT = tf.concat([trackedPointsT, similaritiesT.expandDims(1)], 1);
      return combinedT;
    });
  }

  _computeSearchPoints(featurePointsT, modelViewProjectionTransformT, trialModelViewProjectionTransformsT) {
    const featureCount = featurePointsT.shape[0];
    if (!this.kernelCaches.computeSearchPoints) {
      const kernel = {
	variableNames: ['point', 'M'],
	outputShape: [trialModelViewProjectionTransformsT.shape[0], featureCount, 2],
	userCode: `
	  void main() {
	      ivec3 coords = getOutputCoords();

	      int mIndex = coords[0];
	      int featureIndex = coords[1];

	      // Note that all elements of M is scaled by the factor ${PRECISION_ADJUST}
	      //   e.g. float m00 = getM(0, 0) * ${PRECISION_ADJUST};
	      //   but the computation somehow offset each other
	      float m00 = getM(mIndex, 0, 0);
	      float m01 = getM(mIndex, 0, 1);
	      float m03 = getM(mIndex, 0, 3);
	      float m10 = getM(mIndex, 1, 0);
	      float m11 = getM(mIndex, 1, 1);
	      float m13 = getM(mIndex, 1, 3);
	      float m20 = getM(mIndex, 2, 0);
	      float m21 = getM(mIndex, 2, 1);
	      float m23 = getM(mIndex, 2, 3);

	      float sx2 = getPoint(featureIndex, 0);
	      float sy2 = getPoint(featureIndex, 1);

	      float c11 = m20 * sx2 - m00;
	      float c12 = m21 * sx2 - m01;
	      float c21 = m20 * sy2 - m10;
	      float c22 = m21 * sy2 - m11;
	      float b1 = m03 - m23 * sx2;
	      float b2 = m13 - m23 * sy2;

	      float m = c11 * c22 - c12 * c21;

	      if (coords[2] == 0) {
		float mx2 = (c22 * b1 - c12 * b2) / m;
		setOutput(mx2);
	      }
	      if (coords[2] == 1) {
		float my2 = (c11 * b2 - c21 * b1) / m;
		setOutput(my2);
	      }
	    }
	`
      };
      this.kernelCaches.computeSearchPoints = [kernel];
    }
    const programs = this.kernelCaches.computeSearchPoints;

    return tf.tidy(() => {
      const p = this._markerPointToScreen(featurePointsT, modelViewProjectionTransformT);
      const m = this._compileAndRun(programs[0], [p, trialModelViewProjectionTransformsT]);
      return m;
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

  _computeProjection(modelViewProjectionTransformsT, inputImageT, targetIndex, keyframeIndex) {
    if (!this.kernelCaches.computeProjection) {
      this.kernelCaches.computeProjection = [];
    }

    if (!this.kernelCaches.computeProjection[keyframeIndex]) {
      const markerWidth = this.imageListList[targetIndex][keyframeIndex].width;
      const markerHeight = this.imageListList[targetIndex][keyframeIndex].height;
      const markerScale = this.imageListList[targetIndex][keyframeIndex].scale;

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

	      /*
	      ux = floor(ux * oneOverUz + 0.5);
	      uy = floor(uy * oneOverUz + 0.5);
	      setOutput(getPixel( int(uy), int(ux)));
	      */

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


	    }
	`
      };

      this.kernelCaches.computeProjection[keyframeIndex] = kernel;
    }

    return tf.tidy(() => {
      const program = this.kernelCaches.computeProjection[keyframeIndex];
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

  _prebuild(featureSets, imageList, maxCount) {
    return tf.tidy(() => {
      const imagePixelsList = [];
      const imagePropertiesList = [];
      for (let i = 0; i < imageList.length; i++) {
	imagePixelsList.push(tf.tensor(imageList[i].data, [imageList[i].width * imageList[i].height]));
	imagePropertiesList.push(tf.tensor([imageList[i].width, imageList[i].height, imageList[i].scale], [3]));
      }

      const featureList = [];
      for (let j = 0; j < featureSets.length; j++) {
	const scale = imageList[j].scale;
	let p = [];
        for (let k = 0; k < maxCount; k++) {
          if (k < featureSets[j].points.length) {
	    p.push([featureSets[j].points[k].x / scale, featureSets[j].points[k].y / scale]);
          } else {
	    p.push([-1, -1]);
          }
        }
	featureList.push(tf.tensor(p, [p.length, 2], 'float32'));
      }

      return {
	featureList,
	imagePixelsList,
	imagePropertiesList
      };
    });
  }

  // get best keyframeIndex
  //  find projected location on screen for position (0, 0), (10, 0) and (0, 10) and see the projected distance.
  //  expected marker ratio would be  distance / 10
  _computeExpectedKeyframe(modelViewProjectionTransform, targetIndex) {
    return this.imageListList[targetIndex].length - 1; 

    const u = computeScreenCoordiate(modelViewProjectionTransform, 10, 10, 0);
    const u1 = computeScreenCoordiate(modelViewProjectionTransform, 10+10, 10, 0);
    const u2 = computeScreenCoordiate(modelViewProjectionTransform, 10, 10+10, 0);

    if (u && u1 && u2) {
      const d1 = (u1.x - u.x) * (u1.x - u.x) + (u1.y - u.y) * (u1.y - u.y);
      const d2 = (u2.x - u.x) * (u2.x - u.x) + (u2.y - u.y) * (u2.y - u.y);
      const minD = Math.sqrt(Math.min(d1, d2));
      //const targetScale = minD / 10.0; // screen to marker ratio
      const targetScale = minD / 10.0 / 2.0; // experimental result shows that using lower resolution keyframe is better. probably search pixel easier to reach. Also, it's faster.
      const imageList = this.imageListList[targetIndex];

      let keyframeIndex = 0;
      for (let i = 1; i < imageList.length; i++) {
	const rd1 = Math.abs(targetScale - imageList[keyframeIndex].scale);
	const rd2 = Math.abs(targetScale - imageList[i].scale);
	if (rd2 < rd1) keyframeIndex = i;
      }

      if (keyframeIndex >= 5) return 5;
      return keyframeIndex;
    }
    return 0;
  }

  _compileAndRun(program, inputs) {
    const outInfo = tf.backend().compileAndRun(program, inputs);
    return tf.engine().makeTensorFromDataId(outInfo.dataId, outInfo.shape, outInfo.dtype);
  }
}

module.exports = {
  Tracker
};

