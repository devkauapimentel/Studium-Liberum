
          const output = document.querySelector("output");
const file = document.getElementById("file");

// Run the hashing function when the user selects one or more file
file.addEventListener("change", hashTheseFiles);

// The digest function is asynchronous, it returns a promise
// We use the async/await syntax to simplify the code.
async function fileHash(file) {
  const arrayBuffer = await file.arrayBuffer();

  // Use the subtle crypto API to perform a SHA256 Sum of the file's
  // Array Buffer. The resulting hash is stored in an array buffer
  const hashAsArrayBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);

  // To display it as a string we will get the hexadecimal value of
  // each byte of the array buffer. This gets us an array where each byte
  // of the array buffer becomes one item in the array
  const uint8ViewOfHash = new Uint8Array(hashAsArrayBuffer);
  if (uint8ViewOfHash.toHex) {
    // The logic below is equivalent to the toHex() method, introduced in 2025.
    return uint8ViewOfHash.toHex();
  }
  // We then convert it to a regular array so we can convert each item
  // to hexadecimal strings, where characters of 0-9 or a-f represent
  // a number between 0 and 15, containing 4 bits of information,
  // so 2 of them is 8 bits (1 byte).
  const hashAsString = Array.from(uint8ViewOfHash)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashAsString;
}

async function hashTheseFiles(e) {
  let outHTML = "";
  // iterate over each file in file select input
  for (const file of this.files) {
    // calculate its hash and list it in the output element.
    outHTML += `${file.name}    ${await fileHash(file)}\n`;
  }
  output.innerText = outHTML;
}
;
        