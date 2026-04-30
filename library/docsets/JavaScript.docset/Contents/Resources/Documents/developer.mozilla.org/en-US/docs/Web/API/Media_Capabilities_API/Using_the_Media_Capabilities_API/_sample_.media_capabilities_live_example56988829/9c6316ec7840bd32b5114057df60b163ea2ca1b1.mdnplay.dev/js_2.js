
          let mc = {
  videoConfiguration: {},

  tryIt() {
    mc.createConfiguration();
    mc.testIt();
  },

  createConfiguration() {
    const size = document.getElementById("size").value.split("x");
    mc.videoConfiguration = {
      type: "file",
      video: {
        contentType: document.getElementById("codec").value,
        width: size[0],
        height: size[1],
        bitrate: document.getElementById("bitrate").value,
        framerate: document.getElementById("framerate").value,
      },
    };
  },

  testIt() {
    let content = "";
    navigator.mediaCapabilities
      .decodingInfo(mc.videoConfiguration)
      .then((result) => {
        const li = document.createElement("li"),
          mcv = mc.videoConfiguration.video;
        content = `A ${mcv.width}x${mcv.height}, ${mcv.contentType} at ${
          mcv.framerate
        }fps and ${mcv.bitrate} bps video ${
          result.supported ? " IS " : "IS NOT "
        } supported,`;
        content += `${result.smooth ? " IS " : " is NOT "} smooth, and`;
        content += `${
          result.powerEfficient ? " IS " : " IS NOT "
        }power efficient.`;
        const ul = document.getElementById("results");
        li.textContent = content;
        ul.appendChild(li);
      })
      .catch((error) => {
        const li = document.createElement("li"),
          ul = document.getElementById("results");
        li.textContent = `Codec ${mc.videoConfiguration.video.contentType} threw an error: ${error}`;
        ul.appendChild(li);
      });
  },
};

document.getElementById("try-it").addEventListener("click", mc.tryIt);
;
        