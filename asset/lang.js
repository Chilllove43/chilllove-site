document.addEventListener("DOMContentLoaded", () => {
  const langButtons = document.querySelectorAll(".lang-switch button");
  const langElements = document.querySelectorAll("[data-lang]");

  // Langue par défaut = français
  let currentLang = "fr";
  updateLanguage();

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLang = btn.textContent.toLowerCase();
      updateLanguage();

      // Visuel du bouton actif
      langButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  function updateLanguage() {
    langElements.forEach((el) => {
      const lang = el.getAttribute("data-lang");
      el.style.display = lang === currentLang ? "block" : "none";
    });
  }
});
