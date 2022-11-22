import {Controller} from './controller.js';
import {UI} from '../ui/ui.cjs';

export const e = {
  Controller, 
  UI
}

if (!window.MINDAR) {
  window.MINDAR = {};
}

window.MINDAR.FACE = e;


