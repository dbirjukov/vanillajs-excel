import Page from '../core/Page';
import { $ } from '../core/dom';
import { displayDashboardRecords } from './dashboard.functions';

export default class DashboardPage extends Page {
  getRoot() {
    const tableId = Date.now().toString();
    return $.create('div', 'dashboard').html(`
        <div class="dashboard__header">
          <h1>Excel in pure JS (no frameworks)</h1>
        </div>
        <div class="dashboard__new">
          <div class="dashboard__view">
            <a href="#excel/${tableId}" class="dashboard__create">
              New <br />
              table
            </a>
          </div>
        </div>
        <div class="dashboard__table dashboard__view">
          ${displayDashboardRecords()}
        </div>
      `);
  }
}
