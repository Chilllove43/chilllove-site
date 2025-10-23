document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('booking-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const start = new Date(document.getElementById('start-date').value);
    const end = new Date(document.getElementById('end-date').value);
    const oneDay = 24 * 60 * 60 * 1000;

    if (isNaN(start) || isNaN(end) || end <= start) {
      alert("Veuillez entrer des dates valides.");
      return;
    }

    const diffDays = Math.round((end - start) / oneDay);
    let total = 0;

    for (let i = 0; i < diffDays; i++) {
      const day = new Date(start.getTime() + i * oneDay).getDay();
      if (day === 5 || day === 6) {
        total += 150; // Vendredi & Samedi
      } else {
        total += 120; // Dimanche → Jeudi (hors jours fériés)
      }
    }
