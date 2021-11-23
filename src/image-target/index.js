const {Controller, WARMUP_COUNT_TOLERANCE, MISS_COUNT_TOLERANCE} = require('./controller');
const {Compiler} = require('./compiler');
const {UI} = require('../ui/ui');

const e = {
  Controller, 
  Compiler,
  UI,
  WARMUP_COUNT_TOLERANCE,
  MISS_COUNT_TOLERANCE
}

if (!window.MINDAR) {
  window.MINDAR = {};
}

window.MINDAR.IMAGE = e;

module.exports = e;
