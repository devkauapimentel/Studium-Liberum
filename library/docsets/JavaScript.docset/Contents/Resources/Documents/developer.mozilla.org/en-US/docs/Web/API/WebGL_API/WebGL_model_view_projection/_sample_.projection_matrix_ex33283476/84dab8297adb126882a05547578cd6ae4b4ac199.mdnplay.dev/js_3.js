
  // Each point has a position and color
  attribute vec3 position;
  attribute vec4 color;

  // The transformation matrices
  uniform mat4 model;
  uniform mat4 projection;

  // Pass the color attribute down to the fragment shader
  varying vec4 vColor;

  void main() {
    // Pass the color down to the fragment shader
    vColor = color;

    // Read the multiplication in reverse order, the original point is moved
    // into clip space, and then projected into a perspective view by filling
    // in the W component
    gl_Position = projection * model * vec4(position, 1.0);
  }
