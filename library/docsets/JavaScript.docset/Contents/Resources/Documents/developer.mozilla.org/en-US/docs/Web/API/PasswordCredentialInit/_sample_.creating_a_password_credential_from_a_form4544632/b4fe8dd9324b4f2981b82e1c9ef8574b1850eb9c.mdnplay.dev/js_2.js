
          const makeCredential = document.querySelector("#make-credential");
const formCreds = document.querySelector("form");

makeCredential.addEventListener("click", async () => {
  try {
    const credential = await navigator.credentials.create({
      password: formCreds,
    });
    log(
      `New credential:\ndisplay name: ${credential.name}, username: ${credential.id}, password: ${credential.password}`,
    );
  } catch (e) {
    if (e.name === "TypeError") {
      log("Error creating credential\nMake sure you filled in all the fields");
    }
  }
});

const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = text;
}
;
        