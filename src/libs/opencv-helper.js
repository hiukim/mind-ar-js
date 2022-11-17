import * as opencv from "../libs/opencv.js";

let initialized = false;

const _cv = {};

const waitResolves = [];

export const waitCV = async() => {
  if (initialized) return true;
  return new Promise((resolve, reject) => {
    waitResolves.push(resolve);
  });
}

opencv.then((target) => {
  initialized = true;
  Object.assign(_cv, target);
  waitResolves.forEach((resolve) => {
    resolve();
  });
});

export const cv=_cv;
