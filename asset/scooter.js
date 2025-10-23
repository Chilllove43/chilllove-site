// === Chill Love 43 💛 — Réservation & redirection PayPal ===

// Fonction pour ouvrir une image en grand (galerie)
function openModal(img) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modal.style.display = "flex";
  modalImg.src = img.src;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// === Gestion du formulaire de réservation ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const totalDisplay = document.getElementById("total");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);

    if (!startDate || !endDate || startDate >= endDate) {
      alert("Veuillez sélectionner des dates valides.");
      return;
    }

    // Calcul du nombre de nuits
    const nights = (endDate - startDate) / (1000 * 60 * 60 * 24);
    let total = 0;

    // Calcul du tarif selon le jour
    for (let i = 0; i < nights; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      const dow = day.getDay(); // 0=dimanche, 5=vendredi, 6=samedi

      if (dow === 5 || dow === 6) total += 150; // week-end
      else total += 120; // semaine
    }

    // Affiche le total
    totalDisplay.textContent = `Total : ${total} € pour ${nights} nuit(s)`;

    // Redirection PayPal après 2 secondes
    setTimeout(() => {
      window.open("https://www.paypal.me/chilllove43?locale.x=fr_FR", "_blank");
    }, 2000);
  });
});
