import {estimate} from './estimate.js';
import {refineEstimate} from './refine-estimate.js';

class Estimator {
  constructor(projectionTransform) {
    this.projectionTransform = projectionTransform;
  }

  // Solve homography between screen points and world points using Direct Linear Transformation
  // then decompose homography into rotation and translation matrix (i.e. modelViewTransform)
  estimate({screenCoords, worldCoords}) {
    const modelViewTransform = estimate({screenCoords, worldCoords, projectionTransform: this.projectionTransform});
    return modelViewTransform;
  }

  // Given an initial guess of the modelViewTransform and new pairs of screen-world coordinates, 
  // use Iterative Closest Point to refine the transformation
  //refineEstimate({initialModelViewTransform, screenCoords, worldCoords}) {
  refineEstimate({initialModelViewTransform, worldCoords, screenCoords}) {
    const updatedModelViewTransform = refineEstimate({initialModelViewTransform, worldCoords, screenCoords, projectionTransform: this.projectionTransform});
    return updatedModelViewTransform;
  }
}

export {
  Estimator,
}
