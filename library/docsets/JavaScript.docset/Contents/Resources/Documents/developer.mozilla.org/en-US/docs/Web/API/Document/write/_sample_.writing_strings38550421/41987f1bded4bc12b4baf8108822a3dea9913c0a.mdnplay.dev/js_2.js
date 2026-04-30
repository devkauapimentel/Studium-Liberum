
          const replace = document.querySelector("#replace");

const oneInput = "<h1>Out with the old</h1>";
const twoInput = "<p>in with the new!</p>";
const threeInput = "<script>alert('evil afoot')<" + "/script>";

replace.addEventListener("click", () => {
  document.open();
  document.write(oneInput, twoInput, threeInput);
  document.close();
});
;
        