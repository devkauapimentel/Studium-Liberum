
          const aliceTumbling = [
  { transform: "rotate(0) translate3d(-50%, -50%, 0)", color: "black" },
  { color: "#431236", offset: 0.3 },
  { transform: "rotate(360deg) translate3d(-50%, -50%, 0)", color: "black" },
];
const aliceTiming = {
  duration: 3000,
  iterations: Infinity,
};
document.getElementById("alice").animate(aliceTumbling, aliceTiming);
document
  .getElementById("tunnel")
  .animate(
    [
      { transform: "translate3d(0, 0, 0)" },
      { transform: "translate3d(0, -300px, 0)" },
    ],
    {
      duration: 1000,
      iterations: Infinity,
    },
  );
;
        