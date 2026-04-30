
          const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const popover = document.getElementById("popover");
const output = document.getElementById("output");
if (yesBtn.command === undefined) {
  output.textContent = "Popover control command attribute not supported.";
} else {
  popover.addEventListener("toggle", (event) => {
    if (event.source === undefined) {
      output.textContent = "ToggleEvent.source not supported.";
    } else if (event.source === yesBtn) {
      output.textContent = "Cookie set!";
    } else if (event.source === noBtn) {
      output.textContent = "No cookie set.";
    }
  });
}
;
        