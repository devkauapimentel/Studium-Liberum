
          const helloButton = document.querySelector("#hello_button");
helloButton.setAttribute("name", "helloButton");

// Set button text to name to show the attribute changed
helloButton.innerText = helloButton.getAttribute("name");
const reloadButton = document.querySelector("#reset");
reloadButton.addEventListener("click", () => document.location.reload());
const toggleDisabledButton = document.querySelector("#toggle_disabled");

toggleDisabledButton.addEventListener("click", () => {
  if (helloButton.disabled) {
    // Button is disabled. Enable by removing attribute
    helloButton.removeAttribute("disabled");
  } else {
    // Button enabled. Disable by setting value to anything
    // (normally "" or "disabled")
    helloButton.setAttribute("disabled", "disabled");
  }
});
;
        