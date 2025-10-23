function openModal(img) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modalImg.src = img.src;
  modal.style.display = "flex";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}