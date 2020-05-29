const {createRandomizer} = require('./randomizer.js');
const {checkThreePointsConsistent, checkFourPointsConsistent, determinant} = require('./geometry.js');

const EPSILON = 0.000000001;
const SQRT2 = 1.41421356237309504880;
const HOMOGRAPHY_DEFAULT_CAUCHY_SCALE = 0.01;
const HOMOGRAPHY_DEFAULT_NUM_HYPOTHESES = 1024;
const HOMOGRAPHY_DEFAULT_MAX_TRIALS = 1064;
const HOMOGRAPHY_DEFAULT_CHUNK_SIZE = 50;

const computeHomography = (options) => {
  const {srcPoints, dstPoints, testPoints, debugQuerykeyframe} = options;

  const sampleSize = 4; // use four points to compute homography
  if (srcPoints.length < sampleSize) return null;

  const scale = HOMOGRAPHY_DEFAULT_CAUCHY_SCALE;
  const oneOverScale2 = 1.0 / (scale * scale);
  const chuckSize = Math.min(HOMOGRAPHY_DEFAULT_CHUNK_SIZE, srcPoints.length);

  const randomizer = createRandomizer();

  const perm = [];
  for (let i = 0; i < srcPoints.length; i++) {
    perm[i] = i;
  }

  randomizer.arrayShuffle({arr: perm, sampleSize: perm.length});

  let debugIndex = 0;

  let trial = 0;
  let numHypotheses = 0;
  while (trial < HOMOGRAPHY_DEFAULT_MAX_TRIALS && numHypotheses < HOMOGRAPHY_DEFAULT_NUM_HYPOTHESES) {

    randomizer.arrayShuffle({arr: perm, sampleSize: sampleSize});

    trial +=1;

    if (!checkFourPointsConsistent(
      srcPoints[perm[0]], srcPoints[perm[1]], srcPoints[perm[2]], srcPoints[perm[3]],
      dstPoints[perm[0]], dstPoints[perm[1]], dstPoints[perm[2]], dstPoints[perm[3]])) {
      continue;
    }

    const debugMyPoints = [
      srcPoints[perm[0]],
      srcPoints[perm[1]],
      srcPoints[perm[2]],
      srcPoints[perm[3]],
      dstPoints[perm[0]],
      dstPoints[perm[1]],
      dstPoints[perm[2]],
      dstPoints[perm[3]],
    ];
    const debugCorrectPoints = [
      debugQuerykeyframe.homography[debugIndex].x1,
      debugQuerykeyframe.homography[debugIndex].x2,
      debugQuerykeyframe.homography[debugIndex].x3,
      debugQuerykeyframe.homography[debugIndex].x4,
      debugQuerykeyframe.homography[debugIndex].xp1,
      debugQuerykeyframe.homography[debugIndex].xp2,
      debugQuerykeyframe.homography[debugIndex].xp3,
      debugQuerykeyframe.homography[debugIndex].xp4,
    ];
    //console.log(debugMyPoints, debugCorrectPoints);
    for (let i = 0; i < debugMyPoints.length; i++) {
      if (Math.abs(debugMyPoints[i][0] - debugCorrectPoints[i][0]) > 0.001 || Math.abs(debugMyPoints[i][1] - debugCorrectPoints[i][1]) > 0.001) {
        console.log("INCORRECT homography input points");
        console.log("homography input 1: ", debugQuerykeyframe.homography[debugIndex]);
        console.log("homography input 2: ", {
          x1: srcPoints[perm[0]],
          x2: srcPoints[perm[1]],
          x3: srcPoints[perm[2]],
          x4: srcPoints[perm[3]],
          xp1: dstPoints[perm[0]],
          xp2: dstPoints[perm[1]],
          xp3: dstPoints[perm[2]],
          xp4: dstPoints[perm[3]],
        })
      }
    }

    const H = _solveHomographyFourPoints({
      srcPoints: [srcPoints[perm[0]], srcPoints[perm[1]], srcPoints[perm[2]], srcPoints[perm[3]]],
      dstPoints: [dstPoints[perm[0]], dstPoints[perm[1]], dstPoints[perm[2]], dstPoints[perm[3]]],
      debugHomography: debugQuerykeyframe.homography[debugIndex]
    });
    //console.log("H: ", JSON.stringify(H), JSON.stringify(debugQuerykeyframe.homography[debugIndex].H));

    debugIndex += 1;

    if (H === null) continue;

    //console.log("consistent: ", _checkHomographyPointsGeometricallyConsistent({H, testPoints}), debugQuerykeyframe.homography[debugIndex-1].consistent);

    if(!_checkHomographyPointsGeometricallyConsistent({H, testPoints})) {
      continue;
    }

    numHypotheses += 1;
  }
  console.log("debug index: ", debugIndex, debugQuerykeyframe.homography.length);
}

