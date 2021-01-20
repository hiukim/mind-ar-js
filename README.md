# mind-ar-js (beta)

<img src="https://hiukim.github.io/mind-ar-js/screenshots/card-demo-short.gif" height="250"> <img src="https://hiukim.github.io/mind-ar-js/screenshots/band-demo-short.gif?a" height="250"> <img src="https://hiukim.github.io/mind-ar-js/screenshots/card-demo2-short.gif?c" height="250">

mind-ar-js is a lightweight library for web augmented reality. Main features include:

:star: Written in pure javascript, end-to-end from the underlying computer vision engine to frontend

:star: Utilize gpu (through webgl) and web worker for performance

:star: Support natural feature tracking (i.e. image target), with multiple targets

:star: Developer friendly. Easy to setup. With AFRAME extension, you can get your app starts with only 10 lines of codes

# Demo
<a href="https://youtu.be/hgVB9HpQpqY" target="_blank"><img src="https://hiukim.github.io/mind-ar-js/screenshots/card-demo.png" 
alt="web AR card demo" width="240" border="10" /></a>

watch the video: https://youtu.be/hgVB9HpQpqY, or try it yourself:

Example 1:
Open this url with your phone: https://hiukim.github.io/mind-ar-js/samples/example1.html. Allow camera access and look at the below image to trigger the AR effects.

<img src="https://hiukim.github.io/mind-ar-js/samples/assets/card-example/card.png" width="240" border="10" />

Example 2 (multiple targets)
Open this url with your phone: https://hiukim.github.io/mind-ar-js/samples/example2.html. Allow camera access and look at the below images (one at a time) to trigger the AR effects.

<img src="https://hiukim.github.io/mind-ar-js/samples/assets/band-example/bear.png" width="240" border="10" /> <img src="https://hiukim.github.io/mind-ar-js/samples/assets/band-example/raccoon.png" width="240" border="10" />

Example 3 (Interactive examples)

<a href="https://youtu.be/hgVB9HpQpqY" target="_blank"><img src="https://hiukim.github.io/mind-ar-js/screenshots/card-demo2.png" 
alt="web AR card demo" width="240" border="10" /></a>

watch the video: https://youtu.be/gm57gL1NGoQ, or try it yourself:

Open this url with your phone: https://hiukim.github.io/mind-ar-js/samples/example3.html. Allow camera access and look at the same image in example 1.


# Usage

#### Step 1: Compile image targets

