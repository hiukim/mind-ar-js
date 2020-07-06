const {Engine} = require('./engine.js');

let _engine = null;

onmessage = (msg) => {
  const {data} = msg;
  if (data.type === 'setup') {
    const {options} = data;
    _engine = new Engine(options.inputWidth, options.inputHeight);
    postMessage({
      type: 'setupDone',
      projectionMatrix: _engine.getProjectionMatrix()
    });
  }
  else if (data.type === 'addImageTarget') {
    const {options} = data;
    _engine.addImageTarget(data.options);
    postMessage({type: 'addImageTargetDone'});
  }
  else if (data.type === 'process') {
    const {options} = data;
    const result = _engine.process(options.queryImage);
    postMessage({
      type: 'processDone',
      result: result
    });
  }
};
