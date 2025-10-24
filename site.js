// ===== Helpers
const $  = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const byId = id => document.getElementById(id);

// ===== Theme toggle
const root = document.documentElement;
const themeBtn = byId('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') root.classList.add('light');
themeBtn?.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// ===== Mobile nav
const navToggle = byId('navToggle');
const primaryNav = byId('primaryNav');
navToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', (e) => {
  if (!document.body.classList.contains('nav-open')) return;
  if (!primaryNav.contains(e.target) && e.target !== navToggle) {
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});
primaryNav?.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if(a && document.body.classList.contains('nav-open')){
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ===== Active link on scroll
const sections = $$('main section[id]');
const navLinks = $$('header .nav a[href^="#"]');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });
sections.forEach(s => io.observe(s));

// ===== Footer year
byId('year').textContent = new Date().getFullYear();

/* =======================
   Positions (data + render)
   ======================= */
const positions = [
  {
    role: 'Editor-in-Chief Assistant / Managing Editor',
    org: 'IEEE Communications Surveys & Tutorials (IEEE COMST)',
    location: 'Remote',
    time: 'Jan 2025 – Present',
    details: 'Editorial leadership and operations support for IEEE COMST.',
    link: 'https://www.comsoc.org/publications/journals/ieee-comst'
  },
  {
    role: 'Postdoctoral Research Fellow',
    org: 'Memorial University of Newfoundland',
    location: 'St John’s, NL, Canada · On-site',
    time: 'May 2024 – Present',
    details: 'Electrical & Computer Engineering; research in ML for communications, resource allocation, and 5G/6G.',
    link: 'https://www.mun.ca/engineering/'
  },
  {
    role: 'Teaching Assistant',
    org: 'Memorial University of Newfoundland',
    location: 'St John’s, NL, Canada',
    time: 'Sep 2019 – Dec 2022',
    details: 'Supported ECE/ENGI courses including communications and information theory.'
  }
];

function parseStart(time){
  const m = time.match(/([A-Za-z]{3})\s+(\d{4})/);
  if(!m) return 0;
  const months = {Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};
  return parseInt(m[2],10)*100 + (months[m[1]]||1);
}

function renderPositions(){
  const container = byId('posList');
  if(!container) return;
  const rows = [...positions].sort((a,b)=>parseStart(b.time)-parseStart(a.time));
  container.innerHTML = '';
  rows.forEach((p)=>{
    const el = document.createElement('article');
    el.className = 'line-item';
    el.innerHTML = `
      <div class="line-head">
        <h3 class="title-md">${p.role}</h3>
        <span class="right badge">${p.time}</span>
      </div>
      <div class="meta">${p.org} · ${p.location}</div>
      ${p.details ? `<p class="mt-6" style="margin-top:.4rem">${p.details}</p>` : ''}
      <div class="row" style="margin-top:.5rem">
        ${p.link ? `<a class="btn btn-sm" href="${p.link}" target="_blank" rel="noopener">Learn more</a>` : ''}
      </div>
    `;
    container.appendChild(el);
  });
}
renderPositions();

/* =======================
   Publications (data + render)
   ======================= */
