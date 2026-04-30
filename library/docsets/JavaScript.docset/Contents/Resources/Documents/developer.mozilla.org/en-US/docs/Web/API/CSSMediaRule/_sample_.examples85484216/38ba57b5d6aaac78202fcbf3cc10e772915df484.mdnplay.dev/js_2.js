
          const log = document.getElementById("log");
const myRules = document.getElementById("css-output").sheet.cssRules;
const mediaList = myRules[0]; // a CSSMediaRule representing the media query.
log.textContent += ` ${mediaList.media.mediaText}`;
;
        