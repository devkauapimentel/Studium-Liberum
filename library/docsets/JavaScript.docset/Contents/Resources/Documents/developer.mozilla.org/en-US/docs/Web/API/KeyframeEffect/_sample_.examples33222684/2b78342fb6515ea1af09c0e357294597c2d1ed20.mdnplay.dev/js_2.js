
          const emoji = document.querySelector("div"); // element to animate

const rollingKeyframes = new KeyframeEffect(
  emoji,
  [
    { transform: "translateX(0) rotate(0)" }, // keyframe
    { transform: "translateX(200px) rotate(1.3turn)" }, // keyframe
  ],
  {
    // keyframe options
    duration: 2000,
    direction: "alternate",
    easing: "ease-in-out",
    iterations: "Infinity",
  },
);

const rollingAnimation = new Animation(rollingKeyframes, document.timeline);

// play rofl animation
rollingAnimation.play();
;
        