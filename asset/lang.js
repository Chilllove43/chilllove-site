// ==============================
// 💛 Chill Love 43 — Gestion multilingue FR / EN
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  // Masquer tout le texte anglais par défaut
  document.querySelectorAll("[data-lang='en']").forEach(el => {
    el.style.display = "none";
  });

  // Fonction pour changer de langue
  window.switchLang = function(lang) {
    if (lang === "fr") {
      document.querySelectorAll("[data-lang='fr']").forEach(el => (el.style.display = ""));
      document.querySelectorAll("[data-lang='en']").forEach(el => (el.style.display = "none"));
    } else if (lang === "en") {
      document.querySelectorAll("[data-lang='fr']").forEach(el => (el.style.display = "none"));
      document.querySelectorAll("[data-lang='en']").forEach(el => (el.style.display = ""));
    }
  };
});
