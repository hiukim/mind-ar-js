// Deprecated CPU version - only keep for reference

const {screenToMarkerCoordinate, applyModelViewProjectionTransform, buildModelViewProjectionTransform, computeScreenCoordiate} = require('../icp/utils.js');
const {refineHomography} = require('../icp/refine_homography.js');

const AR2_TRACKING_CANDIDATE_MAX = 200

const AR2_DEFAULT_SEARCH_FEATURE_NUM = 16;
//const AR2_TEMP_SCALE = 2;
const AR2_TEMP_SCALE = 1;
const AR2_DEFAULT_TS = 6;
const AR2_DEFAULT_TRACKING_SD_THRESH = 5.0;
const AR2_SIM_THRESH = 0.5;
//const AR2_SIM_THRESH = 0.2; // 0.5 is default. 0.2 for debug
const AR2_TRACKING_THRESH = 5.0;
//const AR2_TRACKING_THRESH = 0.2;// 5 is the default. 0.2 for debug
const AR2_SEARCH_SIZE = 6;

//const SKIP_INTERVAL = 3; //default
const SKIP_INTERVAL = 0;
const KEEP_NUM = 3;

const track = ({projectionTransform, featureSets, imageList, prevResults, targetImage, randomizer}) => {
  const prevModelViewProjectionTransforms = [];
  for (let i = 0;  i < prevResults.length; i++) {
    const t = buildModelViewProjectionTransform(projectionTransform, prevResults[i].modelViewTransform);
    prevModelViewProjectionTransforms.push(t);
  }

  const modelViewTransform = prevResults[prevResults.length-1].modelViewTransform;
  const modelViewProjectionTransform = prevModelViewProjectionTransforms[prevModelViewProjectionTransforms.length-1];

  if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
    window.debug.trackFeatureIndex = -1;
    window.debug.trackingSubIndex = -1;
    window.debug.templateComputeIndex = -1;
  }

  const candidates1 = [];
  const candidates2 = [];
  let candidateIndex = -1;
  for (let j = 0; j < featureSets.length; j++) {
    const maxdpi = featureSets[j].maxdpi;
    const mindpi = featureSets[j].mindpi;
    for (let k = 0; k < featureSets[j].coords.length; k++) {
      candidateIndex += 1;
      const {mx, my} = featureSets[j].coords[k];
      const u = computeScreenCoordiate(modelViewProjectionTransform, mx, my, 0);
      if (u === null) continue;

      if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
        window.debug.trackFeatureIndex += 1;
      }

      const {x: sx, y: sy} = u;

      if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
        const f1 = {mx, my, sx, sy, maxdpi, mindpi};
        const f2 = window.debugMatch.trackFeatures[window.debug.trackFeatureIndex];
        if (!window.cmpObj(f1, f2, ['mx', 'my', 'sx', 'sy', 'maxdpi', 'mindpi'])) {
          console.log('INCORRECT track feature', j, k, f1, f2);
        }
      }

      if (sx < 0 || sx >= targetImage.width) continue;
      if (sy < 0 || sy >= targetImage.height) continue;

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
      //const vdirValue = vdir[0]*modelViewTransform[0][2] + vdir[1]*modelViewTransform[1][2] + vdir[2]*modelViewProjectionTransform[2][2];
      const vdirValue = vdir[0]*modelViewTransform[0][2] + vdir[1]*modelViewTransform[1][2] + vdir[2]*modelViewTransform[2][2];

      if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
        const v1 = [vdir[0], vdir[1], vdir[2], vdirValue];
        const v2 = window.debugMatch.trackFeatures[window.debug.trackFeatureIndex].vdir;
        if (!window.cmpArray(v1, v2)) {
          console.log('INCORRECT track feature vdir', j, k, v1, v2);
        }
      }

      if (vdirValue > -0.1) continue;

      // get resolution
      const u1 = computeScreenCoordiate(modelViewProjectionTransform, mx+10, my, 0);
      const u2 = computeScreenCoordiate(modelViewProjectionTransform, mx, my+10, 0);
      const d1 = (u1.x - u.x) * (u1.x - u.x) + (u1.y - u.y) * (u1.y - u.y);
      const d2 = (u2.x - u.x) * (u2.x - u.x) + (u2.y - u.y) * (u2.y - u.y);
      // 10 pixel in marker -> d mm in screen (screen scale in mm)
      // d mm -> d/25.4 inch
      // dpi = 25.4d / 10 = 2.54d
      const dpi = [];
      if (d1 < d2) {
        //dpi[0] = Math.sqrt(d2) * 2.54; // because mx+10, moved 10. so do 25.4 / 10 = 2.54?
        //dpi[1] = Math.sqrt(d1) * 2.54;
        dpi[0] = Math.sqrt(d2) / 10;
        dpi[1] = Math.sqrt(d1) / 10;
      } else {
        //dpi[0] = Math.sqrt(d1) * 2.54;
        //dpi[1] = Math.sqrt(d2) * 2.54;
        dpi[0] = Math.sqrt(d1) / 10;
        dpi[1] = Math.sqrt(d2) / 10;
      }

      if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
        const v1 = [dpi[0], dpi[1]];
        const v2 = window.debugMatch.trackFeatures[window.debug.trackFeatureIndex].w;
        if (!window.cmpArray(v1, v2)) {
          console.log('INCORRECT track feature dpi', j, k, v1, v2);
        }
      }

      let candidates = null;
      if (dpi[1] <= maxdpi && dpi[1] >= mindpi) {
        candidates = candidates1;
      } else if (dpi[1] <= maxdpi * 2 && dpi[1] >= mindpi / 2) {
        if (candidates2.length === AR2_TRACKING_CANDIDATE_MAX) continue;

        candidates = candidates2;
      }
      if (candidates !== null) {
        candidates.push({candidateIndex, level: j, num: k, sx: sx, sy: sy, mx, my, flag: false})
      }
    }
  }
  //console.log('candidates 1', candidates1);
  //console.log('candidates 2', candidates2);

  if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
    console.log("candidates1: ", candidates1.length, window.debugMatch.candidates1.length);
    for (let i = 0; i < candidates1.length; i++) {
      if (!window.cmpObj(candidates1[i], window.debugMatch.candidates1[i], ['level', 'num', 'sx', 'sy'])) {
        console.log("INCORRECT candidate 1", candidates1[i], 'vs', window.debugMatch.candidates1[i]);
      }
    }
    console.log("candidates2: ", candidates2.length, window.debugMatch.candidates2.length);
    for (let i = 0; i < candidates2.length; i++) {
      if (!window.cmpObj(candidates2[i], window.debugMatch.candidates2[i], ['level', 'num', 'sx', 'sy'])) {
        console.log("INCORRECT candidate 2", candidates2[i], 'vs', window.debugMatch.candidates2[i]);
      }
    }
  }

  let i = 0;
  let num = 0;
  let pos = [null, null, null, null];
  let candidates = candidates1;
  let fromCandidates1 = true;
  const selectedFeatures = [];
  const prevSelectedFeatures = prevResults[prevResults.length-1].selectedFeatures;

  while (i < AR2_DEFAULT_SEARCH_FEATURE_NUM) {
    let k = _selectTemplate({pos, prevSelectedFeatures, candidates, num, xsize: targetImage.width, ysize: targetImage.height, randomizer: randomizer});

    //console.log("selected: ", num, k, candidates[k]);

    if (k < 0 && fromCandidates1) {
      fromCandidates1 = false;
      candidates = candidates2;
      continue;
    }

    if (k < 0) break;

    candidates[k].flag = true;
    i++;

    pos[num] = [candidates[k].sx, candidates[k].sy];
    //console.log("select num", num, fromCandidates1, candidates[k]);

    const result = _tracking2dSub({targetImage, imageList, modelViewTransform, modelViewProjectionTransform, candidate: candidates[k], prevModelViewProjectionTransforms});
    //console.log("_tracking2dSub result", result);

    if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
      const t2 = window.debugMatch.tracking2dSub[window.debug.trackingSubIndex];
      console.log("best match", result, t2.bestMatched);
      if (result === null) {
        if (t2.length > 0) {
          console.log("INCORRECT best match", result, t2.bestMatched);
        }
      } else {
        if (t2.bestMatched.length === 0) {
          console.log("INCORRECT best match", result, t2.bestMatched);
        } else {
          if (result.pos2D.x !== t2.bestMatched[0].pos2d[0] || result.pos2D.y !== t2.bestMatched[0].pos2d[1]) {
            console.log("INCORRECT best match pos2D", result, t2.bestMatched);
          }
          if (!window.cmp(result.pos3D.x, t2.bestMatched[0].pos3d[0]) || !window.cmp(result.pos3D.y, t2.bestMatched[0].pos3d[1])) {
            console.log("INCORRECT best match pos3D", result, t2.bestMatched);
          }
        }
      }
    }

    if (result === null) continue;
    if (result.sim <= AR2_SIM_THRESH) continue;

    selectedFeatures.push(Object.assign({candidateIndex: candidates[k].candidateIndex, level: candidates[k].level, num: candidates[k].num}, result));

    num += 1;
    //if (num === 5) num = 0;
  }

  if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
    console.log("selected features", selectedFeatures.length, window.debugMatch.selectedFeatures.length);
    for (let i = 0; i < selectedFeatures.length; i++) {
      const f1 = selectedFeatures[i];
      const f2 = window.debugMatch.selectedFeatures[i];
      if (f1.pos2D.x !== f2.pos2D[0] || f1.pos2D.y !== f2.pos2D[1]) {
        console.log("INCORRECT selected feature pos2D", i, f1, f2);
      }
      if (!window.cmp(f1.pos3D.x, f2.pos3D[0]) || !window.cmp(f1.pos3D.y, f2.pos3D[1])) {
        console.log("INCORRECT selected feature pos3D", i, f1, f2);
      }
    }
  }

  if (selectedFeatures.length < 4) {
    return null;
    //return {modelViewTransform, selectedFeatures};
  }
  //console.log('selected features', selectedFeatures);

  const inlierProbs = [1.0, 0.8, 0.6, 0.4, 0.0];
  let err = null;
  let newModelViewTransform = modelViewTransform;
  let finalModelViewTransform = null;
  for (let i = 0; i < inlierProbs.length; i++) {
    if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
      window.debug.icprobustIndex = i-1;
    }
    let ret = _computeUpdatedTran({modelViewTransform: newModelViewTransform, selectedFeatures, projectionTransform, inlierProb: inlierProbs[i]});
    err = ret.err;
    newModelViewTransform = ret.newModelViewTransform;

    if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
      console.log("tracker icp point", i, newModelViewTransform, err);
      const dErr = window.debugMatch['getTransMat'+(i+1)+'Err'];
      const dMat = window.debugMatch['getTransMat'+(i+1)];
      if (!window.cmp(err, dErr)) {
        console.log("INCORRECT icp err", i, err, dErr);
      }
      if (!window.cmp2DArray(newModelViewTransform, dMat)) {
        console.log("INCORRECT icp mat", i, newModelViewTransform, dMat);
      }
    }

    if (err < AR2_TRACKING_THRESH) {
      finalModelViewTransform = newModelViewTransform;
      break;
    }
  }

  if (finalModelViewTransform === null) return null;

  return {
    modelViewTransform: finalModelViewTransform,
    selectedFeatures
  }
};

