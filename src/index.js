const {Controller} = require('./controller');
//const {Controller} = require('./controller2');
const {Compiler} = require('./compiler');
require('./aframe');

module.exports = window.MINDAR = {
  Controller,
  Compiler
}
