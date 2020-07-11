export default class Page {
  constructor(param) {
    this.param = param;
  }
  getRoot() {
    throw new Error('method get root is not implemented');
  }

  afterRender() {}

  destroy() {}
}
