// ==============================
// 💛 Chill Love 43 — Calendrier Airbnb interactif
// ==============================

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("calendar-container");
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  const monthTitle = document.createElement("h3");

  prevBtn.textContent = "←";
  nextBtn.textContent = "→";
  prevBtn.classList.add("nav-btn");
  nextBtn.classList.add("nav-btn");

  let currentMonthOffset = 0;
  let reservedDates = [];

  // === 1️⃣ Charger le flux Airbnb .ics ===
  async function loadCalendarData() {
    try {
      const url =
        "https://www.airbnb.com/calendar/ical/13384631.ics?s=f5e78b51c6edc38f540d3c849ff76ae4&locale=fr";
      const response = await fetch(url);
      const text = await response.text();

      reservedDates = [];
      const regex = /DTSTART;VALUE=DATE:(\d{8})[\s\S]*?DTEND;VALUE=DATE:(\d{8})/g;
      let match;

      while ((match = regex.exec(text)) !== null) {
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
          reservedDates.push(d.toISOString().split("T")[0]);
        }
      }

      renderCalendar();
    } catch (error) {
      console.error("Erreur lors du chargement du calendrier :", error);
      container.innerHTML = "<p>❌ Impossible de charger le calendrier Airbnb.</p>";
    }
  }

  // === 2️⃣ Afficher le mois courant / sélectionné ===
  function renderCalendar() {
    container.innerHTML = "";

    const today = new Date();
    const displayedMonth = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);
    const monthName = displayedMonth.toLocaleString("fr-FR", { month: "long" });
    const year = displayedMonth.getFullYear();

    // En-tête
    const header = document.createElement("div");
    header.classList.add("calendar-header");
    monthTitle.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
    header.appendChild(prevBtn);
    header.appendChild(monthTitle);
    header.appendChild(nextBtn);
    container.appendChild(header);

    // Jours du mois
    const grid = document.createElement("div");
    grid.classList.add("calendar-grid");

    const daysInMonth = new Date(year, displayedMonth.getMonth() + 1, 0).getDate();
    const startDay = new Date(year, displayedMonth.getMonth(), 1).getDay();

    // Espacement avant le 1er jour
    for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
      const empty = document.createElement("div");
      grid.appendChild(empty);
    }

    // Jours
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, displayedMonth.getMonth(), day);
      const iso = date.toISOString().split("T")[0];
      const div = document.createElement("div");
      div.textContent = day;
      div.classList.add("calendar-day");

      if (reservedDates.includes(iso)) div.classList.add("reserved");
      else div.classList.add("available");

      grid.appendChild(div);
    }

    container.appendChild(grid);
  }

  // === 3️⃣ Navigation entre mois ===
  prevBtn.addEventListener("click", () => {
    currentMonthOffset--;
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    currentMonthOffset++;
    renderCalendar();
  });

  // === 4️⃣ Lancer le chargement ===
  await loadCalendarData();
});
