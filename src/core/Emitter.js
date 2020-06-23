export class Emitter {
  constructor() {
    this.events = {};
  }

  subscribe(event, fn) {
    this.events[event] = this.events[event] || [];
    this.events[event].push(fn);
    return () => {
      this.events[event] = this.events[event].filter(
        (listener) => listener !== fn,
      );
    };
  }

  emit(event, args) {
    if (!this.events[event] || !this.events[event].length) {
      return false;
    }
    this.events[event].forEach((fn) => fn(args));
  }
}
