const {Matrix, inverse} = require('ml-matrix');

// build world matrix with list of matching worldCoords|screenCoords
//
// Step 1. estimate homography with list of pairs
// Ref: https://www.uio.no/studier/emner/matnat/its/TEK5030/v19/lect/lecture_4_3-estimating-homographies-from-feature-correspondences.pdf  (Basic homography estimation from points)
//
// Step 2. decompose homography into rotation and translation matrixes (i.e. world matrix)
// Ref: can anyone provide reference?
const estimate = ({screenCoords: inScreenCoords, worldCoords: inWorldCoords, projectionTransform}) => {
  const {normalizedCoords: screenCoords, param: paramScreen} = _normalizePoints(inScreenCoords);
  const {normalizedCoords: worldCoords, param: paramWorld} = _normalizePoints(inWorldCoords);

  // Question: should we normalize coordinates, compute homography, then denormalize it?
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

  const Harray = _denormalizeHomography(C, paramWorld, paramScreen);
  const H = new Matrix(Harray);

  const K = new Matrix(projectionTransform);
  const KInv = inverse(K);

  const _KInvH = KInv.mmul(H);
  const KInvH = _KInvH.to1DArray();

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

  return initialModelViewTransform;
};


// centroid at origin and avg distance from origin is sqrt(2)
const _normalizePoints = (coords) => {
  //return {normalizedCoords: coords, param: {meanX: 0, meanY: 0, s: 1}}; // skip normalization

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

// Denormalize homography
// where T is the normalization matrix, i.e.
//
//     [1  0  -meanX]
// T = [0  1  -meanY]
//     [0  0     1/s]
//
//          [1  0  s*meanX]
// inv(T) = [0  1  s*meanY]
// 	    [0  0        s]
//
// H = inv(Tscreen) * Hn * Tworld
//
// @param {
//   nH: normH,
//   pWorld: param of world transform,
//   pScreen: param of screen transform
// }
const _denormalizeHomography = (nH, pWorld, pScreen) => {
  /*
  Matrix version
  const normH = new Matrix([
    [nH[0], nH[1], nH[2]],
    [nH[3], nH[4], nH[5]],
    [nH[6], nH[7], 1],
  ]);
  const Tworld = new Matrix([
    [1, 0, -pWorld.meanX],
    [0, 1, -pWorld.meanY],
    [0, 0,    1/pWorld.s],
  ]);

  const invTscreen = new Matrix([
    [1, 0, pScreen.s * pScreen.meanX],
    [0, 1, pScreen.s * pScreen.meanY],
    [0, 0, pScreen.s],
  ]);
  const H = invTscreen.mmul(normH).mmul(Tworld);
  */

  // plain implementation of the above using Matrix
  const sMeanX = pScreen.s * pScreen.meanX;
  const sMeanY = pScreen.s * pScreen.meanY;

  const H = [
    [
      nH[0] + sMeanX * nH[6], 
      nH[1] + sMeanX * nH[7],
      (nH[0] + sMeanX * nH[6]) * -pWorld.meanX + (nH[1] + sMeanX * nH[7]) * -pWorld.meanY + (nH[2] + sMeanX) / pWorld.s,
    ],
    [
      nH[3] + sMeanY * nH[6], 
      nH[4] + sMeanY * nH[7],
      (nH[3] + sMeanY * nH[6]) * -pWorld.meanX + (nH[4] + sMeanY * nH[7]) * -pWorld.meanY + (nH[5] + sMeanY) / pWorld.s,
    ],
    [
      pScreen.s * nH[6],
      pScreen.s * nH[7],
      pScreen.s * nH[6] * -pWorld.meanX + pScreen.s * nH[7] * -pWorld.meanY + pScreen.s / pWorld.s,
    ]
  ];

  // make H[2][2] = 1
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      H[i][j] /= H[2][2];
    }
  }
  return H;
}

module.exports = {
  estimate
}
