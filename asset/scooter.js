// === Chill Love 43 💛 — Gestion galerie + réservation ===

// ---- GALERIE PHOTO (zoom en grand) ----
function openModal(img) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modal.style.display = "flex";
  modalImg.src = img.src;
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// ---- SIMULATEUR DE RÉSERVATION ----
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const totalDisplay = document.getElementById("total");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const startDate = new Date(document.getElementById("start").value);
    const endDate = new Date(document.getElementById("end").value);

    if (isNaN(startDate) || isNaN(endDate) || endDate <= startDate) {
      alert("Veuillez sélectionner des dates valides.");
      return;
    }

    let total = 0;
    const dayMs = 24 * 60 * 60 * 1000;

    for (let d = new Date(startDate); d < endDate; d = new Date(d.getTime() + dayMs)) {
      const day = d.getDay(); // 0 = dimanche, 6 = samedi
      if (day === 5 || day === 6) total += 150; // Vendredi, Samedi
      else total += 120; // Autres jours
    }

    totalDisplay.textContent = `💰 Total : ${total} €`;

    // Redirection vers PayPal après un léger délai
    setTimeout(() => {
      const paypalUrl = "https://www.paypal.me/chilllove43?locale.x=fr_FR";
      window.open(paypalUrl, "_blank");
    }, 1500);
  });
});
