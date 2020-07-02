import { createToolbar } from './toolbar.template';
import { $ } from '../../core/dom';
import ExcelStateComponent from '../../core/ExcelStateComponent';
import { defaultStyles } from '../../constants';

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
    this.subscribe = ['currentStyles'];
  }
  static className = 'excel__toolbar';

  prepare() {
    this.initState(defaultStyles);
  }

  init() {
    super.init();
  }

  stateChanged({ currentStyles }) {
    if (currentStyles) {
      this.setState(currentStyles);
    }
  }

  onClick(e) {
    const $target = $(e.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.setState(value);
      this.$emit('toolbar:styleSelect', value);
    }
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }
}
