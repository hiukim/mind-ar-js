
import {defineConfig} from 'vite'
/** @type {import('vite').UserConfig} */
export default defineConfig({
    mode: 'development',
    assetsInclude:'**/*.html',
    plugins:[],
    build: {
        outDir: 'dist-dev',
        sourcemap:'inline' ,
        lib: {
            fileName:"[name]",
            entry:'index.js',
            formats:["cjs",'es']
        },
        rollupOptions:{
            external:['three','three/examples/jsm/'],
            input:{
                'mindar-image': './src/image-target/index.js',
                'mindar-image-aframe': './src/image-target/aframe.js',
                'mindar-image-three': './src/image-target/three.js',
                'mindar-face': './src/face-target/index.js',
                'mindar-face-aframe': './src/face-target/aframe.js',
                'mindar-face-three': './src/face-target/three.js',
            }
        }
    },
    resolve:{
        alias: {
            '@tensorflow/tfjs$':
                path.resolve(__dirname, './custom_tfjs/custom_tfjs.js'),
            '@tensorflow/tfjs-core$': path.resolve(
                __dirname, './custom_tfjs/custom_tfjs_core.js'),
          
        }
    }
});