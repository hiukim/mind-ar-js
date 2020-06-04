const {Matrix, inverse} = require('ml-matrix');

// TODO: non-hardcoded camera matrix?
//     [fx  s cx]
// K = [ 0 fx cy]
//     [ 0  0  1]
const matK = [
  [ 304.68270459335025, 0, 161.7239532470703],
  [ 0, 303.2606118015537, 118.80326843261719],
  [ 0, 0, 1.0]
];

const buildProjectionMatrix = () => {
  const W = 320.0 - 1;
  const H = 240.0 - 1;
  const near = 0.0001;
  const far = 1000.0;

  const proj = [
    [2 * matK[0][0] / W, 0, -(2 * matK[0][2] / W - 1), 0],
    [0, 2 * matK[1][1] / H, -(2 * matK[1][2] / H - 1), 0],
    [0, 0, -(far + near) / (far - near), -2 * far * near / (far - near)],
    [0, 0, -1, 0]
  ];
  const projMatrix = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      projMatrix.push(proj[j][i]);
    }
  }
  console.log('proj', projMatrix);
}

// build world matrix with list of matching worldCoords|screenCoords
// Ref: https://www.uio.no/studier/emner/matnat/its/TEK5030/v19/lect/lecture_4_3-estimating-homographies-from-feature-correspondences.pdf  (Basic homography estimation from points)
const buildWorldMatrix = ({screenCoords, worldCoords}) => {
  const num = screenCoords.length;
  const matA = [];
  const matB = [];
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
    matA.push(row1);
    matA.push(row2);

    matB.push([screenCoords[j].x]);
    matB.push([screenCoords[j].y]);
  }

  const A = new Matrix(matA);
  const B = new Matrix(matB);
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

  const K = new Matrix(matK);
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

  const trans = [
    rotate[0], rotate[1], rotate[2], tran[0],
    rotate[3], rotate[4], rotate[5], tran[1],
    rotate[6], rotate[7], rotate[8], tran[2]
  ];

  const worldMatrix = [
    trans[0], -trans[4], -trans[8], 0,
    trans[1], -trans[5], -trans[9], 0,
    trans[2], -trans[6], -trans[10], 0,
    trans[3], -trans[7], -trans[11], 1
  ];

  //console.log('tran', trans);
  console.log('worldMatrix', worldMatrix);
}

module.exports = {
  buildProjectionMatrix,
  buildWorldMatrix
}
