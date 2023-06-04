Mac (node v18) failed to install node-canvas

> brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman

Ref: https://github.com/Automattic/node-canvas/issues/2025


Import MindAR in ESBuild

If you are using esbuild and running into require errors, you can try importing the classes directly

Example: 

`import {MindARThree} from 'mind-ar/src/image-target/three.js'`

You'll need to use the esbuild-plugin-inline-worker

Ref issue: https://github.com/hiukim/mind-ar-js/issues/360