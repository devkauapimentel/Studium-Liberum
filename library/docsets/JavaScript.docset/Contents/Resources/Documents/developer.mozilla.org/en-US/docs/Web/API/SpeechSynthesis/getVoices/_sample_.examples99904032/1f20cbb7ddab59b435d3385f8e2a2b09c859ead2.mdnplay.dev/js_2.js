
          function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  const voices = speechSynthesis.getVoices();

  for (const voice of voices) {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    document.getElementById("voiceSelect").appendChild(option);
  }
}

populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
;
        