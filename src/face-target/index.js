import {Controller} from './controller';
import {UI} from '../ui/ui';

const e = {
  Controller, 
  UI
}

if (!window.MINDAR) {
  window.MINDAR = {};
}

window.MINDAR.FACE = e;

module.exports = e;
