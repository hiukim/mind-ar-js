const Worker = require("./compiler.worker.js");
const {buildImageList} = require('./image-target/image-list.js');
const msgpack = require('@msgpack/msgpack');
// TODO: better compression method. now grey image saved in pixels, which could be largere than original image

const CURRENT_VERSION = 1;

class Compiler {
  constructor() {
    this.data = null;
  }

  // input html Images
  compileImageTargets(images, progressCallback) {
    return new Promise((resolve, reject) => {
      const targetImages = [];
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const processCanvas = document.createElement('canvas');
        processCanvas.width = img.width;
        processCanvas.height = img.height;
        const processContext = processCanvas.getContext('2d');
        processContext.drawImage(img, 0, 0, img.width, img.height);
        const processData = processContext.getImageData(0, 0, img.width, img.height);

        const greyImageData = new Uint8Array(img.width * img.height);

        for (let i = 0; i < greyImageData.length; i++) {
          const offset = i * 4;
          greyImageData[i] = Math.floor((processData.data[offset] + processData.data[offset+1] + processData.data[offset+2])/3);
        }
        const targetImage = {data: greyImageData, height: img.height, width: img.width};
        targetImages.push(targetImage);
      }

      const worker = new Worker();
      worker.onmessage = (e) => {
	if (e.data.type === 'progress') {
	  progressCallback(e.data.percent);
	} else if (e.data.type === 'compileDone') {
	  const {list} = e.data;
	  this.data = [];
	  for (let i = 0; i < list.length; i++) {
	    this.data.push({
	      targetImage: list[i].targetImage,
	      imageList: list[i].imageList,
	      trackingData: list[i].trackingData,
	      matchingData: list[i].matchingData
	    });
	  }
	  resolve(this.data);
	}
      };
      worker.postMessage({type: 'compile', targetImages});
    });
  }

  // not exporting imageList because too large. rebuild this using targetImage
  exportData() {
    const dataList = [];
    for (let i = 0; i < this.data.length; i++) {
      dataList.push({
        targetImage: this.data[i].targetImage,
        trackingData: this.data[i].trackingData,
        matchingData: this.data[i].matchingData
      });
    }
    const buffer = msgpack.encode({
      v: CURRENT_VERSION,
      dataList
    });
    return buffer;
  }

  importData(buffer) {
    const content = msgpack.decode(new Uint8Array(buffer));
    //console.log("import", content);

    if (!content.v || content.v !== CURRENT_VERSION) {
      console.error("Your compiled .mind might be outdated. Please recompile");
      return [];
    }
    const {dataList} = content;
    this.data = [];
    for (let i = 0; i < dataList.length; i++) {
      const imageList = buildImageList(dataList[i].targetImage);
      this.data.push({
        imageList: imageList,
        targetImage: dataList[i].targetImage,
        trackingData: dataList[i].trackingData,
        matchingData: dataList[i].matchingData
      });
    }
    return this.data;
  }
}

module.exports = {
  Compiler
}
