
          const pre = document.querySelector("pre");
const attrMap = pre.attributes;

pre.textContent = `The attribute map contains:
0: ${attrMap.item(0).name}
1: ${attrMap[1].name}
2: ${attrMap.item(2).name}`;
;
        