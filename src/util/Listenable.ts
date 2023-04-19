export class Listenable {
  private eventTarget: EventTarget = new EventTarget();

  subscribe(func: () => void) {
    this.eventTarget.addEventListener("update", func);
  }

  unsubscribe(func: () => void) {
    this.eventTarget.removeEventListener("update", func);
  }

  subscribeType(type: string, func: () => void) {
    this.eventTarget.addEventListener(type, func);
  }

  unsubscribeType(type: string, func: () => void) {
    this.eventTarget.removeEventListener(type, func);
  }

  protected notify(type: string = "update") {
    this.eventTarget.dispatchEvent(new Event(type));
  }
}
