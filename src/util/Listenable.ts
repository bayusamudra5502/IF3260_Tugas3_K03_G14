export class Listenable {
  private listener: Function[] = [];

  subscribe(func: () => void) {
    const idx = this.listener.length;
    this.listener.push(func);
    return idx;
  }

  unsubscribe(idx: number) {
    this.listener.splice(idx, 1);
  }

  protected notify() {
    for (const fn of this.listener) {
      fn();
    }
  }
}
