// js/utils.js
export const formatDate = (date) => new Date(date).toLocaleDateString();

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();
