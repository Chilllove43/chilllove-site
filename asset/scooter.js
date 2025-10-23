// 🎯 MODALE POUR AGRANDIR LES PHOTOS
function openModal(img) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modal.style.display = "flex";
  modalImg.src = img.src;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// 🎯 RÉSERVATION AVEC CALCUL AUTOMATIQUE
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservation-form");
  if (!form) return;

  const startInput = document.getElementById("start-date");
  const endInput = document.getElementById("end-date");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const startDate = new Date(startInput.value);
    const endDate = new Date(endInput.value);
    if (isNaN(startDate) || isNaN(endDate) || endDate <= startDate) {
      resultDiv.textContent = "❌ Dates invalides.";
      return;
    }

    let currentDate = new Date(startDate);
    let total = 0;
    while (currentDate < endDate) {
      const day = currentDate.getDay();
      if (day === 5 || day === 6) {
        total += 150; // Vendredi & Samedi
      } else {
        total += 120; // Dimanche à Jeudi
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    resultDiv.innerHTML = `💶 Total : <strong>${total} €</strong>`;
    
    // Redirection vers PayPal avec montant pré-rempli
    const paypalLink = `https://www.paypal.me/chilllove43/${total}?locale.x=fr_FR`;
    setTimeout(() => {
      window.open(paypalLink, "_blank");
    }, 1200);
  });
});
