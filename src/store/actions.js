import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLES,
  CHANGE_TITLE,
  UPDATE_DATE,
} from './types';

export function resizeTable(data) {
  return { type: TABLE_RESIZE, data };
}

export function currentText(data) {
  return { type: CHANGE_TEXT, data };
}

export function changeStyles(data) {
  return { type: CHANGE_STYLES, data };
}

export function applyStyles(data) {
  return { type: APPLY_STYLES, data };
}

export function changeTitle(data) {
  return { type: CHANGE_TITLE, data };
}

export function updateDate() {
  return { type: UPDATE_DATE };
}