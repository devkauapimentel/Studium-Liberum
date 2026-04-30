
          function handleCommand(event) {
  // Handles both mouse clicks and keyboard
  // activate with Enter or Space

  // Key presses other than Enter and Space should not trigger a command
  if (
    event instanceof KeyboardEvent &&
    event.key !== "Enter" &&
    event.key !== " "
  ) {
    return;
  }

  // Get the new name value from the input element
  const newNameInput = document.getElementById("newName");
  const name = newNameInput.value;
  newNameInput.value = ""; // clear the text field
  newNameInput.focus(); // give the text field focus to enable entering and additional name.

  // Don't add blank entries to the list.
  if (name.length > 0) {
    const listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(name));

    // Add the new name to the list.
    const list = document.getElementById("nameList");
    list.appendChild(listItem);
  }
}

const btn = document.querySelector("span[role='button']");
btn.addEventListener("click", handleCommand);
btn.addEventListener("keydown", handleCommand);
;
        