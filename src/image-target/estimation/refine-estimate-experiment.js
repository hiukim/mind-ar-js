/**
 * Trying to do normalization before running ICP
 *   i.e. make coodinates centroid at origin and avg distance from origin is sqrt(2)
 *
 * can we get rid of projectionTransform, and just do ICP on modelViewTransform?
 *
 * but couldn't make it work yet. Can someone with theoretical knowledge on ICP reach out to help?, particularly Multiview Levenberg-Marquardt ICP
 *   I have problem understanding the jacobian and things like that
 *
 */
const {Matrix, inverse} = require('ml-matrix');
const {applyModelViewProjectionTransform, buildModelViewProjectionTransform, computeScreenCoordiate} = require('./utils.js');

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

const refineEstimate = ({initialModelViewTransform, projectionTransform, worldCoords: inWorldCoords, screenCoords: inScreenCoords}) => {
  const {normalizedCoords: worldCoords, param: worldParam} = normalizePoints(inWorldCoords);
  const {normalizedCoords: screenCoords, param: screenParam} = normalizePoints(inScreenCoords);

  const modelViewProjectionTransform = buildModelViewProjectionTransform(projectionTransform, initialModelViewTransform);

  const normModelViewProjectionTransform = _getNormalizedModelViewTransform(modelViewProjectionTransform, worldParam, screenParam);
  /*
   * porjection matrix
   *     [k00,   0, k02]
   * K = [  0, k11, k12]
   *     [  0,   0,   1]
   *
   *          [1/k00,      0,  -k02/k00]
   * inv(K) = [    0,  1/k11,  -k12/k11]
   * 	      [    0,      0,         1]
   *
   *
   * denote modelViewProjectionTransform as A,
   * since A = K * M,   M = inv(K) * A
   *
   *     [a00 / k00 - a20 * k02/k00,  a01 / k00 - k02/k00 * a21,  a02 / k00 - k02/k00 * a22,  a03 / k00 - k02/k00 * a23]
   * M = [a10 / k11 - a20 * k12/k11,  a11 / k11 - k12/k11 * a21,  a13 / k11 - k12/k11 * a22,  a13 / k11 - k12/111 * a23]
   *     [            a20          ,  			    a21,			a22, 		            a23] 
   */
  const a = normModelViewProjectionTransform;
  const k = projectionTransform;
  const normModelViewTransform  = [
    [a[0][0]/k[0][0] - a[2][0]*k[0][2]/k[0][0],  a[0][1]/k[0][0] - a[2][1]*k[0][2]/k[0][0],  a[0][2]/k[0][0] - a[2][2]*k[0][2]/k[0][0],  a[0][3]/k[0][0] - a[2][3]*k[0][2]/k[0][0]],
    [a[1][0]/k[1][1] - a[2][0]*k[1][2]/k[1][1],  a[1][1]/k[1][1] - a[2][1]*k[1][2]/k[1][1],  a[1][2]/k[1][1] - a[2][2]*k[1][2]/k[1][1],  a[1][3]/k[1][1] - a[2][3]*k[1][2]/k[1][1]],
    [		       a[2][0], 				   a[2][1], 				       a[2][2], 			           a[2][3]                ]
  ];

  const inlierProbs = [1.0, 0.8, 0.6, 0.4, 0.0];
  let updatedModelViewTransform = normModelViewTransform;
  let finalModelViewTransform = null;
  for (let i = 0; i < inlierProbs.length; i++) {
    const ret = _doICP({initialModelViewTransform: updatedModelViewTransform, projectionTransform, worldCoords, screenCoords, inlierProb: inlierProbs[i]});

    updatedModelViewTransform = ret.modelViewTransform;

    if (ret.err < TRACKING_THRESH) {
      finalModelViewTransform = updatedModelViewTransform;
      break;
    }
  }

  if (finalModelViewTransform === null) return null;

  const denormModelViewTransform = _getDenormalizedModelViewTransform(finalModelViewTransform, worldParam, screenParam);

  return denormModelViewTransform;
};

