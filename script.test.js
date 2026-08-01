const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const scriptContent = fs.readFileSync('/home/runner/work/Emin/Emin/script.js', 'utf8');

function createEnvironment(themePreference) {
  class Element {
    constructor(tagName = 'div') {
      this.tagName = tagName;
      this.children = [];
      this.attributes = {};
      this.listeners = {};
      this.style = {};
      this.className = '';
      this.textContent = '';
      this.value = '';
      this.type = '';
      this._innerHTML = '';
    }

    addEventListener(type, handler) {
      this.listeners[type] = handler;
    }

    click() {
      if (this.listeners.click) this.listeners.click({ preventDefault() {} });
    }

    append(...nodes) {
      this.children.push(...nodes);
    }

    appendChild(node) {
      this.children.push(node);
      return node;
    }

    setAttribute(name, value) {
      this.attributes[name] = String(value);
    }

    getAttribute(name) {
      return this.attributes[name] ?? null;
    }

    set innerHTML(value) {
      this._innerHTML = value;
      this.children = [];
    }

    get innerHTML() {
      return this._innerHTML;
    }
  }

  const documentElement = new Element('html');
  const elements = {
    entryForm: new Element('form'),
    entryInput: new Element('input'),
    lines: new Element('ul'),
    count: new Element('span'),
    clearDone: new Element('button'),
    today: new Element('p'),
    themeToggle: new Element('button'),
  };

  const storage = {};
  if (themePreference) storage.themePreference = themePreference;

  const localStorage = {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null;
    },
    setItem(key, value) {
      storage[key] = String(value);
    },
  };

  const document = {
    documentElement,
    getElementById(id) {
      return elements[id] ?? null;
    },
    createElement(tag) {
      return new Element(tag);
    },
  };

  vm.runInNewContext(scriptContent, {
    document,
    localStorage,
    crypto: { randomUUID: () => 'id-1' },
    Date,
  });

  return { elements, documentElement, storage };
}

test('defaults to light mode when no preference exists', () => {
  const { documentElement, elements } = createEnvironment();
  assert.equal(documentElement.getAttribute('data-theme'), 'light');
  assert.equal(elements.themeToggle.textContent, 'Dark Mode');
});

test('restores saved dark mode on load', () => {
  const { documentElement, elements } = createEnvironment('dark');
  assert.equal(documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(elements.themeToggle.textContent, 'Light Mode');
  assert.equal(elements.themeToggle.getAttribute('aria-pressed'), 'true');
});

test('toggles theme immediately and persists preference', () => {
  const { documentElement, elements, storage } = createEnvironment();
  elements.themeToggle.click();
  assert.equal(documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(storage.themePreference, 'dark');
  assert.equal(elements.themeToggle.textContent, 'Light Mode');
});

test('toggles back to light mode and updates persistence', () => {
  const { documentElement, elements, storage } = createEnvironment('dark');
  elements.themeToggle.click();
  assert.equal(documentElement.getAttribute('data-theme'), 'light');
  assert.equal(storage.themePreference, 'light');
  assert.equal(elements.themeToggle.textContent, 'Dark Mode');
});
