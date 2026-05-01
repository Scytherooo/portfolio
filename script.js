// ── EmailJS ──
const EMAILJS_PUBLIC_KEY  = 'RhG39NvUqGzzvA-WD';
const EMAILJS_SERVICE_ID  = 'service_givwtn7';
const EMAILJS_TEMPLATE_ID = 'template_eeuvb07';
emailjs.init(EMAILJS_PUBLIC_KEY);

// ── DOM refs ──
const contentArea = document.getElementById('content-area');
const navLinks    = document.querySelectorAll('.top-nav a');
const sections    = document.querySelectorAll('main section[id]');

// ── nav clicks ──
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    showSection(a.getAttribute('href').replace('#', ''));
  });
});

// ── pixel transition ──
const TILE      = 20;  // pixel block size in px
const overlay   = document.getElementById('pixel-transition');

function buildPixelGrid() {
  const w     = overlay.offsetWidth;
  const h     = overlay.offsetHeight;
  const cols  = Math.ceil(w / TILE);
  const rows  = Math.ceil(h / TILE);

  overlay.style.gridTemplateColumns = `repeat(${cols}, ${TILE}px)`;
  overlay.style.gridTemplateRows    = `repeat(${rows}, ${TILE}px)`;
  overlay.innerHTML = '';

  const total = cols * rows;
  const tiles = [];

  for (let i = 0; i < total; i++) {
    const tile = document.createElement('div');
    tile.style.cssText = `
      width:${TILE}px; height:${TILE}px;
      background: var(--bg);
      opacity: 0;
      transition: opacity 0s;
    `;
    overlay.appendChild(tile);
    tiles.push(tile);
  }

  return tiles;
}


function pixelTransition(callback) {
  const tiles    = buildPixelGrid();
  const total    = tiles.length;
  const shuffled = [...Array(total).keys()].sort(() => Math.random() - 0.5);

  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'all';

  // phase 1 — cover screen with pixels
  let covered = 0;
  const coverStep = Math.ceil(total / 30);

  const coverInterval = setInterval(() => {
    for (let i = 0; i < coverStep && covered < total; i++) {
      tiles[shuffled[covered]].style.opacity = '1';
      covered++;
    }
    if (covered >= total) {
      clearInterval(coverInterval);
      callback(); // swap section here

      // phase 2 — reveal by removing pixels
      let revealed = 0;
      const revShuffled = [...Array(total).keys()].sort(() => Math.random() - 0.5);

      const revealInterval = setInterval(() => {
        for (let i = 0; i < coverStep && revealed < total; i++) {
          tiles[revShuffled[revealed]].style.opacity = '0';
          revealed++;
        }
        if (revealed >= total) {
          clearInterval(revealInterval);
          overlay.style.opacity = '0';
          overlay.style.pointerEvents = 'none';
        }
      }, 16);
    }
  }, 16);
}

function buildPixelGrid() {
  const w    = overlay.offsetWidth;
  const h    = overlay.offsetHeight;
  const cols = Math.ceil(w / TILE);
  const rows = Math.ceil(h / TILE);

  overlay.style.gridTemplateColumns = `repeat(${cols}, ${TILE}px)`;
  overlay.style.gridTemplateRows    = `repeat(${rows}, ${TILE}px)`;
  overlay.innerHTML = '';

  const total = cols * rows;
  const tiles = [];

  for (let i = 0; i < total; i++) {
    const tile = document.createElement('div');
    tile.style.cssText = `
      width:${TILE}px;
      height:${TILE}px;
      background:var(--bg);
      opacity:0;
      transition:none;
    `;
    overlay.appendChild(tile);
    tiles.push(tile);
  }

  return tiles;
}

function showSection(id) {
  const isMobile = window.innerWidth <= 820;

  pixelTransition(() => {
    sections.forEach(sec => {
      sec.style.display = 'none';
      sec.classList.remove('visible');
    });

    const target = document.getElementById(id);
    if (target) {
      // hero needs flex, contact and others need block
      if (id === 'hero') {
        target.style.display = isMobile ? 'block' : 'flex';
      } else {
        target.style.display = 'block';
      }
      setTimeout(() => target.classList.add('visible'), 10);
    }

    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });

    // scroll right panel or window depending on device
    if (isMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      contentArea.scrollTop = 0;
    }
  });
}

