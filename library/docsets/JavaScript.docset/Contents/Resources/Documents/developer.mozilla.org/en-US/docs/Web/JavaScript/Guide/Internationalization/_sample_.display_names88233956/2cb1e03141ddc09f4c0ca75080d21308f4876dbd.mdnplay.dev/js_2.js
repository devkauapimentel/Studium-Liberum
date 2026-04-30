
          const langSelect = document.getElementById("lang");
const calSelect = document.getElementById("calendar");
const fieldset = document.querySelector("fieldset");
const output = document.getElementById("output");

// A few examples
const langs = [
  "en-US",
  "zh-Hans-CN",
  "ja-JP",
  "ar-EG",
  "ru-RU",
  "es-ES",
  "fr-FR",
  "de-DE",
  "hi-IN",
  "pt-BR",
  "bn-BD",
  "he-IL",
];
const calendars = Intl.supportedValuesOf("calendar");

for (const lang of langs) {
  const option = document.createElement("option");
  option.value = lang;
  option.textContent = new Intl.DisplayNames(lang, { type: "language" }).of(
    lang,
  );
  langSelect.appendChild(option);
}

function renderCalSelect() {
  const lang = langSelect.value;
  calSelect.innerHTML = "";
  const dn = new Intl.DisplayNames(lang, { type: "calendar" });
  const preferredCalendars = new Intl.Locale(lang).getCalendars?.() ?? [
    "gregory",
  ];
  for (const cal of [
    ...preferredCalendars,
    ...calendars.filter((c) => !preferredCalendars.includes(c)),
  ]) {
    const option = document.createElement("option");
    option.value = cal;
    option.textContent = dn.of(cal);
    calSelect.appendChild(option);
  }
}

function renderFieldInputs() {
  const lang = langSelect.value;
  fieldset.querySelectorAll("label").forEach((label) => label.remove());
  const dn = new Intl.DisplayNames(lang, { type: "dateTimeField" });
  for (const field of fields) {
    const label = document.createElement("label");
    label.textContent = dn.of(field);
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = field;
    label.appendChild(input);
    fieldset.appendChild(label);
  }
}

function renderTime() {
  const lang = langSelect.value;
  const cal = calSelect.value;
  const df = new Intl.DateTimeFormat(lang, {
    calendar: cal,
    dateStyle: "full",
    timeStyle: "full",
  });
  const now = new Date();
  const dn = new Intl.DisplayNames(lang, { type: "dateTimeField" });
  output.innerHTML = "";
  for (const component of df.formatToParts(now)) {
    const text = document.createElement("span");
    text.textContent = component.value;
    if (
      ![
        "era",
        "year",
        "quarter",
        "month",
        "weekOfYear",
        "weekday",
        "day",
        "dayPeriod",
        "hour",
        "minute",
        "second",
        "timeZoneName",
      ].includes(component.type)
    ) {
      output.appendChild(text);
      continue;
    }
    const title = dn.of(component.type);
    const field = document.createElement("ruby");
    field.appendChild(text);
    const rt = document.createElement("rt");
    rt.textContent = title;
    field.appendChild(rt);
    output.appendChild(field);
  }
}

renderCalSelect();
renderTime();
langSelect.addEventListener("change", renderCalSelect);
langSelect.addEventListener("change", renderTime);
calSelect.addEventListener("change", renderTime);
setInterval(renderTime, 500);
;
        