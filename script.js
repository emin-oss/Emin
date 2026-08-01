const STORAGE_KEY = 'emin-liste-eintraege';

const form = document.getElementById('entryForm');
const input = document.getElementById('entryInput');
const linesEl = document.getElementById('lines');
const countEl = document.getElementById('count');
const clearDoneBtn = document.getElementById('clearDone');
const todayEl = document.getElementById('today');

let items = load();

todayEl.textContent = new Date().toLocaleDateString('de-DE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function render() {
  linesEl.innerHTML = '';

  if (items.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'Noch nichts eingetragen.';
    empty.style.borderBottom = 'none';
    linesEl.appendChild(empty);
  }

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = item.done ? 'done' : '';

    const box = document.createElement('span');
    box.className = 'box';
    box.addEventListener('click', () => toggle(item.id));

    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = item.text;

    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.type = 'button';
    remove.textContent = '✕';
    remove.addEventListener('click', () => removeItem(item.id));

    li.append(box, text, remove);
    linesEl.appendChild(li);
  });

  const openCount = items.filter((i) => !i.done).length;
  countEl.textContent = `${openCount} offen · ${items.length} gesamt`;
}

function addItem(text) {
  items.push({ id: crypto.randomUUID(), text, done: false });
  save();
  render();
}

function toggle(id) {
  items = items.map((i) => (i.id === id ? { ...i, done: !i.done } : i));
  save();
  render();
}

function removeItem(id) {
  items = items.filter((i) => i.id !== id);
  save();
  render();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  addItem(value);
  input.value = '';
  input.focus();
});

clearDoneBtn.addEventListener('click', () => {
  items = items.filter((i) => !i.done);
  save();
  render();
});

render();
