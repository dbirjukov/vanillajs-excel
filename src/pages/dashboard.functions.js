import { storage } from '../core/utils';

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('excel')) {
      keys.push(key);
    }
  }
  return keys;
}

function formatDate(date) {
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

function toHTML(key) {
  const state = storage(key);
  const id = key.split(':')[1];
  const date = new Date(state.lastDate);
  return `
            <li class="dashboard__record">
              <a href="#excel/${id}">${state.tableTitle}</a>
              <strong>${formatDate(date)}</strong>
            </li>
  `;
}

export function displayDashboardRecords(state) {
  const keys = getAllKeys();
  if (!keys.length) {
    return `
      <p>You haven't created any tables yet.</p>
    `;
  }
  return ` <div class="dashboard__list-header">
            <span>Title</span>
            <span>Date opened</span>
            <!-- date opened ?-->
          </div>
          <ul class="dashboard__list">
          ${keys.map(toHTML).join('')} 
          </ul>`;
}
