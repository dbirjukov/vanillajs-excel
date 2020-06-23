import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resize } from './table.resize';
import { shouldResize, isCell, matrix, nextCellId } from './table.functions';
import { TableSelector } from './table.selector';
import { $ } from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelector();
  }

  init() {
    super.init();
    const $cell = this.$root.query('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.$on('formula:enter', () => {
      this.selection.current.$el.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resize(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.query(`[data-id="${id}"]`),
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const key = event.key;
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const currentId = this.selection.current.id(true);
      const $next = this.$root.query(nextCellId(key, currentId));
      this.selectCell($next);
    }
  }

  onInput(e) {
    this.$emit('table:input', $(e.target).text());
  }
}
