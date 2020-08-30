const {Controller} = require('./controller');
const {Compiler} = require('./compiler');
require('./aframe');

module.exports = window.MINDAR = {
  Controller,
  Compiler
}
