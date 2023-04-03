import { Detector } from './detector/detector.js';
import { buildImageList, buildTrackingImageList } from './image-list.js';
import { build as hierarchicalClusteringBuild } from './matching/hierarchical-clustering.js';
import * as msgpack from '@msgpack/msgpack';
import * as tf from '@tensorflow/tfjs';

// TODO: better compression method. now grey image saved in pixels, which could be larger than original image

const CURRENT_VERSION = 2;

class CompilerBase {
  constructor() {
    this.data = null;
  }

  // input html Images
  compileImageTargets(images, progressCallback) {
    return new Promise(async (resolve, reject) => {
      const targetImages = [];
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const processCanvas = this.createProcessCanvas(img);
        const processContext = processCanvas.getContext('2d');
        processContext.drawImage(img, 0, 0, img.width, img.height);
        const processData = processContext.getImageData(0, 0, img.width, img.height);

        const greyImageData = new Uint8Array(img.width * img.height);

        for (let i = 0; i < greyImageData.length; i++) {
          const offset = i * 4;
          greyImageData[i] = Math.floor((processData.data[offset] + processData.data[offset + 1] + processData.data[offset + 2]) / 3);
        }
        const targetImage = { data: greyImageData, height: img.height, width: img.width };
        targetImages.push(targetImage);
      }

      // compute matching data: 50% progress
      const percentPerImage = 50.0 / targetImages.length;
      let percent = 0.0;
      this.data = [];
      for (let i = 0; i < targetImages.length; i++) {
        const targetImage = targetImages[i];
        const imageList = buildImageList(targetImage);
        const percentPerAction = percentPerImage / imageList.length;
        const matchingData = await _extractMatchingFeatures(imageList, () => {
          percent += percentPerAction;
          progressCallback(percent);
        });
        this.data.push({
          targetImage: targetImage,
          imageList: imageList,
          matchingData: matchingData
        });
      }

      for (let i = 0; i < targetImages.length; i++) {
        const trackingImageList = buildTrackingImageList(targetImages[i]);
        this.data[i].trackingImageList = trackingImageList;
      }

      const trackingDataList = await this.compileTrack({progressCallback, targetImages, basePercent: 50});

      for (let i = 0; i < targetImages.length; i++) {
        this.data[i].trackingData = trackingDataList[i];
      }
      resolve(this.data);
    });
  }

  // not exporting imageList because too large. rebuild this using targetImage
  exportData() {
    const dataList = [];
    for (let i = 0; i < this.data.length; i++) {
      dataList.push({
        //targetImage: this.data[i].targetImage,
        targetImage: {
          width: this.data[i].targetImage.width,
          height: this.data[i].targetImage.height,
        },
        trackingData: this.data[i].trackingData,
        matchingData: this.data[i].matchingData
      });
    }
    const buffer = msgpack.encode({
      v: CURRENT_VERSION,
      dataList
    });
    return buffer;
  }

  importData(buffer) {
    const content = msgpack.decode(new Uint8Array(buffer));
    //console.log("import", content);

    if (!content.v || content.v !== CURRENT_VERSION) {
      console.error("Your compiled .mind might be outdated. Please recompile");
      return [];
    }
    const { dataList } = content;
    this.data = [];
    for (let i = 0; i < dataList.length; i++) {
      this.data.push({
        targetImage: dataList[i].targetImage,
        trackingData: dataList[i].trackingData,
        matchingData: dataList[i].matchingData
      });
    }
    return this.data;
  }

  createProcessCanvas(img) {
    // sub-class implements
    console.warn("missing createProcessCanvas implementation");
  }

  compileTrack({progressCallback, targetImages, basePercent}) {
    // sub-class implements
    console.warn("missing compileTrack implementation");
  }
}

const _extractMatchingFeatures = async (imageList, doneCallback) => {
  const keyframes = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    // TODO: can improve performance greatly if reuse the same detector. just need to handle resizing the kernel outputs
    const detector = new Detector(image.width, image.height);

    await tf.nextFrame();
    tf.tidy(() => {
      //const inputT = tf.tensor(image.data, [image.data.length]).reshape([image.height, image.width]);
      const inputT = tf.tensor(image.data, [image.data.length], 'float32').reshape([image.height, image.width]);
      //const ps = detector.detectImageData(image.data);
      const { featurePoints: ps } = detector.detect(inputT);

      const maximaPoints = ps.filter((p) => p.maxima);
      const minimaPoints = ps.filter((p) => !p.maxima);
      const maximaPointsCluster = hierarchicalClusteringBuild({ points: maximaPoints });
      const minimaPointsCluster = hierarchicalClusteringBuild({ points: minimaPoints });

      keyframes.push({
        maximaPoints,
        minimaPoints,
        maximaPointsCluster,
        minimaPointsCluster,
        width: image.width,
        height: image.height,
        scale: image.scale
      });
      doneCallback(i);
    });
  }
  return keyframes;
}

export {
  CompilerBase
}
