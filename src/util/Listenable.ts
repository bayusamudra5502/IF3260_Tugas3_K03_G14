export class Listenable extends EventTarget {
  subscribe(func: () => void) {
    this.addEventListener("update", func);
  }

  unsubscribe(func: () => void) {
    this.removeEventListener("update", func);
  }

  protected notify() {
    this.dispatchEvent(new Event("update"));
  }
}
