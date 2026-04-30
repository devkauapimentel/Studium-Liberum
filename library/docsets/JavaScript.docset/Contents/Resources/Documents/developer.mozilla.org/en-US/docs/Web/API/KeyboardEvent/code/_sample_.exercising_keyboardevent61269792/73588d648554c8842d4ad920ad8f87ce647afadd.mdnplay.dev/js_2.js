
          window.addEventListener("keydown", (event) => {
  const p = document.createElement("p");
  p.textContent = `KeyboardEvent: key='${event.key}' | code='${event.code}'`;
  document.getElementById("output").appendChild(p);
  window.scrollTo(0, document.body.scrollHeight);
});
;
        