const _computeUpdatedTran = ({modelViewTransform, projectionTransform, selectedFeatures, inlierProb}) => {
  let dx = 0;
  let dy = 0;
  let dz = 0;
  for (let i = 0; i < selectedFeatures.length; i++) {
    dx += selectedFeatures[i].pos3D.x;
    dy += selectedFeatures[i].pos3D.y;
    dz += selectedFeatures[i].pos3D.z;
  }
  dx /= selectedFeatures.length;
  dy /= selectedFeatures.length;
  dz /= selectedFeatures.length;

  const worldCoords = [];
  const screenCoords = [];
  for (let i = 0; i < selectedFeatures.length; i++) {
    screenCoords.push({x: selectedFeatures[i].pos2D.x, y: selectedFeatures[i].pos2D.y});
    worldCoords.push({x: selectedFeatures[i].pos3D.x - dx, y: selectedFeatures[i].pos3D.y - dy, z: selectedFeatures[i].pos3D.z - dz});
  }

  const diffModelViewTransform = [[],[],[]];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      diffModelViewTransform[j][i] = modelViewTransform[j][i];
    }
  }
  diffModelViewTransform[0][3] = modelViewTransform[0][0] * dx + modelViewTransform[0][1] * dy + modelViewTransform[0][2] * dz + modelViewTransform[0][3];
  diffModelViewTransform[1][3] = modelViewTransform[1][0] * dx + modelViewTransform[1][1] * dy + modelViewTransform[1][2] * dz + modelViewTransform[1][3];
  diffModelViewTransform[2][3] = modelViewTransform[2][0] * dx + modelViewTransform[2][1] * dy + modelViewTransform[2][2] * dz + modelViewTransform[2][3];

  let ret;
  if (inlierProb < 1) {
     ret = refineHomography({initialModelViewTransform: diffModelViewTransform, projectionTransform, worldCoords, screenCoords, isRobustMode: true, inlierProb});
  } else {
     ret = refineHomography({initialModelViewTransform: diffModelViewTransform, projectionTransform, worldCoords, screenCoords, isRobustMode: false});
  }

  const newModelViewTransform = [[],[],[]];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      newModelViewTransform[j][i] = ret.modelViewTransform[j][i];
    }
  }
  newModelViewTransform[0][3] = ret.modelViewTransform[0][3] - ret.modelViewTransform[0][0] * dx - ret.modelViewTransform[0][1] * dy - ret.modelViewTransform[0][2] * dz;
  newModelViewTransform[1][3] = ret.modelViewTransform[1][3] - ret.modelViewTransform[1][0] * dx - ret.modelViewTransform[1][1] * dy - ret.modelViewTransform[1][2] * dz;
  newModelViewTransform[2][3] = ret.modelViewTransform[2][3] - ret.modelViewTransform[2][0] * dx - ret.modelViewTransform[2][1] * dy - ret.modelViewTransform[2][2] * dz;


  return {err: ret.err, newModelViewTransform};
};

