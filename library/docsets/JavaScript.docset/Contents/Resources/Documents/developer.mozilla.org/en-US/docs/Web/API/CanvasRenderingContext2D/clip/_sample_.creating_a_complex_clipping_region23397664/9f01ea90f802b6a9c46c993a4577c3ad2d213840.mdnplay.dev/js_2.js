
          const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create two clipping paths
let circlePath = new Path2D();
circlePath.arc(150, 75, 75, 0, 2 * Math.PI);
let squarePath = new Path2D();
squarePath.rect(85, 10, 130, 130);

// Set the clip to the circle
ctx.clip(circlePath);
// Set the clip to be the intersection of the circle and the square
ctx.clip(squarePath);

// Draw stuff that gets clipped
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
;
        