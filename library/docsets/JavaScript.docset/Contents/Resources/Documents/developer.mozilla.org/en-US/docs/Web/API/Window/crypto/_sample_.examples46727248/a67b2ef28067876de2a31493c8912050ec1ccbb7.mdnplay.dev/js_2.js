
          function genRandomNumbers() {
  const array = new Uint32Array(10);
  globalThis.crypto.getRandomValues(array);

  const randText = document.getElementById("myRandText");
  randText.textContent = `The random numbers are: ${array.join(" ")}`;
}

document.querySelector("button").addEventListener("click", genRandomNumbers);
;
        