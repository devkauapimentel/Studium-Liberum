
          const log = document.querySelector("#log");
log.textContent = `RTCRtpReceiver.getCapabilities() supported: ${Object.hasOwn(
  RTCRtpReceiver,
  "getCapabilities",
)}`;
;
        