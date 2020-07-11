import { defaultTitle } from '../../constants';

export function createHeader(state) {
  return `
          <input type="text" class="input" data-type="titleInput" value="${
            state.tableTitle || defaultTitle
          }" />
          <div>
            <div class="button" data-action="delete">
              <span class="material-icons" data-action="delete">
                delete
              </span>
            </div>
            <div class="button" data-action="exit">
              <i class="material-icons" data-action="exit">exit_to_app</i>
            </div>
          </div>
        `;
}
