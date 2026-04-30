
          function supportsPopover() {
  return Object.hasOwn(HTMLElement.prototype, "popover");
}

const popover = document.getElementById("mypopover");
const showBtn = document.getElementById("showBtn");
const hideBtn = document.getElementById("hideBtn");

const popoverSupported = supportsPopover();

if (supportsPopover()) {
  // Set the <div> element be a manual popover
  popover.popover = "manual";

  // Set the button targets to be the popover
  showBtn.popoverTargetElement = popover;
  hideBtn.popoverTargetElement = popover;

  // Set the target actions to be show/hide
  showBtn.popoverTargetAction = "show";
  hideBtn.popoverTargetAction = "hide";
} else {
  popover.textContent = "Popover API not supported.";
  showBtn.hidden = true;
  hideBtn.hidden = true;
}
;
        