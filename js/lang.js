function switchLang(lang) {
  const allElements = document.querySelectorAll('[data-lang]');
  allElements.forEach(el => {
    if (el.getAttribute('data-lang') === lang) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

// Activer le français par défaut
document.addEventListener('DOMContentLoaded', () => {
  switchLang('fr');
});
