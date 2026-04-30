
          const el = document.querySelector(".transition");
const message = document.querySelector(".message");

el.addEventListener("transitionrun", () => {
  message.textContent = "transitionrun fired";
});

el.addEventListener("transitionstart", () => {
  message.textContent = "transitionstart fired";
});

el.addEventListener("transitionend", () => {
  message.textContent = "transitionend fired";
});
;
        