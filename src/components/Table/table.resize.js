import { $ } from '../../core/dom';

export function resize(root, event) {
  return new Promise((resolve) => {
    const { dataset } = event.target;
    const $resizer = $(event.target);
    $resizer.css({ opacity: 1 });
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    let resized;
    let startValue;
    let startPosition;
    let value;
    const type = dataset.resize;
    if (type === 'col') {
      const colIndex = $parent.data.col;
      startPosition = coords.right;
      startValue = coords.width;
      resized = root.queryElAll(`[data-col="${colIndex}"]`);
      document.onmousemove = (moveEvent) => {
        const delta = moveEvent.clientX - startPosition;
        value = startValue + delta;
        $resizer.css({ right: -delta + 'px', bottom: '-100vh' });
      };
    } else {
      startValue = coords.height;
      startPosition = coords.bottom;
      document.onmousemove = (moveEvent) => {
        const delta = moveEvent.clientY - startPosition;
        value = startValue + delta;
        $resizer.css({ bottom: -delta + 'px', right: '-100vw' });
      };
    }
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      $resizer.css({ opacity: null });
      if (type === 'col') {
        resized.forEach((el) => (el.style.width = value + 'px'));
        $resizer.css({ right: null, bottom: null });
      } else {
        $parent.css({ height: value + 'px' });
        $resizer.css({ bottom: null, right: null });
      }
      const id = $parent.data[type];
      resolve({
        id,
        value,
        type: dataset.resize,
      });
    };
  });
}
