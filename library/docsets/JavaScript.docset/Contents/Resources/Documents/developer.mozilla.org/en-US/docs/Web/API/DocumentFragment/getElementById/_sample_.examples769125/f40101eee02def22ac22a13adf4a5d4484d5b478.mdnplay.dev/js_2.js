
          // Create the document fragment with its initial content
const fragment = new DocumentFragment();
["Apple", "Orange", "Banana", "Melon"].forEach((fruit) => {
  const li = document.createElement("li");
  li.textContent = fruit;
  li.id = fruit;
  fragment.append(li);
});

// When the button is clicked, add the fragment to the list
document.getElementById("add").addEventListener("click", () => {
  document.querySelector("ul").append(fragment);
  displayStatus();
});

// Log the results of both getElementById()
function displayStatus() {
  const log = document.getElementById("log");
  log.textContent = "";
  ["Apple", "Cherry"].forEach((id) => {
    log.textContent += `document.getElementById("${id}") ${
      document.getElementById(id) ? "Yes" : "No"
    }\n`;
    log.textContent += `fragment.getElementById("${id}") ${
      fragment.getElementById(id) ? "Yes" : "No"
    }\n`;
  });

  // Empty the fragment viewer and fill it with the current content
  const fragmentViewer = document.getElementById("fragment");
  while (fragmentViewer.hasChildNodes()) {
    fragmentViewer.removeChild(fragmentViewer.lastChild);
  }
  for (const entry of fragment.children) {
    fragmentViewer.appendChild(entry.cloneNode(true));
  }
}

// Log the initial state
displayStatus();

// Hook the reset button
document.getElementById("reset").addEventListener("click", () => {
  document.location.reload();
});
;
        