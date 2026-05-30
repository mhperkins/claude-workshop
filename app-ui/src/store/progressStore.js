const KEY = 'workshop:progress';

function load() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]'));
  } catch {
    return new Set();
  }
}

function save(set) {
  localStorage.setItem(KEY, JSON.stringify([...set]));
}

export function markComplete(exerciseId) {
  const set = load();
  set.add(exerciseId);
  save(set);
}

export function isComplete(exerciseId) {
  return load().has(exerciseId);
}

export function completedIds() {
  return load();
}

export function countCompleted(exercises) {
  const done = load();
  return exercises.filter(ex => done.has(ex.id)).length;
}
