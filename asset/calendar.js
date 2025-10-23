document.addEventListener("DOMContentLoaded", () => {
  const calendarContainer = document.getElementById("calendar-container");

  async function loadCalendar() {
    try {
      const url = "https://www.airbnb.com/calendar/ical/13384631.ics?s=f5e78b51c6edc38f540d3c849ff76ae4&locale=fr";
      const response = await fetch(url);
      const text = await response.text();

      if (!text.includes("BEGIN:VEVENT")) {
        calendarContainer.textContent = "Impossible de charger les disponibilités.";
        return;
      }

      // Extraction des événements réservés
      const events = text.match(/DTSTART:(\d{8})/g) || [];
      const reservedDates = events.map(e => e.replace("DTSTART:", ""));

      renderCalendar(reservedDates);
    } catch (error) {
      calendarContainer.textContent = "Erreur lors du chargement du calendrier.";
      console.error(error);
    }
  }

  function renderCalendar(reservedDates) {
    const today = new Date();
    const daysContainer = document.createElement("div");
    daysContainer.classList.add("calendar-grid");

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dateKey = date.toISOString().split("T")[0].replace(/-/g, "");
      const dayDiv = document.createElement("div");
      const dayName = date.toLocaleDateString("fr-FR", { weekday: "short" });
      const dayNum = date.getDate();

      dayDiv.classList.add("calendar-day");
      dayDiv.innerHTML = `<span>${dayName} ${dayNum}</span>`;

      if (reservedDates.includes(dateKey)) {
        dayDiv.classList.add("reserved");
      } else {
        dayDiv.classList.add("available");
      }

      daysContainer.appendChild(dayDiv);
    }

    calendarContainer.innerHTML = "";
    calendarContainer.appendChild(daysContainer);
  }

  loadCalendar();
});
