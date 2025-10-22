/* ---------- i18n ---------- */
const I18N = {
  fr: {
    title: "Chill Love – Suite romantique avec jacuzzi & sauna privés",
    tagline: "Un cocon d’amour au cœur de la nature, entre jacuzzi, sauna et douceur.",
    cta: "Payer via PayPal",
    reviewsTitle: "Avis récents",
    calendarTitle: "Disponibilités",
    moreAirbnb: "Voir plus d’avis sur Airbnb"
  },
  en: {
    title: "Chill Love – Romantic suite with private jacuzzi & sauna",
    tagline: "A cosy love nest in nature, with jacuzzi, sauna and stunning views.",
    cta: "Pay with PayPal",
    reviewsTitle: "Latest reviews",
    calendarTitle: "Availability",
    moreAirbnb: "See more reviews on Airbnb"
  }
};

function setLang(lang){
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.dataset.i18n;
    if (I18N[lang][k]) el.textContent = I18N[lang][k];
  });
  document.querySelectorAll(".langs button").forEach(b=>b.classList.toggle("active", b.dataset.lang===lang));
  localStorage.setItem("lang", lang);
}
document.querySelectorAll(".langs button").forEach(b => b.addEventListener("click", ()=> setLang(b.dataset.lang)));
setLang(localStorage.getItem("lang") || "fr");

/* ---------- Galerie ---------- */
const gallery = document.getElementById("gallery");
const files = (window.__GALLERY_FILES__ || []);
files.forEach(src=>{
  const img = new Image();
  img.src = "imgs/" + src;
  img.loading = "lazy";
  img.alt = "Chill Love";
  img.addEventListener("error", ()=> img.remove()); // auto-masquer si fichier manquant
  gallery.appendChild(img);
});

/* ---------- Lightbox ---------- */
const lb = document.querySelector(".lightbox");
const lbImg = lb.querySelector("img");
gallery.addEventListener("click", (e)=>{
  const im = e.target.closest("img");
  if(!im) return;
  lbImg.src = im.src;
  lb.classList.add("open");
});
lb.addEventListener("click", ()=> lb.classList.remove("open"));
document.addEventListener("keydown", e=>{ if(e.key==="Escape") lb.classList.remove("open"); });

/* ---------- Calendrier ICS local (ics/airbnb.ics) ---------- */
async function loadICS(){
  try{
    const res = await fetch("ics/airbnb.ics");
    if(!res.ok) throw new Error("HTTP "+res.status);
    const text = await res.text();
    const events = [];
    let cur = null;
    for(const L of text.split(/\r?\n/)){
      if(L.startsWith("BEGIN:VEVENT")) cur = {};
      if(L.startsWith("DTSTART")) cur.start = L.split(":")[1].slice(0,8);
      if(L.startsWith("DTEND"))   cur.end   = L.split(":")[1].slice(0,8);
      if(L.startsWith("END:VEVENT") && cur){ events.push(cur); cur=null; }
    }
    initCalendar(events);
  }catch(err){
    document.querySelector("#cal").innerHTML = "<div style='padding:12px'>Calendrier indisponible pour le moment.</div>";
    console.warn("ICS error:", err);
  }
}
function ymd(s){ return new Date(+s.slice(0,4), +s.slice(4,6)-1, +s.slice(6,8)); }

function initCalendar(events){
  const today = new Date();
  renderCalendar(today.getFullYear(), today.getMonth(), events);
  document.getElementById("prev").onclick = ()=> {
    const y = +document.getElementById("cal").dataset.y;
    const m = +document.getElementById("cal").dataset.m - 1;
    const d = new Date(y, m, 1);
    renderCalendar(d.getFullYear(), d.getMonth(), events);
  };
  document.getElementById("next").onclick = ()=> {
    const y = +document.getElementById("cal").dataset.y;
    const m = +document.getElementById("cal").dataset.m + 1;
    const d = new Date(y, m, 1);
    renderCalendar(d.getFullYear(), d.getMonth(), events);
  };
}
function renderCalendar(year, month, events){
  const days = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
  let html = '<div class="cal-grid">';
  for(const d of days) html += `<div class="dow">${d}</div>`;
  const start = new Date(year, month, 1);
  const end   = new Date(year, month+1, 0);
  const pad   = (start.getDay()+6)%7; // lundi=0
  for(let i=0;i<pad;i++) html += "<div></div>";
  for(let day=1; day<=end.getDate(); day++){
    const cur = new Date(year, month, day);
    const booked = events.some(ev=>{
      const s = ymd(ev.start), e = ymd(ev.end);
      return cur >= s && cur < e;
    });
    html += `<div class="${booked?'booked':''}"><strong>${day}</strong></div>`;
  }
  html += "</div>";
  const cal = document.getElementById("cal");
  cal.dataset.y = year; cal.dataset.m = month;
  document.getElementById("monthLabel").textContent =
    new Intl.DateTimeFormat(document.documentElement.lang || "fr", {month:"long", year:"numeric"}).format(new Date(year, month, 1));
  cal.innerHTML = html;
}
loadICS();
