
          const policy = trustedTypes.createPolicy("docPolicy", {
  createHTML(string) {
    return string
      .replace("<script", "&lt;script")
      .replace("</script", "&lt;/script");
  },
});
const oneInput = "<h1>Out with the old</h1>";
const twoInput = "<p>in with the new!</p>";
const threeInput = "<script>alert('evil afoot')<" + "/script>";
const replace = document.querySelector("#replace");

replace.addEventListener("click", () => {
  document.open();
  document.write(
    policy.createHTML(oneInput),
    policy.createHTML(twoInput),
    policy.createHTML(threeInput),
  );
  document.close();
});
;
        