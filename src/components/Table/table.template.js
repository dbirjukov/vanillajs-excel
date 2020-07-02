import { stylesToInline } from '../../core/utils';
import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;
const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row, state) {
  return function ({ col, width }) {
    const id = `${row}:${col}`;
    const value = state.cellState[id] || '';
    const stateStyles = state.cellStyles[id] || {};
    const styles =
      (stateStyles && stylesToInline(stateStyles)) ||
      stylesToInline(defaultStyles);
    return `
     <div class="cell" 
     contenteditable 
     data-type="resizable" 
     data-element="cell" 
     data-col="${col}" 
     data-id="${row}:${col}"
     data-value="${value}"
     style="width:${width}; ${styles}">
     ${parse(value)}
     </div>
  `;
  };
}

function widthFrom(colState) {
  return function (letter, col) {
    const width = (colState[col] || DEFAULT_WIDTH) + 'px';
    return { letter, col, width };
  };
}

function toColumn({ letter, col, width }) {
  return `
     <div class="column" data-type="resizable" data-col="${col}" style="width: ${width}">
     ${letter}
     <div class="col-resize" data-resize="col"></div>
     </div>
  `;
}

function createRow(index, content, state) {
  const height = (state[index] || DEFAULT_HEIGHT) + 'px';

  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
  <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
            <div class="row-info">
            ${index ? index : ''}
            ${resize} 
            </div>
            <div class="row-data">${content}</div>
          </div> 
  `;
}

function toChar(_, index) {
  return String.fromCharCode(65 + index);
}

export function createTable(state, rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthFrom(state.colState))
    .map(toColumn)
    .join('');

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(widthFrom(state.colState))
      .map(toCell(row, state))
      .join('');

    rows.push(createRow(row + 1, cells, state.rowState));
  }
  return rows.join('');
}
