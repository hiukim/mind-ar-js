import {Controller} from './controller';
import {UI} from '../ui/ui';

export const e = {
  Controller, 
  UI
}

if (!window.MINDAR) {
  window.MINDAR = {};
}

window.MINDAR.FACE = e;


