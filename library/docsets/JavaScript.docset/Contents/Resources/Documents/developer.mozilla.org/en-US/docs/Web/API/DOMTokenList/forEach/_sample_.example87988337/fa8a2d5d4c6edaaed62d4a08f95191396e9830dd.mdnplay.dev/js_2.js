
          const pre = document.querySelector("pre");
const classes = pre.classList;
const iterator = classes.values();

classes.forEach(function (value, key, listObj) {
  pre.textContent += `(${value} ${key})/${this}\n`;
}, "arg");
;
        