const _tracking2dSub = ({targetImage, imageList, modelViewTransform, modelViewProjectionTransform, candidate, prevModelViewProjectionTransforms}) => {
  if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
    window.debug.trackingSubIndex += 1;
    window.debug.trackingMatchingSumIndex = -1;
    window.debug.skipMatchingSum = false;
  }
  if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
    const t1 = {level: candidate.level, num: candidate.num, candidate};
    const t2 = window.debugMatch.tracking2dSub[window.debug.trackingSubIndex];
    //console.log("tracking2d", t1, t2);
    if (!window.cmp(t1.candidate.sx, t2.sx) || !window.cmp(t1.candidate.sy, t2.sy)) {
      console.log("INCORRECT tracking 2dsub candidate", t1.candidate, t2);
    }
  }

  const image = imageList[candidate.level];
  const xsize = targetImage.width;
  const ysize = targetImage.height;
  const dpi = image.dpi;
  const {mx, my} = candidate;
  const tsize = AR2_DEFAULT_TS * 2 + 1;
  const {template, validNum: templateValidNum, vlen: templateVlen, sum: templateSum} = _setTemplate({image, dpi, modelViewProjectionTransform, mx, my});

  if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
    const t2 = window.debugMatch.tracking2dSub[window.debug.trackingSubIndex];
    for (let i = 0; i < t2.template.length; i++) {
      if (t2.template[i] === 4096) t2.template[i] = null;
    }
    if (!window.cmpArray(template, t2.template)) {
      console.log("INCORRECT tracking2d template", template, t2.template);
    }
    if (!window.cmp(templateVlen, t2.vlen)) console.log("INCORRECT vlen", templateVlen, t2.vlen);
    if (!window.cmp(templateSum, t2.sum)) console.log("INCORRECT sum", templateSum, t2.sum);
    if (!window.cmp(templateValidNum, t2.validNum)) console.log("INCORRECT validNum", templateValidNum, t2.validNum);
  }

  if (templateVlen * templateVlen < tsize * tsize * AR2_DEFAULT_TRACKING_SD_THRESH * AR2_DEFAULT_TRACKING_SD_THRESH) return null;

  // search points
  const us = [];
  const search = [];
  for (let i = 0; i < prevModelViewProjectionTransforms.length; i++) {
    const u = computeScreenCoordiate(prevModelViewProjectionTransforms[i], mx, my, 0);
    us.push([u.x, u.y]);
  }
  for (let i = prevModelViewProjectionTransforms.length-1; i >= 0; i--) {
    if (i + 2 < prevModelViewProjectionTransforms.length) {
      const p1 = us[i+2];
      const p2 = us[i+1];
      const p = us[i];
      search.push([
        Math.floor(3 * p1[0] - 3 * p2[0] + p[0]),
        Math.floor(3 * p1[1] - 3 * p2[1] + p[1]),
      ]);
    } else if (i + 1 < prevModelViewProjectionTransforms.length) {
      const p1 = us[i+1];
      const p = us[i];
      search.push([
        Math.floor(2 * p1[0] - p[0]),
        Math.floor(2 * p1[1] - p[1]),
      ]);

    } else {
      const p = us[i];
      search.push([
        Math.floor(p[0]),
        Math.floor(p[1])
      ]);
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
    const t2 = window.debugMatch.tracking2dSub[window.debug.trackingSubIndex];
    console.log("search", mx, my, search, t2.search);
  }
 // console.log("search", JSON.stringify(search));

  // get best matching
  const mfImage = [];
  for (let j = 0; j < image.height; j++) {
    mfImage.push([]);
    for (let i = 0; i < image.width; i++) {
      mfImage[j].push(null);
    }
  }

  const rx = AR2_SEARCH_SIZE;
  const ry = AR2_SEARCH_SIZE;
  for (let n = 0; n < search.length; n++) {
     // "Snap" position to centre of grid square.
    const px = Math.floor(search[n][0]/(SKIP_INTERVAL + 1))*(SKIP_INTERVAL + 1) + (SKIP_INTERVAL + 1)/2;
    const py = Math.floor(search[n][1]/(SKIP_INTERVAL + 1))*(SKIP_INTERVAL + 1) + (SKIP_INTERVAL + 1)/2;

    let sx = px - rx; // Start position in x.
    if( sx < 0 ) sx = 0;
    let ex = px + rx; // End position in x.
    if( ex >= xsize ) ex = xsize - 1;

    let sy = py - ry; // Start position in y.
    if( sy < 0 ) sy = 0;
    let ey = py + ry; // End position in y.
    if( ey >= ysize ) ey = ysize - 1;

    // Initialise mfImage by writing 0s into the potential search space.
    for (let j = sy; j <= ey; j++ ) {
      for (let i = sx; i <= ex; i++ ) {
        mfImage[j * image.width + i] = 0;
      }
    }
  }

  const keepCandidates = [];
  for (let n = 0; n < search.length; n++) {
    //const px = Math.floor(search[n][0]/(SKIP_INTERVAL + 1))*(SKIP_INTERVAL + 1) + (SKIP_INTERVAL + 1)/2;
    //const py = Math.floor(search[n][1]/(SKIP_INTERVAL + 1))*(SKIP_INTERVAL + 1) + (SKIP_INTERVAL + 1)/2;
    const px = search[n][0];
    const py = search[n][1];

    // -6, -2, +2, +6 (search size=6, skip=3)
    for (let j = py - ry; j <= py + ry; j += SKIP_INTERVAL + 1) {
      if( j - AR2_DEFAULT_TS * AR2_TEMP_SCALE <  0     ) continue;
      if( j + AR2_DEFAULT_TS * AR2_TEMP_SCALE >= ysize ) break;

      for(let i = px - rx; i <= px + rx; i += SKIP_INTERVAL + 1 ) {
        if( i - AR2_DEFAULT_TS * AR2_TEMP_SCALE <  0     ) continue;
        if( i + AR2_DEFAULT_TS * AR2_TEMP_SCALE >= xsize ) break;

        if( mfImage[ j * xsize + i] === 1) continue; // Skip pixels already matched.
        mfImage[j * xsize + i] = 1; // Mark this pixel as matched.

        const wval = _computePointVal({i, j, tsize, xsize, targetImage, template, templateVlen, templateSum, templateValidNum});

        keepCandidates.push({
          x: i,
          y: j,
          wval: wval
        })
      }
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
    const t2 = window.debugMatch.tracking2dSub[window.debug.trackingSubIndex];
    console.log("keep candidates length", keepCandidates.length, t2.matchingCompute.length);
    for (let i = 0; i < keepCandidates.length; i++) {
      const c1 = keepCandidates[i];
      const c2 = t2.matchingCompute[i];
      if (!window.cmpObj(c1, {x: c2.i, y: c2.j, wval: c2.wval}, ['x', 'y'])) {
        console.log("INCORRECT keep candidate",i, c1, c2);
      }
    }
  }

  // Third pass. Determine best candidate.
  // TODO if keep only 3, can do faster if sort during insert
  //console.log("matching compute", keepCandidates, debugSub.matchingCompute);
  keepCandidates.sort((c1, c2) => {return c2.wval - c1.wval});
  keepCandidates.splice(KEEP_NUM);

  if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
    window.debug.skipMatchingSum = true;
  }

  // can remove SKIP_INTERVAL and combine this step and previous step? might be slower, but simpler
  let wval2 = -1;
  let bx = -1;
  let by = -1;
  for (let l = 0; l < keepCandidates.length; l++) {
    const cx = keepCandidates[l].x;
    const cy = keepCandidates[l].y;
    for(let j = cy - SKIP_INTERVAL; j <= cy + SKIP_INTERVAL; j++ ) {
      if( j - AR2_DEFAULT_TS * AR2_TEMP_SCALE <  0     ) continue;
      if( j + AR2_DEFAULT_TS * AR2_TEMP_SCALE >= ysize ) break;

      for(let i = cx - SKIP_INTERVAL; i <= cx + SKIP_INTERVAL; i++ ) {
        if( i - AR2_DEFAULT_TS * AR2_TEMP_SCALE <  0     ) continue;
        if( i + AR2_DEFAULT_TS * AR2_TEMP_SCALE >= xsize ) break;

        const wval = _computePointVal({i, j, tsize, xsize, targetImage, template, templateVlen, templateSum, templateValidNum});
        if (wval > wval2) {
          wval2 = wval;
          bx = i;
          by = j;
        }
      }
    }
  }

  if (wval2 === -1) return null;

  //console.log("selected matchingCandidates", keepCandidates, debugSub.matchingCandidates);
  //console.log("bestMatchingCompute", debugSub.bestMatchingCompute);
  //console.log("bestMatched", {mx, my, bx, by, bestVal, pos3D}, debugSub.bestMatched, debugSub.bestMatched[0].trans);

  return {
    pos2D: {x: bx, y: by},
    pos3D: {x: mx, y: my, z: 0},
    //sim: wval2/ 10000.0
    sim: wval2
  }
}

