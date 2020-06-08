const {Matrix, inverse} = require('ml-matrix');
const {getProjectionTransform, applyModelViewProjectionTransform, buildModelViewProjectionTransform, computeScreenCoordiate} = require('./utils.js');

const ICP_MAX_LOOP = 10;
const ICP_BREAK_LOOP_ERROR_THRESH = 0.1;
const ICP_BREAK_LOOP_ERROR_RATIO_THRESH = 0.99;
const ICP_BREAK_LOOP_ERROR_THRESH2 = 4.0;
const ICP_INLIER_PROBABILITY = 0.50;

const KData = getProjectionTransform();

const buildProjectionMatrix = () => {
  const W = 320.0 - 1;
  const H = 240.0 - 1;
  const near = 0.0001;
  const far = 1000.0;

  const proj = [
    [2 * KData[0][0] / W, 0, -(2 * KData[0][2] / W - 1), 0],
    [0, 2 * KData[1][1] / H, -(2 * KData[1][2] / H - 1), 0],
    [0, 0, -(far + near) / (far - near), -2 * far * near / (far - near)],
    [0, 0, -1, 0]
  ];

  const projMatrix = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      projMatrix.push(proj[j][i]);
    }
  }
  return projMatrix;
  //console.log('proj', projMatrix);
}

// build world matrix with list of matching worldCoords|screenCoords
// Ref: https://www.uio.no/studier/emner/matnat/its/TEK5030/v19/lect/lecture_4_3-estimating-homographies-from-feature-correspondences.pdf  (Basic homography estimation from points)
const buildTransforms = ({screenCoords, worldCoords, debugContent}) => {
  const num = screenCoords.length;
  const AData = [];
  const BData = [];
  for (let j = 0; j < num; j++) {
    const row1 = [
      worldCoords[j].x,
      worldCoords[j].y,
      1,
      0,
      0,
      0,
      -(worldCoords[j].x * screenCoords[j].x),
      -(worldCoords[j].y * screenCoords[j].x),
    ];
    const row2 = [
      0,
      0,
      0,
      worldCoords[j].x,
      worldCoords[j].y,
      1,
      -(worldCoords[j].x * screenCoords[j].y),
      -(worldCoords[j].y * screenCoords[j].y),
    ];
    AData.push(row1);
    AData.push(row2);

    BData.push([screenCoords[j].x]);
    BData.push([screenCoords[j].y]);
  }

  const A = new Matrix(AData);
  const B = new Matrix(BData);
  const AT = A.transpose();
  const ATA = AT.mmul(A);
  const ATB = AT.mmul(B);
  const ATAInv = inverse(ATA);
  const C = ATAInv.mmul(ATB).to1DArray();

  const H = new Matrix([
    [C[0], C[1], C[2]],
    [C[3], C[4], C[5]],
    [C[6], C[7], 1]
  ]);
  //console.log("homography: ", H.toString());
  //
  //console.log("matA:", A.toString(), '---vs---', debugContent.matA);
  //console.log("matC:", H.toString(), '---vs---', debugContent.matC);

  const K = new Matrix(KData);
  const KInv = inverse(K);

  const _KInvH = KInv.mmul(H);
  const KInvH = _KInvH.to1DArray();

  //console.log("KInvH", _KInvH, KInvH);

  const norm1 = Math.sqrt( KInvH[0] * KInvH[0] + KInvH[3] * KInvH[3] + KInvH[6] * KInvH[6]);
  const norm2 = Math.sqrt( KInvH[1] * KInvH[1] + KInvH[4] * KInvH[4] + KInvH[7] * KInvH[7]);
  const tnorm = (norm1 + norm2) / 2;

  const rotate = [];
  rotate[0] = KInvH[0] / norm1;
  rotate[3] = KInvH[3] / norm1;
  rotate[6] = KInvH[6] / norm1;

  rotate[1] = KInvH[1] / norm2;
  rotate[4] = KInvH[4] / norm2;
  rotate[7] = KInvH[7] / norm2;

  rotate[2] = rotate[3] * rotate[7] - rotate[6] * rotate[4];
  rotate[5] = rotate[6] * rotate[1] - rotate[0] * rotate[7];
  rotate[8] = rotate[0] * rotate[4] - rotate[1] * rotate[3];

  // TODDO artoolkit has check_rotation() (in icpUtil.c file). not sure what that does....

  const tran = []
  tran[0] = KInvH[2] / tnorm;
  tran[1] = KInvH[5] / tnorm;
  tran[2] = KInvH[8] / tnorm;

  let initialModelViewTransform = [
    [rotate[0], rotate[1], rotate[2], tran[0]],
    [rotate[3], rotate[4], rotate[5], tran[1]],
    [rotate[6], rotate[7], rotate[8], tran[2]]
  ];

  // remove this: temporary set to align with debug content
  /*
  initialModelViewTransform = [ [ 0.88630656901168,
    -0.4599025452177776,
    -0.054316798773068116,
    91.25697682336826 ],
  [ -0.3925313242041376,
    -0.8082993068982495,
    0.43882956826808717,
    170.73715443964304 ],
  [ -0.2457230661645145,
    -0.367616484083643,
    -0.8969271405106941,
    446.9805186164216 ] ];
  */

  console.log("initMatXw2Xc", initialModelViewTransform, '---vs---', debugContent.initMatXw2Xc);

  // iterate points to improve the matrix
  console.log("initialModelViewTransform", initialModelViewTransform, '---vs---', debugContent.icp_initMatXw2Xc);
  const modelViewTransform = icpPoint({initialModelViewTransform, projectionTransform: KData, worldCoords, screenCoords, debugContent});
  console.log("adjusted modelViewTransform", modelViewTransform, '---vs---', debugContent.camPose);

  return modelViewTransform;
};

