import {Controller} from './controller.js';
import {Compiler} from './compiler.js';
import {UI} from '../ui/ui.cjs';

const e = {
  Controller, 
  Compiler,
  UI
}

if (!window.MINDAR) {
  window.MINDAR = {};
}

window.MINDAR.IMAGE = e;

export default e;
