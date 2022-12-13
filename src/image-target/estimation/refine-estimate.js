import {Matrix, inverse} from 'ml-matrix';
import { applyModelViewProjectionTransform, buildModelViewProjectionTransform, computeScreenCoordiate} from './utils.js';

const TRACKING_THRESH = 5.0; // default
const K2_FACTOR = 4.0; // Question: should it be relative to the size of the screen instead of hardcoded?
const ICP_MAX_LOOP = 10;
const ICP_BREAK_LOOP_ERROR_THRESH = 0.1;
const ICP_BREAK_LOOP_ERROR_RATIO_THRESH = 0.99;
const ICP_BREAK_LOOP_ERROR_THRESH2 = 4.0;

// some temporary/intermediate variables used later. Declare them beforehand to reduce new object allocations
let mat = [[],[],[]]; 
let J_U_Xc = [[],[]]; // 2x3
let J_Xc_S = [[],[],[]]; // 3x6

const refineEstimate = ({initialModelViewTransform, projectionTransform, worldCoords, screenCoords}) => {
  // Question: shall we normlize the screen coords as well?
  // Question: do we need to normlize the scale as well, i.e. make coords from -1 to 1
  //
  // normalize world coords - reposition them to center of mass
  //   assume z coordinate is always zero (in our case, the image target is planar with z = 0
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < worldCoords.length; i++) {
    dx += worldCoords[i].x;
    dy += worldCoords[i].y;
  }
  dx /= worldCoords.length;
  dy /= worldCoords.length;

  const normalizedWorldCoords = [];
  for (let i = 0; i < worldCoords.length; i++) {
    normalizedWorldCoords.push({x: worldCoords[i].x - dx, y: worldCoords[i].y - dy, z: worldCoords[i].z});
  }

  const diffModelViewTransform = [[],[],[]];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      diffModelViewTransform[j][i] = initialModelViewTransform[j][i];
    }
  }
  diffModelViewTransform[0][3] = initialModelViewTransform[0][0] * dx + initialModelViewTransform[0][1] * dy + initialModelViewTransform[0][3];
  diffModelViewTransform[1][3] = initialModelViewTransform[1][0] * dx + initialModelViewTransform[1][1] * dy + initialModelViewTransform[1][3];
  diffModelViewTransform[2][3] = initialModelViewTransform[2][0] * dx + initialModelViewTransform[2][1] * dy + initialModelViewTransform[2][3];

  // use iterative closest point algorithm to refine the modelViewTransform
  const inlierProbs = [1.0, 0.8, 0.6, 0.4, 0.0];
  let updatedModelViewTransform = diffModelViewTransform; // iteratively update this transform
  let finalModelViewTransform = null;
  for (let i = 0; i < inlierProbs.length; i++) {
    const ret = _doICP({initialModelViewTransform: updatedModelViewTransform, projectionTransform, worldCoords: normalizedWorldCoords, screenCoords, inlierProb: inlierProbs[i]});

    updatedModelViewTransform = ret.modelViewTransform;

    //console.log("err", ret.err);

    if (ret.err < TRACKING_THRESH) {
      finalModelViewTransform = updatedModelViewTransform;
      break;
    }
  }

  if (finalModelViewTransform === null) return null;

  // de-normalize
  finalModelViewTransform[0][3] = finalModelViewTransform[0][3] - finalModelViewTransform[0][0] * dx - finalModelViewTransform[0][1] * dy;
  finalModelViewTransform[1][3] = finalModelViewTransform[1][3] - finalModelViewTransform[1][0] * dx - finalModelViewTransform[1][1] * dy;
  finalModelViewTransform[2][3] = finalModelViewTransform[2][3] - finalModelViewTransform[2][0] * dx - finalModelViewTransform[2][1] * dy;

  return finalModelViewTransform;
}

