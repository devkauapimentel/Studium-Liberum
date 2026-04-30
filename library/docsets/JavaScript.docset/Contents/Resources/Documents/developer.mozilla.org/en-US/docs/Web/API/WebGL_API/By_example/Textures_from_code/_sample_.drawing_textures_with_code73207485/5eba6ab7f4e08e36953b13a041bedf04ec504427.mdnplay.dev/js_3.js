
  #version 100
  precision mediump float;
  void main() {
    vec2 fragmentPosition = 2.0*gl_PointCoord - 1.0;
    float distance = length(fragmentPosition);
    float distanceSq = distance * distance;
    gl_FragColor = vec4(
      0.2/distanceSq,
      0.1/distanceSq,
      0.0, 1.0 );
  }
