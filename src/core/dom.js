class DOM {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(content) {
    if (typeof content === 'string') {
      this.$el.innerHTML = content;
      return this;
    }
    return this.$el.outerHTML.trim();
  }
  clear() {
    return this.html('');
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  get children() {
    return Array.from(this.$el.children);
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  queryElAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  query(selector) {
    return $(this.$el.querySelector(selector));
  }

  css(styles = {}) {
    Object.assign(this.$el.style, styles);
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  get cellCoords() {
    if (this.data.element !== 'cell') {
      throw new Error("Can't get cell coordinates for a non-cell element");
    }
    return { row: this.data.row, col: this.data.col };
  }

  text(value) {
    if (typeof value === 'string') {
      if (this.$el.tagName.toLowerCase() === 'input') {
        this.$el.value = value;
      } else {
        this.$el.textContent = value;
      }
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    } else {
      return this.$el.textContent.trim();
    }
  }
  focus() {
    this.$el.focus();
    return this;
  }
}

export function $(selector) {
  return new DOM(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