// ICP iteration
// Question: can someone provide theoretical reference / mathematical proof for the following computations?
// 	     I'm unable to derive the Jacobian
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

      console.log("icp err", worldCoords[n], u, screenCoords[n]);

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

    console.log("icp loop", inlierProb, l, err1);

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
  J_U_Xc[0][0] = (projectionTransform[0][0] * u.z - projectionTransform[2][0] * u.x) / z2;
  J_U_Xc[0][1] = (projectionTransform[0][1] * u.z - projectionTransform[2][1] * u.x) / z2;
  J_U_Xc[0][2] = (projectionTransform[0][2] * u.z - projectionTransform[2][2] * u.x) / z2;

  J_U_Xc[1][0] = (projectionTransform[1][0] * u.z - projectionTransform[2][0] * u.y) / z2;
  J_U_Xc[1][1] = (projectionTransform[1][1] * u.z - projectionTransform[2][1] * u.y) / z2;
  J_U_Xc[1][2] = (projectionTransform[1][2] * u.z - projectionTransform[2][2] * u.y) / z2;

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

const _getNormalizedModelViewTransform = (modelViewTransform, worldParam, screenParam) => {
  /*
   *  notations:
   *    m: modelViewTransform,
   *    [x,y,z,1]: world coordinates
   *    [x',y',z',1]: screen coordinates
   *
   *  By normalizing coordinates with meanX, meanY and scale s, it means to transform the coordinates to
   *  note that z doesn't scale up, otherwise screen point doesn't scale, e.g.   x' = x / z
   *    [s*(x-meanX)]
   *    [s*(y-meanY)]
   *    [z          ]
   *    [1          ]
   *
   *  Let's define transformation T, such that 
   *  `normalizedP = T * P`
   *
   *    [s * (x - meanX)]   [s, 0,   0, -s*meanX]   [x]
   *    [s * (y - meanY)] = [0, s,   0, -s*meanY] * [y]
   *    [z              ]   [0, 0,   1,        0]   [z]
   *    [1              ]   [0, 0,   0,        1]   [1]
   *
   *  and `P = inv(T) * normalizedP`
   *
   *    [x]   [1/s, 0  , 0, meanX]   [s * (x - meanX)]
   *    [y] = [0  , 1/s, 0, meanY] * [s * (y - meanY)]
   *    [z]   [0  , 0  , 1,     0]   [z              ]
   *    [1]   [0  , 0  , 0,     1]   [1              ]
   *
   *
   * Before normalizating coordinates, the following holds:
   *  M * P = P'   (P is world coordinate, and P' is screen coordinate)
   *
   *  -> M * inv(T) * T * P = inv(T') * T' * P'
   *  -> T' * M * inv(T) * T * P = T' * P'
   *  here, T * P, and T' * P' are normalized coordaintes for world and screen, so, the modelViewTransform for normalized coordinates would be:
   *
   *  Mnorm = T' * M * inv(T) = 
   *
   *  [s',  0,   0, -s'*meanX']   [m00, m01, m02, m03]   [1/s,   0, 0, meanX]
   *  [ 0, s',   0, -s'*meanY'] * [m10, m11, m12, m13] * [  0, 1/s, 0, meanY]
   *  [ 0,  0,   1,          0]   [m20, m21, m22, m23]   [  0,   0, 1,     0]
   *  [ 0,  0,   0,          1]   [0,   0,   0,     1]   [  0,   0, 0,     1]
   *
   *  =
   *
   *  [m00 * s'/s, m01 * s'/s, m02 * s', m00*s'*meanX + m01*s'*meanY + m03*s' - meanX'*s']
   *  [m10 * s'/s, m11 * s'/s, m12 * s', m10*s'*meanX + m11*s'*meanY + m13*s' - meanY'*s']
   *  [m20 / s   , m21 / s   , m22     , m20   *meanX + m21   *meanY + m23               ]
   *  [         0,          0,        0,                	        		1]
   *
   */

   const m = modelViewTransform;
   const ss = screenParam.s / worldParam.s;
   const normModelViewTransform = [
     [m[0][0]*ss, m[0][1]*ss, m[0][2]*screenParam.s, (m[0][0]*worldParam.meanX + m[0][1]*worldParam.meanY + m[0][3] - screenParam.meanX) * screenParam.s],
     [m[1][0]*ss, m[1][1]*ss, m[1][2]*screenParam.s, (m[1][0]*worldParam.meanX + m[1][1]*worldParam.meanY + m[1][3] - screenParam.meanY) * screenParam.s],
     [m[2][0]/worldParam.s, m[2][1]/worldParam.s, m[2][2], m[2][0]*worldParam.meanX + m[2][1]*worldParam.meanY + m[2][3]],
   ];
   return normModelViewTransform;
}

