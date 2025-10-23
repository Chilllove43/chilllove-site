// === Chill Love 43 💛 — Réservation avec calcul automatique + redirection PayPal ===

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const totalDiv = document.getElementById("total");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 🔥 Empêche le rechargement de la page

    const start = new Date(document.getElementById("start-date").value);
    const end = new Date(document.getElementById("end-date").value);

    if (isNaN(start) || isNaN(end) || end <= start) {
      totalDiv.textContent = "⚠️ Sélectionnez des dates valides.";
      return;
    }

    // Calcul du nombre de nuits
    const nights = (end - start) / (1000 * 60 * 60 * 24);
    let total = 0;

    for (let i = 0; i < nights; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      const weekday = day.getDay(); // 0 = dimanche ... 6 = samedi

      // 💰 Tarifs
      if (weekday === 5 || weekday === 6) total += 150; // Vendredi & samedi
      else total += 120; // Dimanche → jeudi
    }

    totalDiv.textContent = `💶 Total pour ${nights} nuit(s) : ${total} €`;

    // 💛 Redirection vers PayPal Pro après 2 secondes
    setTimeout(() => {
      window.open("https://www.paypal.me/chilllove43?locale.x=fr_FR", "_blank");
    }, 2000);
  });
});