// ICP iteration
// Question: can someone provide theoretical reference / mathematical proof for the following computations?
const _doICP = ({initialModelViewTransform, projectionTransform, worldCoords, screenCoords, inlierProb}) => {
  const isRobustMode = inlierProb < 1;

  let modelViewTransform = initialModelViewTransform;

  let err0 = 0.0;
  let err1 = 0.0;

  let E = new Array(worldCoords.length);
  let E2 = new Array(worldCoords.length);
  let dxs = new Array(worldCoords.length);
  let dys = new Array(worldCoords.length);

  for (let l = 0; l <= ICP_MAX_LOOP; l++) {
    const modelViewProjectionTransform = buildModelViewProjectionTransform(projectionTransform, modelViewTransform);

    for (let n = 0; n < worldCoords.length; n++) {
      const u = computeScreenCoordiate(modelViewProjectionTransform, worldCoords[n].x, worldCoords[n].y, worldCoords[n].z);
      const dx = screenCoords[n].x - u.x;
      const dy = screenCoords[n].y - u.y;

      dxs[n] = dx;
      dys[n] = dy;
      E[n] = (dx * dx + dy * dy);
    }

    let K2; // robust mode only
    err1 = 0.0;
    if (isRobustMode) {
      const inlierNum = Math.max(3, Math.floor(worldCoords.length * inlierProb) - 1);
      for (let n = 0; n < worldCoords.length; n++) {
        E2[n] = E[n];
      }
      E2.sort((a, b) => {return a-b;});

      K2 = Math.max(E2[inlierNum] * K2_FACTOR, 16.0);
      for (let n = 0; n < worldCoords.length; n++) {
        if (E2[n] > K2) err1 += K2/ 6;
        else err1 +=  K2/6.0 * (1.0 - (1.0-E2[n]/K2)*(1.0-E2[n]/K2)*(1.0-E2[n]/K2));
      }
    } else {
      for (let n = 0; n < worldCoords.length; n++) {
        err1 += E[n];
      }
    }
    err1 /= worldCoords.length;

    //console.log("icp loop", inlierProb, l, err1);

    if (err1 < ICP_BREAK_LOOP_ERROR_THRESH) break;
    //if (l > 0 && err1 < ICP_BREAK_LOOP_ERROR_THRESH2 && err1/err0 > ICP_BREAK_LOOP_ERROR_RATIO_THRESH) break;
    if (l > 0 && err1/err0 > ICP_BREAK_LOOP_ERROR_RATIO_THRESH) break;
    if (l === ICP_MAX_LOOP) break;

    err0 = err1;

    const dU = [];
    const allJ_U_S = [];
    for (let n = 0; n < worldCoords.length; n++) {
      if (isRobustMode && E[n] > K2) {
        continue;
      }

      const J_U_S = _getJ_U_S({modelViewProjectionTransform, modelViewTransform, projectionTransform, worldCoord: worldCoords[n]});

      if (isRobustMode) {
        const W = (1.0 - E[n]/K2)*(1.0 - E[n]/K2);

        for (let j = 0; j < 2; j++) {
          for (let i = 0; i < 6; i++) {
            J_U_S[j][i] *= W;
          }
        }
        dU.push([dxs[n] * W]);
        dU.push([dys[n] * W]);
      } else {
        dU.push([dxs[n]]);
        dU.push([dys[n]]);
      }

      for (let i = 0; i < J_U_S.length; i++) {
        allJ_U_S.push(J_U_S[i]);
      }
    }

    const dS = _getDeltaS({dU, J_U_S: allJ_U_S});
    if (dS === null) break;

    modelViewTransform = _updateModelViewTransform({modelViewTransform, dS});
  }
  return {modelViewTransform, err: err1};
}

const _updateModelViewTransform = ({modelViewTransform, dS}) => {
  /**
   * dS has 6 paragrams, first half is rotation, second half is translation
   * rotation is expressed in angle-axis, 
   *   [S[0], S[1] ,S[2]] is the axis of rotation, and the magnitude is the angle
   */
  let ra = dS[0] * dS[0] + dS[1] * dS[1] + dS[2] * dS[2];
  let q0, q1, q2;
  if( ra < 0.000001 ) {
    q0 = 1.0;
    q1 = 0.0;
    q2 = 0.0;
    ra = 0.0;
  } else {
    ra = Math.sqrt(ra);
    q0 = dS[0] / ra;
    q1 = dS[1] / ra;
    q2 = dS[2] / ra;
  }

  const cra = Math.cos(ra);
  const sra = Math.sin(ra);
  const one_cra = 1.0 - cra;

  // mat is [R|t], 3D rotation and translation
  mat[0][0] = q0*q0*one_cra + cra;
  mat[0][1] = q0*q1*one_cra - q2*sra;
  mat[0][2] = q0*q2*one_cra + q1*sra;
  mat[0][3] = dS[3];
  mat[1][0] = q1*q0*one_cra + q2*sra;
  mat[1][1] = q1*q1*one_cra + cra;
  mat[1][2] = q1*q2*one_cra - q0*sra;
  mat[1][3] = dS[4]
  mat[2][0] = q2*q0*one_cra - q1*sra;
  mat[2][1] = q2*q1*one_cra + q0*sra;
  mat[2][2] = q2*q2*one_cra + cra;
  mat[2][3] = dS[5];

  // the updated transform is the original transform x delta transform
  const mat2 = [[],[],[]];
  for (let j = 0; j < 3; j++ ) {
    for (let i = 0; i < 4; i++ ) {
      mat2[j][i] = modelViewTransform[j][0] * mat[0][i]
                   + modelViewTransform[j][1] * mat[1][i]
                   + modelViewTransform[j][2] * mat[2][i];
    }
    mat2[j][3] += modelViewTransform[j][3];
  }
  return mat2;
}

