# MindAR

For location-based AR and marker-based AR, checkout AR.js https://github.com/AR-js-org/AR.js

<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/multi-targets-demo-8b5fc868f6b0847a9818e8bf0ba2c1c3.gif" height="250"><img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/interactive-demo-1ab348a381cbd808f4d52c8750524d11.gif" height="250"><img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/face-tryon-demo-1e3433ff1dd89795d5c1b385778a9da8.gif" height="250">

MindAR is a lightweight library for web augmented reality. Highlighted features include:

:star: Support Image tracking and Face tracking

:star: Written in pure javascript, end-to-end from the underlying computer vision engine to frontend

:star: Utilize gpu (through webgl) and web worker for performance

:star: Developer friendly. Easy to setup. With AFRAME extension, you can get your app starts with only 10 lines of codes

# Web AR Development Course - Fund Raising

To raise fund for the continuous development and support of the MindAR Library, I've created a WebAR development course. It's a very comprehensive guide to Web AR development, not limited to MindAR. Check it out if you are interested:

https://www.udemy.com/course/introduction-to-web-ar-development/?referralCode=D2565F4CA6D767F30D61

![course-banner](https://user-images.githubusercontent.com/459126/141425015-f5fe2912-b26d-4366-8952-5866a072fb34.jpg)

# Managed Solution - Pictarize

This opensource project is under MIT, so you are free to use however you want. There is also a hosted platform built on top of this library called Pictarize, which allows you to build and publish apps directly online. Check it out if you are interested!

https://pictarize.com

<img src="https://drive.google.com/uc?export=view&id=1ygYyPpyvnxyofrIsRQP5oU-iFLu_xABa" border="10"/>

# Documentation

Official Documentation: https://hiukim.github.io/mind-ar-js-doc

# Demo - Try it yourself

### Image Tracking - Basic Example
<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/basic-demo-fde07aa7567bf213e61b37dbaa192fec.gif" width="300">

Demo video: https://youtu.be/hgVB9HpQpqY, 

Try it yourself: https://hiukim.github.io/mind-ar-js-doc/examples/basic/

### Image Tracking - Multiple Targets Example
<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/multi-targets-demo-8b5fc868f6b0847a9818e8bf0ba2c1c3.gif" width="300">

Try it yourself: https://hiukim.github.io/mind-ar-js-doc/examples/multi-tracks

### Image Tracking - Interactive Example
<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/interactive-demo-1ab348a381cbd808f4d52c8750524d11.gif" width="300"/>

Demo video: https://youtu.be/gm57gL1NGoQ

Try it yourself: https://hiukim.github.io/mind-ar-js-doc/examples/interative

### Face Tracking - Virtual Try-On Example
<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/face-tryon-demo-1e3433ff1dd89795d5c1b385778a9da8.gif" width="300"/>

Try it yourself: https://hiukim.github.io/mind-ar-js-doc/face-tracking-examples/tryon

### More examples
More examples can be found here: https://hiukim.github.io/mind-ar-js-doc/examples/summary


# Quick Start
Learn how to build the Basic example above in 5 minutes with a plain text editor! 

Quick Start Guide: https://hiukim.github.io/mind-ar-js-doc/quick-start/overview

To give you a quick idea, this is the complete source code for the Basic example. It's static HTML page, you can host it anywhere.

```
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/dist/mindar-image.prod.js"></script>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/dist/mindar-image.aframe.js"></script>
  </head>
  <body>
    <a-scene mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.mind;" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
      <a-assets>
        <img id="card" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.png" />
        <a-asset-item id="avatarModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-plane src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
        <a-gltf-model rotation="0 0 0 " position="0 0 0.1" scale="0.005 0.005 0.005" src="#avatarModel" animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate">
      </a-entity>
    </a-scene>
  </body>
</html>
```

# Target Images Compiler
You can compile your own target images right on the browser using this friendly Compiler tools. If you don't know what it is, go through the Quick Start guide 

https://hiukim.github.io/mind-ar-js-doc/tools/compile

<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/step2-9f3c4dcb8a2e60766d86f950d06929ea.png" width="300"/>

# Roadmaps
1. Supports more augmented reality features, like Plane Tracking

2. Research on different state-of-the-arts algorithms to improve tracking accuracy and performance

3. More educational references.

# Contributions
I personally don't come from a strong computer vision background, and I'm having a hard time improving the tracking accuracy. I could really use some help from computer vision expert. Please reach out and discuss.

Also welcome javascript experts to help with the non-engine part, like improving the APIs and so.

If you are graphics designer or 3D artists and can contribute to the visual. Even if you just use MindAR to develop some cool applications, please show us!

Whatever you can think of. It's an opensource web AR framework for everyone!

# Development Guide

#### Directories explained

1. `/src` folder contains majority of the source code
2. `/dist` folder contains the built library
3. `/examples` folder contains examples to test out during development

#### To create a production build

run `> npm run build`. `mindar-XXX.prod.js` and `mindar-XXX-aframe.propd.js will be generated for each tracking type.

#### For development

run `> npm run watch`. This will observe the file changes in `src` folder and continuously build a `mindar-XXX.js` and `mindar-XXX-aframe` inside the `dist-dev` folder. The examples inside the `examples` folder is using this development build. You can open this examples in browser to start debug/development. 

The examples should run in desktop browser and they are just html files, so it's easy to start development. However, because it requires camera access, so you need a webcam. Also, you need to run the html file with some localhost web server. Simply opening the files won't work.

For example, you can install this chrome plugin to start a local server: `https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en`

You most likely would want to test on mobile device as well. In that case, it's better if you could setup your development environment to be able to share your localhost webserver to your mobile devices. If you have difficulties doing that, perhaps behind a firewall, then you could use something like `ngrok` (https://ngrok.com/) to tunnel the request. But this is not an ideal solution, because the development build of MindAR is not small (>10Mb), and tunneling with free version of `ngrok` could be slow.

#### webgl backend
This library utilize tensorflowjs (https://github.com/tensorflow/tfjs) for webgl backend. Yes, tensorflow is a machine learning library, but we didn't use it for machine learning! :) Tensorflowjs has a very solid webgl engine which allows us to write general purpose GPU application (in this case, our AR application). 

The core detection and tracking algorithm is written with custom operations in tensorflowjs. They are like shaders program. It might looks intimidating at first, but it's actually not that difficult to understand.

# Credits
The computer vision idea is borrowed from artoolkit (i.e. https://github.com/artoolkitx/artoolkit5). Unfortunately, the library doesn't seems to be maintained anymore.

Face Tracking is based on tensorflowjs face landmark detection mode (i.e. https://github.com/tensorflow/tfjs-models/tree/master/face-landmarks-detection). It also utilize this face geometry library: https://github.com/spite/FaceMeshFaceGeometry

