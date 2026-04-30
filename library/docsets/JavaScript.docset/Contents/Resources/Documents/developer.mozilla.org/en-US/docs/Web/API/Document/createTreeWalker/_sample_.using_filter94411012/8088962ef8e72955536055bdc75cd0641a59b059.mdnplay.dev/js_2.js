
          const treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  (node) =>
    node.classList.contains("no-escape")
      ? NodeFilter.FILTER_REJECT
      : node.closest(".escape")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP,
);

while (treeWalker.nextNode()) {
  for (const node of treeWalker.currentNode.childNodes) {
    if (node.nodeType === Node.TEXT_NODE && /\S/.test(node.data)) {
      // Exclude whitespace-only text nodes
      node.data = encodeURI(node.data.replace(/\s+/g, " "));
    }
  }
}
;
        