document.addEventListener("DOMContentLoaded", function () {

  // --- 🌍 GESTION DE LA LANGUE ---
  const frElements = document.querySelectorAll("[data-lang='fr']");
  const enElements = document.querySelectorAll("[data-lang='en']");
  const btnFr = document.getElementById("btn-fr");
  const btnEn = document.getElementById("btn-en");

  function setLanguage(lang) {
    if (lang === "fr") {
      frElements.forEach(el => el.style.display = "block");
      enElements.forEach(el => el.style.display = "none");
    } else {
      frElements.forEach(el => el.style.display = "none");
      enElements.forEach(el => el.style.display = "block");
    }
  }

  if (btnFr && btnEn) {
    btnFr.addEventListener("click", () => setLanguage("fr"));
    btnEn.addEventListener("click", () => setLanguage("en"));
  }

  // langue par défaut
  setLanguage("fr");


  // --- 🖼️ GALERIE : affichage plein écran ---
  const images = document.querySelectorAll(".gallery img");
  if (images.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    document.body.appendChild(lightbox);

    const img = document.createElement("img");
    lightbox.appendChild(img);

    images.forEach(image => {
      image.addEventListener("click", () => {
        img.src = image.src;
        lightbox.classList.add("show");
      });
    });

    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("show");
    });
  }


  // --- 📅 CALENDRIER AIRBNB ---
  const calendarContainer = document.getElementById("calendar");
  if (calendarContainer) {
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.airbnb.fr/calendar/ical/13384631.ics?s=f5e78b51c6edc38f540d3c849ff76ae4&locale=fr";
    iframe.style.width = "100%";
    iframe.style.height = "600px";
    iframe.style.border = "none";
    calendarContainer.appendChild(iframe);
  }

});
  const events = parseICS(ics);
  const set = expandDateRangeSet(events);
  buildCalendar(set);
}
