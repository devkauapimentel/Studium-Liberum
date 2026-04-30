
          let text = document.getElementById("myText").firstChild;
let em = document.createElement("em");
em.textContent = "Italic text";

text.replaceWith(em); // Replace `Some text` by `Italic text`
;
        