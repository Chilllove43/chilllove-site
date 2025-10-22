// Fonction pour ouvrir la photo en plein écran (modal)
function openModal(imgElement) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modal.style.display = 'flex';
  modalImg.src = imgElement.src;
  modalImg.alt = imgElement.alt;
}

// Fermer le modal quand on clique à l’extérieur de l’image
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}
