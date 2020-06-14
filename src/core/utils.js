export function capitalize(string) {
  if (typeof string !== 'string') {
    return;
  }
  return string.slice(0, 1).toUpperCase().concat(string.slice(1));
}
