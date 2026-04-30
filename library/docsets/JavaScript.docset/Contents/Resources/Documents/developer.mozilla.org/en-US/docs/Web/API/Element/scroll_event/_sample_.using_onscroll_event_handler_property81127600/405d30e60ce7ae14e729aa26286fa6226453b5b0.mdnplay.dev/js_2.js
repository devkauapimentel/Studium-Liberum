
          const element = document.querySelector("div#scroll-box");
const output = document.querySelector("p#output");

element.onscroll = (event) => {
  output.textContent = "Element scroll event fired!";
  setTimeout(() => {
    output.textContent = "Waiting on scroll events...";
  }, 1000);
};
;
        