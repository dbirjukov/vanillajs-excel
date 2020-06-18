export function shouldResize(event) {
  const { dataset } = event.target;
  return dataset && dataset.resize;
}
