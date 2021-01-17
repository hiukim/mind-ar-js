const tf = require('@tensorflow/tfjs');
const {buildModelViewProjectionTransform, computeScreenCoordiate} = require('../icp/utils.js');

const AR2_DEFAULT_TS = 6;
const AR2_SEARCH_SIZE = 6;
const AR2_SEARCH_GAP = 1;
const AR2_SIM_THRESH = 0.8;

// For some mobile device, only 16bit floating point texture is supported
//   ref: https://www.tensorflow.org/js/guide/platform_environment#precision
// Empirical results shows that modelViewProjectTransform can go up beyond that, resulting in error
// We get around this by dividing the transform matrix by 1000, and then multiply back inside webgl program
const PRECISION_ADJUST = 1000;

class Tracker {
  constructor(trackingDataList, imageListList, projectionTransform, inputWidth, inputHeight) {
    this.trackingDataList = trackingDataList;
    this.imageListList = imageListList;
    this.projectionTransform = projectionTransform;
    this.width = inputWidth;
    this.height = inputHeight;

    // prebuild feature and image pixel tensors
    this.featurePointsListT = [];
    this.imagePixelsListT = [];
    this.imagePropertiesListT = [];
    for (let i = 0; i < trackingDataList.length; i++) {
      const {featureList, imagePixelsList, imagePropertiesList} = this._prebuild(trackingDataList[i], imageListList[i]);
      this.featurePointsListT[i] = featureList;
      this.imagePixelsListT[i] = imagePixelsList;
      this.imagePropertiesListT[i] = imagePropertiesList;
    }

    this.kernelCaches = {};
  }

  dummyRun(input) {
    for (let targetIndex = 0; targetIndex < this.featurePointsListT.length; targetIndex++) {
      for (let i = 0; i < this.featurePointsListT[targetIndex].length; i++) {
	this.track(input, [[1,1,1,1], [1,1,1,1], [1,1,1,1]], targetIndex, i);
      }
    }
  }

  track(input, lastModelViewTransform, targetIndex, inputKeyframeIndex=-1) {
    let modelViewProjectionTransform = buildModelViewProjectionTransform(this.projectionTransform, lastModelViewTransform);

    // expected keyframe, if not provided in input, compute the expected.
    const keyframeIndex = inputKeyframeIndex !== -1? inputKeyframeIndex: this._computeExpectedKeyframe(modelViewProjectionTransform, targetIndex);

    // model view projection transform tensor
    const modelViewProjectionTransformT = this._buildAdjustedModelViewTransform(modelViewProjectionTransform);

    // prebuilt tensors for current keyframe
    const featurePointsT = this.featurePointsListT[targetIndex][keyframeIndex];
    const imagePixelsT = this.imagePixelsListT[targetIndex][keyframeIndex];
    const imagePropertiesT = this.imagePropertiesListT[targetIndex][keyframeIndex];

    // read input image as tensor
    const inputImageT = this._loadInput(input);

    // find the expected position of the feature points (using the previously modelViewProjection transform
    const searchPointsT = this._computeSearchPoints(featurePointsT, modelViewProjectionTransformT);

    // compute templates (i.e. surrounding pixels) of each search points (inverse project marker pixels)
    const templatesT = this._buildTemplates(imagePixelsT, searchPointsT, imagePropertiesT, modelViewProjectionTransformT);

    // compute the similarity (normalized cross-correlation) of templates and search points 
    const similaritiesT = this._computeSimilarity(inputImageT, searchPointsT, templatesT);

    // download data for further CPU computation
    const similaritiesArr = similaritiesT.arraySync();

    // tensors cleanup
    modelViewProjectionTransformT.dispose();
    inputImageT.dispose();
    searchPointsT.dispose();
    templatesT.dispose();
    similaritiesT.dispose();

    // tracking features set if similarity exceed certain threshold
    const featureSet = this.trackingDataList[targetIndex][keyframeIndex];
    const selectedFeatures = [];
    for (let i = 0; i < featureSet.coords.length; i++) {
      if (similaritiesArr[i][2] > AR2_SIM_THRESH) {
        selectedFeatures.push({
          pos2D: {x: similaritiesArr[i][0], y: similaritiesArr[i][1]},
          pos3D: {x: featureSet.coords[i].mx, y: featureSet.coords[i].my, z: 0},
          sim: similaritiesArr[i][2]
        });
      }
    }
    //console.log("seleccted features length", keyframeIndex, selectedFeatures.length, '/', featureSet.coords.length);
    //console.log('n tensorss: ', tf.memory().numTensors);
    return selectedFeatures;
  }

