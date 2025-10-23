// === Chill Love 43 💛 — Gestion multilingue FR / EN ===

// Langue par défaut
let currentLang = "fr";

function switchLang(lang) {
  currentLang = lang;

  // Tous les éléments traduisibles
  const elements = document.querySelectorAll("[data-lang]");

  elements.forEach((el) => {
    // On masque ceux qui ne correspondent pas
    if (el.getAttribute("data-lang") === currentLang) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });

  // Sauvegarde du choix dans le navigateur
  localStorage.setItem("lang", lang);
}

// === Au chargement de la page ===
document.addEventListener("DOMContentLoaded", () => {
  // Récupère la langue choisie précédemment si disponible
  const savedLang = localStorage.getItem("lang");
  if (savedLang) currentLang = savedLang;

  switchLang(currentLang); // applique la langue active
});
