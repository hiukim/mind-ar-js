const cv = require("../libs/opencv.js");

let initialized = false;

const _cv = {};

const waitResolves = [];

const waitCV = async() => {
  if (initialized) return true;
  return new Promise((resolve, reject) => {
    waitResolves.push(resolve);
  });
}

cv.then((target) => {
  initialized = true;
  Object.assign(_cv, target);
  waitResolves.forEach((resolve) => {
    resolve();
  });
});

module.exports = {
  cv: _cv,
  waitCV,
}
