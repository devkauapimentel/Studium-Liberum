
          const ssn = document.getElementById("ssn");
const current = document.getElementById("current");

ssn.oninput = (event) => {
  current.textContent = ssn.value;
};
;
        