# mind-ar-js (beta)

<img src="https://hiukim.github.io/mind-ar-js/screenshots/card-demo-short.gif" height="300"> <img src="https://hiukim.github.io/mind-ar-js/screenshots/band-demo-short.gif?a" height="300">

mind-ar-js is a lightweight library for web augmented reality. It features:

1. Written in pure javascript, end-to-end from the underlying computer vision engine to frontend

2. Utilize gpu (through webgl) and web worker for performance

3. Support natural feature tracking (i.e. image target), with multiple targets

4. Developer friendly. Easy setup, and With AFRAME extension, get your app starts with only 10 lines of codes

# Demo
<a href="https://youtu.be/hgVB9HpQpqY" target="_blank"><img src="https://hiukim.github.io/mind-ar-js/screenshots/card-demo.png" 
alt="web AR card demo" width="240" border="10" /></a>

watch the video: https://youtu.be/hgVB9HpQpqY, or try it yourself:

Example 1:
Open this url with your phone: https://hiukim.github.io/mind-ar-js/samples/example1.html. Allow camera access and look at the below image to trigger the AR effects.

<img src="https://hiukim.github.io/mind-ar-js/samples/assets/card-example/card.png" width="240" border="10" />

Example 2 (multiple targets)
Open this url with your phone: https://hiukim.github.io/mind-ar-js/samples/example2.html. Allow camera access and look at the below images to trigger the AR effects.

<img src="https://hiukim.github.io/mind-ar-js/samples/assets/band-example/bear.png" width="240" border="10" /> <img src="https://hiukim.github.io/mind-ar-js/samples/assets/band-example/raccoon.png" width="240" border="10" />

# Usage

#### Step 1: Compile image targets

use this web tool to compile your image targets [Compile image targets](https://hiukim.github.io/mind-ar-js/samples/compile.html "Compile Image Target")

<img src="https://hiukim.github.io/mind-ar-js/screenshots/compile1.png" width="400">

During compilation, you can also visualize the feature points in your target images in different scales:

<img src="https://hiukim.github.io/mind-ar-js/screenshots/compile2.png" width="400">

When you are done, you will have a `targets.mind` file. This is a compiled data used for tracking in your web pages in Step 2.

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


# Theory and Algorithm
I'm going to write a series of technical blog posts explaining all the theoretical details of the algorithm. Stay tuned...

# Roadmaps
1. Supports more augmented reality features, like Face Tracking, Plane Tracking

2. Improve tracking accuracies and performance with underlying computer vision engine. or utilize mobile gyroscope

3. Expose more APIs for flexibility. 

4. More docs and educational references.

# Contributions
I personally don't come from a strong computer vision background, and I'm having a hard time improving the tracking accuracy. Would really need help with computer vision expertise to advise the state-of-the-art augmented reality related algorithms. Please feel free to contact and discuss.

Another big area that could dive into is webgl. We are currently using gpu.js (https://github.com/gpujs/gpu.js/) for the webgl related codes. There is a lot of room for improvement.

Also welcome javascript expert to help with the non-engine part, like improving the APIs and so. 

If you are graphics designer or 3D artists and can contribute to the visual, that's also nice.

Whatever you can think of. It's an opensource web AR framework for everyone! 

# Credits
The computer vision idea is borrowed from artoolkit (i.e. https://github.com/artoolkitx/artoolkit5). Unfortunately, the library doesn't seems to be maintained anymore.

