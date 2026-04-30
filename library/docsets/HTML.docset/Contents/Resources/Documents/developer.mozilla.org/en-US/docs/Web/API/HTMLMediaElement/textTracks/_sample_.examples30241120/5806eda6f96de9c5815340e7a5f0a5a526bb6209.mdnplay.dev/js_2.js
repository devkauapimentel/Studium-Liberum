
          const tracks = document.querySelector("video").textTracks;

for (const track of tracks) {
  track.mode = "showing";
}
;
        