const _checkHomographyPointsGeometricallyConsistent = ({H, testPoints}) => {
  const mappedPoints = [];
  for (let i = 0; i < testPoints.length; i++) {
    mappedPoints[i] = _multiplyPointHomographyInhomogenous({H, x: testPoints[i]});
    //console.log("map", testPoints[i], mappedPoints[i], H);
  }
  for (let i = 0; i < testPoints.length; i++) {
    const i1 = i;
    const i2 = (i+1) % testPoints.length;
    const i3 = (i+2) % testPoints.length;
    if (!checkThreePointsConsistent(
      testPoints[i1], testPoints[i2], testPoints[i3],
      mappedPoints[i1], mappedPoints[i2], mappedPoints[i3])) return false;
  }
  return true;
}

const _multiplyPointHomographyInhomogenous = ({x, H}) => {
  const w = H[6]*x[0] + H[7]*x[1] + H[8];
  const xp = [];
  xp[0] = (H[0]*x[0] + H[1]*x[1] + H[2])/w;
  xp[1] = (H[3]*x[0] + H[4]*x[1] + H[5])/w;
  return xp;
}

// Condition four 2D points such that the mean is zero and the standard deviation is sqrt(2).
const _condition4Points2d = ({x1, x2, x3, x4}) => {
  const mu = [];
  const d1 = [];
  const d2 = [];
  const d3 = [];
  const d4 = [];

  mu[0] = (x1[0]+x2[0]+x3[0]+x4[0])/4;
  mu[1] = (x1[1]+x2[1]+x3[1]+x4[1])/4;

  d1[0] = x1[0]-mu[0];
  d1[1] = x1[1]-mu[1];
  d2[0] = x2[0]-mu[0];
  d2[1] = x2[1]-mu[1];
  d3[0] = x3[0]-mu[0];
  d3[1] = x3[1]-mu[1];
  d4[0] = x4[0]-mu[0];
  d4[1] = x4[1]-mu[1];

  const ds1 = Math.sqrt(d1[0]*d1[0]+d1[1]*d1[1]);
  const ds2 = Math.sqrt(d2[0]*d2[0]+d2[1]*d2[1]);
  const ds3 = Math.sqrt(d3[0]*d3[0]+d3[1]*d3[1]);
  const ds4 = Math.sqrt(d4[0]*d4[0]+d4[1]*d4[1]);
  const d = (ds1+ds2+ds3+ds4)/4;

  if (d == 0) return null;

  const s = (1.0/d)*SQRT2;

  const xp1 = [];
  const xp2 = [];
  const xp3 = [];
  const xp4 = [];

  xp1[0] = d1[0]*s;
  xp1[1] = d1[1]*s;
  xp2[0] = d2[0]*s;
  xp2[1] = d2[1]*s;
  xp3[0] = d3[0]*s;
  xp3[1] = d3[1]*s;
  xp4[0] = d4[0]*s;
  xp4[1] = d4[1]*s;

  return {xp1, xp2, xp3, xp4, s, t: mu};
}

