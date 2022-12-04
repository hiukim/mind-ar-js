import {cv} from './opencv.js'
let initialized = false;

const _cv = {};

const waitResolves = [];

export const waitCV = async() => {
  if (initialized) return true;
  return new Promise((resolve, reject) => {
    waitResolves.push(resolve);
  });
}

cv().then((target) => {
  initialized = true;
  Object.assign(_cv, target);
  waitResolves.forEach((resolve) => {
    resolve();
  });
});

export const opencv=_cv;
//module.exports={waitCV,opencv}
