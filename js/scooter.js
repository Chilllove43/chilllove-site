function openModal(image) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.src = image.src;
  modal.classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}

// Simulation de réservation avec calcul automatique
function calculerPrix() {
  const debut = new Date(document.getElementById("date-debut").value);
  const fin = new Date(document.getElementById("date-fin").value);
  const lien = "https://www.paypal.me/chilllove43?locale.x=fr_FR";

  if (isNaN(debut) || isNaN(fin) || fin <= debut) {
    alert("Veuillez sélectionner des dates valides.");
    return;
  }

  let total = 0;
  const current = new Date(debut);

  while (current < fin) {
    const jour = current.getDay(); // 0 = dimanche, 5 = vendredi, 6 = samedi
    if (jour === 5 || jour === 6) {
      total += 150;
    } else {
      total += 120;
    }
    current.setDate(current.getDate() + 1);
  }

  if (confirm(`Total: ${total} €\nContinuer vers le paiement ?`)) {
    window.open(lien, "_blank");
  }
}
