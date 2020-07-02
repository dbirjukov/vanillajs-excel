import './scss/index.scss';
import { Excel } from './components/excel/Excel';
import { Header } from './components/Header/Header';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Formula } from './components/Formula/Formula';
import { Table } from './components/Table/Table';
import { createStore } from './core/createStore';
import { rootReducer } from './store/rootReducer';
import { storage, debounce } from './core/utils';
import { initialState } from './store/initialState';

const store = createStore(rootReducer, initialState);

const updateStorage = debounce((state) => {
  storage('excel-state', state);
  console.log('APP STATE', state);
}, 500);

store.subscribe(updateStorage);

const excel = new Excel('#root', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
