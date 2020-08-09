const Worker = require("./ar.worker.js");
const {Engine} = require('./engine.js');

class Controller {
  constructor(options) {
    this.useworker = options.useworker !== undefined? options.useworker: true;
    if (!this.useworker) {
      return;
    }

    this.projectionMatrix = null;

    this.worker = new Worker();
    this.subscribers = {};
    this.worker.onmessage = (e) => {
      const {data} = e;
      const {type} = data;

      if (type === 'logTime') {
        logTime(data.title)
      }; // for debugging use only

      if (this.subscribers[type]) {
        this.subscribers[type](e);
      }
    }
  }

  setup(options) {
    if (!this.useworker) {
      this.engine = new Engine(options);
      this.projectionMatrix = this.engine.getProjectionMatrix();
      return;
    }

    this.worker.postMessage({type: 'setup', options});

    return new Promise((resolve, reject) => {
      this.subscribers['setupDone'] = (e) => {
        this.projectionMatrix = e.data.projectionMatrix;
        resolve();
      };
    });
  }

  getProjectionMatrix() {
    return this.projectionMatrix;
  }

  addImageTarget(options) {
    if (!this.useworker) {
      this.engine.addImageTarget(options);
      return;
    }

    this.worker.postMessage({type: 'addImageTarget', options});

    return new Promise((resolve, reject) => {
      this.subscribers['addImageTargetDone'] = () => {
        resolve();
      };
    });
  }

  process(video) {
    if (!this.useworker) {
      return this.engine.process(video);
    }

    this.worker.postMessage({type: 'process', options: {queryImageData: queryImageData}}, [queryImageData.buffer]);
    //this.worker.postMessage({type: 'process', options: {queryImageData: queryImageData}});

    return new Promise((resolve, reject) => {
      this.subscribers['processDone'] = (e) => {
        const result = e.data.result;
        resolve(result);
      };
    });
  }

}

module.exports = {
  Controller,
}
