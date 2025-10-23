// ----- GESTION DE LA MODALE D'IMAGE -----
function openModal(el) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");

  modal.style.display = "flex";
  modalImg.src = el.src;

  // Empêche le scroll de fond
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Fermer avec touche Échap
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
