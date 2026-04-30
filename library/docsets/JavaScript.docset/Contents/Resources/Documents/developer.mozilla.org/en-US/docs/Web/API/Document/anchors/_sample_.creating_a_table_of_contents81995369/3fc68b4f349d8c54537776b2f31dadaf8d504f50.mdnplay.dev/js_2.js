
          const toc = document.getElementById("toc");
for (const anchor of document.anchors) {
  const li = document.createElement("li");
  const newAnchor = document.createElement("a");
  newAnchor.href = `#${anchor.name}`;
  newAnchor.textContent = anchor.text;
  li.appendChild(newAnchor);
  toc.appendChild(li);
}
;
        