  _computeSimilarity(targetImage, searchPointsT, templates) {
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;
    const searchOneSize = AR2_SEARCH_SIZE;
    const searchSize = searchOneSize * 2 + 1;
    const targetWidth = this.width;
    const targetHeight = this.height;

    if (!this.kernelCaches.computeSimilarity) {
      const kernel = {
	variableNames: ['search', 'pixels', 'templates'],
	outputShape: [searchPointsT.shape[0], searchSize*searchSize],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();

	    int featureIndex = coords[0];
	    int searchOffsetIndex = coords[1];

	    int searchOffsetX = imod(searchOffsetIndex, ${searchSize});
	    int searchOffsetY = searchOffsetIndex / ${searchSize};

	    float sx = getSearch(featureIndex, 0);
	    float sy = getSearch(featureIndex, 1);
	    int sx2 = int(sx) + searchOffsetX - ${searchOneSize};
	    int sy2 = int(sy) + searchOffsetY - ${searchOneSize};

	    if (sx2 < ${templateOneSize} || sx2 >= (${targetWidth} - ${templateOneSize}) || sy2 < ${templateOneSize} || sy2 >= (${targetHeight} - ${templateOneSize})) {
	      setOutput(-1.);
	    } 
	    else {
	      float sumPoint = 0.;
	      float sumPointSquare = 0.;
	      float sumTemplate = 0.;
	      float sumTemplateSquare = 0.;
	      float sumPointTemplate = 0.;

              for (int i = 0; i < ${templateSize} * ${templateSize}; i++) {
		int templateOffsetX = imod(i, ${templateSize});
		int templateOffsetY = i / ${templateSize};

		int x = sx2 + templateOffsetX - ${templateOneSize};
		int y = sy2 + templateOffsetY - ${templateOneSize};

		float templatePixel = getTemplates(featureIndex, i);
		float pointPixel = getPixels(y,x);

	      	sumTemplate += templatePixel;
	      	sumTemplateSquare += templatePixel * templatePixel;
		sumPoint += pointPixel;
		sumPointSquare += pointPixel * pointPixel;
		sumPointTemplate += pointPixel * templatePixel;
	      }
	      
	      // Normalized cross-correlation
	      // !important divide first avoid overflow (e.g. sumPoint / count * sumPoint)
	      float count = float(${templateSize} * ${templateSize});
	      float pointVariance = sqrt(sumPointSquare - sumPoint / count * sumPoint);
	      float templateVariance = sqrt(sumTemplateSquare - sumTemplate / count * sumTemplate);

	      if (pointVariance < 0.0000001 || templateVariance < 0.0000001) {
		setOutput(-1.);
	      } else {
		sumPointTemplate -= sumPoint / count * sumTemplate;
		float sim = sumPointTemplate / pointVariance / templateVariance;  
		setOutput(sim);
	      }
	    }
	  }
	`
      };
      this.kernelCaches.computeSimilarity = kernel;
    }

    return tf.tidy(() => {
      const program = this.kernelCaches.computeSimilarity;
      const sims = tf.backend().compileAndRun(program, [searchPointsT, targetImage, templates]);

      const maxIndex = sims.argMax(1);
      const sim = sims.max(1);
      const searchY = maxIndex.floorDiv(searchSize).sub(searchOneSize);
      const searchX = maxIndex.mod(searchSize).sub(searchOneSize);
      const [sx, sy] = searchPointsT.split([1,1], 1);
      const x = sx.squeeze(1).add(searchX);
      const y = sy.squeeze(1).add(searchY);

      const result = tf.stack([x,y,sim], 1);
      return result;
    });
  }

  _buildTemplates(imagePixelsT, searchPointsT, imagePropertiesT, modelViewProjectionTransformT) {
    const templateOneSize = AR2_DEFAULT_TS;
    const templateSize = templateOneSize * 2 + 1;

    if (!this.kernelCaches.buildTemplates) {
      const kernel = {
	variableNames: ['search', 'pixels', 'properties', 'M'],
	outputShape: [searchPointsT.shape[0], templateSize*templateSize],
	userCode: `
	  void main() {
	    ivec2 coords = getOutputCoords();

	    float m00 = getM(0, 0) * ${PRECISION_ADJUST}.;
	    float m01 = getM(0, 1) * ${PRECISION_ADJUST}.;
	    float m03 = getM(0, 3) * ${PRECISION_ADJUST}.;
	    float m10 = getM(1, 0) * ${PRECISION_ADJUST}.;
	    float m11 = getM(1, 1) * ${PRECISION_ADJUST}.;
	    float m13 = getM(1, 3) * ${PRECISION_ADJUST}.;
	    float m20 = getM(2, 0) * ${PRECISION_ADJUST}.;
	    float m21 = getM(2, 1) * ${PRECISION_ADJUST}.;
	    float m23 = getM(2, 3) * ${PRECISION_ADJUST}.;

	    int featureIndex = coords[0];
	    int templateIndex = coords[1];

	    float imageWidth = getProperties(0);
	    float imageHeight = getProperties(1);
	    float imageScale = getProperties(2);

	    float sx = getSearch(featureIndex, 0);
	    float sy = getSearch(featureIndex, 1);

	    int templateX = imod(templateIndex, ${templateSize});
	    int templateY = templateIndex / ${templateSize};

	    float sx2 = sx + float(templateX) - ${templateOneSize}.;
	    float sy2 = sy + float(templateY) - ${templateOneSize}.;

	    // compute screenToMarker coordinate
	    float c11 = m20 * sx2 - m00;
	    float c12 = m21 * sx2 - m01;
	    float c21 = m20 * sy2 - m10;
	    float c22 = m21 * sy2 - m11;
	    float b1 = m03 - m23 * sx2;
	    float b2 = m13 - m23 * sy2;

	    float m = c11 * c22 - c12 * c21;

	    float mx2 = (c22 * b1 - c12 * b2) / m;
	    float my2 = (c11 * b2 - c21 * b1) / m;

	    float ix = floor(mx2 * imageScale + 0.5);
	    float iy = floor(imageHeight - my2 * imageScale + 0.5);

	    if (ix < 0. || ix >= imageWidth || iy < 0. || iy >= imageHeight) {
	      setOutput(0.);
	    } else {
	      int index = int(iy * imageWidth + ix);
	      setOutput(getPixels(index));
	    }
	  }
	`
      };
      this.kernelCaches.buildTemplates = kernel;
    }

    return tf.tidy(() => {
      const program = this.kernelCaches.buildTemplates;
      const templates = tf.backend().compileAndRun(program, [searchPointsT, imagePixelsT, imagePropertiesT, modelViewProjectionTransformT]);

      return templates;
    });
  }

  _computeSearchPoints(featurePoints, modelViewProjectionTransformT) {
    if (!this.kernelCaches.computeSearchPoints) {
      const kernel = outputShape => ({
	variableNames: ['f', 'M'],
	outputShape: outputShape,
	userCode: `
	  void main() {
	      ivec2 coords = getOutputCoords();

	      float m00 = getM(0, 0) * ${PRECISION_ADJUST}.;
	      float m01 = getM(0, 1) * ${PRECISION_ADJUST}.;
	      float m03 = getM(0, 3) * ${PRECISION_ADJUST}.;
	      float m10 = getM(1, 0) * ${PRECISION_ADJUST}.;
	      float m11 = getM(1, 1) * ${PRECISION_ADJUST}.;
	      float m13 = getM(1, 3) * ${PRECISION_ADJUST}.;
	      float m20 = getM(2, 0) * ${PRECISION_ADJUST}.;
	      float m21 = getM(2, 1) * ${PRECISION_ADJUST}.;
	      float m23 = getM(2, 3) * ${PRECISION_ADJUST}.;

	      float x = getF(coords.x, 0);
	      float y = getF(coords.x, 1);
	      float uz = (x * m20) + (y * m21) + m23;
	      float oneOverUz = 1. / uz;

	      if (coords.y == 0) {
		  float ux = (x * m00) + (y * m01) + m03;
		  setOutput(floor(ux * oneOverUz + 0.5));
	      }
	      if (coords.y == 1) {
		  float uy = (x * m10) + (y * m11) + m13;
		  setOutput(floor(uy * oneOverUz + 0.5));
	      }
	    }
	`
      });
      const program = kernel([featurePoints.shape[0], 2]);
      this.kernelCaches.computeSearchPoints = program;
    }

    return tf.tidy(() => {
      const program = this.kernelCaches.computeSearchPoints;
      const result = tf.backend().compileAndRun(program, [featurePoints, modelViewProjectionTransformT]);
      return result;
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

  _prebuild(featureSets, imageList) {
    return tf.tidy(() => {
      const imagePixelsList = [];
      const imagePropertiesList = [];
      for (let i = 0; i < imageList.length; i++) {
	imagePixelsList.push(tf.tensor(imageList[i].data, [imageList[i].width * imageList[i].height]));
	imagePropertiesList.push(tf.tensor([imageList[i].width, imageList[i].height, imageList[i].scale], [3]));
      }

      const featureList = [];
      let maxCount = 0;
      for (let j = 0; j < featureSets.length; j++) {
        maxCount = Math.max(maxCount, featureSets[j].coords.length);
      }
      for (let j = 0; j < featureSets.length; j++) {
	let p = [];
        for (let k = 0; k < maxCount; k++) {
          if (k < featureSets[j].coords.length) {
	    p.push([featureSets[j].coords[k].mx, featureSets[j].coords[k].my]);
          } else {
	    p.push([-1, -1]);
          }
        }
	featureList.push(tf.tensor(p, [p.length, 2]));
      }

      return {
	featureList,
	imagePixelsList,
	imagePropertiesList
      };
    });
  }

  _loadInput(input) {
    return tf.tidy(() => {
      let inputImage = tf.browser.fromPixels(input);
      inputImage = inputImage.mean(2); //.expandDims(2).expandDims(0);
      return inputImage;
    });
  }

  // get best keyframeIndex
  //  find projected location on screen for position (0, 0), (10, 0) and (0, 10) and see the projected distance.
  //  expected marker ratio would be  distance / 10
  _computeExpectedKeyframe(modelViewProjectionTransform, targetIndex) {
    const u = computeScreenCoordiate(modelViewProjectionTransform, 10, 10, 0);
    const u1 = computeScreenCoordiate(modelViewProjectionTransform, 10+10, 10, 0);
    const u2 = computeScreenCoordiate(modelViewProjectionTransform, 10, 10+10, 0);
    if (u && u1 && u2) {
      const d1 = (u1.x - u.x) * (u1.x - u.x) + (u1.y - u.y) * (u1.y - u.y);
      const d2 = (u2.x - u.x) * (u2.x - u.x) + (u2.y - u.y) * (u2.y - u.y);
      const minD = Math.sqrt(Math.min(d1, d2));
      const targetScale = minD / 10.0; // screen to marker ratio
      const imageList = this.imageListList[targetIndex];

      let keyframeIndex = 0;
      for (let i = 1; i < imageList.length; i++) {
	const rd1 = Math.abs(targetScale - imageList[keyframeIndex].scale);
	const rd2 = Math.abs(targetScale - imageList[i].scale);
	if (rd2 < rd1) keyframeIndex = i;
      }
      return keyframeIndex;
    }
    return 0;
  }

}

module.exports = {
  Tracker
};
