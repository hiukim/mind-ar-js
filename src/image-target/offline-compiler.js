import {Compiler} from './compiler.js'
import './detector/kernels/cpu/index.js'
export class OfflineCompiler extends Compiler{
    constructor(){
        super(true);
    }
}