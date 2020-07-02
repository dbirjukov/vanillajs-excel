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

export function storage(key, value = null) {
  if (!value) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(value));
}

export function stylesToInline(styles) {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
    .join('; ');
}

export function camelToDashCase(string) {
  return string.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function debounce(fn, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