Use this web tool to compile your image targets [Compile image targets](https://hiukim.github.io/mind-ar-js/samples/compile.html "Compile Image Target")

<img src="https://hiukim.github.io/mind-ar-js/screenshots/compile1.png" width="400">

During compilation, you can also visualize the feature points in your target images in different scales:

<img src="https://hiukim.github.io/mind-ar-js/screenshots/compile2.png" width="400">

When you are done, you will have a `targets.mind` file. This is a compiled data used for tracking in your web pages in Step 2.

Notes: 
1. Rough benchmark, for an image with size of around 800x600, my macbook pro takes 30 to 60 seconds. We don't suggest having images larger than 1000px width or height. It's not useful and takes a lot of time. 

2. Since there is no visual progress on the webpage, you should open the develop console to make sure it's running or track any errors.

#### Step 2: Build your AR web pages

We have wrapped all the api calls under an AFRAME extension. Basically what you need is to include `mindar` library, i.e.

```
<script src="./mindar.prod.js"></script>
```

and then build a AFRAME scene (you can refer to AFRAME doc for details - https://aframe.io/). There are basically two components:

1. add a `mindar` component in a-scene with the property `imageTargetSrc` which points to the `targets.mind` compiled in Step 1.

2. add any number of `a-entity` with component `mindar-image-target`. When you compile the targets, you can add multiple images, the `targetIndex` is the order.

```
<a-scene mindar="imageTargetSrc: ./targets.mind">
  <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

  <a-entity mindar-image-target="targetIndex: 0">
    <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
  </a-entity>
</a-scene>
```

Then you are done, the library will automatically detect and track your target images, and the entity position and rotation will be updated automatically. You can build your scene just like a normal AFRAME projects.

It's recommended you start with the source of the examples: 

`view-source:https://hiukim.github.io/mind-ar-js/samples/example1.html`
`view-source:https://hiukim.github.io/mind-ar-js/samples/example2.html`

If you want more control over the applications, the library also provides the following events/ methods:

1. `targetFound` and `targetLost`
```
<a-entity id="example-target" mindar-image-target="targetIndex: 0">
...
</a-entity>
```
```
const exampleTarget = document.querySelector('#example-target');
// detect target found
exampleTarget.addEventListener("targetFound", event => {
  console.log("target found");
});

// detect target lost
exampleTargetLink.addEventListener("click", event => {
  console.log("clicked...");
});
```

2. target click

You can also register `click` events on any object inside the target entity, e.g.
```
<a-entity id="example-target" mindar-image-target="targetIndex: 0">
  <a-plane id="example-target-link" src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0">
  </a-plane>
</a-entity>
```
```
const exampleTargetLink = document.querySelector('#example-target-link');
exampleTargetLink.addEventListener("click", event => {
  console.log("clicked...");
});
```

3. control AR engine start and stop
Inside the `<a-scene>` entity, you can pass in the flag `autoStart: false` if you want disable auto-starting the AR engine
`
<a-scene autoStart: false"/>
`
After that, you can execute the following code to start or stop later:
```
const sceneEl = document.querySelector('a-scene');
const arSystem = sceneEl.systems["mindar-system"];

arSystem.start(); // start AR 

arSystem.stop(); // stop AR and video

arSystem.stopAR(); // stop AR only, but keep video
```

4. `arReady` and `arError`
The engine will trigger an `arReady` event when the AR started, or `arError` if failed. It's a good place to control `loading` and `error` screen.

```
const sceneEl = document.querySelector('a-scene');

sceneEl.addEventListener("arReady", (event) => {
  // e.g. remove loading indicator here
});
sceneEl.addEventListener("arError", (event) => {
  // e.g. show error message here
});
```

For complete example of events/methods, you can refer to `/examples/example3.html`

# Theory and Algorithm
I think it frustrating that there is very little educational materials on the Internet that can explain the inside-out of augmented reality. That's one of the main drive of this project. I hope this project can be also educational other being practical. So I'm going to write a series of technical blog posts explaining all the theoretical details of the algorithm. Stay tuned...

# Roadmaps
1. Supports more augmented reality features, like Face Tracking, Plane Tracking

2. Improve tracking accuracies and performance with underlying computer vision engine. or utilize mobile gyroscope

3. Expose more APIs for flexibility. 

4. More docs and educational references.

# Contributions
I personally don't come from a strong computer vision background, and I'm having a hard time improving the tracking accuracy. Would really need help with computer vision expertise to advise the state-of-the-art augmented reality related algorithms. Please feel free to contact and discuss.

Also welcome javascript experts to help with the non-engine part, like improving the APIs and so. 

If you are graphics designer or 3D artists and can contribute to the visual, that's also nice.

Whatever you can think of. It's an opensource web AR framework for everyone! 

# Development Guide

#### Directories explained

1. `/src` folder contains majority of the source code
2. `/dist` folder contains the built library
3. `/examples` folder contains examples to test out the built library in dist

#### To create a production build

run `> npm run build`. A `mindar.prod.js` will be generated. That's the library.

#### For development

run `> npm run watch`. This will observe the file changes in `src` folder and continueously build a `mindar.js` inside the `dist` folder. The examples inside the `examples` folder is using this development build. You can open this examples in browser to start debug/development. 

The examples should run in desktop browser and they are just html files, so it's easy to start development. However, because it requires camera access, so you need a webcam. Also, you need to run the html file with some localhost web server. Simply opening the files won't work.

For example, you can install this chrome plugin to start a local server: `https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en`

If you want to test on mobile device, I would normally use `ngrok` (https://ngrok.com/) to tunnel the request. 

#### webgl backend
This library utilize tensorflowjs (https://github.com/tensorflow/tfjs) for webgl backend. Yes, tensorflow is a machine learning libary, but we didn't use it for machine learning! :) Tensorflowjs has a very solid webgl engine which allows us to write general purpose GPU application (in this case, our AR application). 

The core detection and tracking algorithm is written with custom operations in tensorflowjs. They are like shaders program. It might looks intimidating at first, but it's actually not that difficult to understand.

#### examples explained
1. `examples/example1.html` and `examples/example2.html` are basically the demo examples in the above section. They are using the wrapped aframe extension.

2. `examples/simple.html` is a simple test to run the underlying API. There is no visual, you need to open the console.log to see some messages. This is usually the entry point when I do development since I don't have to start webcam everytime.

3. `examples/compile.html` is the page to compile target images

#### src explained
1. `src/image-target` contains all the AR algorithms. (There will be more details coming up regarding those algorithms)

* Inside `image-target`, you will see `detectorCPU`, `detectorGPU`, `trackingGPU`. They are old implementations of the algorithms with CPU and GPU.js. I keep it here for reference ONLY. The latest version should be `detectorTF` and `trackingTF`, which use tensorflowjs webgl backend. Their logic is very similar.

2. `src/controller.js` serves kind of a API for external applications that use the AR algorithms. It handles the control flow of the application.

3. `src/aframe.js` is the AFRAME extension wrapper. It uses `controller.js`

4. `src/compiler.js` is the API for compiling target image.

# Credits
The computer vision idea is borrowed from artoolkit (i.e. https://github.com/artoolkitx/artoolkit5). Unfortunately, the library doesn't seems to be maintained anymore.

