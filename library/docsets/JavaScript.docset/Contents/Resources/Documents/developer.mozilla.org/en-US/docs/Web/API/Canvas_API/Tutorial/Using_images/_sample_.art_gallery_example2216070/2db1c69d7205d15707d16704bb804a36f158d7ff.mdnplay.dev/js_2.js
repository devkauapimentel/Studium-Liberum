
          async function draw() {
  // Wait for all images to be loaded.
  await Promise.all(
    Array.from(document.images).map(
      (image) =>
        new Promise((resolve) => image.addEventListener("load", resolve)),
    ),
  );

  // Loop through all images.
  for (const image of document.images) {
    // Don't add a canvas for the frame image
    if (image.getAttribute("id") !== "frame") {
      // Create canvas element
      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", 132);
      canvas.setAttribute("height", 150);

      // Insert before the image
      image.parentNode.insertBefore(canvas, image);

      ctx = canvas.getContext("2d");

      // Draw image to canvas
      ctx.drawImage(image, 15, 20);

      // Add frame
      ctx.drawImage(document.getElementById("frame"), 0, 0);
    }
  }
}

draw();
;
        