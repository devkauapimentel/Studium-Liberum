
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
async function deriveSharedSecret(privateKey, publicKey) {
  return await window.crypto.subtle.deriveBits(
    {
      name: "X25519",
      public: publicKey,
    },
    privateKey,
    128,
  );
}
let aliceKeyPair;
let bobKeyPair;

async function changeKeys() {
  try {
    aliceKeyPair = await window.crypto.subtle.generateKey(
      {
        name: "X25519",
      },
      false,
      ["deriveBits"],
    );

    bobKeyPair = await window.crypto.subtle.generateKey(
      {
        name: "X25519",
      },
      false,
      ["deriveBits"],
    );

    log("Keys changed");
  } catch (e) {
    log(e);
  }
}

changeKeys();

const changeKeysButton = document.querySelector("#buttonChangeKeys");

// Generate 2 X25519 key pairs: one for Alice and one for Bob
// In more normal usage, they would generate their key pairs
// separately and exchange public keys securely
changeKeysButton.addEventListener("click", changeKeys);
const deriveBitsButton = document.querySelector("#buttonDeriveKeys");

deriveBitsButton.addEventListener("click", async () => {
  // Generate 2 X25519 key pairs: one for Alice and one for Bob
  // In more normal usage, they would generate their key pairs
  // separately and exchange public keys securely

  // Alice then generates a secret using her private key and Bob's public key.
  // Bob could generate the same secret using his private key and Alice's public key.

  const sharedSecretAlice = await deriveSharedSecret(
    aliceKeyPair.privateKey,
    bobKeyPair.publicKey,
  );

  let buffer = new Uint8Array(sharedSecretAlice, 0, 10);
  log(`${buffer}…[${sharedSecretAlice.byteLength} bytes total] (Alice secret)`);

  const sharedSecretBob = await deriveSharedSecret(
    bobKeyPair.privateKey,
    aliceKeyPair.publicKey,
  );

  buffer = new Uint8Array(sharedSecretBob, 0, 10);
  log(`${buffer}…[${sharedSecretAlice.byteLength} bytes total] (Bob secret)`);
});
;
        