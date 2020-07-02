import { ExcelComponent } from '../../core/ExcelComponent';
import { changeTitle } from '../../store/actions';
import { createHeader } from './header.template';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      listeners: ['input'],
      ...options,
    });
  }
  onInput(e) {
    this.$dispatch(changeTitle({ title: e.target.value }));
  }
  toHTML() {
    return createHeader(this.$state);
  }
}
