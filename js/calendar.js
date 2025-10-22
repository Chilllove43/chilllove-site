// ======== Chill Love - Chargement du calendrier Airbnb (.ics) ========

// URL du fichier ICS Airbnb (ton vrai lien)
const icsUrl = "https://www.airbnb.com/calendar/ical/13384631.ics?s=f5e78b51c6edc38f540d3c849ff76ae4&locale=fr";

// Fallback local : si Airbnb ne répond pas, essaie de charger le fichier ics local (facultatif)
const localIcsUrl = "ics/airbnb.ics";

// Fonction pour charger le fichier ICS
async function fetchCalendar(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur HTTP " + response.status);
    const text = await response.text();
    return text;
  } catch (error) {
    console.warn("Erreur avec le lien principal, on tente le fallback local :", error);
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

// Fonction pour extraire les dates "OCCUPIED" depuis le .ics
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

// Afficher les jours dans le calendrier
function renderCalendar(dates) {
  const container = document.getElementById("calendar");
  if (!container) return;

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  let html = `<div class="calendar-grid">`;

  for (let i = 1; i <= daysInMonth; i++) {
    const day = String(i).padStart(2, '0');
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${day}`;
    const occupied = dates.includes(date);
    html += `<div class="day ${occupied ? 'occupied' : 'free'}">${i}</div>`;
  }

  html += `</div>`;
  container.innerHTML = html;
}

// Charger et afficher
fetchCalendar(icsUrl)
  .then(data => {
    const dates = parseICSDates(data);
    renderCalendar(dates);
  })
  .catch(error => {
    console.error(error);
    const container = document.getElementById("calendar");
    if (container) container.innerHTML = `<p style="color:red;">Erreur lors du chargement du calendrier 😢</p>`;
  });
