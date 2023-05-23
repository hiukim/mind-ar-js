import {CompilerBase} from '../../../src/image-target/compiler-base.js'
import { buildTrackingImageList } from '../../../src/image-target/image-list.js';
import { extractTrackingFeatures } from '../../../src/image-target/tracker/extract-utils.js';
import { createCanvas } from 'canvas'
import '../../../src/image-target/detector/kernels/cpu/index.js'

export class OfflineCompiler extends CompilerBase {
  createProcessCanvas(img) {
    const processCanvas = createCanvas(img.width, img.height);
    return processCanvas;
  }

  compileTrack({progressCallback, targetImages, basePercent}) {
    return new Promise((resolve, reject) => {
      const percentPerImage = (100-basePercent) / targetImages.length;
      let percent = 0;
      const list = [];
      for (let i = 0; i < targetImages.length; i++) {
        const targetImage = targetImages[i];
        const imageList = buildTrackingImageList(targetImage);
        const percentPerAction = percentPerImage / imageList.length;

        //console.log("compiling tracking...", i);
        const trackingData = extractTrackingFeatures(imageList, (index) => {
          //console.log("done tracking", i, index);
          percent += percentPerAction;
          progressCallback(basePercent+percent);
        });
        list.push(trackingData);
      }
      resolve(list);
    });
  }
}
