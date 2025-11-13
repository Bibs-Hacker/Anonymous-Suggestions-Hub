// js/app.js
import { supabase } from './supabase.js';
import { initTheme } from './theme.js';
import { initAdmin } from './admin.js';
import { isProfane, cleanText } from './profanity.js';
import { debounce } from './utils.js';
import { createIcons } from 'https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js';

createIcons();

const elements = {
  input: document.getElementById('suggestion-input'),
  submit: document.getElementById('submit-btn'),
  list: document.getElementById('suggestions-list'),
  top: document.getElementById('top-suggestions'),
};

initTheme();
initAdmin();

// Submit with profanity check
elements.submit.addEventListener('click', async () => {
  let text = elements.input.value.trim();
  if (!text) return alert('Write something!');

  if (isProfane(text)) {
    if (!confirm('Your message contains inappropriate words. Submit anyway?')) return;
    text = cleanText(text); // Optional: auto-clean
  }

  await supabase.from('suggestions').insert({ text });
  elements.input.value = '';
  loadSuggestions();
});

// Vote
window.vote = async (id, current) => {
  await supabase.from('suggestions').update({ votes: current + 1 }).eq('id', id);
  loadSuggestions();
};

// Load & render
async function loadSuggestions() {
  const { data } = await supabase
    .from('suggestions')
    .select()
    .eq('hidden', false)
    .order('votes', { ascending: false });

  // All
  elements.list.innerHTML = data.map(s => `
    <div class="card">
      <div class="card-text">${s.text}</div>
      <button class="vote-btn" onclick="vote('${s.id}', ${s.votes})">
        <i data-lucide="heart"></i> <span class="vote-count">${s.votes}</span>
      </button>
    </div>
  `).join('');

  // Top 5
  elements.top.innerHTML = data.slice(0, 5).map((s, i) => `
    <div class="top-card">
      <div class="rank">#${i + 1}</div>
      <div>${s.text.substring(0, 50)}${s.text.length > 50 ? '...' : ''}</div>
      <div>❤️ ${s.votes}</div>
    </div>
  `).join('');

  createIcons();
}

// Auto-refresh every 5s
setInterval(loadSuggestions, 5000);
loadSuggestions();
