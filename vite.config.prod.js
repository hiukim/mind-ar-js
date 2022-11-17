//import { resolve } from './webpack.config.dev.cjs';
import vitePluginRequire from "vite-plugin-require";
import {defineConfig} from 'vite'
/** @type {import('vite').UserConfig} */
export default defineConfig({
    mode: 'production',
    assetsInclude:'**/*.html',
    plugins:[vitePluginRequire({})],
    publicDir:false,
    build: {
        outDir: 'dist',
        copyPublicDir:false,
        lib: {
            fileName:"[name].prod",
            entry:'index.js',
            formats:["cjs","es"],
        },
        rollupOptions:{
            external:['three','@tensorflow/tfjs'],
            input:{
                'mindar-image': './src/image-target/index.js',
                'mindar-image-aframe': './src/image-target/aframe.js',
                'mindar-image-three': './src/image-target/three.js',
                'mindar-face': './src/face-target/index.js',
                'mindar-face-aframe': './src/face-target/aframe.js',
                'mindar-face-three': './src/face-target/three.js'
            }
        }
    }
});
