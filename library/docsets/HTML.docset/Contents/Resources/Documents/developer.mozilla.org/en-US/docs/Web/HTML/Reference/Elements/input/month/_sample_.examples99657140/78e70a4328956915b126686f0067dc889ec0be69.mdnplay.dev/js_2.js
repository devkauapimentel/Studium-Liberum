
          // Get UI elements
const nativePicker = document.querySelector(".nativeDatePicker");
const fallbackPicker = document.querySelector(".fallbackDatePicker");
const fallbackLabel = document.querySelector(".fallbackLabel");

const yearSelect = document.querySelector("#year");
const monthSelect = document.querySelector("#month");

// Hide fallback initially
fallbackPicker.style.display = "none";
fallbackLabel.style.display = "none";

// Test whether a new date input falls back to a text input or not
const test = document.createElement("input");

try {
  test.type = "month";
} catch (e) {
  console.log(e.description);
}

// If it does, run the code inside the if () {} block
if (test.type === "text") {
  // Hide the native picker and show the fallback
  nativePicker.style.display = "none";
  fallbackPicker.style.display = "block";
  fallbackLabel.style.display = "block";

  // Populate the years dynamically
  // (the months are always the same, therefore hardcoded)
  populateYears();
}

function populateYears() {
  // Get the current year as a number
  const date = new Date();
  const year = date.getFullYear();

  // Make this year, and the 100 years before it available in the year <select>
  for (let i = 0; i <= 100; i++) {
    const option = document.createElement("option");
    option.textContent = year - i;
    yearSelect.appendChild(option);
  }
}
;
        