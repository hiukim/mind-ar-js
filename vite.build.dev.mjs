import * as path from 'path'
import {defineConfig,build} from 'vite'
import * as fs from 'fs/promises'

const outDir = 'dist-dev'

const faceAframeConfig=defineConfig({
    mode: 'development',
    build: {
        outDir: outDir,
        sourcemap:'inline' ,
        lib: {
            name:"MINDAR",
            fileName:"[name]",
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
    mode: 'development',
    build: {
        outDir: outDir,
        emptyOutDir:false,
        sourcemap:'inline' ,
        lib: {
            name:"MINDAR",
            fileName:"[name]",
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

/** @type {import('vite').UserConfig} */
const moduleConfig= defineConfig({
    mode: 'development',
    assetsInclude:'**/*.html',
    plugins:[],
    build: {
        outDir: outDir,
        emptyOutDir:false,
        sourcemap:'inline' ,
        lib: {
            name:"MINDAR",
            fileName:"[name]",
            entry:'index.js',
            formats:['es']
        },
        rollupOptions:{
            external:['three','three/examples/jsm/'],
            input:{
                'mindar-image': './src/image-target/index.js',
                /* 'mindar-image-aframe': './src/image-target/aframe.js', */
                'mindar-image-three': './src/image-target/three.js',
                'mindar-face': './src/face-target/index.js',
                /* 'mindar-face-aframe': './src/face-target/aframe.js', */
                'mindar-face-three': './src/face-target/three.js',
            }
        }
    }
});
(async ()=>{
    console.log("Building mindar-image-aframe...");
    await build(faceAframeConfig);
    console.log("Building modules...");
    await build(moduleConfig);
    console.log("Building mindar face-aframe");
    await build(imageAframeConfig);
    console.log("Renaming iife builds")
    const files=await fs.readdir(outDir);
    Promise.all(files.map(async (filename)=>{
        const cutIndex=filename.indexOf(".iife.js")
        if(cutIndex>-1){
            const newName=filename.replace(".iife.js",".js");
            console.log(filename,"->",newName)
            await fs.rename(path.join(outDir,filename),path.join(outDir,newName));
        }
    }));
})().then(()=>console.log("Done."));