const _getDeltaS = ({dU, J_U_S}) => {
  const J = new Matrix(J_U_S);
  const U = new Matrix(dU);

  const JT = J.transpose();
  const JTJ = JT.mmul(J);
  const JTU = JT.mmul(U);

  let JTJInv;
  try {
    JTJInv = inverse(JTJ);
  } catch (e) {
    return null;
  }

  const S = JTJInv.mmul(JTU);
  return S.to1DArray();
}

const _getJ_U_S = ({modelViewProjectionTransform, modelViewTransform, projectionTransform, worldCoord}) => {
  const T = modelViewTransform;
  const {x, y, z} = worldCoord;

  const u = applyModelViewProjectionTransform(modelViewProjectionTransform, x, y, z);

  const z2 = u.z * u.z;
  // Question: This is the most confusing matrix to me. I've no idea how to derive this.
  //J_U_Xc[0][0] = (projectionTransform[0][0] * u.z - projectionTransform[2][0] * u.x) / z2;
  //J_U_Xc[0][1] = (projectionTransform[0][1] * u.z - projectionTransform[2][1] * u.x) / z2;
  //J_U_Xc[0][2] = (projectionTransform[0][2] * u.z - projectionTransform[2][2] * u.x) / z2;
  //J_U_Xc[1][0] = (projectionTransform[1][0] * u.z - projectionTransform[2][0] * u.y) / z2;
  //J_U_Xc[1][1] = (projectionTransform[1][1] * u.z - projectionTransform[2][1] * u.y) / z2;
  //J_U_Xc[1][2] = (projectionTransform[1][2] * u.z - projectionTransform[2][2] * u.y) / z2;
  
  // The above is the original implementation, but simplify to below becuase projetionTransform[2][0] and [2][1] are zero
  J_U_Xc[0][0] = (projectionTransform[0][0] * u.z) / z2;
  J_U_Xc[0][1] = (projectionTransform[0][1] * u.z) / z2;
  J_U_Xc[0][2] = (projectionTransform[0][2] * u.z - projectionTransform[2][2] * u.x) / z2;
  J_U_Xc[1][0] = (projectionTransform[1][0] * u.z) / z2;
  J_U_Xc[1][1] = (projectionTransform[1][1] * u.z) / z2;
  J_U_Xc[1][2] = (projectionTransform[1][2] * u.z - projectionTransform[2][2] * u.y) / z2;

  /*
    J_Xc_S should be like this, but z is zero, so we can simplify
    [T[0][2] * y - T[0][1] * z, T[0][0] * z - T[0][2] * x, T[0][1] * x - T[0][0] * y, T[0][0], T[0][1], T[0][2]],
    [T[1][2] * y - T[1][1] * z, T[1][0] * z - T[1][2] * x, T[1][1] * x - T[1][0] * y, T[1][0], T[1][1], T[1][2]],
    [T[2][2] * y - T[2][1] * z, T[2][0] * z - T[2][2] * x, T[2][1] * x - T[2][0] * y, T[2][0], T[2][1], T[2][2]],
  */
  J_Xc_S[0][0] = T[0][2] * y;
  J_Xc_S[0][1] = -T[0][2] * x;
  J_Xc_S[0][2] = T[0][1] * x - T[0][0] * y;
  J_Xc_S[0][3] = T[0][0];
  J_Xc_S[0][4] = T[0][1]; 
  J_Xc_S[0][5] = T[0][2];

  J_Xc_S[1][0] = T[1][2] * y;
  J_Xc_S[1][1] = -T[1][2] * x;
  J_Xc_S[1][2] = T[1][1] * x - T[1][0] * y;
  J_Xc_S[1][3] = T[1][0];
  J_Xc_S[1][4] = T[1][1];
  J_Xc_S[1][5] = T[1][2];

  J_Xc_S[2][0] = T[2][2] * y;
  J_Xc_S[2][1] = -T[2][2] * x;
  J_Xc_S[2][2] = T[2][1] * x - T[2][0] * y;
  J_Xc_S[2][3] = T[2][0];
  J_Xc_S[2][4] = T[2][1];
  J_Xc_S[2][5] = T[2][2];

  const J_U_S = [[], []];
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 6; i++) {
      J_U_S[j][i] = 0.0;
      for (let k = 0; k < 3; k++ ) {
        J_U_S[j][i] += J_U_Xc[j][k] * J_Xc_S[k][i];
      }
    }
  }
  return J_U_S;
}

export {
  refineEstimate
}
