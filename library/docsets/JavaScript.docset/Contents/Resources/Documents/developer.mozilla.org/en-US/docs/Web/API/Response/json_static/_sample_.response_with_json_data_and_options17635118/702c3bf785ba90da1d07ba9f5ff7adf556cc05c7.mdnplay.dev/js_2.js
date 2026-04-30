
          const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += `${text}\n`;
}

async function logResponse(response) {
  const responseText = await response.text();
  log(`body: ${responseText}`);
  response.headers.forEach((header) => log(`header: ${header}`));
  log(`status: ${response.status}`);
  log(`statusText: ${response.statusText}`);
  log(`type: ${response.type}`);
  log(`url: ${response.url}`);
  log(`ok: ${response.ok}`);
  log(`redirected: ${response.redirected}`);
  log(`bodyUsed: ${response.bodyUsed}`);
}
const jsonResponse = Response.json(
  { some: "data", more: "information" },
  { status: 307, statusText: "Temporary Redirect" },
);
logResponse(jsonResponse);
;
        