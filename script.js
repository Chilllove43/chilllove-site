document.addEventListener("DOMContentLoaded", function () {

  // --- 🌍 GESTION DE LA LANGUE ---
  const frElements = document.querySelectorAll("[data-lang='fr']");
  const enElements = document.querySelectorAll("[data-lang='en']");
  const btnFr = document.getElementById("btn-fr");
  const btnEn = document.getElementById("btn-en");

  function setLanguage(lang) {
    if (lang === "fr") {
      frElements.forEach(el => el.style.display = "block");
      enElements.forEach(el => el.style.display = "none");
    } else {
      frElements.forEach(el => el.style.display = "none");
      enElements.forEach(el => el.style.display = "block");
    }
  }

  if (btnFr && btnEn) {
    btnFr.addEventListener("click", () => setLanguage("fr"));
    btnEn.addEventListener("click", () => setLanguage("en"));
  }

  // langue par défaut
  setLanguage("fr");


  // --- 🖼️ GALERIE : affichage plein écran ---
  const images = document.querySelectorAll(".gallery img");
  if (images.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    document.body.appendChild(lightbox);

    const img = document.createElement("img");
    lightbox.appendChild(img);

    images.forEach(image => {
      image.addEventListener("click", () => {
        img.src = image.src;
        lightbox.classList.add("show");
      });
    });

    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("show");
    });
  }

  // --- 📅 CALENDRIER AIRBNB (lecture du fichier airbnb.ics local) ---
  const calRoot = document.getElementById('calendar');
  if (!calRoot) return;

  fetch('airbnb.ics')
    .then(r => {
      if (!r.ok) throw new Error('ICS introuvable');
      return r.text();
    })
    .then(text => {
      const booked = new Set();
      const lines = text.split(/\r?\n/);
      let dtStart = null, dtEnd = null;
