import {defineConfig,build} from 'vite'
import * as fs from 'fs/promises';
import * as path from 'path';

const outDir = 'dist'

const externalMatcher = (id)=> (
    id.indexOf('@mediapipe/face_mesh') === 0
    ||id.indexOf('@msgpack/msgpack') === 0
    ||id.indexOf('@tensorflow/tfjs') === 0
    ||id.indexOf('canvas') === 0
    ||id.indexOf('ml-matrix') === 0
    ||id.indexOf('svd-js') === 0
    ||id.indexOf('three') === 0
    ||id.indexOf('tinyqueue') === 0
);

/** @type {import('vite').UserConfig} */
const moduleConfig= defineConfig({
    mode: 'production',
    publicDir:false,
    base:'./',
    build: {
        outDir:outDir,
        emptyOutDir:false,
        copyPublicDir:false,
        lib: {
            fileName:"[name].prod",
            entry:'index.js',
            formats:["es"],
        },
        rollupOptions:{
            external:externalMatcher,
            input:{
                'mindar-image': './src/image-target/index.js',
                'mindar-image-three': './src/image-target/three.js',
                'mindar-face': './src/face-target/index.js',
                'mindar-face-three': './src/face-target/three.js'
            }
        }
    },
    resolve:{
        alias:{
            'three/addons/':'three/examples/jsm/'
        }
    }
});
const faceAframeConfig=defineConfig({
    mode: 'production',
    build: {
        outDir: outDir,
        emptyOutDir:false,
        lib: {
            name:"MINDAR",
            fileName:"[name].prod",
            entry:'index.js',
            formats:['iife']
        },
        rollupOptions:{
            external:externalMatcher,
            input:{
                'mindar-face-aframe': './src/face-target/aframe.js',
            },
           
        }
    }
})
/** @type {import('vite').UserConfig} */
const imageAframeConfig=defineConfig({
    mode: 'production',
    build: {
        outDir: outDir,
        emptyOutDir:false,
        lib: {
            name:"MINDAR",
            fileName:"[name].prod",
            entry:'index.js',
            formats:['iife'],

        },
        rollupOptions:{
            external:externalMatcher,
            input:{
                'mindar-image-aframe': './src/image-target/aframe.js'
            }
        }
    }
})

export default defineConfig(async ({ command, mode }) => {
    await fs.rm(outDir,{recursive:true,force:true});
    if (command === 'build') {
        await build(imageAframeConfig);
        await build(faceAframeConfig);
        const files=await fs.readdir(outDir);
        //rename the aframe builds
        await Promise.all(files.map(async (filename)=>{
            if(filename.includes(".iife.js")){
                const newName=filename.replace(".iife.js",".js");
                console.log(filename,"->",newName)
                await fs.rename(path.join(outDir,filename),path.join(outDir,newName));
            }
        }));
    }
    return moduleConfig
  })
