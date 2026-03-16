export const storageKeys = {
  bookmarks: 'sorad_bookmarks',
  calcHistory: 'sorad_calc_history',
  quizScores: 'sorad_quiz_scores',
  notes: 'sorad_notes',
  activity: 'sorad_activity',
  progress: 'sorad_progress',
  recentSearches: 'sorad_recent_searches',
  moduleLastOpen: 'sorad_module_last_open',
};

export const readLocal = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const writeLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const pushUnique = (items, next, max = 20) => {
  const filtered = items.filter((item) => item.id !== next.id);
  return [next, ...filtered].slice(0, max);
};
