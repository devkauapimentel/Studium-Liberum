
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "20px serif";

// Default (normal)
ctx.fillText(`Hello world (default: ${ctx.fontVariantCaps})`, 5, 20);

// Capitalization: small-caps
ctx.fontVariantCaps = "small-caps";
ctx.fillText(`Hello world (${ctx.fontVariantCaps})`, 5, 50);

// Capitalization: all-small-caps
ctx.fontVariantCaps = "all-small-caps";
ctx.fillText(`Hello world (${ctx.fontVariantCaps})`, 5, 80);

// Capitalization: petite-caps
ctx.fontVariantCaps = "petite-caps";
ctx.fillText(`Hello world (${ctx.fontVariantCaps})`, 5, 110);

// Capitalization: all-petite-caps
ctx.fontVariantCaps = "all-petite-caps";
ctx.fillText(`Hello world (${ctx.fontVariantCaps})`, 5, 140);

// Capitalization: unicase
ctx.fontVariantCaps = "unicase";
ctx.fillText(`Hello world (${ctx.fontVariantCaps})`, 5, 170);

// Capitalization: titling-caps
ctx.fontVariantCaps = "titling-caps";
ctx.fillText(`Hello world (${ctx.fontVariantCaps})`, 5, 200);
;
        