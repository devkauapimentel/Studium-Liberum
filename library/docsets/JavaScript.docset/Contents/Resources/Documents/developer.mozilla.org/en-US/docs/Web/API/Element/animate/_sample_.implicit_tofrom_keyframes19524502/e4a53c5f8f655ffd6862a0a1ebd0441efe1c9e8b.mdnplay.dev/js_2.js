
          const logo = document.getElementById("logo");
document.getElementById("run").addEventListener("click", () => {
  logo.animate({ transform: "translateX(300px)" }, 1000);
});
document.getElementById("run2").addEventListener("click", () => {
  logo.animate({ transform: "translateX(300px)", offset: 0 }, 1000);
});
document.getElementById("run3").addEventListener("click", () => {
  logo.animate({ transform: "translateX(300px)", offset: 0.5 }, 1000);
});
;
        