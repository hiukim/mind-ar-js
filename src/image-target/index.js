import {Controller} from './controller';
import {Compiler} from './compiler';
import {UI} from '../ui/ui';

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
