// canonical-face-model.obj source:
// https://github.com/google/mediapipe/tree/master/mediapipe/modules/face_geometry/data
//
// this script parse the model data. To run: node face-data-generator.js

import * as fs from "fs";
const text = fs.readFileSync("./canonical-face-model.obj", "utf8");
const textByLine = text.split("\n")

const positions = [];
const uvs = [];
const faces = [];
const uvIndexes = [];

textByLine.forEach((line) => {
  const ss = line.split(" ");
  if (ss[0] === 'f') {
    for (let i = 1; i <= 3; i++) {
      const [index, uvIndex] = ss[i].split("/");
      uvIndexes[parseInt(uvIndex)-1] = parseInt(index)-1;
    }
  }
});

let uvCount = 0;
textByLine.forEach((line) => {
  const ss = line.split(" ");
  if (ss[0] === 'v') {
    positions.push([ parseFloat(ss[1]),parseFloat(ss[2]),parseFloat(ss[3]) ]);
  } else if (ss[0] === 'vt') {
    uvs[uvIndexes[uvCount++]] = [ parseFloat(ss[1]),parseFloat(ss[2]) ];
  } else if (ss[0] === 'f') {
    faces.push(parseInt(ss[1].split("/")[0]-1),parseInt(ss[2].split("/")[0]-1),parseInt(ss[3].split("/")[0])-1);
  }
});

// important landmarks for computing transformation
// pairs of [positionIndex, weight]
const landmarkBasis = [[4, 0.070909939706326], [6, 0.032100144773722], [10, 0.008446550928056], [33, 0.058724168688059], [54, 0.007667080033571], [67, 0.009078059345484], [117, 0.009791937656701], [119, 0.014565368182957], [121, 0.018591361120343], [127, 0.005197994410992], [129, 0.120625205338001], [132, 0.005560018587857], [133, 0.05328618362546], [136, 0.066890455782413], [143, 0.014816547743976], [147, 0.014262833632529], [198, 0.025462191551924], [205, 0.047252278774977], [263, 0.058724168688059], [284, 0.007667080033571], [297, 0.009078059345484], [346, 0.009791937656701], [348, 0.014565368182957], [350, 0.018591361120343], [356, 0.005197994410992], [358, 0.120625205338001], [361, 0.005560018587857], [362, 0.05328618362546], [365, 0.066890455782413], [372, 0.014816547743976], [376, 0.014262833632529], [420, 0.025462191551924], [425, 0.047252278774977]]

let output = "";
output += "//This is a generated file\n";
output += "const positions=" + JSON.stringify(positions) + ";\n";
output += "const uvs=" + JSON.stringify(uvs) + ";\n";
output += "const faces=" + JSON.stringify(faces) + ";\n";
output += "const landmarkBasis=" + JSON.stringify(landmarkBasis) + ";\n";

output += `
export {
  positions, uvs, faces, landmarkBasis
}
`

fs.writeFileSync("./face-data.js", output);
