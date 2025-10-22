// Dictionnaire bilingue
const I18N = {
  fr: {
    title: "Bienvenue à Chill Love 💕",
    tagline: "Votre refuge romantique entre sérénité et confort",
    gallery: "Galerie",
    rates_title: "💰 Tarification",
    rate_week: "🗓️ <strong>Dimanche → Jeudi</strong> : 120 € / nuit <em>(hors jour férié)</em>",
    rate_we: "🗓️ <strong>Vendredi &amp; Samedi</strong> : 150 € / nuit",
    rate_breakfast: "🍽️ <strong>Petit-déjeuner (2 pers.)</strong> : +20 €",
    rate_champagne: "🍾 <strong>Option Champagne + Pétales de roses</strong> : +40 €",
    paypal_btn: "💳 Réserver maintenant via PayPal",
    availability: "📅 Disponibilités",
    legend_busy: "🔴 Occupé",
    legend_free: "🟩 Libre",
    address: "📍 3175 route de Beauzac, 43200 Beaux – Lieu dit Courenc",
    insta: "@chill.love43",
    copyright: "© Chill Love 2025 – Tous droits réservés"
  },
  en: {
    title: "Welcome to Chill Love 💕",
    tagline: "Your romantic hideaway for comfort and serenity",
    gallery: "Gallery",
    rates_title: "💰 Rates",
    rate_week: "🗓️ <strong>Sunday → Thursday</strong>: €120 / night <em>(excluding public holidays)</em>",
    rate_we: "🗓️ <strong>Friday & Saturday</strong>: €150 / night",
    rate_breakfast: "🍽️ <strong>Breakfast (2 people)</strong>: +€20",
    rate_champagne: "🍾 <strong>Champagne + Rose petals option</strong>: +€40",
    paypal_btn: "💳 Book now via PayPal",
    availability: "📅 Availability",
    legend_busy: "🔴 Booked",
    legend_free: "🟩 Free",
    address: "📍 3175 route de Beauzac, 43200 Beaux – “Courenc” hamlet",
    insta: "@chill.love43",
    copyright: "© Chill Love 2025 – All rights reserved"
  }
};

const btnFR = document.getElementById('btn-fr');
const btnEN = document.getElementById('btn-en');

function setLang(lang) {
  document.documentElement.lang = lang;
  btnFR.classList.toggle('active', lang === 'fr');
  btnEN.classList.toggle('active', lang === 'en');

  // remplace le texte pour chaque data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = I18N[lang][key] || '';
    // on accepte du HTML (ex: <strong>, <em>)
    el.innerHTML = value;
  });
  localStorage.setItem('lang', lang);
}

// listeners
btnFR?.addEventListener('click', () => setLang('fr'));
btnEN?.addEventListener('click', () => setLang('en'));

// langue par défaut : FR (ou dernier choix)
setLang(localStorage.getItem('lang') || 'fr');
