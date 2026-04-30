
          const span = document.getElementById("ab");
const classes = span.classList;
classes.remove("c");
span.textContent = classes;
const span2 = document.getElementById("a");
const classes2 = span2.classList;

classes2.remove("c", "b");
span2.textContent = classes2;
;
        