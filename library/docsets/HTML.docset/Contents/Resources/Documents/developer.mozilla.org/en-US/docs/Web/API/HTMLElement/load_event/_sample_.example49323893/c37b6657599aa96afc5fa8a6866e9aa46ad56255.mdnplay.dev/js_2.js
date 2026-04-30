
          const image = document.getElementById("image");
image.onload = () => {
  document.body.appendChild(document.createElement("div")).textContent =
    "loaded!";
};

document.querySelector("button").addEventListener("click", reload);

function reload() {
  image.src = "/shared-assets/images/examples/favicon144.png";
}
;
        