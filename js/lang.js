function switchLang(lang) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach(el => {
    el.style.display = el.getAttribute("data-lang") === lang ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  switchLang("fr");
});
