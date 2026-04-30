
          const parentElement = document.querySelector("#parent");
let allChildren = parentElement.querySelectorAll(":scope > span");
allChildren.forEach((item) => item.classList.add("red"));
;
        