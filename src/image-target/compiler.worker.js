import { extractTrackingFeatures } from './tracker/extract-utils.js';
import { buildTrackingImageList } from './image-list.js';

onmessage = (msg) => {
  const { data } = msg;
  if (data.type === 'compile') {
    //console.log("worker compile...");
    const { targetImages } = data;
    const percentPerImage = 100.0 / targetImages.length;
    let percent = 0.0;
    const list = [];
    for (let i = 0; i < targetImages.length; i++) {
      const targetImage = targetImages[i];
      const imageList = buildTrackingImageList(targetImage);
      const percentPerAction = percentPerImage / imageList.length;

      //console.log("compiling tracking...", i);
      const trackingData = extractTrackingFeatures(imageList, (index) => {
        //console.log("done tracking", i, index);
        percent += percentPerAction
        postMessage({ type: 'progress', percent });
      });
      list.push(trackingData);
    }
    postMessage({
      type: 'compileDone',
      list,
    });
  }
};
