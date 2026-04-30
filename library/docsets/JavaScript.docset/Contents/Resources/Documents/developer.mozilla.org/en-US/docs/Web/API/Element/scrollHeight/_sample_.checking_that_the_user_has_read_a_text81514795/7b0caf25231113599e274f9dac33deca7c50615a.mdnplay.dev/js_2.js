
          const info = document.getElementById("info");
const toAgree = document.getElementById("agree");
const toNextStep = document.getElementById("next-step");
const veryImportantRead = document.getElementById("very-important-read");

// Check if user has scrolled the element to the bottom
function isRead(element) {
  return (
    Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop) <=
    1
  );
}

function checkScrollToBottom(element) {
  if (isRead(element)) {
    info.innerText = "You have read all text. Agree to continue.";
    toAgree.disabled = false;
  }
}

toAgree.addEventListener("change", (e) => {
  toNextStep.disabled = !e.target.checked;
});

veryImportantRead.addEventListener("scroll", () => {
  checkScrollToBottom(veryImportantRead);
});

toNextStep.addEventListener("click", () => {
  if (toAgree.checked) {
    toNextStep.value = "Done!";
  }
});
;
        