import { ExcelComponent } from '../../core/ExcelComponent';
import { $ } from '../../core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options = {}) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.query('[data-type="formula-input"]');
    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.data.value);
    });
  }

  stateChanged(changes) {
    this.$formula.text(changes.currentText);
  }

  onInput(e) {
    e.preventDefault();
    this.$emit('formula:input', $(e.target).text());
  }

  toHTML() {
    return `
          <div class="info">fx</div>
          <div class="input" contenteditable spellcheck="false" data-type="formula-input"></div>
        `;
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:enter');
    }
  }
}
