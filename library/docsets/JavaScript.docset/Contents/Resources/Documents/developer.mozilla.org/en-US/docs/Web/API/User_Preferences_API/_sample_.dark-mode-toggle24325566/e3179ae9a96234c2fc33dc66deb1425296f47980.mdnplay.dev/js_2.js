
          if (navigator.preferences) {
  const inputs = {
    light: document.querySelector('[name="color-scheme"][value="light"]'),
    dark: document.querySelector('[name="color-scheme"][value="dark"]'),
  };

  inputs[navigator.preferences.colorScheme.value].checked = true;

  inputs.light.addEventListener("change", () => {
    navigator.preferences.colorScheme.requestOverride("light");
  });
  inputs.dark.addEventListener("change", () => {
    navigator.preferences.colorScheme.requestOverride("dark");
  });

  navigator.preferences.colorScheme.addEventListener("change", () => {
    inputs[navigator.preferences.colorScheme.value].checked = true;
  });
} else {
  document.body.append(
    "Your browser doesn’t support the navigator.preferences API",
  );
}
;
        