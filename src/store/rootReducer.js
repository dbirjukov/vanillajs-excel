import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLES,
  CHANGE_TITLE,
  UPDATE_DATE,
} from './types';

export function rootReducer(state, action) {
  let newCellStyles;
  let resizeField;
  switch (action.type) {
    case TABLE_RESIZE:
      resizeField = action.data.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state,
        [resizeField]: {
          ...state[resizeField],
          [action.data.id]: action.data.value,
        },
      };
    case CHANGE_TEXT:
      return {
        ...state,
        currentText: action.data.value,
        cellState: {
          ...state.cellState,
          [action.data.id]: action.data.value,
        },
      };
    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.data,
      };
    case APPLY_STYLES:
      newCellStyles = action.data.ids.reduce((result, id) => {
        const oldStyles = (state.cellStyles && state.cellStyles[id]) || {};
        result[id] = { ...oldStyles, ...action.data.value };
        return result;
      }, {});
      return {
        ...state,
        cellStyles: { ...state.cellStyles, ...newCellStyles },
      };
    case CHANGE_TITLE:
      return {
        ...state,
        tableTitle: action.data.title,
      };
    case UPDATE_DATE:
      return {
        ...state,
        lastDate: new Date(),
      };
  }
  return state;
}
