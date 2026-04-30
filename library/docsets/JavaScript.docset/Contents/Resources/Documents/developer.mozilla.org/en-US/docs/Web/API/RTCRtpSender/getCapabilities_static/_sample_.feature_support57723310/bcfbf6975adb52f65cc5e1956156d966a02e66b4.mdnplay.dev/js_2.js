
          const log = document.querySelector("#log");
log.textContent = `RTCRtpSender.getCapabilities() supported: ${Object.hasOwn(
  RTCRtpSender,
  "getCapabilities",
)}`;
;
        