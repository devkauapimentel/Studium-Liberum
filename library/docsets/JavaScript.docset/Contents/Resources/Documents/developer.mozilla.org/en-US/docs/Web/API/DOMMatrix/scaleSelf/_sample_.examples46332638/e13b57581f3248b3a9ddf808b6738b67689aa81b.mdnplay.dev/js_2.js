
          const matrix = new DOMMatrix();
matrix.scaleSelf(0.5, 2);

document
  .querySelector("#transformed")
  .setAttribute("transform", matrix.toString());
;
        