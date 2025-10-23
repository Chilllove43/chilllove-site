function openModal(image) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modal.style.display = 'flex';
  modalImg.src = image.src;
  modalImg.alt = image.alt;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}
