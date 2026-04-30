
          const noneBtn = document.getElementById("none-btn");
const closerequestBtn = document.getElementById("closerequest-btn");
const anyBtn = document.getElementById("any-btn");

const noneDialog = document.querySelector("[closedby='none']");
const closerequestDialog = document.querySelector("[closedby='closerequest']");
const anyDialog = document.querySelector("[closedby='any']");

const closeBtns = document.querySelectorAll(".close");

noneBtn.addEventListener("click", () => {
  noneDialog.showModal();
});

closerequestBtn.addEventListener("click", () => {
  closerequestDialog.showModal();
});

anyBtn.addEventListener("click", () => {
  anyDialog.showModal();
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.close();
  });
});
;
        