
          const span = document.querySelector("span");
const classes = span.classList;

const result = classes.replace("c", "z");

span.textContent = result ? classes : "token not replaced successfully";
;
        