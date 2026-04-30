
          let elem = document.querySelector("div");
let rect = elem.getBoundingClientRect();
for (const key in rect) {
  if (typeof rect[key] !== "function") {
    let para = document.createElement("p");
    para.textContent = `${key} : ${rect[key]}`;
    document.body.appendChild(para);
  }
}
;
        