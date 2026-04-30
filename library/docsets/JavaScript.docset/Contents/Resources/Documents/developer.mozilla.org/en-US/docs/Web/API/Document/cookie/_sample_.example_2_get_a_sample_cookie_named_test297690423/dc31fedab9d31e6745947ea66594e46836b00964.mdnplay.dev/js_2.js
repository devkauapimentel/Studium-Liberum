
          const showBtn = document.getElementById("show");
const clearBtn = document.getElementById("clear");
const output = document.getElementById("cookie-value");

// Note that we are setting `SameSite=None;` in this example because the example
// needs to work cross-origin.
// It is more common not to set the `SameSite` attribute, which results in the default,
// and more secure, value of `SameSite=Lax;`
document.cookie = "test1=Hello; SameSite=None; Secure";
document.cookie = "test2=World; SameSite=None; Secure";

showBtn.addEventListener("click", () => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("test2="))
    ?.split("=")[1];
  output.textContent = `> ${cookieValue}`;
});
clearBtn.addEventListener("click", () => {
  output.textContent = "";
});
;
        