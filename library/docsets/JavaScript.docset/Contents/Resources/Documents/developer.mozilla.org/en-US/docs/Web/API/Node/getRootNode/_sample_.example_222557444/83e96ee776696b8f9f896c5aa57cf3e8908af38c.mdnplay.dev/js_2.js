
          const parent = document.querySelector(".parent");
const child = document.querySelector(".child");
const shadowHost = document.querySelector(".shadowHost");
const output = document.getElementById("output");

output.innerText += `\nparent's root: ${parent.getRootNode().nodeName}\n`; // #document
output.innerText += `child's  root: ${child.getRootNode().nodeName}\n\n`; // #document

// create a ShadowRoot
const shadowRoot = shadowHost.attachShadow({ mode: "open" });
shadowRoot.innerHTML =
  '<style>div{background:#2bb8aa;}</style><div class="shadowChild">shadowChild</div>';
const shadowChild = shadowRoot.querySelector(".shadowChild");

// The default value of composed is false
output.innerText += `shadowChild.getRootNode() === shadowRoot : ${
  shadowChild.getRootNode() === shadowRoot
}\n`; // true
output.innerText += `shadowChild.getRootNode({ composed:false }) === shadowRoot : ${
  shadowChild.getRootNode({ composed: false }) === shadowRoot
}\n`; // true
output.innerText += `shadowChild.getRootNode({ composed:true }).nodeName : ${
  shadowChild.getRootNode({ composed: true }).nodeName
}\n`; // #document
;
        