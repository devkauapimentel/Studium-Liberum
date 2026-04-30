
          // prettier-ignore
const itemSizes = [
  "2em", "3em", "1.6em", "4em", "2.2em",
  "3em", "4.5em", "1em", "3.5em", "2.8em",
];
const items = document.querySelectorAll(".item");
for (let i = 0; i < items.length; i++) {
  items[i].style.inlineSize = itemSizes[i];
}
;
        