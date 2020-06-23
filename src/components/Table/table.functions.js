import { $ } from '../../core/dom';
import { range } from '../../core/utils';

export function shouldResize(event) {
  const { dataset } = event.target;
  return dataset && dataset.resize;
}

export function isCell(event) {
  return $(event.target).data.element === 'cell';
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  const ids = rows.reduce((acc, row) => {
    cols.forEach((col) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
  return ids;
}

export function nextCellId(key, { row, col }) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowUp':
      row === 0 ? 0 : (row -= 1);
      break;
    case 'ArrowLeft':
      col === 0 ? 0 : (col -= 1);
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
