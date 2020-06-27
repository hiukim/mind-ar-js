const {Matrix, inverse} = require('ml-matrix');
const {applyModelViewProjectionTransform, buildModelViewProjectionTransform, computeScreenCoordiate} = require('./utils.js');

// build world matrix with list of matching worldCoords|screenCoords
//
// Step 1. estimate homography with list of pairs
// Ref: https://www.uio.no/studier/emner/matnat/its/TEK5030/v19/lect/lecture_4_3-estimating-homographies-from-feature-correspondences.pdf  (Basic homography estimation from points)
//
// Step 2. decompose homography into rotation and translation matrixes (i.e. world matrix)
// Ref: can anyone provide reference?
const estimateHomography = ({screenCoords, worldCoords, projectionTransform}) => {
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

  if (window.DEBUG_MATCH) {
    for (let j = 0; j < A.data.length; j++) {
      for (let i = 0; i < A.data[j].length; i++) {
        if (!window.cmp(A.data[j][i], window.debugMatch.matA[j][i], 0.1)) {
          console.log("INCORRECT A", j, i, A.data[j][i], window.debugMatch.matA[j][i]);
        }
      }
    }
    for (let j = 0; j < C.length; j++) {
      if (!window.cmp(C[j], window.debugMatch.matC[j], 0.001)) {
        console.log("INCORRECT C", j, C[j], window.debugMatch.matC[j]);
      }
    }
  }

  const H = new Matrix([
    [C[0], C[1], C[2]],
    [C[3], C[4], C[5]],
    [C[6], C[7], 1]
  ]);

  const K = new Matrix(projectionTransform);
  const KInv = inverse(K);

  const _KInvH = KInv.mmul(H);
  const KInvH = _KInvH.to1DArray();

  if (window.DEBUG_MATCH) {
    const dv = window.debugMatch.v;
    const dt = window.debugMatch.t;
    const dKInvH = [
      [dv[0][0],dv[1][0],dt[0]],
      [dv[0][1],dv[1][1],dt[1]],
      [dv[0][2],dv[1][2],dt[2]]
    ];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if(!window.cmp(_KInvH.data[i][j], dKInvH[i][j])) {
          console.log("INCORRECT KInvH", i, j, KInvH.data, dKInvH);
          break;
        }
      }
    }
  }

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

  const norm3 = Math.sqrt(rotate[2] * rotate[2] + rotate[5] * rotate[5] + rotate[8] * rotate[8]);
  rotate[2] /= norm3;
  rotate[5] /= norm3;
  rotate[8] /= norm3;

  // TODO: artoolkit has check_rotation() that somehow switch the rotate vector. not sure what that does. Can anyone advice?
  // https://github.com/artoolkitx/artoolkit5/blob/5bf0b671ff16ead527b9b892e6aeb1a2771f97be/lib/SRC/ARICP/icpUtil.c#L215

  const tran = []
  tran[0] = KInvH[2] / tnorm;
  tran[1] = KInvH[5] / tnorm;
  tran[2] = KInvH[8] / tnorm;

  let initialModelViewTransform = [
    [rotate[0], rotate[1], rotate[2], tran[0]],
    [rotate[3], rotate[4], rotate[5], tran[1]],
    [rotate[6], rotate[7], rotate[8], tran[2]]
  ];

  if (window.DEBUG_MATCH) {
    console.log("initialModelViewTransform", initialModelViewTransform, window.debugMatch.initMatXw2Xc);
    for (let j = 0; j < initialModelViewTransform.length; j++) {
      for (let i = 0; i < initialModelViewTransform[j].length; i++) {
        if (!window.cmp(initialModelViewTransform[j][i], window.debugMatch.initMatXw2Xc[j][i], 0.0001)) {
          console.log("INCORRECT initialModelViewTransform", j, i, initialModelViewTransform[j][i], window.debugMatch.initMatXw2Xc[j][i]);
        }
      }
    }
  }

  return initialModelViewTransform;
};

module.exports = {
  estimateHomography
}
