export class Listenable {
  private eventTarget: EventTarget = new EventTarget();

  subscribe(func: () => void) {
    this.eventTarget.addEventListener("update", func);
  }

  unsubscribe(func: () => void) {
    this.eventTarget.removeEventListener("update", func);
  }

  protected notify() {
    this.eventTarget.dispatchEvent(new Event("update"));
  }
}