// NOTE: add `code: 'https://github.com/...repo...'` to any item to show the Code button next to PDF.
const publications = [
  { type: 'journal', year: 2025, citations: 3,
    title: 'Integrated Sensing and Communications for Reconfigurable Intelligent Surface-aided Cell-Free Networks',
    authors: ['S Shakoor','QN Le','EK Hong','B Canberk','TQ Duong'],
    venue: 'IEEE Communications Letters',
    pdf: 'https://arxiv.org/pdf/2507.12415',
    code: 'https://github.com/your/repo' // ← add when available
  },
  { type: 'journal', year: 2025,
    title: 'Max-Min Fairness in Active Aerial Reconfigurable Intelligent Surface-aided ISAC Network',
    authors: ['S Shakoor','QN Le','LD Nguyen','K Singh','OA Dobre','TQ Duong'],
    venue: 'IEEE Transactions on Cognitive Communications and Networking'
  },
  { type: 'thesis', year: 2024,
    title: 'Resource allocation techniques for spectral and energy-efficient next generation wireless networks',
    authors: ['QN Le'],
    venue: 'Memorial University of Newfoundland'
  },
  { type: 'journal', year: 2023, citations: 26,
    title: 'RIS-assisted full-duplex integrated sensing and communication',
    authors: ['QN Le','VD Nguyen','OA Dobre','H Shin'],
    venue: 'IEEE Wireless Communications Letters 12(10): 1677–1681'
  },
  { type: 'journal', year: 2022, citations: 6,
    title: 'Reconfigurable Intelligent Surface-Enabled Federated Learning for Power-Constrained Devices',
    authors: ['QN Le','L Bariah','OA Dobre','S Muhaidat'],
    venue: 'IEEE Communications Letters 26(11): 2725–2729'
  },
  { type: 'journal', year: 2021, citations: 86,
    title: 'Energy efficiency maximization in RIS-aided cell-free network with limited backhaul',
    authors: ['QN Le','VD Nguyen','OA Dobre','R Zhao'],
    venue: 'IEEE Communications Letters 25(6): 1974–1978'
  },
  { type: 'journal', year: 2021, citations: 78,
    title: 'Learning-assisted user clustering in cell-free massive MIMO-NOMA networks',
    authors: ['QN Le','VD Nguyen','OA Dobre','NP Nguyen','R Zhao','S Chatzinotas'],
    venue: 'IEEE Transactions on Vehicular Technology 70(12): 12872–12887'
  },
  { type: 'journal', year: 2020, citations: 70,
    title: 'Full-duplex non-orthogonal multiple access cooperative overlay spectrum-sharing networks with SWIPT',
    authors: ['QN Le','A Yadav','NP Nguyen','OA Dobre','R Zhao'],
    venue: 'IEEE Transactions on Green Communications and Networking 5(1): 322–334'
  },
  { type: 'journal', year: 2018, citations: 48,
    title: 'Full-duplex distributed switch-and-stay energy harvesting selection relaying networks with imperfect CSI: Design and outage analysis',
    authors: ['QN Le','VNQ Bao','B An'],
    venue: 'Journal of Communications and Networks 20(1): 29–46'
  },
  { type: 'conference', year: 2019, citations: 15,
    title: 'Outage Performance of Full-Duplex Overlay CR-NOMA Networks with SWIPT',
    authors: ['QN Le','NP Nguyen','A Yadav','OA Dobre'],
    venue: 'IEEE Global Communications Conference (GLOBECOM): 1–6'
  },
  { type: 'journal', year: 2017, citations: 12,
    title: 'Secure wireless powered relaying networks: Energy harvesting policies and performance analysis',
    authors: ['QN Le','DT Do','B An'],
    venue: 'International Journal of Communication Systems 30(18): e3369'
  },
  { type: 'journal', year: 2016, citations: 7,
    title: 'Full-duplex distributed switch-and-stay networks with wireless energy harvesting: design and outage analysis',
    authors: ['QN Le','NT Do','VNQ Bao','B An'],
    venue: 'EURASIP Journal on Wireless Communications and Networking 2016(1): 285'
  },
  { type: 'conference', year: 2017,
    title: 'Outage Performance of Distributed Switch and Stay Relay Networks with Energy Harvesting',
    authors: ['QN Le','VNQ Bao','B An'],
    venue: '대한전자공학회 학술대회: 1132–1133'
  },
  { type: 'conference', year: 2016,
    title: 'Outage Analysis of Distributed Switch and Stay Half-Duplex Networks',
    authors: ['QN Le','VNQ Bao','B An'],
    venue: '대한전자공학회 학술대회: 740–741'
  }
];

const pubList = byId('pubList');
const pubEmpty = byId('pubEmpty');
const searchPub = byId('searchPub');
let currentFilter = 'all';

