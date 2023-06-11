import {FaceMesh} from "@mediapipe/face_mesh";

class FaceMeshHelper {
  constructor(flipFace) {
    this.detectResolve = null;

    let _FaceMesh = FaceMesh;
    if (_FaceMesh === undefined) {
      console.log("FaceMesh undefined, using window.FaceMesh");
      _FaceMesh = window.FaceMesh;
    }

    this.faceMesh = new _FaceMesh({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${file}`;
    }});

    console.log("flipFace", flipFace);

    this.faceMesh.setOptions({
      maxNumFaces: 1,
      //refineLandmarks: true,
      refineLandmarks: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: flipFace
    });

    this.faceMesh.onResults((results) => {
      if (this.detectResolve) {
	this.detectResolve(results);
      }
    });
  }

  async detect(input) {
    const results = await new Promise((resolve, reject) => {
      this.detectResolve = resolve;
      this.faceMesh.send({image: input});
    });
    //console.log("facemesh helper resuts", results);
    return results;
  }
}

export {
 FaceMeshHelper
}
