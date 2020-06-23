export class TableSelector {
  static className = 'selected';
  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    $el.addClass(TableSelector.className);
    this.current = $el;
    $el.focus();
    this.group.push($el);
  }

  selectGroup($cells) {
    this.clear();
    this.group = $cells;
    this.group.forEach(($cell) => $cell.addClass(TableSelector.className));
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelector.className));
    this.group = [];
  }
}

// function coordsEqual($cell1, $cell2) {
//   const { row: cell1Row, col: cell1Col } = $cell1.cellCoords;
//   const { row: cell2Row, col: cell2Col } = $cell2.cellCoords;
//   return cell1Row === cell2Row && cell1Col === cell2Col;
// }

// function getRange(coords1, coords2) {
//   const { row: row1, col: col1 } = coords1;
//   const { row: row2, col: col2 } = coords2;

//   let rowStart;
//   let rowEnd;
//   let colStart;
//   let colEnd;

//   if (row1 < row2) {
//     rowStart = row1;
//     rowEnd = row2;
//   } else {
//     rowStart = row2;
//     rowEnd = row1;
//   }

//   if (col1 < col2) {
//     colStart = col1;
//     colEnd = col2;
//   } else {
//     colStart = col2;
//     colEnd = col1;
//   }

//   const range = [];

//   for (let row = rowStart; row <= rowEnd; row++) {
//     for (let col = colStart; col <= colEnd; col++) {
//       range.push({ row, col });
//     }
//   }

//   return range;
// }
