const CODES = {
  A: 65,
  Z: 90,
};

function toCell(value = '') {
  return `
     <div class="cell" contenteditable>${value}</div>
  `;
}

function toColumn(letter) {
  return `
     <div class="column">${letter}</div>
  `;
}

function createRow(index, content) {
  return `
  <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
          </div> 
  `;
}

function toChar(_, index) {
  return String.fromCharCode(65 + index);
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A;
  const rows = [];

  // for (let k = 0; k < colsCount; k++) {
  //   cols.push(createColumn(toChar(CODES.A + k)));
  // }

  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('');

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('');

    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
}
