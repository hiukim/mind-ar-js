import {defineConfig,build} from 'vite'
import * as fs from 'fs/promises';
import * as path from 'path';

const outDir = 'dist'

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
            external:(id)=>(id==='three'||id.includes('three/examples/jsm/')||id.includes('three/addons/')),
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
