const buildModelViewProjectionTransform = (projectionTransform, modelViewTransform) => {
  // assume the projectTransform has the following format:
  // [[fx, 0, cx],
  //  [0, fy, cy]
  //  [0, 0, 1]]
  const modelViewProjectionTransform = [
    [
      projectionTransform[0][0] * modelViewTransform[0][0] + projectionTransform[0][2] * modelViewTransform[2][0],
      projectionTransform[0][0] * modelViewTransform[0][1] + projectionTransform[0][2] * modelViewTransform[2][1],
      projectionTransform[0][0] * modelViewTransform[0][2] + projectionTransform[0][2] * modelViewTransform[2][2],
      projectionTransform[0][0] * modelViewTransform[0][3] + projectionTransform[0][2] * modelViewTransform[2][3],
    ],
    [
      projectionTransform[1][1] * modelViewTransform[1][0] + projectionTransform[1][2] * modelViewTransform[2][0],
      projectionTransform[1][1] * modelViewTransform[1][1] + projectionTransform[1][2] * modelViewTransform[2][1],
      projectionTransform[1][1] * modelViewTransform[1][2] + projectionTransform[1][2] * modelViewTransform[2][2],
      projectionTransform[1][1] * modelViewTransform[1][3] + projectionTransform[1][2] * modelViewTransform[2][3],
    ],
    [
      modelViewTransform[2][0],
      modelViewTransform[2][1],
      modelViewTransform[2][2],
      modelViewTransform[2][3],
    ]
  ];
  return modelViewProjectionTransform;
  
  /*
  // this is the full computation if the projectTransform does not look like the expected format, but more computations
  //  
  const modelViewProjectionTransform = [[],[],[]];
  for (let j = 0; j < 3; j++ ) {
    for (let i = 0; i < 4; i++) {
      modelViewProjectionTransform[j][i] = projectionTransform[j][0] * modelViewTransform[0][i]
                                         + projectionTransform[j][1] * modelViewTransform[1][i]
                                         + projectionTransform[j][2] * modelViewTransform[2][i];
    }
  }
  return modelViewProjectionTransform;
  */
}

const applyModelViewProjectionTransform = (modelViewProjectionTransform, x, y, z) => {
  // assume z is zero
  const ux = modelViewProjectionTransform[0][0] * x + modelViewProjectionTransform[0][1] * y + modelViewProjectionTransform[0][3];
  const uy = modelViewProjectionTransform[1][0] * x + modelViewProjectionTransform[1][1] * y + modelViewProjectionTransform[1][3];
  const uz = modelViewProjectionTransform[2][0] * x + modelViewProjectionTransform[2][1] * y + modelViewProjectionTransform[2][3];
  return {x: ux, y: uy, z: uz};
}

const computeScreenCoordiate = (modelViewProjectionTransform, x, y, z) => {
  const {x: ux, y: uy, z: uz} = applyModelViewProjectionTransform(modelViewProjectionTransform, x, y, z);
  //if( Math.abs(uz) < 0.000001 ) return null;
  return {x: ux/uz, y: uy/uz};
}


module.exports = {
  buildModelViewProjectionTransform,
  applyModelViewProjectionTransform,
  computeScreenCoordiate
}
