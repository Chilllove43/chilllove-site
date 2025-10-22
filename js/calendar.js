async function loadCalendar() {
  const url = "https://www.airbnb.com/calendar/ical/13384631.ics?s=f5e78b51c6edc38f540d3c849ff76ae4&locale=fr";
  const calendarDiv = document.getElementById("calendar");

  try {
    const res = await fetch(url);
    const text = await res.text();

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const booked = [];

    text.split("BEGIN:VEVENT").forEach(evt => {
      const startMatch = evt.match(/DTSTART;VALUE=DATE:(\d{8})/);
      const endMatch = evt.match(/DTEND;VALUE=DATE:(\d{8})/);
      if (startMatch && endMatch) {
        const start = new Date(startMatch[1].replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
        const end = new Date(endMatch[1].replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
          booked.push(new Date(d).toDateString());
        }
      }
    });

    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    days.forEach(day => {
      const el = document.createElement("div");
      el.textContent = day;
      el.classList.add("header");
      calendarDiv.appendChild(el);
    });

    for (let i = 0; i < firstDay.getDay() - 1; i++) {
      calendarDiv.appendChild(document.createElement("div"));
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      const el = document.createElement("div");
      el.textContent = d;
      if (booked.includes(date.toDateString())) {
        el.classList.add("booked");
      } else {
        el.classList.add("available");
      }
      calendarDiv.appendChild(el);
    }
  } catch (e) {
    calendarDiv.innerHTML = "<p>Erreur lors du chargement du calendrier 🕓</p>";
    console.error(e);
  }
}

document.addEventListener("DOMContentLoaded", loadCalendar);
