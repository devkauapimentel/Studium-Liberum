
          const log = document.getElementById("reportResult");
if (!navigator.getAutoplayPolicy) {
  log.textContent = "navigator.getAutoplayPolicy() not supported.";
} else {
  log.textContent = "navigator.getAutoplayPolicy() is supported.";
}
;
        