
          const cssCats = document.getElementById("css-cats");
const waapiCats = document.getElementById("waapi-cats");
const insertCSSCat = document.getElementById("insert-css-cat");
const insertWAAPICat = document.getElementById("insert-waapi-cat");

// The same information as @keyframes run-cycle
const keyframes = [
  { backgroundPosition: "-600px 0" },
  { backgroundPosition: "-600px -1950px" },
];
// The same information as .cat.with-css
const timing = {
  duration: 750,
  iterations: Infinity,
  easing: "steps(13, end)",
};

const catRunning = document
  .getElementById("with-waapi")
  .animate(keyframes, timing);

function createCat() {
  const newCat = document.createElement("div");
  newCat.classList.add("cat");
  return newCat;
}

insertCSSCat.addEventListener("click", () => {
  const newCat = createCat();
  newCat.classList.add("with-css");
  cssCats.insertBefore(newCat, insertCSSCat);
});

insertWAAPICat.addEventListener("click", () => {
  const newCat = createCat();
  const newAnimationPlayer = newCat.animate(keyframes, timing);
  // set start time to be the same as the original .cat#with-waapi
  newAnimationPlayer.startTime = catRunning.startTime;
  waapiCats.insertBefore(newCat, insertWAAPICat);
});
;
        