// modelviewTransform Rt 3x4
icpPoint = ({initialModelViewTransform, projectionTransform, worldCoords, screenCoords, debugContent}) => {
  let modelViewTransform = initialModelViewTransform;
  for (let l = 0; l <= ICP_MAX_LOOP; l++) {

    const modelViewProjectionTransform = buildModelViewProjectionTransform(projectionTransform, modelViewTransform);
    //console.log("mvp", modelViewProjectionTransform);
    //console.log("icp matXw2U", l, debugContent.icp_matXw2U[l]);
    //console.log("icp matXc2U", l, debugContent.icp_matXc2U[l]);
    //console.log("icp matXw2Xc", l, debugContent.icp_matXw2Xc[l]);

    const dU = [];
    let err0 = 0.0;
    let err1 = 0.0;
    for (let n = 0; n < worldCoords.length; n++) {
      const u = computeScreenCoordiate(modelViewProjectionTransform, worldCoords[n].x, worldCoords[n].y, worldCoords[n].z);
      if (u === null) continue;
      const dx = screenCoords[n].x - u.x;
      const dy = screenCoords[n].y - u.y;
      dU.push([dx]);
      dU.push([dy]);
      err1 += dx*dx + dy*dy;
    }

    err1 /= worldCoords.length;

    if (err1 < ICP_BREAK_LOOP_ERROR_THRESH) break;
    if (l > 0 && err1 < ICP_BREAK_LOOP_ERROR_THRESH2 && err1/err0 > ICP_BREAK_LOOP_ERROR_RATIO_THRESH) break;
    err0 = err1;

    const allJ_U_S = [];
    for (let n = 0; n < worldCoords.length; n++) {
      const J_U_S = _getJ_U_S({modelViewProjectionTransform, modelViewTransform, projectionTransform, worldCoord: worldCoords[n], debugContent});
      //console.log("J_U_S", J_U_S, debugContent.icp_J_U_S[l][n]);
      for (let i = 0; i < J_U_S.length; i++) {
        allJ_U_S.push(J_U_S[i]);
      }
    }

    const dS = _getDeltaS({dU, J_U_S: allJ_U_S});
    if (dS === null) continue;
    modelViewTransform = _updateModelViewTransform({modelViewTransform, dS});
  }
  return modelViewTransform;
}

