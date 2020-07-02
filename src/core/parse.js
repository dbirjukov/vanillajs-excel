export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      value = eval(value.slice(1));
      return value;
    } catch (error) {
      console.log(error);
      return value;
    }
  }
  return value;
}
