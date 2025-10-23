// === Chill Love 43 💛 — Galerie + Réservation ===

// ---- GALERIE PHOTO ----
function openModal(img) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modal.style.display = "flex";
  modalImg.src = img.src;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// ---- SIMULATEUR DE RÉSERVATION ----
document.addEventListener("DOMContentLoaded", () => {
  const startInput = document.getElementById("start");
  const endInput = document.getElementById("end");
  const totalDisplay = document.getElementById("total");
  const calcBtn = document.getElementById("calculateBtn");

  calcBtn.addEventListener("click", () => {
    const startDate = new Date(startInput.value);
    const endDate = new Date(endInput.value);

    if (isNaN(startDate) || isNaN(endDate) || endDate <= startDate) {
      alert("Veuillez sélectionner des dates valides.");
      return;
    }

    let total = 0;
    const dayMs = 24 * 60 * 60 * 1000;

    for (let d = new Date(startDate); d < endDate; d = new Date(d.getTime() + dayMs)) {
      const day = d.getDay();
      total += (day === 5 || day === 6) ? 150 : 120;
    }

    totalDisplay.textContent = `💰 Total : ${total} €`;

    // Ouvre PayPal après 1.5s
    setTimeout(() => {
      window.open("https://www.paypal.me/chilllove43?locale.x=fr_FR", "_blank");
    }, 1500);
  });
});
