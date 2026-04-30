
          const utf8encoder = new TextEncoder();
const text = "€";

const output = document.querySelector("#output");
const encodeButton = document.querySelector("#encode");
encodeButton.addEventListener("click", () => {
  output.textContent = utf8encoder.encode(text);
});

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", () => {
  window.location.reload();
});
;
        