# MindAR (beta)

<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/basic-demo-fde07aa7567bf213e61b37dbaa192fec.gif" height="250"> <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/multi-targets-demo-8b5fc868f6b0847a9818e8bf0ba2c1c3.gif" height="250"> <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/interactive-demo-1ab348a381cbd808f4d52c8750524d11.gif" height="250">

MindAR is a lightweight library for web augmented reality. Highlighted features include:

:star: Written in pure javascript, end-to-end from the underlying computer vision engine to frontend

:star: Utilize gpu (through webgl) and web worker for performance

:star: Support natural feature tracking (i.e. image target), with multiple targets

:star: Developer friendly. Easy to setup. With AFRAME extension, you can get your app starts with only 10 lines of codes

# Documentation

Official Documentation: https://hiukim.github.io/mind-ar-js-doc

# Demo - Try it yourself

### Basic Example
<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/basic-demo-fde07aa7567bf213e61b37dbaa192fec.gif" width="300">

watch the video: https://youtu.be/hgVB9HpQpqY, or try it yourself:

Open this url with your phone: https://hiukim.github.io/mind-ar-js-doc/samples/basic.html. Allow camera access and look at the below image to trigger the AR effects.

<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/card-06cb9111a8e32627db6bfafc7aa22a4d.png" width="240" border="10" />

### Multiple Targets Example
<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/multi-targets-demo-8b5fc868f6b0847a9818e8bf0ba2c1c3.gif" width="300">

Open this url with your phone: https://hiukim.github.io/mind-ar-js-doc/samples/multi-targets.html. Allow camera access and look at the below images (one at a time) to trigger the AR effects.

<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/bear-3c737546fb0bde7a9c45b45ee999d132.png" width="240" border="10" /> <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/raccoon-2ef571baece2ee4724d0d19edf3de791.pngg" width="240" border="10" />

### Interactive Example
<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/interactive-demo-1ab348a381cbd808f4d52c8750524d11.gif" width="300"/>

watch the video: https://youtu.be/gm57gL1NGoQ, or try it yourself:

Open this url with your phone: https://hiukim.github.io/mind-ar-js-doc/samples/advanced.html. Allow camera access and look at the same image in the Basic example.

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
    <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@0.3.1/dist/mindar.prod.js"></script>
  </head>
  <body>
    <a-scene mindar="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@0.3.1/examples/assets/card-example/card.mind; showStats: true;" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
      <a-assets>
        <img id="card" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@0.3.1/examples/assets/card-example/card.png" />
        <a-asset-item id="avatarModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@0.3.1/examples/assets/card-example/softmind/scene.gltf"></a-asset-item>
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

<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/step2-1e9df4e618de281f49ab797851006faf.png" width="300"/>

# AR algorithms and theory
I think it frustrating that there is very little educational materials on the Internet that can explain the inside-out of augmented reality. There are many scattered pieces around, but no one really put together a complete picture. That's one of the main drive of this project. I hope this project can be also educational other being practical. So I'm going to write a series of technical blog posts explaining all the theoretical details later. Please stay tuned!

# Roadmaps
1. Supports more augmented reality features, like Face Tracking, Plane Tracking

2. Research on different state-of-the-arts algorithms to improve tracking accuracies and performance

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

run `> npm run build`. A `mindar.prod.js` will be generated. That's the library.

#### For development

run `> npm run watch`. This will observe the file changes in `src` folder and continueously build a `mindar.js` inside the `dist-dev` folder. The examples inside the `examples` folder is using this development build. You can open this examples in browser to start debug/development. 

The examples should run in desktop browser and they are just html files, so it's easy to start development. However, because it requires camera access, so you need a webcam. Also, you need to run the html file with some localhost web server. Simply opening the files won't work.

For example, you can install this chrome plugin to start a local server: `https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en`

You most likely would want to test on mobile device as well. In that case, it's better if you could setup your development environment to be able to share your localhost webserver to your mobile devices. If you have difficulties doing that, perhaps behind a firewall, then you could use something like `ngrok` (https://ngrok.com/) to tunnel the request. But this is not an ideal solution, because the development build of MindAR is not small (>10Mb), and tunneling with free version of `ngrok` could be slow.

#### webgl backend
This library utilize tensorflowjs (https://github.com/tensorflow/tfjs) for webgl backend. Yes, tensorflow is a machine learning libary, but we didn't use it for machine learning! :) Tensorflowjs has a very solid webgl engine which allows us to write general purpose GPU application (in this case, our AR application). 

The core detection and tracking algorithm is written with custom operations in tensorflowjs. They are like shaders program. It might looks intimidating at first, but it's actually not that difficult to understand.

#### examples explained
1. `examples/example1.html` and `examples/example2.html` are basically the demo examples in the above section. They are using the wrapped aframe extension.

2. `examples/example3.html` contains events handling.

#### src explained
1. `src/image-target` contains all the AR algorithms. (There will be more details coming up regarding those algorithms)

2. `src/controller.js` serves kind of a API for external applications that use the AR algorithms. It also handles the control flow of the application.

3. `src/aframe.js` is the AFRAME extension wrapper. It uses `controller.js`

4. `src/compiler.js` is the API for compiling target image.

# Credits
The computer vision idea is borrowed from artoolkit (i.e. https://github.com/artoolkitx/artoolkit5). Unfortunately, the library doesn't seems to be maintained anymore.

