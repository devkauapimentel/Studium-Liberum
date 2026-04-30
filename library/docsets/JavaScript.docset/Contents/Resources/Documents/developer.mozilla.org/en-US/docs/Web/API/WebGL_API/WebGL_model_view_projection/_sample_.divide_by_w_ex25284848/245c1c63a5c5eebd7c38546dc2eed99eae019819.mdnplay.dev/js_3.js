
  // Each point has a position and color
  attribute vec3 position;
  attribute vec4 color;

  // The projection matrix
  uniform mat4 model;

  // Pass the color attribute down to the fragment shader
  varying vec4 vColor;

  void main() {
    // Pass the color down to the fragment shader
    vColor = color;

    // First transform the point
    vec4 transformedPosition = model * vec4(position, 1.0);

    // How much affect does the perspective have?
    float scaleFactor = 0.5;

    // Set w by taking the Z value which is typically ranged -1 to 1, then scale
    // it to be from 0 to some number, in this case 0-1.
    float w = (1.0 + transformedPosition.z) * scaleFactor;

    // Save the new gl_Position with the custom w component
    gl_Position = vec4(transformedPosition.xyz, w);
  }
