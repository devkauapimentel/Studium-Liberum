
          navigator.getBattery().then((battery) => {
  battery.onlevelchange = () => {
    document.querySelector("#level").textContent = battery.level;

    if (battery.charging) {
      document.querySelector("#stateBattery").textContent = `Charging time: ${
        battery.chargingTime / 60
      }`;
    } else {
      document.querySelector("#stateBattery").textContent =
        `Discharging time: ${battery.dischargingTime / 60}`;
    }
  };
});
;
        