const _solveHomographyFourPoints = ({srcPoints, dstPoints, debugHomography}) => {
  const res1 = _condition4Points2d({x1: srcPoints[0], x2: srcPoints[1], x3: srcPoints[2], x4: srcPoints[3]});

  if (res1 === null) return null;

  //console.log('res1', res1, {x1p: debugHomography.x1p, x2p: debugHomography.x2p, x3p: debugHomography.x3p, x4p: debugHomography.x4p, s: debugHomography.s, t: debugHomography.t});

  const res2 = _condition4Points2d({x1: dstPoints[0], x2: dstPoints[1], x3: dstPoints[2], x4: dstPoints[3]});
  if (res2 === null) return null;

  //console.log('res2', res2, {x1p: debugHomography.xp1p, x2p: debugHomography.xp2p, x3p: debugHomography.xp3p, x4p: debugHomography.xp4p, s: debugHomography.sp, t: debugHomography.tp});

  const Hn = _solveHomography4PointsInhomogenous({
    x1: res1.xp1, x2: res1.xp2, x3: res1.xp3, x4: res1.xp4,
    xp1: res2.xp1, xp2: res2.xp2, xp3: res2.xp3, xp4: res2.xp4,
    debugHomography
  });

  //console.log('Hn:', Hn, debugHomography.Hn);

  if (Hn === null) return null;

  //console.log('det Hn:', determinant(Hn), Math.abs(determinant(Hn)), debugHomography.detH, debugHomography.detHAbs);

  if (Math.abs(determinant(Hn)) < EPSILON) return null;

  const H = _denomalizeHomography({H: Hn, s: res1.s, t: res1.t, sp: res2.s, tp: res2.t});
  for (let i = 0; i < H.length; i++) if ( Math.abs(H[i] - debugHomography.H) > 0.000001) console.log("incorrect H", H, debugHomography.H);
  //console.log('H:', H, debugHomography.H);

  return H;
}

// denormalize homography
// Hp = inv(Tp)*H*T
const _denomalizeHomography = ({H, s, t, sp, tp}) => {
  const a = H[6]*tp[0];
  const b = H[7]*tp[0];
  const c = H[0]/sp;
  const d = H[1]/sp;
  const apc = a+c;
  const bpd = b+d;

  const e = H[6]*tp[1];
  const f = H[7]*tp[1];
  const g = H[3]/sp;
  const h = H[4]/sp;
  const epg = e+g;
  const fph = f+h;

  const stx = s*t[0];
  const sty = s*t[1];

  const Hp = [];
  Hp[0] = s*apc;
  Hp[1] = s*bpd;
  Hp[2] = H[8]*tp[0] + H[2]/sp - stx*apc - sty*bpd;

  Hp[3] = s*epg;
  Hp[4] = s*fph;
  Hp[5] = H[8]*tp[1] + H[5]/sp - stx*epg - sty*fph;

  Hp[6] = H[6]*s;
  Hp[7] = H[7]*s;
  Hp[8] = H[8] - Hp[6]*t[0] - Hp[7]*t[1];

  return Hp;
};