_updateModelViewTransform = ({modelViewTransform, dS}) => {
  const q = [];
  let ra = dS[0] * dS[0] + dS[1] * dS[1] + dS[2] * dS[2];
  if( ra < 0.000001 ) {
    q[0] = 1.0;
    q[1] = 0.0;
    q[2] = 0.0;
    q[3] = 0.0;
  } else {
    ra = Math.sqrt(ra);
    q[0] = dS[0] / ra;
    q[1] = dS[1] / ra;
    q[2] = dS[2] / ra;
    q[3] = ra;
  }
  q[4] = dS[3];
  q[5] = dS[4];
  q[6] = dS[5];


  const cra = Math.cos(q[3]);
  const one_cra = 1.0 - cra;
  const sra = Math.sin(q[3]);
  const mat = [[],[],[]];

  mat[0][0] = q[0]*q[0]*one_cra + cra;
  mat[0][1] = q[0]*q[1]*one_cra - q[2]*sra;
  mat[0][2] = q[0]*q[2]*one_cra + q[1]*sra;
  mat[0][3] = q[4];
  mat[1][0] = q[1]*q[0]*one_cra + q[2]*sra;
  mat[1][1] = q[1]*q[1]*one_cra + cra;
  mat[1][2] = q[1]*q[2]*one_cra - q[0]*sra;
  mat[1][3] = q[5];
  mat[2][0] = q[2]*q[0]*one_cra - q[1]*sra;
  mat[2][1] = q[2]*q[1]*one_cra + q[0]*sra;
  mat[2][2] = q[2]*q[2]*one_cra + cra;
  mat[2][3] = q[6];

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

_getDeltaS = ({dU, J_U_S}) => {
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

_getJ_U_S = ({modelViewProjectionTransform, modelViewTransform, projectionTransform, worldCoord, debugContent}) => {
  const T = modelViewTransform;
  const {x, y, z} = worldCoord;

  const u = applyModelViewProjectionTransform(modelViewProjectionTransform, x, y, z);
  if (u.z < 0.000001) return null;

  const z2 = u.z * u.z;
  const J_U_Xc = [[],[]];
  J_U_Xc[0][0] = (projectionTransform[0][0] * u.z - projectionTransform[2][0] * u.x) / z2;
  J_U_Xc[0][1] = (projectionTransform[0][1] * u.z - projectionTransform[2][1] * u.x) / z2;
  J_U_Xc[0][2] = (projectionTransform[0][2] * u.z - projectionTransform[2][2] * u.x) / z2;
  J_U_Xc[1][0] = (projectionTransform[1][0] * u.z - projectionTransform[2][0] * u.y) / z2;
  J_U_Xc[1][1] = (projectionTransform[1][1] * u.z - projectionTransform[2][1] * u.y) / z2;
  J_U_Xc[1][2] = (projectionTransform[1][2] * u.z - projectionTransform[2][2] * u.y) / z2;

  const J_Xc_S = [
    [T[0][2] * y - T[0][1] * z, T[0][0] * z - T[0][2] * x, T[0][1] * x - T[0][0] * y, T[0][0], T[0][1], T[0][2]],
    [T[1][2] * y - T[1][1] * z, T[1][0] * z - T[1][2] * x, T[1][1] * x - T[1][0] * y, T[1][0], T[1][1], T[1][2]],
    [T[2][2] * y - T[2][1] * z, T[2][0] * z - T[2][2] * x, T[2][1] * x - T[2][0] * y, T[2][0], T[2][1], T[2][2]],
  ];

  //console.log("J_Xc_S", J_Xc_S, '--vs--', '0.', debugContent.icp_J_Xc_S[0], '1.', debugContent.icp_J_Xc_S[1]);
  //console.log("J_U_Xc", J_U_Xc, '--vs--', '0.', debugContent.icp_J_U_Xc[0], '1.', debugContent.icp_J_U_Xc[1]);

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

module.exports = {
  buildTransforms
}
