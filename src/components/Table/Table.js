import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resize } from './table.resize';
import { shouldResize, isCell, matrix, nextCellId } from './table.functions';
import { TableSelector } from './table.selector';
import { $ } from '../../core/dom';
import * as actions from '../../store/actions';
import { defaultStyles } from '../../constants';
import { CHANGE_STYLES } from '../../store/types';
import { parse } from '../../core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(this.$state);
  }

  prepare() {
    this.selection = new TableSelector();
  }

  init() {
    super.init();
    const $cell = this.$root.query('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', (value) => {
      const $cell = this.selection.current;
      $cell.attr('data-value', value).text(parse(value));
      this.updateTextInStore(value);
    });
    this.$on('formula:enter', () => {
      this.selection.current.$el.focus();
    });
    this.$on('toolbar:styleSelect', (style) => {
      this.selection.applyStyles(style);
      const ids = this.selection.ids;
      this.$dispatch(actions.applyStyles({ value: style, ids }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const cellStyles = this.selection.current.getStyles(
      Object.keys(defaultStyles),
    );
    this.$dispatch({ type: CHANGE_STYLES, data: cellStyles });
  }

  async resizeTable(event) {
    try {
      const data = await resize(this.$root, event);
      this.$dispatch(actions.resizeTable(data));
    } catch (error) {
      console.error(error);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.query(`[data-id="${id}"]`),
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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

  updateTextInStore(value) {
    this.$dispatch(
      actions.currentText({ id: this.selection.current.id(), value }),
    );
  }

  onInput(e) {
    const $target = $(e.target);
    $target.attr('data-value', $target.text());
    this.updateTextInStore($(e.target).text());
  }
}
