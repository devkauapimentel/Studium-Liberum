
          const image = document.querySelector("article img");
const break40 = document.getElementById("break40");
const break50 = document.getElementById("break50");

break40.addEventListener(
  "click",
  () => (image.sizes = image.sizes.replace(/50em,/, "40em,")),
);

break50.addEventListener(
  "click",
  () => (image.sizes = image.sizes.replace(/40em,/, "50em,")),
);
;
        