
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const button = document.querySelector("#run-button");
const input = document.querySelector("#log");

button.addEventListener("click", () => {
  // Clear log
  logElement.innerText = "";
  logElement.scrollTop = logElement.scrollHeight;
  // Run test
  test();
});

async function test() {
  try {
    // Create a key pair and use destructuring assignment to assign to variables
    const { publicKey, privateKey } = await crypto.subtle.generateKey(
      {
        name: "Ed25519",
      },
      true,
      ["sign", "verify"],
    );

    // Log the properties of the keys
    log(`publicKey: ${publicKey}`);
    log(` type: ${publicKey.type}`);
    log(` extractable: ${publicKey.extractable}`);
    log(` algorithm: ${JSON.stringify(publicKey.algorithm)}`);
    log(` usages: ${publicKey.usages}`);
    log(`privateKey: ${privateKey}`);
    log(` type: ${privateKey.type}`);
    log(` extractable: ${privateKey.extractable}`);
    log(` algorithm: ${JSON.stringify(privateKey.algorithm)}`);
    log(` usages: ${privateKey.usages}`);
  } catch (error) {
    log(error);
  }
}
;
        