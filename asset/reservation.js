document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const totalDisplay = document.getElementById("total-price");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);

    if (!startDate || !endDate || endDate <= startDate) {
      totalDisplay.textContent = "❌ Veuillez sélectionner des dates valides.";
      totalDisplay.style.color = "red";
      return;
    }

    let total = 0;
    const currentDate = new Date(startDate);

    while (currentDate < endDate) {
      const day = currentDate.getDay();
      // Dimanche à Jeudi = 120€, Vendredi & Samedi = 150€
      total += (day === 5 || day === 6) ? 150 : 120;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    totalDisplay.textContent = `💶 Total : ${total} € pour ${
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    } nuit(s)`;
    totalDisplay.style.color = "green";

    // Redirection vers PayPal pro après un court délai
    setTimeout(() => {
      window.open("https://www.paypal.me/chilllove43?locale.x=fr_FR", "_blank");
    }, 1800);
  });
});document.addEventListener('DOMContentLoaded', function () {
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
