
          const element = document.getElementById("ul"); // assuming ul exists
const fragment = document.createDocumentFragment();
const browsers = ["Firefox", "Chrome", "Opera", "Safari"];

browsers.forEach((browser) => {
  const li = document.createElement("li");
  li.textContent = browser;
  fragment.appendChild(li);
});

element.appendChild(fragment);
;
        