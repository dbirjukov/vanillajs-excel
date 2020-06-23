export function capitalize(string) {
  if (typeof string !== 'string') {
    return;
  }
  return string.slice(0, 1).toUpperCase().concat(string.slice(1));
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  const result = new Array(end - start + 1)
    .fill('')
    .map((_, index) => start + index);
  return result;
}
