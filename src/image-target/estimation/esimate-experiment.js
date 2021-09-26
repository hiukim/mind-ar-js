// try to implement https://hal.inria.fr/inria-00174036/PDF/RR-6303.pdf
const {Matrix, inverse} = require('ml-matrix');
const {SVD} = require("svd-js");
const {solveHomography} = require('../utils/homography');
const {computeScreenCoordiate} = require("./utils");

const opposites_of_minors = (M, row, col) => {
  let x1 = col === 0? 1: 0;
  let x2 = col === 2? 1: 2;
  let y1 = row === 0? 1: 0;
  let y2 = row === 2? 1: 2;
  return M[y1][x2] * M[y2][x1] - M[y1][x1] * M[y2][x2];
}

const findRmatFrom_tstar_n = (H, tstar, n, v) => {
  // computes R = H( I - (2/v)*te_star*ne_t )
  const twoDivV = 2 / v;
  const tmp = [
    [1 - twoDivV * tstar[0] * n[0], 0 - twoDivV * tstar[0] * n[1], 0 - twoDivV * tstar[0] * n[2]],
    [0 - twoDivV * tstar[1] * n[0], 1 - twoDivV * tstar[1] * n[1], 0 - twoDivV * tstar[1] * n[2]],
    [0 - twoDivV * tstar[2] * n[0], 0 - twoDivV * tstar[2] * n[1], 1 - twoDivV * tstar[2] * n[2]],
  ];

  const R = [[0,0,0], [0,0,0], [0,0,0]];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
	R[i][j] += H[i][k] * tmp[k][j];
      }
    }
  }
  //const R = H.mmul( new Matrix(tmp));
  return R;
}

