
          // get the element
const myElement = document.querySelector("a");

// Retrieve all computed styles with computedStyleMap()
const styleMap = myElement.computedStyleMap();

// get the <dl> we'll be populating
const stylesList = document.querySelector("#results");

// array of properties we're interested in
const ofInterest = ["font-weight", "border-left-color", "color", "--color"];

// iterate over our properties of interest
for (const property of ofInterest) {
  // properties
  const cssProperty = document.createElement("dt");
  cssProperty.innerText = property;
  stylesList.appendChild(cssProperty);

  // values
  const cssValue = document.createElement("dd");
  // use get() to find the value
  cssValue.innerText = styleMap.get(property);
  stylesList.appendChild(cssValue);
}
;
        