
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
async function getDb() {
  const databases = await indexedDB.databases();
  log("List databases:");
  databases.forEach((element) => {
    log(`name: ${element.name}, version: ${element.version}`);
  });
}
// Create a database named toDoList with default version (1)
const dbName1 = "toDoList";
log(`Opening: ${dbName1}`);
let DBOpenRequest = window.indexedDB.open(dbName1);

DBOpenRequest.addEventListener("error", (event) => {
  log(`Error opening: ${dbName1}`);
  getDb();
});

DBOpenRequest.addEventListener("success", (event) => {
  log(`Initialized: ${dbName1}`);
  getDb();
});

// Create database "AnotherDb"
const dbName2 = "AnotherDb";
log(`Opening ${dbName2}`);
DBOpenRequest = window.indexedDB.open(dbName2, 2);

DBOpenRequest.addEventListener("error", (event) => {
  log(`Error opening: ${dbName2}`);
  getDb();
});

DBOpenRequest.addEventListener("success", (event) => {
  log(`Initialized: ${dbName2}`);
  getDb();
});
;
        