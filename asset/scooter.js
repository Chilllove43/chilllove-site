document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const totalEl = document.getElementById("total");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const start = new Date(document.getElementById("start-date").value);
    const end = new Date(document.getElementById("end-date").value);

    if (!start || !end || end <= start) {
      totalEl.textContent = "⚠️ Veuillez sélectionner des dates valides.";
      return;
    }

    // Calcul du nombre de nuits
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      totalEl.textContent = "⚠️ Durée minimale : 1 nuit.";
      return;
    }

    // Calcul du tarif
    let total = 0;
    for (let i = 0; i < nights; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const isWeekend = day.getDay() === 5 || day.getDay() === 6; // Vendredi ou samedi
      total += isWeekend ? 150 : 120;
    }

    totalEl.textContent = `💰 Total pour ${nights} nuit(s) : ${total} €`;

    // Lien PayPal professionnel
    const paypalURL = `https://www.paypal.me/chilllove43?locale.x=fr_FR`;

    // Attendre un court instant avant de rediriger
    setTimeout(() => {
      window.open(paypalURL, "_blank");
    }, 2000);
  });
});
