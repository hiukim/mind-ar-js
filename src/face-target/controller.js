const THREE = require("three");
const {FaceMeshFaceGeometry} = require('./face-mesh-face-geometry/face');
const faceLandmarksDetection = require('@tensorflow-models/face-landmarks-detection');
require('@tensorflow/tfjs-backend-webgl');

class Controller {
  constructor() {
    this.inputSize = null;
    this.displaySize = null;
    this.rotation = null; // face rotation of last detection
    this.scale = null; // face scale of last detection
    this.faceGeometry = null; // for anchor positions
    this.customFaceGeometries = [];
  }

  async setup() {
    this.model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
    this.faceGeometry = new FaceMeshFaceGeometry({ useVideoTexture: true });
  }

  createFaceGeoemtry() {
    const faceGeometry = new FaceMeshFaceGeometry({ useVideoTexture: false });
    this.customFaceGeometries.push(faceGeometry);
    return faceGeometry;
  }

  setInputSize(w, h) {
    this.inputSize = {w, h};
  }

  setDisplaySize(w, h) {
    this.displaySize = {w, h};

    if (this.faceGeometry) {
      this.faceGeometry.setSize(w, h);
    }
    for (let i = 0; i < this.customFaceGeometries.length; i++) {
      this.customFaceGeometries[i].setSize(w, h);
    }
  }

  async detect(input) {
    const faces = await this.model.estimateFaces({input});

    if (faces.length > 0) {
      if (this.inputSize && this.displaySize) { // for video input, input dimension sent to model.estimate is different from the css style dimension
	faces[0].scaledMesh.forEach((p) => {
	  p[0] = p[0] * this.displaySize.w / this.inputSize.w;
	  p[1] = p[1] * this.displaySize.h / this.inputSize.h;
	});
      }

      // Update face mesh geometry with new data.
      this.faceGeometry.update(faces[0]);
      for (let i = 0; i < this.customFaceGeometries.length; i++) {
	this.customFaceGeometries[i].update(faces[0]);
      }

      // use maxX and minX for scaling
      // maybe just pick the leftmost landmark and rightmost landmark
      let minX = 1000000;
      let maxX = -1000000;
      for (let i = 0; i < this.faceGeometry.positions.length; i+=3) {
	minX = Math.min(minX, this.faceGeometry.positions[i]);
	maxX = Math.max(maxX, this.faceGeometry.positions[i]);
      }
      this.scale = {
	x: (maxX - minX),
	y: (maxX - minX),
	z: (maxX - minX),
      };

      // use orientation of two eyes for rotation. have better way?
      const trackLeftEye = this.faceGeometry.track(225, 193, 230);
      const trackRightEye = this.faceGeometry.track(417, 445, 450);
      const dx = trackRightEye.position.x - trackLeftEye.position.x;
      const dy = trackRightEye.position.y - trackLeftEye.position.y;
      const dz = trackRightEye.position.z - trackLeftEye.position.z;
      const rotationX = Math.atan2(dz/2, dx/2);
      const rotationY = Math.atan2(-dz/2, dx/2);
      const rotationZ = Math.atan2(dy/2, dx/2);

      this.rotation = {x: rotationX, y: rotationY, z: rotationZ};

      return true;
    }

    return false;
  }

  getLandmarkProperties(landmarkIndex) {
    const position = {
      x: this.faceGeometry.positions[landmarkIndex * 3], 
      y: this.faceGeometry.positions[landmarkIndex * 3 + 1], 
      z: this.faceGeometry.positions[landmarkIndex * 3 + 2], 
    }
    return {
      position,
      rotation: this.rotation,
      scale: this.scale
    }
  }
}

module.exports = {
 Controller
}
