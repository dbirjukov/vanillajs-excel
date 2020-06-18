import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resize } from './table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }
  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    resize(this.$root, event);
  }
}
