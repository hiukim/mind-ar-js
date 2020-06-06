const {applyModelViewProjectionTransform, buildModelViewProjectionTransform, computeScreenCoordiate} = require('../icp/utils.js');

const AR2_DEFAULT_SEARCH_FEATURE_NUM = 10;
// const AR2_TRACKING_CANDIDATE_MAX = 200;  artoolkit overflow error. but better dont

const createTracker = ({targetImage, featureSets, projectionTransform, debugContent}) => {
  const tracker = {
    projectionTransform: projectionTransform,
    featureSets: featureSets,

    track: ({modelViewTransform}) => {

      const modelViewProjectionTransform = buildModelViewProjectionTransform(tracker.projectionTransform, modelViewTransform);

      const candidates1 = [];
      const candidates2 = [];
      let debugFeatureIndex = 0;
      for (let j = 0; j < featureSets.length; j++) {
        const maxdpi = featureSets[j].maxdpi;
        const mindpi = featureSets[j].mindpi;
        for (let k = 0; k < featureSets[j].coords.length; k++) {
          const {mx, my} = featureSets[j].coords[k];
          const u = computeScreenCoordiate(modelViewProjectionTransform, mx, my, 1);
          if (u === null) continue;
          const {x: sx, y: sy} = u;

          const vdir = [];
          vdir[0] = modelViewTransform[0][0] * mx
                  + modelViewTransform[0][1] * my
                  + modelViewTransform[0][3];
          vdir[1] = modelViewTransform[1][0] * mx
                  + modelViewTransform[1][1] * my
                  + modelViewTransform[1][3];
          vdir[2] = modelViewTransform[2][0] * mx
                  + modelViewTransform[2][1] * my
                  + modelViewTransform[2][3];
          const vlen = Math.sqrt(vdir[0]*vdir[0] + vdir[1]*vdir[1] + vdir[2]*vdir[2]);
          vdir[0] /= vlen;
          vdir[1] /= vlen;
          vdir[2] /= vlen;
          const vdirValue = vdir[0]*modelViewTransform[0][2] + vdir[1]*modelViewTransform[1][2] + vdir[2]*modelViewProjectionTransform[2][2];

          console.log("compare: ", {j, k, sx, sy, mx, my, maxdpi, mindpi, vdir, vdirValue}, debugContent.trackFeatures[debugFeatureIndex++]);
          if (vdirValue > -0.1) continue;

          if (sx < 0 || sx >= targetImage.width) continue;
          if (sy < 0 || sy >= targetImage.height) continue;

          const u1 = computeScreenCoordiate(modelViewProjectionTransform, mx+10, my, 1);
          const u2 = computeScreenCoordiate(modelViewProjectionTransform, mx, my+10, 1);
          const d1 = (u1.x - u.x) * (u1.x - u.x) + (u1.y - u.y) * (u1.y - u.y);
          const d2 = (u2.x - u.x) * (u2.x - u.x) + (u2.y - u.y) * (u2.y - u.y);
          const dpi = [];
          if (d1 < d2) {
            dpi[0] = Math.sqrt(d2) * 2.54;
            dpi[1] = Math.sqrt(d1) * 2.54;
          } else {
            dpi[0] = Math.sqrt(d1) * 2.54;
            dpi[1] = Math.sqrt(d2) * 2.54;
          }
          console.log("dpi", dpi);

          let candidates = null;
          if (dpi[1] <= maxdpi && dpi[1] >= mindpi) {
            candidates = candidates1;
          } else if(dpi[1] <= maxdpi * 2 && dpi[1] >= mindpi / 2) {
            candidates = candidates2;
          }
          if (candidates !== null) {
            candidates.push({level: j, num: k, sx: sx, sy: sy})
          }
        }
      }

      console.log("candates1: ", candidates1.length, debugContent.candidates1.length);
      for (let i = 0; i < candidates1.length; i++) {
        console.log("compare", candidates1[i], 'vs', debugContent.candidates1[i]);
      }
      console.log("candates2: ", candidates2.length, debugContent.candidates2.length);
      for (let i = 0; i < candidates2.length; i++) {
        console.log("compare", candidates2[i], 'vs', debugContent.candidates2[i]);
      }

      let i = 0;
      //while (i < AR2_DEFAULT_SEARCH_FEATURE_NUM) {
      //}
    }
  }
  return tracker;
};

module.exports = {
  createTracker
}
