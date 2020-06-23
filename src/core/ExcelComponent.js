import { DOMListener } from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || this.constructor.name;
    this.emitter = options.emitter;
    this.subscriptions = [];
    this.prepare();
  }
  prepare() {}
  toHtml() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.subscriptions.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.subscriptions.forEach((fn) => fn());
  }
}
