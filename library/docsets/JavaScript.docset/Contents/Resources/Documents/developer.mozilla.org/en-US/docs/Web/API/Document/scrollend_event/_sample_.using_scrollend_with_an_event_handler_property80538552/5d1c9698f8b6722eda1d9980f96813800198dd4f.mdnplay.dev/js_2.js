
          document.onscroll = (event) => {
  output.textContent = "Document scroll event fired!";
};

document.onscrollend = (event) => {
  output.textContent = "Document scrollend event fired!";
};
;
        