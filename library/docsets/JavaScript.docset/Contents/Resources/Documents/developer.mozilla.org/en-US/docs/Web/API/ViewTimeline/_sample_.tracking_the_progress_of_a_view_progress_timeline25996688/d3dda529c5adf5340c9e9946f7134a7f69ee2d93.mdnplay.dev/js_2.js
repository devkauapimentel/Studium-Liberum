
          const subject = document.querySelector(".subject");
const output = document.querySelector(".output");

const timeline = new ViewTimeline({
  subject,
  axis: "block",
  inset: [CSS.px("200"), CSS.px("300")],
});

subject.animate(
  {
    opacity: [0, 1],
    transform: ["scaleX(0)", "scaleX(1)"],
  },
  {
    fill: "both",
    timeline,
  },
);

output.textContent += `Subject element: ${timeline.subject.nodeName}, `;
output.textContent += `start offset: ${timeline.startOffset}, `;
output.textContent += `end offset: ${timeline.endOffset}.`;
;
        