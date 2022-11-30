import * as tf from '@tensorflow/tfjs';
import {Detector} from './detector.js';
import {buildModelViewProjectionTransform, computeScreenCoordiate} from '../estimation/utils.js';

class CropDetector {
  constructor(width, height, debugMode=false) {
    this.debugMode = debugMode;
    this.width = width;
    this.height = height;

    // nearest power of 2, min dimensions 
    let minDimension = Math.min(width, height) / 2;
    let cropSize = Math.pow( 2, Math.round( Math.log( minDimension ) / Math.log( 2 ) ) ); 
    this.cropSize = cropSize;

    this.detector = new Detector(cropSize, cropSize, debugMode);

    this.kernelCaches = {};
    this.lastRandomIndex = 4;
  }

  detect(inputImageT) { // crop center
    const startY = Math.floor(this.height / 2 - this.cropSize / 2);
    const startX = Math.floor(this.width / 2 - this.cropSize / 2);
    const result = this._detect(inputImageT, startX, startY);

    if (this.debugMode) {
      result.debugExtra.crop = {startX, startY, cropSize: this.cropSize}; 
    }
    return result;
  }

  detectMoving(inputImageT) { // loop a few locations around center
    const dx = this.lastRandomIndex % 3;
    const dy = Math.floor(this.lastRandomIndex / 3);

    let startY = Math.floor(this.height / 2 - this.cropSize + dy * this.cropSize / 2);
    let startX = Math.floor(this.width / 2 - this.cropSize + dx * this.cropSize / 2);

    if (startX < 0) startX = 0;
    if (startY < 0) startY = 0;
    if (startX >= this.width - this.cropSize) startX = this.width - this.cropSize - 1;
    if (startY >= this.height - this.cropSize) startY = this.height - this.cropSize - 1;

    this.lastRandomIndex = (this.lastRandomIndex + 1) % 9;

    const result = this._detect(inputImageT, startX, startY);
    return result;
  }

  _detect(inputImageT, startX, startY) {
    const cropInputImageT = inputImageT.slice([startY, startX], [this.cropSize, this.cropSize]);
    const {featurePoints, debugExtra} = this.detector.detect(cropInputImageT);
    featurePoints.forEach((p) => {
      p.x += startX;
      p.y += startY;
    });
    if (this.debugMode) {
      debugExtra.projectedImage = cropInputImageT.arraySync();
    }
    cropInputImageT.dispose();
    return {featurePoints: featurePoints, debugExtra};
  }
}

export {
  CropDetector
};
