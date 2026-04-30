
          const form = document.querySelector("form");
const items = form.elements.namedItem("my-radio");

const output = document.querySelector("#output");
const itemIDs = Array.from(items)
  .map((item) => `"${item.id}"`)
  .join(", ");

const item2 = form.elements.namedItem("my-form-control");
output.textContent = `My items: ${itemIDs}
My single item: "${item2.id}"`;
;
        