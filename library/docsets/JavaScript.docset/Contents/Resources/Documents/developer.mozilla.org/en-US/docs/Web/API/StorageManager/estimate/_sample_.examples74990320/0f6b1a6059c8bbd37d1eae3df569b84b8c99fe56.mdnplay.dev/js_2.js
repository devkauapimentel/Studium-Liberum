
          navigator.storage.estimate().then((estimate) => {
  document.getElementById("percent").textContent = (
    (estimate.usage / estimate.quota) *
    100
  ).toFixed(2);
  document.getElementById("quota").textContent =
    `${(estimate.quota / 1024 / 1024).toFixed(2)}MB`;
});
;
        