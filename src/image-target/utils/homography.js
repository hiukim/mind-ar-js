import {Matrix, inverse} from 'ml-matrix';

const solveHomography = (srcPoints, dstPoints) => {
  const {normPoints: normSrcPoints, param: srcParam} = _normalizePoints(srcPoints);
  const {normPoints: normDstPoints, param: dstParam} = _normalizePoints(dstPoints);

  const num = normDstPoints.length;
  const AData = [];
  const BData = [];
  for (let j = 0; j < num; j++) {
    const row1 = [
      normSrcPoints[j][0],
      normSrcPoints[j][1],
      1,
      0,
      0,
      0,
      -(normSrcPoints[j][0] * normDstPoints[j][0]),
      -(normSrcPoints[j][1] * normDstPoints[j][0]),
    ];
    const row2 = [
      0,
      0,
      0,
      normSrcPoints[j][0],
      normSrcPoints[j][1],
      1,
      -(normSrcPoints[j][0] * normDstPoints[j][1]),
      -(normSrcPoints[j][1] * normDstPoints[j][1]),
    ];
    AData.push(row1);
    AData.push(row2);

    BData.push([normDstPoints[j][0]]);
    BData.push([normDstPoints[j][1]]);
  }

  try {
    const A = new Matrix(AData);
    const B = new Matrix(BData);
    const AT = A.transpose();
    const ATA = AT.mmul(A);
    const ATB = AT.mmul(B);
    const ATAInv = inverse(ATA);
    const C = ATAInv.mmul(ATB).to1DArray();
    const H = _denormalizeHomography(C, srcParam, dstParam);
    return H;
  } catch (e) {
    return null;
  }
}

// centroid at origin and avg distance from origin is sqrt(2)
const _normalizePoints = (coords) => {
  //return {normalizedCoords: coords, param: {meanX: 0, meanY: 0, s: 1}}; // skip normalization

  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < coords.length; i++) {
    sumX += coords[i][0];
    sumY += coords[i][1];
  }
  let meanX = sumX / coords.length;
  let meanY = sumY / coords.length;

  let sumDiff = 0;
  for (let i = 0; i < coords.length; i++) {
    const diffX = coords[i][0] - meanX;
    const diffY = coords[i][1] - meanY;
    sumDiff += Math.sqrt(diffX * diffX + diffY * diffY);
  }
  let s = Math.sqrt(2) * coords.length / sumDiff;

  const normPoints = [];
  for (let i = 0; i < coords.length; i++) {
    normPoints.push([
      (coords[i][0] - meanX) * s,
      (coords[i][1] - meanY) * s,
    ]);
  }
  return {normPoints, param: {meanX, meanY, s}};
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
// H = inv(Tdst) * Hn * Tsrc
//
// @param {
//   nH: normH,
//   srcParam: param of src transform,
//   dstParam: param of dst transform
// }
const _denormalizeHomography = (nH, srcParam, dstParam) => {
  /*
  Matrix version
  const normH = new Matrix([
    [nH[0], nH[1], nH[2]],
    [nH[3], nH[4], nH[5]],
    [nH[6], nH[7], 1],
  ]);
  const Tsrc = new Matrix([
    [1, 0, -srcParam.meanX],
    [0, 1, -srcParam.meanY],
    [0, 0,    1/srcParam.s],
  ]);

  const invTdst = new Matrix([
    [1, 0, dstParam.s * dstParam.meanX],
    [0, 1, dstParam.s * dstParam.meanY],
    [0, 0, dstParam.s],
  ]);
  const H = invTdst.mmul(normH).mmul(Tsrc);
  */

  // plain implementation of the above using Matrix
  const sMeanX = dstParam.s * dstParam.meanX;
  const sMeanY = dstParam.s * dstParam.meanY;

  const H = [
      nH[0] + sMeanX * nH[6], 
      nH[1] + sMeanX * nH[7],
      (nH[0] + sMeanX * nH[6]) * -srcParam.meanX + (nH[1] + sMeanX * nH[7]) * -srcParam.meanY + (nH[2] + sMeanX) / srcParam.s,
      nH[3] + sMeanY * nH[6], 
      nH[4] + sMeanY * nH[7],
      (nH[3] + sMeanY * nH[6]) * -srcParam.meanX + (nH[4] + sMeanY * nH[7]) * -srcParam.meanY + (nH[5] + sMeanY) / srcParam.s,
      dstParam.s * nH[6],
      dstParam.s * nH[7],
      dstParam.s * nH[6] * -srcParam.meanX + dstParam.s * nH[7] * -srcParam.meanY + dstParam.s / srcParam.s,
  ];

  // make H[8] === 1;
  for (let i = 0; i < 9; i++) {
    H[i] = H[i] / H[8];
  }
  return H;
}

export {
  solveHomography
}