const _solveHomography4PointsInhomogenous = ({x1, x2, x3, x4, xp1, xp2, xp3, xp4, debugHomography}) => {
  const xList = [x1, x2, x3, x4];
  const xpList = [xp1, xp2, xp3, xp4];

  const A = []; // 8 x 9
  for (let i = 0; i < 4; i++) {
    const offset = i * 18;
    const x = xList[i];
    const xp = xpList[i];
    A[offset+0] = -x[0];
    A[offset+1] = -x[1];
    A[offset+2] = -1;
    A[offset+3] = 0;
    A[offset+4] = 0;
    A[offset+5] = 0;
    A[offset+6] = xp[0]*x[0];
    A[offset+7] = xp[0]*x[1];
    A[offset+8] = xp[0];
    A[offset+9] = 0;
    A[offset+10] = 0;
    A[offset+11] = 0;
    A[offset+12] = -x[0];
    A[offset+13] = -x[1];
    A[offset+14] = -1;
    A[offset+15] = xp[1]*x[0];
    A[offset+16] = xp[1]*x[1];
    A[offset+17] = xp[1];
  }

  //console.log("A", JSON.stringify(A));
  //console.log("A", JSON.stringify(debugHomography.A));
  for (let k = 0; k < 72; k++) if (Math.abs(A[k] - debugHomography.A[k]) > 0.0001) console.log("A wrong: ", k, A[k], debugHomography.A[k]);

  const Q = [];
  for (let i = 0; i < 72; i++) {
    Q[i] = A[i];
  }

  // solve x for Ax=0 with QR decomposition with Gram-Schmidt
  for (let row = 0; row < 8; row++) {
    if (row > 0) {
      for (let j = row; j < 8; j++) {
        // project a vector "a" onto a normalized basis vector "e".
        // x = x - dot(a,e)*e

        let d = 0; // dot(a, e);
        for (let i = 0; i < 9; i++) {
          d += Q[(row-1) * 9 + i] * A[j * 9 + i];
        }

        for (let i = 0; i < 9; i++) {
          Q[j * 9 + i] -= d * Q[ (row-1) * 9 + i];
        }
      }
    }

    let maxValue = -1;
    let maxRow = -1;
    const ss = [];
    for (let j = row; j < 8; j++) {
      ss[j] = 0;
      for (let i = 0; i < 9; i++) {
        ss[j] += (Q[j*9+i] * Q[j*9+i]);
      }
      if (ss[j] > maxValue) {
        maxValue = ss[j];
        maxRow = j;
      }
    }
    //console.log("ssmax: ", ss[maxRow]);
    if ( Math.abs(ss[maxRow]) < EPSILON) {
      if (debugHomography['Q'+(row+1)].length > 0) {
        console.log("INCORRECT. should not return");
      }
      return null; // no solution
    }
    if (debugHomography['Q'+(row+1)].length === 0) {
      console.log("INCORRECT. should return");
    }

    // swap current row with maxindex row
    if (row !== maxRow) {
      for (let i = 0; i < 9; i++) {
        let tmp = A[row * 9 + i];
        A[row * 9 + i] = A[maxRow * 9 + i];
        A[maxRow * 9 + i] = tmp;

        let tmp2 = Q[row * 9 + i];
        Q[row * 9 + i] = Q[maxRow * 9 + i];
        Q[maxRow * 9 + i] = tmp2;
      }
    }

    for (let i = 0; i < 9; i++) {
      Q[row * 9 + i] = 1.0 * Q[row * 9 + i] / Math.sqrt(ss[maxRow]);
    }

    //console.log("ss", row, JSON.stringify(ss));
    //console.log("A", row, JSON.stringify(A));
    //console.log("Q", row, JSON.stringify(Q));
    //console.log("Q", row, JSON.stringify(debugHomography['Q'+(row+1)]));
    for (let k = 0; k < 72; k++) if (Math.abs(Q[k] - debugHomography['Q'+(row+1)][k]) > 0.0001) console.log("Q wrong: ", row, k, Q[k], debugHomography['Q'+(row+1)][k]);
  }

  // compute x from Q
  const w = [];
  const X = [];
  for (let row = 0; row < 8; row++) {
    for (let i = 0; i < 9; i++) {
      X[row * 9 + i] = (Q[i] * -Q[row]);
    }
    X[row * 9 + row] = 1 + X[row * 9 + row];

    for (let j = 1; j < 8; j++) {
      for(let i = 0; i < 9; i++) {
        X[row * 9 + i] += (Q[j * 9 + i] * -Q[j * 9 + row]);
      }
    }

    let ss = 0;
    for (let i = 0; i < 9; i++) {
      ss += (X[row * 9 + i] * X[row * 9 + i]);
    }
    if (Math.abs(ss) < EPSILON) {
      w[row] = 0;
      continue;
    }

    w[row] = Math.sqrt(ss);
    for (let i = 0; i < 9; i++) {
      X[row * 9 + i] = X[row * 9 + i] / w[row];
    }
  }

  let maxRow = -1;
  let maxValue = -1;
  for (let j = 0; j < 8; j++) {
    if (w[j] > maxValue) {
      maxRow = j;
      maxValue = w[j];
    }
  }

  if (maxValue == 0) return null; // no solution

  const x = [];
  for (let i = 0; i < 9; i++) {
    x[i] = X[maxRow * 9 + i];
  }

  return x;
}

module.exports = {
  computeHomography
}
