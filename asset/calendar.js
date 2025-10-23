// === Chill Love 43 💛 — Calendrier Airbnb compatible GitHub Pages ===

document.addEventListener("DOMContentLoaded", async () => {
  const calendarContainer = document.getElementById("calendar-container");
  if (!calendarContainer) return;

  const proxy = "https://api.allorigins.win/get?url=";
  const airbnbICS = encodeURIComponent(
    "https://www.airbnb.com/calendar/ical/13384631.ics?s=f5e78b51c6edc38f540d3c849ff76ae4&locale=fr"
  );

  try {
    const response = await fetch(`${proxy}${airbnbICS}`);
    const data = await response.json();
    const icsText = data.contents;

    const reservedDates = parseICS(icsText);
    renderCalendar(reservedDates);
  } catch (err) {
    console.error("Erreur de chargement du calendrier Airbnb :", err);
    calendarContainer.innerHTML = `<p>⚠️ Impossible de charger le calendrier Airbnb.</p>`;
  }

  // === Fonction : parse le contenu du fichier .ics ===
  function parseICS(ics) {
    const regex = /DTSTART;VALUE=DATE:(\d{8})[\s\S]*?DTEND;VALUE=DATE:(\d{8})/g;
    let reserved = [];
    let match;
    while ((match = regex.exec(ics)) !== null) {
      const start = new Date(
        match[1].substring(0, 4),
        match[1].substring(4, 6) - 1,
        match[1].substring(6, 8)
      );
      const end = new Date(
        match[2].substring(0, 4),
        match[2].substring(4, 6) - 1,
        match[2].substring(6, 8)
      );

      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        reserved.push(d.toISOString().split("T")[0]);
      }
    }
    return reserved;
  }

  // === Fonction : afficher le calendrier du mois courant ===
  function renderCalendar(reservedDates) {
    const today = new Date();
    const monthName = today.toLocaleString("fr-FR", { month: "long" });
    const year = today.getFullYear();

    const header = `<h3>${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}</h3>`;
    const grid = document.createElement("div");
    grid.classList.add("calendar-grid");

    const firstDay = new Date(year, today.getMonth(), 1);
    const daysInMonth = new Date(year, today.getMonth() + 1, 0).getDate();

    for (let i = 0; i < firstDay.getDay(); i++) {
      const empty = document.createElement("div");
      empty.classList.add("calendar-day", "empty");
      grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, today.getMonth(), d);
      const iso = date.toISOString().split("T")[0];
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("calendar-day");

      if (reservedDates.includes(iso)) {
        dayDiv.classList.add("reserved");
        dayDiv.textContent = d;
      } else {
        dayDiv.classList.add("available");
        dayDiv.textContent = d;
      }

      grid.appendChild(dayDiv);
    }

    calendarContainer.innerHTML = header;
    calendarContainer.appendChild(grid);
  }
});
