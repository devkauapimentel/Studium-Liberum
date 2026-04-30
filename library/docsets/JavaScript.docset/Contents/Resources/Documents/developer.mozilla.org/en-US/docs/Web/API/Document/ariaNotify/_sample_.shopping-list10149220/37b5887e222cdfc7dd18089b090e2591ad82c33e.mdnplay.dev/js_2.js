
          const form = document.querySelector("form");
const item = document.querySelector("input[type='text']");
const price = document.querySelector("input[type='number']");
const priceList = document.querySelector("ul");
const totalOutput = document.querySelector("p");

let total = 0;
function updateTotal() {
  totalOutput.textContent = `Total: £${Number(total).toFixed(2)}`;
}
function addItemToList(item, price) {
  const listItem = document.createElement("li");
  listItem.setAttribute("data-item", item);
  listItem.setAttribute("data-price", price);
  listItem.textContent = `${item}: £${Number(price).toFixed(2)}`;
  const btn = document.createElement("button");
  btn.textContent = `Remove ${item}`;

  priceList.appendChild(listItem);
  listItem.appendChild(btn);

  btn.addEventListener("click", (e) => {
    const listItem = e.target.parentNode;
    total -= Number(listItem.getAttribute("data-price"));
    updateTotal();
    document.ariaNotify(
      `${listItem.getAttribute(
        "data-item",
      )} removed. Total is now £${total.toFixed(2)}.`,
      {
        priority: "high",
      },
    );
    listItem.remove();
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addItemToList(item.value, price.value);
  total += Number(price.value);
  updateTotal();

  document.ariaNotify(
    `Item ${item.value}, price £${
      price.value
    }, added to list. Total is now £${total.toFixed(2)}.`,
    {
      priority: "high",
    },
  );

  item.value = "";
  price.value = "";
});
;
        