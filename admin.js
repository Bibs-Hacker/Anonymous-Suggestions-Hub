// js/admin.js
import { supabase } from './supabase.js';
import { formatDate } from './utils.js';

const ADMIN_PASS = '#TechBrian@01';

export function initAdmin() {
  const area = document.getElementById('admin-area');
  const pass = document.getElementById('admin-pass');
  const login = document.getElementById('login-admin');
  const controls = document.getElementById('admin-controls');
  const clearBtn = document.getElementById('clear-all');
  const statsDiv = document.getElementById('stats');

  login.addEventListener('click', () => {
    if (pass.value === ADMIN_PASS) {
      controls.classList.remove('hidden');
      area.style.display = 'block';
      loadStats();
    } else {
      alert('Wrong password!');
    }
  });

  clearBtn.addEventListener('click', async () => {
    if (confirm('Delete ALL suggestions?')) {
      await supabase.from('suggestions').delete().neq('id', '0');
      loadStats();
    }
  });

  async function loadStats() {
    const { data } = await supabase.from('suggestions').select('votes, created_at');
    const totalVotes = data.reduce((a, s) => a + (s.votes || 0), 0);
    const days = {};
    data.forEach(s => {
      const day = formatDate(s.created_at);
      days[day] = (days[day] || 0) + 1;
    });
    const mostActive = Object.entries(days).sort((a,b) => b[1]-a[1])[0];

    statsDiv.innerHTML = `
      <p>Total Suggestions: ${data.length}</p>
      <p>Total Votes: ${totalVotes}</p>
      <p>Most Active: ${mostActive?.[0]} (${mostActive?.[1]} posts)</p>
    `;
  }

  document.getElementById('refresh-stats')?.addEventListener('click', loadStats);
}
