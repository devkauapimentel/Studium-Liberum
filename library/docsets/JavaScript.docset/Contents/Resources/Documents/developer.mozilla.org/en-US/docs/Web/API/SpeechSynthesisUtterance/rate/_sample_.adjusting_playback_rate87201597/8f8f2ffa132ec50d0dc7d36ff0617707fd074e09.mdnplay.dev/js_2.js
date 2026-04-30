
          const synth = window.speechSynthesis;

const text = document.querySelector("#text");
const play = document.querySelector("#play");
const rate = document.querySelector("#rate");

function speak() {
  if (synth.speaking) {
    synth.cancel();
  }
  const utterThis = new SpeechSynthesisUtterance(text.textContent);
  utterThis.addEventListener("error", () => {
    console.error("SpeechSynthesisUtterance error");
  });
  utterThis.rate = rate.value;
  synth.speak(utterThis);
}

play.addEventListener("click", speak);
;
        