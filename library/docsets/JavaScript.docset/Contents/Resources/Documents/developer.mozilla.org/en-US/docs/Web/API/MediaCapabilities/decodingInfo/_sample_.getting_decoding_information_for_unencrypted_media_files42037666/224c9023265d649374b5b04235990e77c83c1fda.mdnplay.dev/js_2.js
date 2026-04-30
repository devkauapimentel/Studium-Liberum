
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
// Create media configuration to be tested
const audioConfig = {
  type: "file", // or 'media-source' or 'webrtc'
  audio: {
    contentType: "audio/ogg; codecs=vorbis", // valid content type
    channels: 2, // audio channels used by the track
    bitrate: 132700, // number of bits used to encode 1s of audio
    samplerate: 5200, // number of audio samples making up that 1s.
  },
};

// check support and performance
navigator.mediaCapabilities.decodingInfo(audioConfig).then((result) => {
  if (result.supported) {
    log(
      `The audio configuration is supported${result.smooth ? ", smooth" : ", not smooth"}${result.powerEfficient ? ", power efficient" : ", not power efficient"}.`,
    );
  } else {
    log("The audio configuration is not supported");
  }
});
const videoConfig = {
  type: "file",
  video: {
    contentType: "video/webm;codecs=vp8", // valid content type
    width: 800, // width of the video
    height: 600, // height of the video
    bitrate: 10000, // number of bits used to encode 1s of video
    framerate: 30, // number of frames making up that 1s.
  },
};

// check support and performance
navigator.mediaCapabilities.decodingInfo(videoConfig).then((result) => {
  if (result.supported) {
    log(
      `The video configuration is supported${result.smooth ? ", smooth" : ", not smooth"}${result.powerEfficient ? ", power efficient" : ", not power efficient"}.`,
    );
  } else {
    log("The video configuration is not supported");
  }
});
;
        