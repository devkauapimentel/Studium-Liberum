
          const sourcePara = document.querySelector(".source");
const resultPara = document.querySelector(".result");
const string = sourcePara.textContent;

const textEncoder = new TextEncoder();

const encoded = textEncoder.encode(string);
resultPara.textContent = `${resultPara.textContent} ${encoded}`;
;
        