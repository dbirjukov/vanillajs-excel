import { $ } from '../dom';
import ActiveRoute from './ActiveRoute';

export default class Router {
  constructor(selector, routes) {
    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;
    this.hashChangeHandler = this.hashChangeHandler.bind(this);

    this.init();
  }
  init() {
    window.addEventListener('hashchange', this.hashChangeHandler);

    let route = Object.keys(this.routes).find((r) =>
      ActiveRoute.path.includes(r),
    );
    if (!route) {
      route = 'dashboard';
    }
    const Page = this.routes[route];
    const page = new Page(ActiveRoute.param);
    this.$placeholder.append(page.getRoot());
    page.afterRender();
  }

  hashChangeHandler(event) {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    let route = Object.keys(this.routes).find((r) =>
      ActiveRoute.path.includes(r),
    );
    if (!route) {
      route = 'dashboard';
    }
    const Page = this.routes[route];
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.hashChangeHandler);
  }
}
