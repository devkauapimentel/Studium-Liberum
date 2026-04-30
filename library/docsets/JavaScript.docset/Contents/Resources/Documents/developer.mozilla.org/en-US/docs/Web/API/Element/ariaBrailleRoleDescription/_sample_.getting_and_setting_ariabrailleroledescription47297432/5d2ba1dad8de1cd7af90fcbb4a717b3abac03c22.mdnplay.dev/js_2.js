
          const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
const article = document.getElementById("article");
log(article.ariaBrailleRoleDescription);
article.ariaBrailleRoleDescription = "sd";
log(article.ariaBrailleRoleDescription);
;
        