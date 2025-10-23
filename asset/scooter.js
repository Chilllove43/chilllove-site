// === Chill Love 43 💛 — Simulateur de réservation + redirection PayPal ===

// On attend que la page soit complètement chargée
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const arrivalInput = document.getElementById("arrival");
  const departureInput = document.getElementById("departure");
  const resultDiv = document.getElementById("result");

  // Fonction pour calculer la différence de jours entre 2 dates
  function differenceInDays(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Fonction pour calculer le prix selon les jours
  function calculerTarif() {
    const arrivalDate = new Date(arrivalInput.value);
    const departureDate = new Date(departureInput.value);

    if (isNaN(arrivalDate) || isNaN(departureDate) || arrivalDate >= departureDate) {
      resultDiv.textContent = "Veuillez choisir des dates valides.";
      return null;
    }

    let total = 0;
    let currentDate = new Date(arrivalDate);

    while (currentDate < departureDate) {
      const day = currentDate.getDay(); // 0 = dimanche ... 6 = samedi
      if (day === 5 || day === 6) total += 150; // vendredi & samedi
      else total += 120; // autres jours
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const nuits = differenceInDays(arrivalDate, departureDate);
    resultDiv.textContent = `🛏️ ${nuits} nuit${nuits > 1 ? "s" : ""} – Total : ${total} €`;

    return total;
  }

  // === Gestion du formulaire ===
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const total = calculerTarif();
    if (total === null) return;

    // Petite indication visuelle
    resultDiv.innerHTML += "<br>💛 Redirection vers PayPal en cours...";

    // Redirection vers PayPal pro avec le montant pré-rempli
    const paypalUrl = `https://www.paypal.me/chilllove43/${total}?locale.x=fr_FR`;
    setTimeout(() => {
      window.open(paypalUrl, "_blank");
    }, 1500); // délai de 1,5s pour que l'utilisateur voie le message
  });
});
