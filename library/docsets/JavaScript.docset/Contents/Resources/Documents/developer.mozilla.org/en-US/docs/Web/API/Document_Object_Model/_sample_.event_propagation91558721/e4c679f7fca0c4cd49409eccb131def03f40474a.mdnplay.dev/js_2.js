
          function stopEvent(event) {
  const c2 = document.getElementById("c2");
  c2.textContent = "hello";

  // this ought to keep t-daddy from getting the click.
  event.stopPropagation();
  console.log("event propagation halted.");
}

const elem = document.getElementById("tbl1");
elem.addEventListener("click", stopEvent);

document.getElementById("t-daddy").addEventListener("click", () => {
  console.log("t-daddy clicked");
});
;
        