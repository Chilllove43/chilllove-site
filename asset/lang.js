// ----- GESTION DE LA LANGUE -----
const translations = {
  en: {
    "Suite romantique avec jacuzzi & sauna": "Romantic Suite with Jacuzzi & Sauna",
    "Un séjour inoubliable dans un cadre naturel et apaisant.": "An unforgettable stay in a natural and soothing setting.",
    "À propos de ce logement": "About this accommodation",
    "Le logement": "The accommodation",
    "Photos": "Photos",
    "Tarifs": "Rates",
    "Réserver": "Booking",
    "Date d'arrivée :": "Check-in date:",
    "Date de départ :": "Check-out date:",
    "Calculer et réserver": "Calculate and book",
    "Disponibilités": "Availability",
    "Voir le calendrier": "View calendar",
    "Avis clients": "Customer reviews",
    "Contact": "Contact",
    "Email :": "Email:",
    "Téléphone :": "Phone:",
    "Consultez nos disponibilités directement sur Airbnb :": "Check our availability directly on Airbnb:",
    "Calme, propre et super bien décoré.": "Quiet, clean and beautifully decorated.",
    "Le sauna et jacuzzi, un vrai plus. Merci ! 💕": "The sauna and jacuzzi are a real plus. Thank you! 💕",
    "Endroit magnifique et romantique !": "Beautiful and romantic place!"
  }
};

let currentLang = "fr";

function switchLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;

  document.querySelectorAll("*").forEach((el) => {
    const text = el.textContent.trim();
    if (translations[lang] && translations[lang][text]) {
      el.textContent = translations[lang][text];
    }
  });
}
