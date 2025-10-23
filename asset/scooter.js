// ==============================
// 💛 Chill Love 43 — Réservation & Paiement
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const totalDisplay = document.getElementById("total");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);

    if (isNaN(startDate) || isNaN(endDate) || endDate <= startDate) {
      totalDisplay.textContent = "⚠️ Veuillez sélectionner des dates valides.";
      totalDisplay.style.color = "red";
      return;
    }

    let nights = 0;
    let total = 0;

    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      nights++;
      const day = d.getDay(); // 0 = dimanche, 6 = samedi
      if (day === 5 || day === 6) {
        total += 150; // vendredi / samedi
      } else {
        total += 120; // semaine
      }
    }

    totalDisplay.innerHTML = `🌙 ${nights} nuit(s) – Total : <strong>${total} €</strong>`;
    totalDisplay.style.color = "#2e2e2e";
    totalDisplay.style.marginTop = "10px";

    // ✅ Redirection PayPal après 2 secondes
    setTimeout(() => {
      window.open("https://www.paypal.me/chilllove43?locale.x=fr_FR", "_blank");
    }, 2000);
  });
});
