// ======== Chill Love - Chargement du calendrier Airbnb (.ics) ========

// Lien principal Airbnb
const icsUrl = "https://www.airbnb.com/calendar/ical/13384631.ics?s=f5e78b51c6edc38f540d3c849ff76ae4&locale=fr";

// Lien secours local (si Airbnb ne répond pas)
const localIcsUrl = "ics/airbnb.ics";

// Fonction pour charger le fichier ICS
async function fetchCalendar(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur HTTP " + response.status);
    const text = await response.text();
    return text;
  } catch (error) {
    console.warn("Airbnb indisponible, tentative de lecture locale :", error);
    try {
      const response = await fetch(localIcsUrl);
      if (!response.ok) throw new Error("Erreur HTTP " + response.status);
      const text = await response.text();
      return text;
    } catch (err) {
      throw new Error("Échec du chargement du calendrier : " + err.message);
    }
  }
}

// Extraction des dates réservées depuis le .ics
function parseICSDates(icsData) {
  const regex = /DTSTART(?:;[^:]+)?:([0-9T]+)/g;
  const dates = [];
  let match;
  while ((match = regex.exec(icsData)) !== null) {
    const dateStr = match[1].substring(0, 8);
    const formatted = `${dateStr.substring(0,4)}-${dateStr.substring(4,6)}-${dateStr.substring(6,8)}`;
    dates.push(formatted);
  }
  return dates;
}

// Afficher le calendrier sur la page
function renderCalendar(dates) {
  const container = document.getElementById("calendar");
  if (!container) return;

  const today = new Date();
  const month = today.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  let html = `<h3>${month.charAt(0).toUpperCase() + month.slice(1)}</h3>`;
  html += `<div class="calendar-grid">`;

  for (let i = 1; i <= daysInMonth; i++) {
    const day = String(i).padStart(2, '0');
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${day}`;
    const occupied = dates.includes(date);
    html += `<div class="day ${occupied ? 'occupied' : 'free'}">${i}</div>`;
  }

  html += `</div>`;
  container.innerHTML = html;
}

// Charger et afficher le calendrier
fetchCalendar(icsUrl)
  .then(data => {
    const dates = parseICSDates(data);
    renderCalendar(dates);
  })
  .catch(error => {
    console.error(error);
    const container = document.getElementById("calendar");
    if (container)
      container.innerHTML = `<p style="color:red;">Erreur lors du chargement du calendrier 😢</p>`;
  });
