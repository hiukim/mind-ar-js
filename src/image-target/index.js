import {Controller} from './controller.js';
import {Compiler} from './compiler.js';
import {UI} from '../ui/ui.js';

export {
  Controller, 
  Compiler,
  UI
}

if (!window.MINDAR) {
  window.MINDAR = {};
}

window.MINDAR.IMAGE = {
  Controller, 
  Compiler,
  UI
};
