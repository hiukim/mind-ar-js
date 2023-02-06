# MindAR

<img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/multi-targets-demo-8b5fc868f6b0847a9818e8bf0ba2c1c3.gif" height="250"><img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/interactive-demo-1ab348a381cbd808f4d52c8750524d11.gif" height="250"><img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/face-tryon-demo-369c4ba701f1df2099ecf05c27f0c944.gif" height="250">


MindAR is a web augmented reality library. Highlighted features include:

:star: Support Image tracking and Face tracking. For Location or Fiducial-Markers Tracking, checkout [AR.js](https://github.com/AR-js-org/AR.js)

:star: Written in pure javascript, end-to-end from the underlying computer vision engine to frontend

:star: Utilize gpu (through webgl) and web worker for performance

:star: Developer friendly. Easy to setup. With AFRAME extension, you can create an app with only 10 lines of codes

# Fund Raising

MindAR is the only actively maintained web AR SDK which offer comparable features to commercial alternatives. This library is currently maintained by me as an individual developer. To raise fund for continuous development and to provide timely supports and responses to issues, here is a list of related projects/ services that you can support.

<table>
  <tbody>
    <tr>
      <td valign="top">
        <h2>Web AR Development Course</h2>
        <p>I'm offering a WebAR development course in Udemy. It's a very comprehensive guide to Web AR development, not limited to MindAR.</p>
        <p>Check it out if you are interested: <a target="_blank" href="https://www.udemy.com/course/introduction-to-web-ar-development/?referralCode=D2565F4CA6D767F30D61">https://www.udemy.com/course/introduction-to-web-ar-development/?referralCode=D2565F4CA6D767F30D61</a></p>
      </td>
      <td width="50%">
        <img src="https://user-images.githubusercontent.com/459126/141425015-f5fe2912-b26d-4366-8952-5866a072fb34.jpg"/>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>MindAR Studio</h2>
        <p>
          MindAR Studio allows you to build Face Tracking AR without coding. You can build AR effects through a drag-n-drop editor and export static webpages for self-host. Free to use!
        </p>
        <p>
          Check it out if you are interested! <a href="https://studio.mindar.org" target="_blank">https://studio.mindar.org</a>
        </p>
      </td>
      <td><img src="https://www.mindar.org/content/images/2022/07/screenshot.png" border="10"/></td>
    </tr>
    <tr>
      <td valign="top">
        <h2>Pictarize</h2>
        <p>
          Pictarize is a hosted platform for creating and publishing Image Tracking AR applications. Free to use!
        </p>
        <p>
          Check it out if you are interested! <a href="https://pictarize.com" target="_blank">https://pictarize.com</a>
        </p>
      </td>
      <td><img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/pictarize-studio-98ea8d35d963ebcd7d31ca7695c3f984.png" border="10"/></td>
    </tr>
  </tbody>
</table>

# Documentation

Official Documentation: https://hiukim.github.io/mind-ar-js-doc

# Demo - Try it yourself

<table>
  <tbody>
    <tr>
      <td valign="top" width="50%">
        <h2>Image Tracking - Basic Example</h2>
        <p>Demo video: https://youtu.be/hgVB9HpQpqY </p>
        <p>Try it yourself: https://hiukim.github.io/mind-ar-js-doc/examples/basic/</p>
      </td>
      <td>
        <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/basic-demo-fde07aa7567bf213e61b37dbaa192fec.gif" width="300px">
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>Image Tracking - Multiple Targets Example</h2>
        <p>Try it yourself: https://hiukim.github.io/mind-ar-js-doc/examples/multi-tracks</p>
      </td>
      <td>
        <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/multi-targets-demo-8b5fc868f6b0847a9818e8bf0ba2c1c3.gif" width="300px">
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>Image Tracking - Interactive Example</h2>
        <p>Demo video: https://youtu.be/gm57gL1NGoQ</p>
        <p>Try it yourself: https://hiukim.github.io/mind-ar-js-doc/examples/interative</p>
      </td>
      <td>
        <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/interactive-demo-1ab348a381cbd808f4d52c8750524d11.gif" width="300px"/>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>Face Tracking - Virtual Try-On Example</h2>
        <p>Try it yourself: https://hiukim.github.io/mind-ar-js-doc/face-tracking-examples/tryon</p>
      </td>
      <td>
        <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/face-tryon-demo-369c4ba701f1df2099ecf05c27f0c944.gif"  width="300px"/>
      </td>
    </tr>
    <tr>
      <td valign="top">
        <h2>Face Tracking - Face Mesh Effect</h2>
        <p>Try it yourself: https://hiukim.github.io/mind-ar-js-doc/more-examples/threejs-face-facemesh</p>
      </td>
      <td>
        <img src="https://hiukim.github.io/mind-ar-js-doc/assets/images/face-mesh-demo-8f5bd8d1bcbffbdb76896b58171ecc8a.gif"  width="300px"/>
      </td>
    </tr>
  </tbody>
</table>

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
    <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/dist/mindar-image.prod.js"></script>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/dist/mindar-image-aframe.prod.js"></script>
  </head>
  <body>
    <a-scene mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/card.mind;" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
      <a-assets>
        <img id="card" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/card.png" />
        <a-asset-item id="avatarModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/softmind/scene.gltf"></a-asset-item>
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
1. Supports more augmented reality features, like Hand Tracking, Body Tracking and Plane Tracking

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
2. `/examples` folder contains examples to test out during development

#### To create a production build

run `> npm run build`. the build will be generated in `dist` folder

#### For development

To develop threeJS version, run `> npm run watch`. This will observe the file changes in `src` folder and continuously build the artefacts in `dist-dev`.

To develop AFRAME version, you will need to run `>npm run build-dev` everytime you make changes. The `--watch` parameter currently failed to automatically generate `mindar-XXX-aframe.js`. 

All the examples in the `examples` folder is configured to use this development build, so you can open those examples in browser to start debugging or development.

The examples should run in desktop browser and they are just html files, so it's easy to start development. However, because it requires camera access, so you need a webcam. Also, you need to run the html file with some localhost web server. Simply opening the files won't work.

For example, you can install this chrome plugin to start a local server: `https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en`

You most likely would want to test on mobile device as well. In that case, it's better if you could setup your development environment to be able to share your localhost webserver to your mobile devices. If you have difficulties doing that, perhaps behind a firewall, then you could use something like `ngrok` (https://ngrok.com/) to tunnel the request. But this is not an ideal solution, because the development build of MindAR is not small (>10Mb), and tunneling with free version of `ngrok` could be slow.

#### webgl backend
This library utilize tensorflowjs (https://github.com/tensorflow/tfjs) for webgl backend. Yes, tensorflow is a machine learning library, but we didn't use it for machine learning! :) Tensorflowjs has a very solid webgl engine which allows us to write general purpose GPU application (in this case, our AR application). 

The core detection and tracking algorithm is written with custom operations in tensorflowjs. They are like shaders program. It might looks intimidating at first, but it's actually not that difficult to understand.

# Credits
The computer vision idea is borrowed from artoolkit (i.e. https://github.com/artoolkitx/artoolkit5). Unfortunately, the library doesn't seems to be maintained anymore.

Face Tracking is based on mediapipe face mesh model (i.e. https://google.github.io/mediapipe/solutions/face_mesh.html)

