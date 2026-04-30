
          const matrix = new DOMMatrixReadOnly();
const scaledMatrix = matrix.scale(0.5);

let scaledMatrixWithOrigin = matrix.scale(0.5, 25, 25);

// if the browser has interpreted these parameters as scaleX, scaleY, scaleZ, the resulting matrix is 3D
const browserExpectsSixParamScale = !scaledMatrixWithOrigin.is2D;
if (browserExpectsSixParamScale) {
  scaledMatrixWithOrigin = matrix.scale(0.5, 0.5, 1, 25, 25, 0);
}

document
  .querySelector("#transformed")
  .setAttribute("transform", scaledMatrix.toString());
document
  .querySelector("#transformedOrigin")
  .setAttribute("transform", scaledMatrixWithOrigin.toString());
;
        