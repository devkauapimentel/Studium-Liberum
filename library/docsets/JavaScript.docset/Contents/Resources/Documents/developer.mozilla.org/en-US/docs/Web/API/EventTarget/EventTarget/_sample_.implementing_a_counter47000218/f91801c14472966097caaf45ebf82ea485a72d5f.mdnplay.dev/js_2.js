
          class Counter extends EventTarget {
  constructor(initialValue = 0) {
    super();
    this.value = initialValue;
  }

  #emitChangeEvent() {
    this.dispatchEvent(new CustomEvent("valuechange", { detail: this.value }));
  }

  increment() {
    this.value++;
    this.#emitChangeEvent();
  }

  decrement() {
    this.value--;
    this.#emitChangeEvent();
  }
}

const initialValue = 0;
const counter = new Counter(initialValue);
document.querySelector("#currentValue").innerText = initialValue;

counter.addEventListener("valuechange", (event) => {
  document.querySelector("#currentValue").innerText = event.detail;
});

document.querySelector("#inc").addEventListener("click", () => {
  counter.increment();
});

document.querySelector("#dec").addEventListener("click", () => {
  counter.decrement();
});
;
        