import {Controller} from './controller.js';
import {UI} from '../ui/ui.js';

export const e = {
  Controller, 
  UI
}

if (!window.MINDAR) {
  window.MINDAR = {};
}

window.MINDAR.FACE = e;