// compute covariance between template and region centered at i, j
const _computePointVal = ({i, j, tsize, xsize, targetImage, template, templateVlen, templateSum, templateValidNum}) => {
  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;
  for (let jj = -AR2_DEFAULT_TS; jj <= AR2_DEFAULT_TS; jj++) {
    for (let ii = -AR2_DEFAULT_TS; ii <= AR2_DEFAULT_TS; ii++) {
      const templateIndex = (jj + AR2_DEFAULT_TS) * tsize + (ii + AR2_DEFAULT_TS);

      const index = (j + jj * AR2_TEMP_SCALE) * xsize + (i + ii * AR2_TEMP_SCALE);
      if (template[templateIndex] !== null) {
        sum1 += targetImage.data[index];
        sum2 += targetImage.data[index] * targetImage.data[index];
        sum3 += targetImage.data[index] * template[templateIndex];

        if (typeof window !== 'undefined' && window.DEBUG_TRACK && !window.debug.skipMatchingSum) {
          window.debug.trackingMatchingSumIndex += 1;
          const t2 = window.debugMatch.tracking2dSub[window.debug.trackingSubIndex].matchingComputeSum[window.debug.trackingMatchingSumIndex];
          if (!t2 || sum1 !== t2.sum1 || sum2 !== t2.sum2 || sum3 !== t2.sum3) {
            console.log("INCORRECT matching sum", window.debug.trackingMatchingSumIndex, i, j, sum1, sum2, sum3, t2);
            return;
          }
        }

        //console.log("matchingComputeSum", {ii, jj, p2_x: (i + ii * AR2_TEMP_SCALE), p2_y: (j + jj * AR2_TEMP_SCALE), p2: targetImage.data[index], p1: template[templateIndex], sum1, sum2, sum3}, debugSub.matchingComputeSum[debugSumIndex++]);

        //console.log("sum", sum1, sum2, sum3, index, templateIndex, template[templateIndex], targetImage.data[index]);
      }
    }
  }

  if (typeof window !== 'undefined' && window.DEBUG_TRACK && !window.debug.skipMatchingSum) {
    const t2 = window.debugMatch.tracking2dSub[window.debug.trackingSubIndex].matchingComputeSum[window.debug.trackingMatchingSumIndex];
    //console.log("done", window.debug.trackingSubIndex, sum1, sum2, sum3, t2);
    //console.log("matching sum", t2);
  }

  sum3 -= sum1 * templateSum / templateValidNum;
  const vlen = sum2 - sum1 * sum1 / templateValidNum;
  let wval = 0;
  if (vlen !== 0) {
    //wval = sum3 * 100 / templateVlen * 100 / Math.floor(Math.sqrt(vlen));
    wval = sum3 / templateVlen / Math.sqrt(vlen);
    //wval = Math.floor(Math.floor(Math.floor(sum3) * 100 / Math.floor(templateVlen)) * 100 / Math.floor(Math.sqrt(vlen)));
    //console.log("wval", wval, templateVlen, vlen, templateValidNum);
  }

  if (typeof window !== 'undefined' && window.DEBUG_TRACK && !window.debug.skipMatchingSum) {
    //console.log("done", window.debug.trackingSubIndex, sum3, vlen, templateVlen, wval);
  }


  return wval;
}

