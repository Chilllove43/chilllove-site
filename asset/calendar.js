document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("calendar-container");

  if (!container) return;

  // Conteneurs de navigation
  const header = document.createElement("div");
  const title = document.createElement("h3");
  const prev = document.createElement("button");
  const next = document.createElement("button");

  prev.textContent = "←";
  next.textContent = "→";
  prev.className = next.className = "nav-btn";
  header.className = "calendar-header";
  header.append(prev, title, next);

  const grid = document.createElement("div");
  grid.className = "calendar-grid";
  container.append(header, grid);

  // État interne
  let offset = 0;
  let reserved = [];

  // Charge le flux .ics depuis Airbnb
  async function fetchAirbnbICS() {
    const icsUrl = "https://www.airbnb.com/calendar/ical/13384631.ics?s=f5e78b51c6edc38f540d3c849ff76ae4&locale=fr";
    try {
      const res = await fetch(icsUrl);
      const text = await res.text();

      reserved = [];
      const regex = /DTSTART;VALUE=DATE:(\d{8})[\s\S]*?DTEND;VALUE=DATE:(\d{8})/g;
      let m;
      while ((m = regex.exec(text)) !== null) {
        const start = new Date(`${m[1].slice(0, 4)}-${m[1].slice(4, 6)}-${m[1].slice(6, 8)}`);
        const end = new Date(`${m[2].slice(0, 4)}-${m[2].slice(4, 6)}-${m[2].slice(6, 8)}`);
        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
          reserved.push(d.toISOString().split("T")[0]);
        }
      }

      renderCalendar();
    } catch (e) {
      console.error("Erreur de chargement du calendrier :", e);
      container.innerHTML = "<p>📅 Calendrier Airbnb indisponible pour le moment.</p>";
    }
  }

  // Rendu du calendrier
  function renderCalendar() {
    grid.innerHTML = "";

    const today = new Date();
    const current = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const year = current.getFullYear();
    const month = current.getMonth();

    const monthName = current.toLocaleDateString("fr-FR", { month: "long" });
    title.textContent = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;

    // En-têtes des jours
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    days.forEach((d) => {
      const day = document.createElement("div");
      day.textContent = d;
      day.className = "calendar-day header";
      grid.appendChild(day);
    });

    // Calcul du premier jour
    const firstDay = new Date(year, month, 1).getDay() || 7;
    for (let i = 1; i < firstDay; i++) {
      const empty = document.createElement("div");
      empty.className = "calendar-day empty";
      grid.appendChild(empty);
    }

    // Jours du mois
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const iso = date.toISOString().split("T")[0];
      const div = document.createElement("div");
      div.textContent = i;
      div.className = "calendar-day";
      if (reserved.includes(iso)) div.classList.add("reserved");
      else div.classList.add("available");
      grid.appendChild(div);
    }
  }

  // Navigation entre mois
  prev.addEventListener("click", () => {
    offset--;
    renderCalendar();
  });
  next.addEventListener("click", () => {
    offset++;
    renderCalendar();
  });

  // Lancer
  await fetchAirbnbICS();
});
