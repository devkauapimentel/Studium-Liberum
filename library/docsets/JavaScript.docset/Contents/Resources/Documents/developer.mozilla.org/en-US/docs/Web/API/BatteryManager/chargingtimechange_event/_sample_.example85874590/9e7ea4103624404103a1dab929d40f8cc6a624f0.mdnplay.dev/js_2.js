
          navigator.getBattery().then((battery) => {
  battery.onchargingtimechange = () => {
    document.querySelector("#level").textContent = battery.level;
    document.querySelector("#chargingTime").textContent = battery.chargingTime;
  };
});
;
        