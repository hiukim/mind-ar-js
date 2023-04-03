import { extract } from './extract.js';

export const extractTrackingFeatures = (imageList, doneCallback) => {
  const featureSets = [];
  for (let i = 0; i < imageList.length; i++) {
    const image = imageList[i];
    const points = extract(image);

    const featureSet = {
      data: image.data,
      scale: image.scale,
      width: image.width,
      height: image.height,
      points,
    };
    featureSets.push(featureSet);

    doneCallback(i);
  }
  return featureSets;
}
