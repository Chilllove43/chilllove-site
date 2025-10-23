function switchLang(lang) {
  const allTexts = document.querySelectorAll("[data-lang]");
  allTexts.forEach(el => {
    if (el.getAttribute("data-lang") === lang) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });
  localStorage.setItem("lang", lang); // on garde le choix de l’utilisateur
}

// 🏁 Au chargement de la page : FR par défaut
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "fr";
  switchLang(savedLang);
});