const _setTemplate = ({image, dpi, modelViewProjectionTransform, mx, my}) => {
  const u = computeScreenCoordiate(modelViewProjectionTransform, mx, my, 0);
  const sx = Math.floor(u.x + 0.5);
  const sy = Math.floor(u.y + 0.5);

  //console.log("_setTemplate", modelViewProjectionTransform, mx, my, u, sx, sy, 'debugSub', debugSub.trans, debugSub.wtrans, debugSub.mx, debugSub.my, debugSub.sx, debugSub.sy, debugSub.ix, debugSub.iy);

  const tsize = AR2_DEFAULT_TS;

  const template = [];
  /*
  for (let j = 0; j <= tsize * 2; j++) {
    template.push([]);
    for (let i = 0; i <= tsize * 2; i++) {
      template[j].push(null);
    }
  }
  */
  if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
    window.debug.templateComputeIndex = -1;
  }

  let sum = 0.0;
  let sum2 = 0.0;
  let k = 0;
  for (let j = -tsize; j <= tsize; j++) {
    const sy2 = sy + j * AR2_TEMP_SCALE;
    for (let i = -tsize; i <= tsize; i++) {
      const sx2 = sx + i * AR2_TEMP_SCALE;

      const {x: mx2, y: my2} = screenToMarkerCoordinate(modelViewProjectionTransform, sx2, sy2);

      //let ix = Math.floor(mx2 * dpi / 25.4 + 0.5);
      let ix = Math.floor(mx2 * dpi + 0.5);
      if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
        // crazy hack for debugging....
        if (ix ===  163 &&  Math.abs(mx2-81.74991690104808)<0.000000001) ix = 164;
        //if (ix === -1 && mx2 === -1.0571840521437157) ix = 0;
      }

      //const iy = Math.floor(image.height - my2 * dpi / 25.4 + 0.5);
      const iy = Math.floor(image.height - my2 * dpi + 0.5);
      //console.log("ix iy", ix, iy, image.width, image.height, mx2, my2, dpi);
      if (ix < 0 || ix >= image.width) {
        template.push(null);
        continue;
      }
      if (iy < 0 || iy >= image.height) {
        template.push(null);
        continue;
      }

      const pixel = image.data[iy * image.width + ix];

      if (typeof window !== 'undefined' && window.DEBUG_TRACK) {
        window.debug.templateComputeIndex += 1;
        const d1 = {ix, iy, sx: sx2, sy: sy2, mx: mx2, my: my2, pixel};
        const d2 = window.debugMatch.tracking2dSub[window.debug.trackingSubIndex].templateCompute[window.debug.templateComputeIndex];
        if (!window.cmpObj(d1, d2, ['ix', 'iy', 'sx', 'sy', 'mx', 'my'])) {
          console.log("INCORRECT template compute", window.debug.templateComputeIndex, d1, d2);
        } else {
          if (d1.pixel !== d2.pixel) {
            console.log('mx2, my2', mx2, my2, dpi, mx2 * dpi / 25.4);
            console.log("INCORRECT template compute pixel", window.debug.templateComputeIndex, d1, d2);
          }
        }
      }

      //template[j+tsize][i+tsize] = pixel;
      template.push(pixel);
      sum += pixel;
      sum2 += pixel * pixel;
      k += 1;
    }
  }

  const vlen = Math.sqrt(sum2 - sum * sum / k);
  //console.log("vlen: ", vlen, "sum: ", sum, "sum2: ", sum2, "k: ", k);
  return {
    template,
    vlen,
    sum,
    validNum: k
  }
}