const projectData = [
  {
    icon: '🛒', title: 'E-Commerce Platform',
    desc: 'Full-featured online store with cart, Stripe payments, real-time inventory, and admin dashboard.',
    chips: ['React','Node.js','PostgreSQL'],
    slides: [
      { img: 'screenshots/ecom-1.png', caption: 'Homepage — product listing & hero banner' },
      { img: 'screenshots/ecom-2.png', caption: 'Product detail page with image gallery' },
      { img: 'screenshots/ecom-3.png', caption: 'Shopping cart & checkout flow' },
      { img: 'screenshots/ecom-4.png', caption: 'Admin dashboard — inventory management' },
    ]
  },
  {
    icon: '✅', title: 'Task Manager App',
    desc: 'Collaborative kanban board with real-time sync, team workspaces, and rich-text notes.',
    chips: ['Next.js','Supabase','Tailwind'],
    slides: [
      { img: 'screenshots/task-1.png', caption: 'Kanban board — drag & drop columns' },
      { img: 'screenshots/task-2.png', caption: 'Task detail modal with rich-text editor' },
      { img: 'screenshots/task-3.png', caption: 'Team workspace — member management' },
    ]
  },
  {
    icon: '🌤', title: 'Weather Dashboard',
    desc: 'Interactive weather app with 7-day forecasts, charts, and geolocation auto-detection.',
    chips: ['JavaScript','Chart.js','OpenWeather'],
    slides: [
      { img: 'screenshots/weather-1.png', caption: 'Main dashboard — current conditions & forecast' },
      { img: 'screenshots/weather-2.png', caption: '7-day chart — temperature & precipitation' },
      { img: 'screenshots/weather-3.png', caption: 'Location search with auto-detection' },
    ]
  },
  {
    icon: '💬', title: 'Real-time Chat App',
    desc: 'WebSocket-powered chat with rooms, typing indicators, and file sharing support.',
    chips: ['Socket.io','Express','MongoDB'],
    slides: [
      { img: 'screenshots/chat-1.png', caption: 'Chat room — messages & typing indicators' },
      { img: 'screenshots/chat-2.png', caption: 'File sharing — drag & drop upload' },
      { img: 'screenshots/chat-3.png', caption: 'Room list & user presence sidebar' },
    ]
  },
  {
    icon: '💬', title: 'Real-time Chat App',
    desc: 'WebSocket-powered chat with rooms, typing indicators, and file sharing support.',
    chips: ['Socket.io','Express','MongoDB'],
    slides: [
      { img: 'screenshots/chat-1.png', caption: 'Chat room — messages & typing indicators' },
      { img: 'screenshots/chat-2.png', caption: 'File sharing — drag & drop upload' },
      { img: 'screenshots/chat-3.png', caption: 'Room list & user presence sidebar' },
    ]
  },
];

let pmCurrent = 0, pmProject = null;

function openProjectModal(idx) {
  pmProject = projectData[idx]; pmCurrent = 0;
  document.getElementById('pm-icon').textContent = pmProject.icon;
  document.getElementById('pm-title').textContent = pmProject.title;
  document.getElementById('pm-desc').textContent = pmProject.desc;
  document.getElementById('pm-chips').innerHTML = pmProject.chips.map(c=>`<span class="chip">${c}</span>`).join('');
  renderPmSlides();
  document.getElementById('proj-backdrop').classList.add('open');
}

function renderPmSlides() {
  document.getElementById('pm-slides').innerHTML = pmProject.slides.map((s,i)=>`
    <div class="proj-slide ${i===0?'active':''}">
      <div class="proj-slide-placeholder">
        <img src="${s.img}" onerror="this.style.display='none'" alt="${s.caption}">
        <span class="proj-placeholder-icon">${pmProject.icon}</span>
        <span class="proj-placeholder-label">// screenshot_${i+1}.png</span>
      </div>
      <div class="proj-slide-caption">
        <span class="proj-caption-num">[${String(i+1).padStart(2,'0')}/${pmProject.slides.length}]</span>
        <span class="proj-caption-text">${s.caption}</span>
      </div>
    </div>`).join('');
  document.getElementById('pm-dots').innerHTML = pmProject.slides.map((_,i)=>
    `<div class="proj-dot ${i===0?'active':''}" onclick="pmGoTo(${i})"></div>`).join('');
  updatePmNav();
}

