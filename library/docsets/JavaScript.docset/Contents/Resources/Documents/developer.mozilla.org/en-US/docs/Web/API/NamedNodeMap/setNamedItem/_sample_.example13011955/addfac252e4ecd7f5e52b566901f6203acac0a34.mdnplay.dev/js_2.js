
          const span = document.querySelector("span");
const pre = document.querySelector("pre");

let result = `The \`<pre>\` element initially contains ${pre.attributes.length} attributes.\n\n`;

result += "We remove `class` from `<span>` and add it to `<pre>`.\n";
const classAttribute = span.attributes.removeNamedItem("class");
pre.attributes.setNamedItem(classAttribute);
result += `The \`<pre>\` element now contains ${pre.attributes.length} attributes.\n\n`;

result += "We get `id` from `<span>` and try to add it to `<pre>`.\n";
const id = span.attributes.getNamedItem("id");
try {
  pre.attributes.setNamedItem(id);
} catch (error) {
  result += `An exception has been raised: ${error.name}: ${error.message}.\n`;
}

pre.textContent = result;
;
        