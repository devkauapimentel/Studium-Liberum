
          const button = document.querySelector("button");

button.addEventListener("DOMActivate", (event) => {
  button.textContent = `Click count: ${event.detail}`;
});
;
        