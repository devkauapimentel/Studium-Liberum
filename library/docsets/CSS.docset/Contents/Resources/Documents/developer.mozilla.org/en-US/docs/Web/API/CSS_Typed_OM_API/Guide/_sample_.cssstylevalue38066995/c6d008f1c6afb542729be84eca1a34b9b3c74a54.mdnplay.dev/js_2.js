
          const allComputedStyles = document.querySelector("button").computedStyleMap();
// CSSUnparsedValue
const unit = allComputedStyles.get("--unit");

console.log(unit); // CSSUnparsedValue {0: " 1.2rem", length: 1}
console.log(unit[0]); // " 1.2rem"
const parsedUnit = CSSNumericValue.parse(unit);
console.log(parsedUnit); // CSSUnitValue {value: 1.2, unit: "rem"}
console.log(parsedUnit.unit); // "rem"
console.log(parsedUnit.value); // 1.2
const btnWidth = allComputedStyles.get("width");

console.log(btnWidth); // CSSMathSum
console.log(btnWidth.values); // CSSNumericArray {0: CSSUnitValue, 1: CSSUnitValue, length: 2}
console.log(btnWidth.operator); // 'sum'
const transform = allComputedStyles.get("transform");

console.log(transform); // CSSTransformValue {0: CSSScale, 1: CSSTranslate, length: 2, is2D: true}
console.log(transform.length); // 1
console.log(transform[0]); // CSSScale {x: CSSUnitValue, y: CSSUnitValue, z: CSSUnitValue, is2D: true}
console.log(transform[0].x); // CSSUnitValue {value: 0.95, unit: "number"}
console.log(transform[0].y); // CSSUnitValue {value: 0.95, unit: "number"}
console.log(transform[0].z); // CSSUnitValue {value: 1, unit: "number"}
console.log(transform.is2D); // true
const bgImage = allComputedStyles.get("background-image");

console.log(bgImage); // CSSImageValue
console.log(bgImage.toString()); // url("magic-wand.png")
;
        