function changeSlide(dir) { pmGoTo(pmCurrent + dir); }
function pmGoTo(idx) {
  const slides = document.querySelectorAll('.proj-slide');
  const dots = document.querySelectorAll('.proj-dot');
  if (idx < 0 || idx >= slides.length) return;
  slides[pmCurrent].classList.remove('active');
  dots[pmCurrent].classList.remove('active');
  pmCurrent = idx;
  slides[pmCurrent].classList.add('active');
  dots[pmCurrent].classList.add('active');
  updatePmNav();
}
function updatePmNav() {
  document.getElementById('pm-prev').disabled = pmCurrent === 0;
  document.getElementById('pm-next').disabled = pmCurrent === pmProject.slides.length - 1;
}
function closeProjectModal() { document.getElementById('proj-backdrop').classList.remove('open'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProjectModal(); });
document.getElementById('proj-backdrop').addEventListener('click', e => {
  if (e.target.id === 'proj-backdrop') closeProjectModal();
});

// ── contact form ──
function handleSubmit() {
  const btn      = document.getElementById('submit-btn');
  const feedback = document.getElementById('form-feedback');
  const name     = document.getElementById('name').value.trim();
  const email    = document.getElementById('email').value.trim();
  const subject  = document.getElementById('subject').value.trim();
  const message  = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    feedback.textContent = '// please fill in all required fields.';
    feedback.className = 'form-feedback error';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    feedback.textContent = '// invalid email address.';
    feedback.className = 'form-feedback error';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending...';
  feedback.textContent = '';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { name, email, subject, message })
    .then(() => {
      btn.textContent = 'Message Sent ✓';
      feedback.textContent = "// thanks! I'll get back to you soon.";
      feedback.className = 'form-feedback success';
      ['name', 'email', 'subject', 'message'].forEach(id => {
        document.getElementById(id).value = '';
      });
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Send Message ↗';
        feedback.textContent = '';
      }, 3000);
    })
    .catch(() => {
      feedback.textContent = '// something went wrong. please try again.';
      feedback.className = 'form-feedback error';
      btn.disabled = false;
      btn.textContent = 'Send Message ↗';
    });
}

// ── typewriter ──
const roles = [
  'Computer Engineer',
  'Digital Artist',
  'Software Developer',
  'Computer Technician',
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const typedEl  = document.getElementById('typed-role');

function typeRole() {
  const current = roles[roleIndex];
  charIndex += isDeleting ? -1 : 1;
  typedEl.textContent = '< ' + current.slice(0, charIndex) + ' />';

  let speed = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 700;
  }

  setTimeout(typeRole, speed);
}

typeRole();

// ── sprite character ──
const characterCanvas = document.getElementById('character-canvas');
const cctx            = characterCanvas.getContext('2d');
const COLS            = 4;
const ROWS            = 3;
const sprite          = new Image();
sprite.src            = 'spritesheet.png';

let frameW, frameH, animTimer;
let idleIndex = 0;
let waveIndex = 0;

const idleFrames = [0, 1];
const waveFrames = [2, 3, 5, 6, 7];

sprite.onload = () => {
  frameW = sprite.width  / COLS;
  frameH = sprite.height / ROWS;
  const scale = 2.5;
  characterCanvas.width  = frameW * scale;
  characterCanvas.height = frameH * scale;
  drawFrame(idleFrames[0]);
  startIdle();
};

function drawFrame(frameIndex) {
  const col = frameIndex % COLS;
  const row = Math.floor(frameIndex / COLS);
  cctx.clearRect(0, 0, characterCanvas.width, characterCanvas.height);
  cctx.imageSmoothingEnabled = false;
  cctx.drawImage(
    sprite,
    col * frameW, row * frameH, frameW, frameH,
    0, 0, characterCanvas.width, characterCanvas.height
  );
}

function startIdle() {
  clearInterval(animTimer);
  idleIndex = 0;
  animTimer = setInterval(() => {
    drawFrame(idleFrames[idleIndex++ % idleFrames.length]);
  }, 600);
}

function startWave() {
  clearInterval(animTimer);
  waveIndex = 0;
  animTimer = setInterval(() => {
    drawFrame(waveFrames[waveIndex++ % waveFrames.length]);
  }, 150);
}

characterCanvas.addEventListener('mouseenter', startWave);
characterCanvas.addEventListener('mouseleave', startIdle);

// ── init ──
showSection('hero');
