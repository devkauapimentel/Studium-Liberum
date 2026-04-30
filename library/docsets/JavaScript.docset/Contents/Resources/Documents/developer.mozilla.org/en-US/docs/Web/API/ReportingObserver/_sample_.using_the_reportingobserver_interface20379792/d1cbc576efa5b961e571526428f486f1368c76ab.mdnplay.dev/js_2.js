
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const options = {
  types: ["deprecation"],
  buffered: true,
};

const observer = new ReportingObserver((reports, observer) => {
  reports.forEach((report) => {
    // console.log(report);
    log(JSON.stringify(report, null, 2));
  });
}, options);

// Start the observer
observer.observe();
const xhr = new XMLHttpRequest();
xhr.open("GET", "/", false); // false = synchronous (deprecated)
xhr.send();
;
        