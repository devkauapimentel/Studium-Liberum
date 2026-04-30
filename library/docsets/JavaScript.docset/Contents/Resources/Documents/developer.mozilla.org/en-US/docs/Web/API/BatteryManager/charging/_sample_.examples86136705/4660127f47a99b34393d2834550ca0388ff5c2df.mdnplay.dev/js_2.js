
          navigator.getBattery().then((battery) => {
  const charging = battery.charging;

  document.querySelector("#charging").textContent = charging;
});
;
        