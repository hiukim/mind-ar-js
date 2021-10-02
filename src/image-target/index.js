const {Controller} = require('./controller');
const {Compiler} = require('./compiler');
const {UI} = require('../ui/ui');

const e = {
  Controller, 
  Compiler,
  UI
}

if (!window.MINDAR) {
  window.MINDAR = {};
}

window.MINDAR.IMAGE = e;

module.exports = e;
