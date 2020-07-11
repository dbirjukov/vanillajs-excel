import { defaultStyles, defaultTitle } from '../constants';

const defaultState = {
  colState: {},
  rowState: {},
  cellState: {},
  currentText: '',
  currentStyles: defaultStyles,
  cellStyles: {},
  tableTitle: defaultTitle,
  lastDate: new Date(),
};

export const initialState = (state) => (state ? state : defaultState);
