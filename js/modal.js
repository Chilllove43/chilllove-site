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

<!-- Modale pour agrandir l'image -->
<div id="modal" class="modal" onclick="closeModal()">
  <span class="close">&times;</span>
  <img class="modal-content" id="modal-img" />
</div>

<script>
  function openModal(imgElement) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "block";
    modalImg.src = imgElement.src;
  }

  function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }
</script>
