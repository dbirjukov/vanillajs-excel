import './scss/index.scss';
import Router from './core/Router/Router';
import DashboardPage from './pages/DashboardPage';
import ExcelPage from './pages/ExcelPage';

new Router('#root', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
