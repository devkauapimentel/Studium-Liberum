
          const text = document.getElementById("foo").firstChild;

if (!CSS.highlights) {
  text.textContent =
    "The CSS Custom Highlight API is not supported in this browser!";
}

// Create a couple of ranges.
const range1 = new Range();
range1.setStart(text, 0);
range1.setEnd(text, 3);

const range2 = new Range();
range2.setStart(text, 21);
range2.setEnd(text, 24);

// Create a custom highlight for these ranges.
const highlight = new Highlight(range1, range2);

// Register the ranges in the HighlightRegistry.
CSS.highlights.set("my-custom-highlight", highlight);
;
        