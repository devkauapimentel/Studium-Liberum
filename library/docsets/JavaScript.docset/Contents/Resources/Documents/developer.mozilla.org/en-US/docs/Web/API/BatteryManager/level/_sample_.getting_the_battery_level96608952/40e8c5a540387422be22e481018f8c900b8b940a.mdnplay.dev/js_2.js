
          const getLevel = document.querySelector("#get-level");
const output = document.querySelector("#output");

getLevel.addEventListener("click", async () => {
  if (!navigator.getBattery) {
    output.textContent = "Battery manager is unsupported";
  } else {
    const manager = await navigator.getBattery();
    const level = manager.level;
    output.textContent = `Battery level: ${level}`;
  }
});
;
        