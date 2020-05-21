const compute = (options) => {
  const {v1, v2} = options;
  let d = 0;
  for (let i = 0; i < v1.length; i++) {
    if (v1[i] !== v2[i]) d += 1;
  }
  return d;
}

module.exports = {
  compute
};
