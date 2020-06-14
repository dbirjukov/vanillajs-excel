import { capitalize } from './utils';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('$root element is not provided');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((event) => {
      const method = getMethodName(event);
      if (!this[method]) {
        throw new Error(
          `${method} method not defined in ${this.name} Component`,
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(event, this[method]);
    });
  }
  removeDOMListeners() {
    this.listeners.forEach((event) => {
      const method = getMethodName(event);
      this.$root.off(event, this[method]);
    });
  }
}

function getMethodName(event) {
  return 'on' + capitalize(event);
}
