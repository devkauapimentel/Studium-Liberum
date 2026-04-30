
          const form = document.querySelector("form");
const textarea = document.querySelector("textarea");
const submitBtn = document.querySelector("button");

const summaryOutput = document.querySelector(".summary-output");
const inputCount = document.querySelector(".input-count");
const outputCount = document.querySelector(".output-count");
form.addEventListener("submit", handleSubmission);
textarea.addEventListener("input", updateInputCount);
function updateInputCount() {
  inputCount.textContent = `Input character count: ${textarea.value.length}`;
}

function displayOutputCount() {
  outputCount.textContent = `Output summary character count: ${summaryOutput.textContent.length}`;
}
async function handleSubmission(e) {
  e.preventDefault();
  const formData = new FormData(form);

  if (formData.get("summaryText") === "") {
    summaryOutput.innerHTML = `<span class="error">No text entered to summarize!</span>`;
    return;
  } else if (formData.get("summaryText").length < 100) {
    summaryOutput.innerHTML = `<span class="error">I'm not trying to summarize something that short!</span>`;
    return;
  }
  summaryOutput.innerHTML = "";

  try {
    const summarizer = await Summarizer.create({
      sharedContext:
        "A general summary to help a user decide if the text is worth reading",
      type: formData.get("summaryType"),
      length: formData.get("summaryLength"),
    });

    summaryOutput.textContent = "...generating summary...";
    outputCount.textContent = "Output summary character count: -";
    submitBtn.disabled = true;

    const summary = await summarizer.summarize(formData.get("summaryText"));

    summaryOutput.textContent = summary;
    displayOutputCount();
    submitBtn.disabled = false;
  } catch (e) {
    summaryOutput.innerHTML = `<span class="error">${e}</span>`;
  }
}
updateInputCount();
;
        