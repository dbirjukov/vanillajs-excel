import { storage } from '../core/utils';
import { defaultStyles, defaultTitle } from '../constants';

const defaultState = {
  colState: {},
  rowState: {},
  cellState: {},
  currentText: '',
  currentStyles: defaultStyles,
  cellStyles: {},
  tableTitle: defaultTitle,
};

export const initialState = storage('excel-state') || defaultState;
