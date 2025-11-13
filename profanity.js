// js/profanity.js
// Using bad-words + Kenyan slang
import Filter from 'https://cdn.jsdelivr.net/npm/bad-words@3/lib/bad-words.min.js';

const filter = new Filter();

// Add Kenyan slang / local bad words
filter.addWords(
  'mshenzi', 'pumbavu', 'mjinga', 'fuck', 'shenzi', 'kuma', 'kuma mama yako',
  'mende', 'takataka', 'nyang’au', 'mavi', 'fala', 'ngotha', 'chokosh'
);

export function isProfane(text) {
  return filter.isProfane(text);
}

export function cleanText(text) {
  return filter.clean(text);
}
