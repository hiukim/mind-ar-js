
import {defineConfig} from 'vite'
/** @type {import('vite').UserConfig} */
export default defineConfig({
    mode: 'production',
    assetsInclude:'**/*.html',
    plugins:[],
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
            external:['three'],
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