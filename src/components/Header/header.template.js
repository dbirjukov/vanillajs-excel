import { defaultTitle } from '../../constants';

export function createHeader(state) {
  return `
          <input type="text" class="input" data-type="titleInput" value="${
            state.tableTitle || defaultTitle
          }" />
          <div>
            <div class="button">
              <span class="material-icons">
                delete
              </span>
            </div>
            <div class="button">
              <i class="material-icons">exit_to_app</i>
            </div>
          </div>
        `;
}