const estimate = ({screenCoords, worldCoords, projectionTransform}) => {
  const Harray = solveHomography(worldCoords.map((p) => [p.x, p.y]), screenCoords.map((p) => [p.x, p.y]));
  const G = new Matrix([
    [Harray[0], Harray[1], Harray[2]],
    [Harray[3], Harray[4], Harray[5]],
    [Harray[6], Harray[7], Harray[8]],
  ]);
  const K = new Matrix(projectionTransform);
  const KInv = inverse(K);
  const KInvArr = KInv.to2DArray();
  const KArr = K.to2DArray();

  const Hhat = KInv.mmul(G).mmul(K);
  const { q } = SVD(Hhat.to2DArray());

  const H = Hhat.div(q[1]);

  const HTH = H.transpose().mmul(H);
  const S = Matrix.sub(HTH, Matrix.eye(3, 3)).to2DArray();

  console.log("G", G);
  console.log("svd q", q);
  console.log("Hhat", Hhat);
  console.log("H", H);
  console.log("HTH", HTH);
  console.log("S", S);

  // M00, M11, M22
  const M00 = opposites_of_minors(S, 0, 0);
  const M11 = opposites_of_minors(S, 1, 1);
  const M22 = opposites_of_minors(S, 2, 2);
  const rtM00 = Math.sqrt(M00);
  const rtM11 = Math.sqrt(M11);
  const rtM22 = Math.sqrt(M22);

  // M01, M12, M02
  const M01 = opposites_of_minors(S, 0, 1);
  const e01 = M01 >= 0? 1: -1;
  const M12 = opposites_of_minors(S, 1, 2);
  const e12 = M12 >= 0? 1: -1;
  const M02 = opposites_of_minors(S, 0, 2);
  const e02 = M02 >= 0? 1: -1;

  let maxIndex = 0;
  if (Math.abs(S[1][1]) > Math.abs(S[maxIndex][maxIndex])) maxIndex = 1;
  if (Math.abs(S[2][2]) > Math.abs(S[maxIndex][maxIndex])) maxIndex = 2;

  console.log("rtM00", rtM00, rtM11, rtM22);
  console.log("M01", M01, M12, M02, e01, e12, e02);

  let npa = [0, 0, 0];
  let npb = [0, 0, 0];

  console.log("max index", maxIndex);
  if (maxIndex === 0) {
    npa[0] = npb[0] = S[0][0];
    npa[1] = S[0][1] + rtM22;
    npb[1] = S[0][1] - rtM22;
    npa[2] = S[0][2] + e12 * rtM11;
    npb[2] = S[0][2] - e12 * rtM11;
  } else if (maxIndex === 1) {
    npa[0] = S[0][1] + rtM22;
    npb[0] = S[0][1] - rtM22;
    npa[1] = npb[1] = S[1][1];
    npa[2] = S[1][2] - e02 * rtM00;
    npb[2] = S[1][2] + e02 * rtM00;
  } else if (maxIndex === 2) {
    npa[0] = S[0][2] + e01 * rtM11;
    npb[0] = S[0][2] - e01 * rtM11;
    npa[1] = S[1][2] + rtM00;
    npb[1] = S[1][2] - rtM00;
    npa[2] = npb[2] = S[2][2];
  }

  console.log("npa", npa);
  console.log("npb", npb);

  const traceS = S[0][0] + S[1][1] + S[2][2];
  const v = 2.0 * Math.sqrt(1 + traceS - M00 - M11 - M22);

  const ESii = S[maxIndex][maxIndex] >= 0? 1: -1

  const r_2 = 2 + traceS + v;
  const nt_2 = 2 + traceS - v;

  const r = Math.sqrt(r_2);
  const n_t = Math.sqrt(nt_2);

  console.log("r n_t", r, n_t);

  const npaNorm = Math.sqrt(npa[0] * npa[0] + npa[1] * npa[1] + npa[2] * npa[2]);
  const npbNorm = Math.sqrt(npb[0] * npb[0] + npb[1] * npb[1] + npb[2] * npb[2]);

  const na = [npa[0] / npaNorm, npa[1] / npaNorm, npa[2] / npaNorm];
  const nb = [npb[0] / npbNorm, npb[1] / npbNorm, npb[2] / npbNorm];

  console.log("na nb", na, nb);

  const half_nt = 0.5 * n_t;
  const esii_t_r = ESii * r;

  const ta_star = [];
  for (let i = 0; i < 3; i++) {
    ta_star[i] = half_nt * (esii_t_r * nb[i] - n_t * na[i]);
  }
  const tb_star = [];
  for (let i = 0; i < 3; i++) {
    tb_star[i] = half_nt * (esii_t_r * na[i] - n_t * nb[i]);
  }

  const HArr = H.to2DArray();
  console.log("ta_star", ta_star, tb_star);
 
  /*
    """solutions = []
    # Ra, ta
    R = findRmatFrom_tstar_n(H, ta_star, na, v)
    t = R.dot(ta_star)
    solutions.append((R, t, na))
    # Ra, -ta
    solutions.append((R, -t, -na))
    # Rb, tb
    R = findRmatFrom_tstar_n(H, tb_star, nb, v)
    t = R.dot(tb_star)
    solutions.append((R, t, nb))
    # Rb, -tb
    solutions.append((R, -t, -nb))
  */

  const findT = (R1, ta_star) => {
    const t = [
      R1[0][0] * ta_star[0] + R1[0][1] * ta_star[1] + R1[0][2] * ta_star[2],
      R1[1][0] * ta_star[0] + R1[1][1] * ta_star[1] + R1[1][2] * ta_star[2],
      R1[2][0] * ta_star[0] + R1[2][1] * ta_star[1] + R1[2][2] * ta_star[2]
    ]
    return t;
  }

  const Ra = findRmatFrom_tstar_n(HArr, ta_star, na, v);
  const ta = findT(Ra, ta_star);
  const nta = [-ta[0], -ta[1], -ta[2]];

  console.log("RaTRa", (new Matrix(Ra)).transpose().mmul((new Matrix(Ra))));

  const Rb = findRmatFrom_tstar_n(HArr, tb_star, nb, v);
  const tb = findT(Rb, tb_star);
  const ntb = [-tb[0], -tb[1], -tb[2]];

  const findModelViewProjectionTransform = (R, t) => {
    const transform = [
      [R[0][0], R[0][1], R[0][2], t[0]],
      [R[1][0], R[1][1], R[1][2], t[1]],
      [R[2][0], R[2][1], R[2][2], t[2]],
    ];
    return transform;

    const modelViewProjectionTransform = [[],[],[]];
    for (let j = 0; j < 3; j++ ) {
      for (let i = 0; i < 4; i++) {
	modelViewProjectionTransform[j][i] = KArr[j][0] * transform[0][i]
					   + KArr[j][1] * transform[1][i]
					   + KArr[j][2] * transform[2][i];
      }
    }
    return modelViewProjectionTransform;
  }
  console.log("Ra ta", Ra, ta);
  console.log("Rb tb", Rb, tb);

  const tnT = new Matrix([
    [ta[0] * na[0], ta[0] * na[1], ta[0] * na[2]], 
    [ta[1] * na[0], ta[1] * na[1], ta[1] * na[2]], 
    [ta[2] * na[0], ta[2] * na[1], ta[2] * na[2]], 
  ]);
  const RtnT = (new Matrix(Ra)).add(tnT);
  console.log("tnT", tnT);
  console.log("RtnT", RtnT);


  const modelViewProjectionTransforms = [];
  modelViewProjectionTransforms.push(findModelViewProjectionTransform(Ra, ta));
  modelViewProjectionTransforms.push(findModelViewProjectionTransform(Ra, nta));
  modelViewProjectionTransforms.push(findModelViewProjectionTransform(Rb, tb));
  modelViewProjectionTransforms.push(findModelViewProjectionTransform(Rb, ntb));

  const applyMatrix = (K, pt) => {
    let kx = K[0][0] * pt[0] + K[0][1] * pt[1] + K[0][2];
    let ky = K[1][0] * pt[0] + K[1][1] * pt[1] + K[1][2];
    let kz = K[2][0] * pt[0] + K[2][1] * pt[1] + K[2][2];
    kx /= kz;
    ky /= kz;
    return [kx, ky];
  }

  for (let s = 0; s < modelViewProjectionTransforms.length; s++) {
    console.log("solution", s);
    const modelViewProjectionTransform = modelViewProjectionTransforms[s];
    for (let i = 0; i < worldCoords.length; i++) {

      let world = applyMatrix(KInvArr, [worldCoords[i].x, worldCoords[i].y]);
      let world2 = applyMatrix(RtnT.to2DArray(), world);
      let screen = applyMatrix(KInvArr, [screenCoords[i].x, screenCoords[i].y]);

      console.log("map", worldCoords[i], screenCoords[i]);
      console.log("mapped", world, world2, screen);

      //const mapped = computeScreenCoordiate(modelViewProjectionTransform, worldCoords[i].x, worldCoords[i].y, 0);
      //console.log("mapped", worldCoords[i], screenCoords[i], mapped);
      //console.log("mapped", worldCoords[i], screenCoords[i], kx2, ky2, mapped);
    }
  }

  for (let s = 0; s < modelViewProjectionTransforms.length; s++) {
    console.log("mvp solution", s);
    const modelViewProjectionTransform = modelViewProjectionTransforms[s];
    for (let i = 0; i < worldCoords.length; i++) {
      let world = applyMatrix(KInvArr, [worldCoords[i].x, worldCoords[i].y]);
      let screen = applyMatrix(KInvArr, [screenCoords[i].x, screenCoords[i].y]);
      //const mapped = computeScreenCoordiate(modelViewProjectionTransform, worldCoords[i].x, worldCoords[i].y, 0);
      const mapped = computeScreenCoordiate(modelViewProjectionTransform, world[0], world[1], 0);
      console.log("mapped", worldCoords[i], screenCoords[i], world, screen, mapped);
    }
  }


  return null;

  /*

  const R1 = findRmatFrom_tstar_n(HArr, ta_star, na, v);
  const R2 = findRmatFrom_tstar_n(HArr, tb_star, nb, v);
  console.log("R1", R1);
  console.log("R2", R2);

  const t = [
    R1[0][0] * ta_star[0] + R1[0][1] * ta_star[1] + R1[0][2] * ta_star[2],
    R1[1][0] * ta_star[0] + R1[1][1] * ta_star[1] + R1[1][2] * ta_star[2],
    R1[2][0] * ta_star[0] + R1[2][1] * ta_star[1] + R1[2][2] * ta_star[2]
  ]

  const R = R2;

  const modelViewProjectionTransform = [
    [R[0][0], R[0][1], R[0][2], t[0]],
    [R[1][0], R[1][1], R[1][2], t[0]],
    [R[2][0], R[2][1], R[2][2], t[0]],
  ];
  */

  for (let i = 0; i < worldCoords.length; i++) {
    const mapped = computeScreenCoordiate(modelViewProjectionTransform, worldCoords[i].x, worldCoords[i].y, 0);
    console.log("mapped", worldCoords[i], screenCoords[i], mapped);
  }

  // this is the full computation if the projectTransform does not look like the expected format, but more computations
  const modelViewTransform = [[],[],[]];
  for (let j = 0; j < 3; j++ ) {
    for (let i = 0; i < 4; i++) {
      modelViewTransform[j][i] = KInvArr[j][0] * modelViewProjectionTransform[0][i]
			       + KInvArr[j][1] * modelViewProjectionTransform[1][i]
			       + KInvArr[j][2] * modelViewProjectionTransform[2][i];
    }
  }
  console.log("KInvArr", KInvArr);
  console.log("modelViewProjectionTransform", modelViewProjectionTransform);
  console.log("modelViewTransform", modelViewTransform);
  return modelViewTransform;
}

module.exports = {
  estimate,
}
