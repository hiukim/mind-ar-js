const {Matrix, inverse} = mlMatrix;

const findT = (R1, ta_star) => {
  const t = [
    R1[0][0] * ta_star[0] + R1[0][1] * ta_star[1] + R1[0][2] * ta_star[2],
    R1[1][0] * ta_star[0] + R1[1][1] * ta_star[1] + R1[1][2] * ta_star[2],
    R1[2][0] * ta_star[0] + R1[2][1] * ta_star[1] + R1[2][2] * ta_star[2]
  ]
  return t;
}

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

const _G = [
  [0.6178675488191478, -0.06653812535267324, 310.2045130502907],
  [0.01032247495848815, 0.42793361261944324, 1023.296502744141],
  [0.000012154067000202596, -0.00013388001953606625, 1]
];
const _K = [
  [2317.6450198781713, 0, 540],
  [0, 2317.6450198781713, 960],
  [0, 0, 1]
]

const G = new Matrix(_G);
const K = new Matrix(_K);
const KInv = inverse(K);

const Hhat = KInv.mmul(G).mmul(K);
const { q } = SVDJS.SVD(Hhat.to2DArray());

const H = Hhat.div(q[1]);

const HTH = H.transpose().mmul(H);
const S = Matrix.sub(HTH, Matrix.eye(3, 3)).to2DArray();

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

const Ra = findRmatFrom_tstar_n(HArr, ta_star, na, v);
const ta = findT(Ra, ta_star);

const Rb = findRmatFrom_tstar_n(HArr, tb_star, nb, v);
const tb = findT(Rb, tb_star);

console.log("Ra ta", Ra, ta);
console.log("Rb tb", Rb, tb);


/*
const R1 = findRmatFrom_tstar_n(HArr, ta_star, na, v);
const R2 = findRmatFrom_tstar_n(HArr, tb_star, nb, v);
console.log("R1", R1);
console.log("R2", R2);

const t = [
  [R1[0][0] * ta_star[0] + R1[0][1] * ta_star[1] + R1[0][2] * ta_star[2]],
  [R1[1][0] * ta_star[0] + R1[1][1] * ta_star[1] + R1[1][2] * ta_star[2]],
  [R1[2][0] * ta_star[0] + R1[2][1] * ta_star[1] + R1[2][2] * ta_star[2]],
]

console.log("t", t);

*/
