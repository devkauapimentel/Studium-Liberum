
          const text = document.querySelector("p").firstChild;

// Create two overlapping highlights
const range1 = new Range();
range1.setStart(text, 5);
range1.setEnd(text, 25);

const range2 = new Range();
range2.setStart(text, 15);
range2.setEnd(text, 35);

const highlight1 = new Highlight(range1);
const highlight2 = new Highlight(range2);

CSS.highlights.set("highlight-1", highlight1);
CSS.highlights.set("highlight-2", highlight2);
;
        