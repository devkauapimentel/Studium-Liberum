
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = text;
}

const reload = document.querySelector("#reset");

reload.addEventListener("click", () => {
  window.location.reload(true);
});
const host = document.querySelector("#host");
const shadow = host.attachShadow({ mode: "open" });
const shadowSpan = document.createElement("span");
shadowSpan.textContent = "I'm in the shadow DOM";
shadow.appendChild(shadowSpan);
let useShadows = false;

const shadowButton = document.querySelector("#shadowButton");
shadowButton.addEventListener("click", () => {
  useShadows = !useShadows;
  shadowButton.innerText = useShadows ? "Remove Shadow" : "Add Shadow";
});
function insertBreakAtPoint(e) {
  let range;
  let textNode;
  let offset;

  if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(
      e.clientX,
      e.clientY,
      useShadows ? { shadowRoots: [shadow] } : null,
    );
    textNode = range.offsetNode;
    offset = range.offset;
  } else if (document.caretRangeFromPoint) {
    // Use WebKit-proprietary fallback method
    range = document.caretRangeFromPoint(e.clientX, e.clientY);
    textNode = range.startContainer;
    offset = range.startOffset;
  } else {
    // Neither method is supported, do nothing
    return;
  }

  // Logging code (uses hidden method to get substring with ^ at offset)
  if (textNode) {
    if (textNode.nodeType === 3) {
      const caretInText = getSubstringAroundOffset(
        textNode.textContent,
        offset,
      );
      log(
        `type: TEXT_NODE, name: ${textNode.nodeName}, offset: ${offset}:
${caretInText}`,
      );
    } else if (textNode.nodeType === 1) {
      log(`type: ELEMENT_NODE, name: ${textNode.nodeName}, offset: ${offset}`);
    } else {
      log(
        `type: ${textNode.nodeType}, name: ${textNode.nodeName}, offset: ${offset}`,
      );
    }
  }

  // Insert line at caret
  if (textNode?.nodeType === 3) {
    // TEXT_NODE - split text at offset and add br
    let replacement = textNode.splitText(offset);
    let br = document.createElement("br");
    textNode.parentNode.insertBefore(br, replacement);
  } else if (textNode?.nodeType === 1) {
    // ELEMENT_NODE - Add br node at offset node
    let br = document.createElement("br");
    const targetNode = textNode.childNodes[offset];
    textNode.insertBefore(br, targetNode);
  } else {
    // Do nothing
  }
}
// Click event handler <p> elements in the DOM
const paragraphs = document.getElementsByTagName("p");
for (const paragraph of paragraphs) {
  paragraph.addEventListener("click", insertBreakAtPoint);
}

// Click event handler <p> elements in the Shadow DOM
const shadowParagraphs = host.shadowRoot.querySelectorAll("p");
for (const paragraph of shadowParagraphs) {
  console.log(paragraph);
  paragraph.addEventListener("click", insertBreakAtPoint);
}
// Inserts ^ at offset and gets a substring for log
function getSubstringAroundOffset(text, offset, length = 10) {
  const start = Math.max(0, offset - length);
  const end = Math.min(text.length, offset + length + 1);
  // Insert the caret character at the offset
  const modifiedText = `${text.substring(0, offset)}^${text.substring(offset)}`;
  return `...${modifiedText.substring(start, end)}...`;
}
let message = document.getElementById("message");
if (document.caretPositionFromPoint) {
  message.textContent =
    "This browser supports the standard document.caretPositionFromPoint";
  message.classList.add("supported");
} else if (document.caretRangeFromPoint) {
  message.textContent =
    "This browser supports the non-standard document.caretRangeFromPoint";
  message.classList.add("supported");
}
;
        