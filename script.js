// -------- Langue --------
function setLang(lang){
  document.querySelectorAll('[data-lang="fr"]').forEach(el => el.style.display = (lang==='fr') ? '' : 'none');
  document.querySelectorAll('[data-lang="en"]').forEach(el => el.style.display = (lang==='en') ? '' : 'none');
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-fr').onclick = () => setLang('fr');
  document.getElementById('btn-en').onclick = () => setLang('en');
  setLang(localStorage.getItem('lang') || 'fr');

  initGallery();
  initCalendar();
});

// -------- Galerie auto + Lightbox (au-dessus de la page) --------
// Essaie photo_01.jpg ... photo_40.jpg à la RACINE ET dans /images.
// Ignore automatiquement les fichiers qui ne chargent pas.
const candidateNames = Array.from({length:40}, (_,i)=>String(i+1).padStart(2,'0'))
  .flatMap(n => [`photo_${n}.jpg`, `images/photo_${n}.jpg`]);

function checkImage(src){
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src + '?v=' + Date.now(); // casse le cache
  });
}

async function initGallery(){
  const container = document.getElementById('gallery');
  container.innerHTML = '';
  const valid = [];

  for (const src of candidateNames){
    const base = src.split('/').pop();
    if (valid.find(v => v.endsWith(base))) continue; // évite doublons root/images
    /* eslint no-await-in-loop: off */
    if (await checkImage(src)) valid.push(src);
    if (valid.length >= 30) break;
  }

  if (!valid.length){
    container.innerHTML = '<p class="fine">Aucune photo trouvée.</p>';
    return;
  }

  valid.forEach((src, idx) => {
    const fig = document.createElement('figure'); fig.className = 'ph fade';
    const img = document.createElement('img'); img.src = src; img.alt = 'Chill Love photo ' + (idx+1);
    img.addEventListener('click', () => openLightbox(valid, idx));
    fig.appendChild(img); container.appendChild(fig);
  });
}

// Lightbox
let LB = null;
function buildLightbox(){
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = `
    <button class="close">✕</button>
    <div class="nav">
      <button class="prev">‹</button>
      <img alt="Photo">
      <button class="next">›</button>
    </div>`;
  document.body.appendChild(box);
  return box;
}

function openLightbox(list, index){
  if (!LB) LB = buildLightbox();
  const img = LB.querySelector('img');
  const prev = LB.querySelector('button.prev');
  const next = LB.querySelector('button.next');
  const close = LB.querySelector('button.close');

  let i = index;
  function show(){ img.src = list[i]; }

  prev.onclick = ()=>{ i = (i-1+list.length)%list.length; show(); };
  next.onclick = ()=>{ i = (i+1)%list.length; show(); };
  close.onclick = ()=> LB.classList.remove('open');

  document.addEventListener('keydown', function(e){
    if (!LB.classList.contains('open')) return;
    if (e.key === 'Escape') close.click();
    if (e.key === 'ArrowLeft') prev.click();
    if (e.key === 'ArrowRight') next.click();
  });

  show();
  LB.classList.add('open');
}

// -------- Calendrier Airbnb (ICS) --------
const CAL_SRC = "https://www.airbnb.com/calendar/ical/13384631.ics?s=f5e78b51c6edc38f540d3c849ff76ae4&locale=fr";

async function fetchICS(url){
  try{
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP '+res.status);
    return await res.text();
  }catch(e){
    // fallback local (au cas où CORS bloque GitHub Pages)
    try{
      const res2 = await fetch('ics/chilllove.ics');
      if (!res2.ok) throw new Error('no local ics');
      return await res2.text();
    }catch(e2){
      return null;
    }
  }
}

function parseICS(ics){
  const lines = ics.split(/\r?\n/);
  const events = [];
  let cur = null;
  for (const line of lines){
    if (line.startsWith('BEGIN:VEVENT')) cur = {};
    else if (line.startsWith('DTSTART')) cur.start = line.split(':').pop().trim();
    else if (line.startsWith('DTEND')) cur.end = line.split(':').pop().trim();
    else if (line.startsWith('END:VEVENT')) { if (cur) events.push(cur); cur = null; }
  }
  return events;
}

function ymdToDate(s){ const y=+s.slice(0,4), m=+s.slice(4,6)-1, d=+s.slice(6,8); return new Date(y,m,d); }

function expandDateRangeSet(events){
  const set = new Set();
  for (const ev of events){
    if (!ev.start || !ev.end) continue;
    const s = ymdToDate(ev.start.replace(/-/g,''));
    const e = ymdToDate(ev.end.replace(/-/g,''));
    for (let d = new Date(s); d < e; d.setDate(d.getDate()+1)){
      const key = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
      set.add(key);
    }
  }
  return set;
}

function buildCalendar(unavailableSet){
  const root = document.getElementById('calendar');
  root.innerHTML = '';
  const now = new Date();
  const monthsToShow = 6;

  for (let i=0; i<monthsToShow; i++){
    const first = new Date(now.getFullYear(), now.getMonth()+i, 1);

    const head = document.createElement('div'); head.className='mhead';
    head.innerHTML = '<strong>' + first.toLocaleDateString('fr-FR', { month:'long', year:'numeric' }) + '</strong>';

    const grid = document.createElement('div'); grid.className='month';

    const startDow = (first.getDay()+6)%7; // Lundi début
    for (let k=0; k<startDow; k++){
      const e=document.createElement('div'); e.className='day'; e.style.visibility='hidden'; grid.appendChild(e);
    }

    const daysInMonth = new Date(first.getFullYear(), first.getMonth()+1, 0).getDate();
    for (let d=1; d<=daysInMonth; d++){
      const cell=document.createElement('div'); cell.className='day';
      const key = first.getFullYear()+'-'+String(first.getMonth()+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
      if (unavailableSet.has(key)) cell.classList.add('unavail');
      cell.textContent = d;
      grid.appendChild(cell);
    }

    const wrap = document.createElement('div');
    wrap.appendChild(head); wrap.appendChild(grid); root.appendChild(wrap);
  }
}

async function initCalendar(){
  const box = document.getElementById('calendar');
  box.innerHTML = '<p class="fine">Chargement du calendrier…</p>';
  const ics = await fetchICS(CAL_SRC);
  if (!ics){
    box.innerHTML = '<p class="fine">Impossible de charger le calendrier. <a href="'+CAL_SRC+'" target="_blank">Ouvrir iCal</a></p>';
    return;
  }
  const events = parseICS(ics);
  const set = expandDateRangeSet(events);
  buildCalendar(set);
}