function pubCard(p, i, total){
  const img = p.methodImg ? `<img class="pub-thumb" alt="Method figure for ${p.title}" src="${p.methodImg}" loading="lazy">` : '';
  const cites = (p.citations || p.citations === 0) ? `<span class="badge">Citations: ${p.citations}</span>` : '';

  // Buttons — PDF and Code come first and sit side by side
  const pdfBtn  = p.pdf  ? `<a class="btn btn-sm" href="${p.pdf}" target="_blank" rel="noopener">PDF</a>` : '';
  const codeBtn = p.code ? `<a class="btn btn-sm" href="${p.code}" target="_blank" rel="noopener">Code</a>` : '';

  // Other optional buttons follow
  const urlBtn  = p.url  ? `<a class="btn btn-sm" href="${p.url}" target="_blank" rel="noopener">URL</a>` : '';
  const pageBtn = p.page ? `<a class="btn btn-sm" href="${p.page}" target="_blank" rel="noopener">Project</a>` : '';
  const bibBtn  = p.bibtex ? `<button class="btn btn-sm" data-bibtex='${encodeURIComponent(p.bibtex)}'>Copy BibTeX</button>` : '';

  // Main click target for the whole card (keep preference: pdf > url > page)
  const href = p.pdf || p.url || p.page || '';

  return `
    <article class="item pub pub-row ${href ? 'clickable' : ''}"
             ${href ? `data-href="${href}" tabindex="0" role="link" aria-label="Open: ${p.title}"` : ''}>
      ${img}
      <div class="pub-body">
        <div class="row">
          <span class="badge">${p.year || ''}</span>
          <span class="badge">${p.type || ''}</span>
          <span class="badge">${p.venue || ''}</span>
          ${cites}
          <span class="right muted">${i+1}/${total}</span>
        </div>
        <h3 class="title-md" style="margin-top:.35rem">${p.title || ''}</h3>
        <div class="meta">${(p.authors||[]).join(', ')}</div>
        <div class="pub-actions">
          ${pdfBtn}${codeBtn}${urlBtn}${pageBtn}${bibBtn}
        </div>
      </div>
    </article>`;
}

function renderPubs(){
  if(!pubList) return;
  pubList.innerHTML = '';

  const q = (searchPub?.value || '').toLowerCase();
  const rows = publications
    .filter(p => currentFilter === 'all' || p.type === currentFilter)
    .filter(p => !q || [p.title, p.venue, String(p.year), ...(p.authors||[])].join(' ').toLowerCase().includes(q))
    .sort((a,b)=> (b.year||0) - (a.year||0));

  if(rows.length === 0){ pubEmpty.hidden = false; return; } else { pubEmpty.hidden = true; }

  rows.forEach((p, i) => {
    const el = document.createElement('div');
    el.innerHTML = pubCard(p, i, rows.length);
    pubList.appendChild(el.firstElementChild);
  });
}

// Whole-card click: open link (but not when clicking a small button)
pubList?.addEventListener('click', (e)=>{
  const btn = e.target.closest('.btn');
  if(btn) return; // let buttons work
  const card = e.target.closest('.pub.clickable');
  if(card?.dataset.href){
    window.open(card.dataset.href, '_blank', 'noopener');
  }
});
// Keyboard access
pubList?.addEventListener('keydown', (e)=>{
  const card = e.target.closest('.pub.clickable');
  if(!card) return;
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    window.open(card.dataset.href, '_blank', 'noopener');
  }
});

// Filters & search
$$('#publications .filters .btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    $$('#publications .filters .btn').forEach(b=>b.setAttribute('aria-selected','false'));
    btn.setAttribute('aria-selected','true');
    currentFilter = btn.dataset.filter;
    renderPubs();
  });
});
searchPub?.addEventListener('input', renderPubs);

// Copy all bib
byId('copyBibAll')?.addEventListener('click', ()=>{
  const bundle = publications.map(p=>p.bibtex||'').join('\n\n').trim();
  navigator.clipboard.writeText(bundle);
});

// Initial render
renderPubs();
