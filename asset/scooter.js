function getDayRate(date) {
  const day = date.getDay(); // 0 = dimanche, 6 = samedi
  return (day === 5 || day === 6) ? 150 : 120;
}

function calculateNights(startDate, endDate) {
  const nights = [];
  let current = new Date(startDate);
  while (current < endDate) {
    nights.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return nights;
}

function calculateTotal(start, end) {
  const nights = calculateNights(start, end);
  return nights.reduce((total, night) => total + getDayRate(night), 0);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservation-form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const startDate = new Date(document.getElementById("date-debut").value);
    const endDate = new Date(document.getElementById("date-fin").value);

    if (isNaN(startDate) || isNaN(endDate) || endDate <= startDate) {
      alert("Veuillez sélectionner des dates valides.");
      return;
    }

    const total = calculateTotal(startDate, endDate);

    // Redirection vers PayPal avec montant prérempli
    const paypalLink = `https://www.paypal.me/chilllove43/${total}?locale.x=fr_FR`;
    window.open(paypalLink, "_blank");
  });
});
