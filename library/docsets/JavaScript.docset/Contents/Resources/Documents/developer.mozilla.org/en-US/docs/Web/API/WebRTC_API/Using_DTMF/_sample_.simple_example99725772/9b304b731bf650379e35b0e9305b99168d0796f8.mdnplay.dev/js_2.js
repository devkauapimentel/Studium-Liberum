
          let dialString = "12024561111";

let callerPC = null;
let receiverPC = null;
let dtmfSender = null;

let hasAddTrack = false;

let mediaConstraints = {
  audio: true,
  video: false,
};
const dialButton = document.querySelector("#dial");
const logElement = document.querySelector(".log");
dialButton.addEventListener("click", connectAndDial);
function connectAndDial() {
  callerPC = new RTCPeerConnection();

  hasAddTrack = callerPC.addTrack !== undefined;

  callerPC.onicecandidate = handleCallerIceEvent;
  callerPC.onnegotiationneeded = handleCallerNegotiationNeeded;
  callerPC.oniceconnectionstatechange = handleCallerIceConnectionStateChange;
  callerPC.onsignalingstatechange = handleCallerSignalingStateChangeEvent;
  callerPC.onicegatheringstatechange = handleCallerGatheringStateChangeEvent;

  receiverPC = new RTCPeerConnection();
  receiverPC.onicecandidate = handleReceiverIceEvent;

  if (hasAddTrack) {
    receiverPC.ontrack = handleReceiverTrackEvent;
  } else {
    receiverPC.onaddstream = handleReceiverAddStreamEvent;
  }

  navigator.mediaDevices
    .getUserMedia(mediaConstraints)
    .then(gotStream)
    .catch((err) => log(err.message));
}
function gotStream(stream) {
  log("Got access to the microphone.");

  let audioTracks = stream.getAudioTracks();

  if (hasAddTrack) {
    if (audioTracks.length > 0) {
      audioTracks.forEach((track) => callerPC.addTrack(track, stream));
    }
  } else {
    log(
      "Your browser doesn't support RTCPeerConnection.addTrack(). Falling " +
        "back to the <strong>deprecated</strong> addStream() method…",
    );
    callerPC.addStream(stream);
  }

  if (callerPC.getSenders) {
    dtmfSender = callerPC.getSenders()[0].dtmf;
  } else {
    log(
      "Your browser doesn't support RTCPeerConnection.getSenders(), so " +
        "falling back to use <strong>deprecated</strong> createDTMFSender() " +
        "instead.",
    );
    dtmfSender = callerPC.createDTMFSender(audioTracks[0]);
  }

  dtmfSender.ontonechange = handleToneChangeEvent;
}
function handleToneChangeEvent(event) {
  if (event.tone !== "") {
    log(`Tone played: ${event.tone}`);
  } else {
    log("All tones have played. Disconnecting.");
    callerPC.getLocalStreams().forEach((stream) => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    });
    receiverPC.getLocalStreams().forEach((stream) => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    });

    audio.pause();
    audio.srcObject = null;
    receiverPC.close();
    callerPC.close();
  }
}
function handleCallerIceEvent(event) {
  if (event.candidate) {
    log(`Adding candidate to receiver: ${event.candidate.candidate}`);

    receiverPC
      .addIceCandidate(new RTCIceCandidate(event.candidate))
      .catch((err) => log(`Error adding candidate to receiver: ${err}`));
  } else {
    log("Caller is out of candidates.");
  }
}
function handleCallerIceConnectionStateChange() {
  log(`Caller's connection state changed to ${callerPC.iceConnectionState}`);
  if (callerPC.iceConnectionState === "connected") {
    log(`Sending DTMF: "${dialString}"`);
    dtmfSender.insertDTMF(dialString, 400, 50);
  }
}
// Offer to receive audio but not video
const constraints = { audio: true, video: false };

async function handleCallerNegotiationNeeded() {
  log("Negotiating…");
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    for (const track of stream.getTracks()) {
      pc.addTrack(track, stream);
    }
    const offer = await callerPC.createOffer();
    log(`Setting caller's local description: ${offer.sdp}`);
    await callerPC.setLocalDescription(offer);
    log("Setting receiver's remote description to the same as caller's local");
    await receiverPC.setRemoteDescription(callerPC.localDescription);
    log("Creating answer");
    const answer = await receiverPC.createAnswer();
    log(`Setting receiver's local description to ${answer.sdp}`);
    await receiverPC.setLocalDescription(answer);
    log("Setting caller's remote description to match");
    await callerPC.setRemoteDescription(receiverPC.localDescription);
  } catch (err) {
    log(`Error during negotiation: ${err.message}`);
  }
}
function handleCallerSignalingStateChangeEvent() {
  log(`Caller's signaling state changed to ${callerPC.signalingState}`);
}

function handleCallerGatheringStateChangeEvent() {
  log(`Caller's ICE gathering state changed to ${callerPC.iceGatheringState}`);
}
function handleReceiverIceEvent(event) {
  if (event.candidate) {
    log(`Adding candidate to caller: ${event.candidate.candidate}`);

    callerPC
      .addIceCandidate(new RTCIceCandidate(event.candidate))
      .catch((err) => log(`Error adding candidate to caller: ${err}`));
  } else {
    log("Receiver is out of candidates.");
  }
}
function handleReceiverTrackEvent(event) {
  audio.srcObject = event.streams[0];
}

function handleReceiverAddStreamEvent(event) {
  audio.srcObject = event.stream;
}
function log(msg) {
  logElement.innerText += `${msg}\n`;
}
;
        