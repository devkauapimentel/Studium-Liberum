
          const element = document.querySelector("label");
const button = document.querySelector("button");
const result = document.querySelector("#result");

const attribute = element.attributes[0];
result.value = attribute.value;

button.addEventListener("click", () => {
  attribute.value = "a new value";
  result.value = attribute.value;
});
;
        