const _getDenormalizedModelViewTransform = (modelViewTransform, worldParam, screenParam) => {
  /*
   *  Refer to _getNormalizedModelViewTransform, we have
   *  
   *  Mnorm = T' * M * inv(T)
   *
   *  Therefore, 
   *
   *  M = inv(T') * Mnorm * T
   *
   *  [1/s',    0, 0, meanX']   [m00, m01, m02, m03]   [s, 0, 0, -s*meanX]
   *  [0   , 1/s', 0, meanY'] * [m10, m11, m12, m13] * [0, s, 0, -s*meanY]
   *  [0   , 0   , 1,      0]   [m20, m21, m22, m23]   [0, 0, 1,        0]
   *  [0   , 0   , 0,      1]   [0,   0,   0,     1]   [0, 0, 0,        1]
   *
   *  =
   *
   *  [m00*s/s', m01*s/s', m02/s', (-m00*s*meanX -m01*s*meanY+m03)/s' + meanX'],
   *  [m10*s/s', m11*s/s', m12/s', (-m10*s*meanX -m11*s*meanY+m13)/s' + meanY'],
   *  [m20*s  ', m21*s  ', m22   ,  -m20*s*meanX -m21*s*meanY+m23)            ],
   *  [0       ,        0,      0,                                            1]
   *
   */
  const m = modelViewTransform;
  const ss = worldParam.s / screenParam.s;
  const sMeanX = worldParam.s * worldParam.meanX;
  const sMeanY = worldParam.s * worldParam.meanY;
  const denormModelViewTransform = [
    [m[0][0]*ss, m[0][1]*ss, m[0][2]/screenParam.s, (-m[0][0]*sMeanX -m[0][1]*sMeanY + m[0][3])/screenParam.s + screenParam.meanX],
    [m[1][0]*ss, m[1][1]*ss, m[1][2]/screenParam.s, (-m[1][0]*sMeanX -m[1][1]*sMeanY + m[1][3])/screenParam.s + screenParam.meanY],
    [m[2][0]*worldParam.s, m[2][1]*worldParam.s, m[2][2], (-m[2][0]*sMeanX -m[2][1]*sMeanY + m[2][3])],
  ]
  return denormModelViewTransform;
}

// centroid at origin and avg distance from origin is sqrt(2)
const normalizePoints = (coords) => {
  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < coords.length; i++) {
    sumX += coords[i].x;
    sumY += coords[i].y;
  }
  let meanX = sumX / coords.length;
  let meanY = sumY / coords.length;

  let sumDiff = 0;
  for (let i = 0; i < coords.length; i++) {
    const diffX = coords[i].x - meanX;
    const diffY = coords[i].y - meanY;
    sumDiff += Math.sqrt(diffX * diffX + diffY * diffY);
  }
  let s = Math.sqrt(2) * coords.length / sumDiff;

  const normalizedCoords = [];
  for (let i = 0; i < coords.length; i++) {
    normalizedCoords.push({
      x: (coords[i].x - meanX) * s,
      y: (coords[i].y - meanY) * s,
    });
  }
  return {normalizedCoords, param: {meanX, meanY, s}};
}

module.exports = {
  refineEstimate
}