const _selectTemplate = ({pos, prevSelectedFeatures, candidates, num, xsize, ysize, randomizer}) => {
  if (num === 0) {
    let dmax = 0.0;
    let index = -1;
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].flag) continue;
      if (candidates[i].sx < xsize/8 || candidates[i].sx > xsize*7/8) continue;
      if (candidates[i].sy < ysize/8 || candidates[i].sy > ysize*7/8) continue;
      const d = (candidates[i].sx - xsize/2) * (candidates[i].sx - xsize/2)
              + (candidates[i].sy - ysize/2) * (candidates[i].sy - ysize/2);
      if (d > dmax) {
        dmax = d;
        index = i;
      }
    }
    //console.log("selectTemplate", num, dmax, index);
    return index;
  }
  else if (num === 1) {
    let dmax = 0.0;
    let index = -1;
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].flag) continue;
      if (candidates[i].sx < xsize/8 || candidates[i].sx > xsize*7/8) continue;
      if (candidates[i].sy < ysize/8 || candidates[i].sy > ysize*7/8) continue;

      const d = (candidates[i].sx - pos[0][0]) * (candidates[i].sx - pos[0][0])
              + (candidates[i].sy - pos[0][1]) * (candidates[i].sy - pos[0][1]);
      if (d > dmax) {
        dmax = d;
        index = i;
      }
    }
    //console.log("selectTemplate", num, dmax, index);
    return index;
  }
  else if (num === 2) {
    let dmax = 0.0;
    let index = -1;
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].flag) continue;
      if (candidates[i].sx < xsize/8 || candidates[i].sx > xsize*7/8) continue;
      if (candidates[i].sy < ysize/8 || candidates[i].sy > ysize*7/8) continue;

      let d = (candidates[i].sx - pos[0][0]) * (pos[1][1] - pos[0][1])
              - (candidates[i].sy - pos[0][1]) * (pos[1][0] - pos[0][0]);
      d = d * d;
      if (d > dmax) {
        dmax = d;
        index = i;
      }
    }
    //console.log("selectTemplate", num, dmax, index);
    return index;
  }
  else if (num === 3) {
    const {sin: p2sin, cos: p2cos} = _getVectorAngle(pos[0], pos[1]);
    const {sin: p3sin, cos: p3cos} = _getVectorAngle(pos[0], pos[2]);

    let smax = 0.0;
    let index = -1;

    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].flag) continue;
      if (candidates[i].sx < xsize/8 || candidates[i].sx > xsize*7/8) continue;
      if (candidates[i].sy < ysize/8 || candidates[i].sy > ysize*7/8) continue;

      const cPos = [candidates[i].sx, candidates[i].sy];
      const {sin: p4sin, cos: p4cos} = _getVectorAngle(pos[0], cPos);

      let q1, r1, r2;
      if(((p3sin*p2cos - p3cos*p2sin) >= 0.0) && ((p4sin*p2cos - p4cos*p2sin) >= 0.0)) {
        if( p4sin*p3cos - p4cos*p3sin >= 0.0 ) {
          q1 = pos[1]; r1 = pos[2]; r2 = cPos;
        }
        else {
          q1 = pos[1]; r1 = cPos; r2 = pos[2];
        }
      }
      else if(((p4sin*p3cos - p4cos*p3sin) >= 0.0) && ((p2sin*p3cos - p2cos*p3sin) >= 0.0)) {
        if( p4sin*p2cos - p4cos*p2sin >= 0.0 ) {
          q1 = pos[2]; r1 = pos[1]; r2 = cPos;
        }
        else {
          q1 = pos[2]; r1 = cPos; r2 = pos[1];
        }
      }
      else if(((p2sin*p4cos - p2cos*p4sin) >= 0.0) && ((p3sin*p4cos - p3cos*p4sin) >= 0.0)) {
        if( p3sin*p2cos - p3cos*p2sin >= 0.0 ) {
          q1 = cPos; r1 = pos[1]; r2 = pos[2];
        }
        else {
          q1 = cPos; r1 = pos[2]; r2 = pos[1];
        }
      }
      else continue;

      const s = _getRegionArea(pos[0], q1, r1, r2);

      if( s > smax ) {
        smax = s;
        index = i;
      }
    }
    //console.log("selectTemplate", num, smax, index);
    return index;
  }
  else {
    for (let i = 0; i < prevSelectedFeatures.length; i++) {
      for (let j = 0; j < candidates.length; j++) {
        if (candidates[j].flag) continue;

        if (prevSelectedFeatures[i].level === candidates[j].level
          && prevSelectedFeatures[i].num === candidates[j].num) {
          return j;
        }
      }
    }

    let available = 0;
    for (let i = 0; i < candidates.length; i++) {
      if (!candidates[i].flag)  available += 1;
    }
    //let pick = randomizer.nextInt(available);
    let pick = 0;
    //let pick = Math.floor(Math.random() * available);
    for (let i = 0; i < candidates.length; i++) {
      if (!candidates[i].flag) {
        if (pick === 0) {
          return i;
        } else {
          pick -= 1;
        }
      }
    }
  }
  return -1;
}

const _getVectorAngle = (p1, p2) => {
  const l = Math.sqrt( (p2[0]-p1[0])*(p2[0]-p1[0]) + (p2[1]-p1[1])*(p2[1]-p1[1]) );
  return {
    sin: (p2[1] - p1[1]) / l,
    cos: (p2[0] - p1[0]) / l
  }
}

const _getRegionArea = (p1, p2, p3, p4) => {
  const s = _getTriangleArea(p1, p2, p3)
          + _getTriangleArea(p1, p3, p4);
  return s;
}

const _getTriangleArea = (p1, p2, p3) => {
  const x1 = p2[0] - p1[0];
  const y1 = p2[1] - p1[1];
  const x2 = p3[0] - p1[0];
  const y2 = p3[1] - p1[1];

  const s = 1.0 * (x1 * y2 - x2 * y1) / 2.0;
  return Math.abs(s);
}

module.exports = {
  track
}
