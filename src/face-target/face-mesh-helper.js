import * as vision from "@mediapipe/tasks-vision";
//import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

class FaceMeshHelper {
  constructor() {
  }
    
  async init() {
    const filesetResolver = await vision.FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm"
      //"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    this.faceLandmarker = await vision.FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      // outputFacialTransformationMatrixes: true,
      runningMode: "IMAGE",
      numFaces: 1
    });
  }

  async detect(input) {
    const faceLandmarkerResult = this.faceLandmarker.detect(input);
    return faceLandmarkerResult;
  }
}

export {
 FaceMeshHelper
}
