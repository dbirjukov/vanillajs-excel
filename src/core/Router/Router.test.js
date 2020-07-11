import Router from './Router';
import Page from '../Page';

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'the dashboard';
    return root;
  }
}

class ExcelPage extends Page {
  getRoot() {
    return document.createElement('div');
  }
}

describe('Router', () => {
  let router;
  let $root;
  beforeEach(() => {
    $root = document.createElement('div');
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    });
  });
  test('is defined', () => {
    expect(router).toBeDefined();
  });
  test('router displays dashboard page by default', () => {
    router.hashChangeHandler();
    expect($root.innerHTML).toBe('<div>the dashboard</div>');
  });
});
