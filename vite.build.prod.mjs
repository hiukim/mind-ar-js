import * as path from 'path'
import {defineConfig} from 'vite'

const outDir='dist'

/** @type {import('vite').UserConfig} */
const moduleConfig= defineConfig({
    mode: 'production',
    assetsInclude:'**/*.html',
    plugins:[],
    publicDir:false,
    build: {
        outDir:outDir,
        copyPublicDir:false,
        lib: {
            fileName:"[name].prod",
            entry:'index.js',
            formats:["es"],
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



const imageAframeConfig= defineConfig({
    mode: 'production',
    publicDir:false,
    build: {
        outDir:outDir,
        emptyOutDir:false,
        copyPublicDir:false,
        lib: {
            fileName:"[name].prod",
            entry:'index.js',
            formats:["iife"],
        },
        rollupOptions:{
            external:['three'],
            input:{
                'mindar-image-aframe': './src/image-target/aframe.js',
            }
        }
    }
});
const faceAframeConfig= defineConfig({
    mode: 'production',
    assetsInclude:'**/*.html',
    plugins:[],
    publicDir:false,
    build: {
        outDir:outDir,
        emptyOutDir:false,
        copyPublicDir:false,
        lib: {
            fileName:"[name].prod",
            entry:'index.js',
            formats:["iife"],
        },
        rollupOptions:{
            external:['three'],
            input:{
                'mindar-face-aframe': './src/face-target/aframe.js'
            }
        }
    }
});
(async ()=>{
    
    await build(faceAframeConfig);
    await build(moduleConfig);
    await build(imageAframeConfig);
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