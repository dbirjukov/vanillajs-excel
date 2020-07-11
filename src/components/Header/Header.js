import { ExcelComponent } from '../../core/ExcelComponent';
import { changeTitle } from '../../store/actions';
import { createHeader } from './header.template';
import { $ } from '../../core/dom';
import ActiveRoute from '../../core/Router/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      listeners: ['input', 'click'],
      ...options,
    });
  }
  exitTable() {}
  deleteTable() {
    const desicion = confirm('Are you sure you want to delete this table?');
    if (desicion) {
      const key = 'excel:' + ActiveRoute.param;
      localStorage.removeItem(key);
      ActiveRoute.navigate('');
    }
  }
  onInput(e) {
    this.$dispatch(changeTitle({ title: e.target.value }));
  }
  onClick(e) {
    e.preventDefault();
    const $target = $(e.target);
    const action = $target.data.action;
    if (action) {
      switch (action) {
        case 'delete':
          this.deleteTable();
          break;
        case 'exit':
          ActiveRoute.navigate('');
      }
    }
  }
  toHTML() {
    return createHeader(this.$state);
  }
}
