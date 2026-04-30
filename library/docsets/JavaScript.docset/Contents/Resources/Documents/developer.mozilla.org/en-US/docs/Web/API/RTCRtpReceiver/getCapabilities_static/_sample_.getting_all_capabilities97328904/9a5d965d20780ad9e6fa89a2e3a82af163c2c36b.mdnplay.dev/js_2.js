
          const log = document.querySelector("#log");
const kindSelector = document.querySelector("#kind");

logMediaCapabilities("audio");

kindSelector.addEventListener("click", () => {
  log.textContent = "";
  logMediaCapabilities(kindSelector.value);
});

function logMediaCapabilities(kind) {
  if (!Object.hasOwn(RTCRtpReceiver, "getCapabilities")) {
    log.textContent = "RTCRtpReceiver.getCapabilities() not supported";
    return;
  }
  const capabilities = RTCRtpReceiver.getCapabilities(`${kind}`);
  log.textContent += "Headers\n";
  capabilities.headerExtensions.forEach((header) => {
    log.textContent += ` uri: ${header.uri}\n`;
  });

  log.textContent += "\nCodecs\n";
  capabilities.codecs.forEach((codec) => {
    log.textContent += ` mime type: ${codec.mimeType}\n`;
    log.textContent += `   channels: ${codec.channels}\n`; // max channels - e.g. 2 is stereo
    log.textContent += `   clockRate: ${codec.clockRate}\n`; // clock rate in Hz
    log.textContent += `   sdpFmtpLine: ${codec.sdpFmtpLine}\n`; // mime media type and subtype
  });
}
;
        