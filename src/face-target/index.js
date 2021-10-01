const {Controller} = require('./controller');
const {UI} = require('../ui/ui');

const e = {
  Controller, 
  UI
}

if (!window.MINDAR) {
  window.MINDAR = {};
}

window.MINDAR.FACE = e;

module.exports = e;
