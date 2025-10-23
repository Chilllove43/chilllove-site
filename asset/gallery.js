// === Chill Love 43 💛 — Galerie photo cliquable ===

function openModal(img) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.src = img.src;
  modal.classList.add("show");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
}

// Fermer la modale avec la touche Échap
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
