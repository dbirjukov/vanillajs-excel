import Page from '../core/Page';
import { Excel } from '../components/Excel/Excel';
import { Header } from '../components/Header/Header';
import { Toolbar } from '../components/Toolbar/Toolbar';
import { Formula } from '../components/Formula/Formula';
import { Table } from '../components/Table/Table';
import { createStore } from '../core/store/createStore';
import { rootReducer } from '../store/rootReducer';
import { storage, debounce } from '../core/utils';
import { initialState } from '../store/initialState';

function storeName(param) {
  return 'excel:' + param;
}

export default class ExcelPage extends Page {
  getRoot() {
    const param = this.param || Date.now().toString();
    const state = storage(storeName(param));
    const store = createStore(rootReducer, initialState(state));
    const updateStorage = debounce((state) => {
      storage(storeName(param), state);
    }, 500);

    store.subscribe(updateStorage);
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.render();
  }

  destroy() {
    this.excel.destroy();
  }
}
