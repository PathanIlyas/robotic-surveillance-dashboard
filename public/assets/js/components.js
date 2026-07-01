/* ============================================================
   SENTINEL-X — Shared Components
   Sidebar, Topbar, Alert Popup, Sound Engine
   ============================================================ */

/* ---- SIDEBAR HTML ---- */
function buildSidebar(activePage) {
  const navItems = [
    { id: 'dashboard',   icon: 'fa-gauge-high',      label: 'Dashboard',        href: 'dashboard.html',    badge: null },
    { id: 'land',        icon: 'fa-mountain',         label: 'Land Surveillance',href: 'land-surveillance.html', badge: null, section: 'DOMAINS' },
    { id: 'drone',       icon: 'fa-helicopter',       label: 'Drone Surveillance',href:'drone-surveillance.html',badge: null },
    { id: 'water',       icon: 'fa-water',            label: 'Water Surveillance',href:'water-surveillance.html', badge: null },
    { id: 'map',         icon: 'fa-map-location-dot', label: 'Live Map',         href: 'dashboard.html#map',section: 'OPERATIONS' },
    { id: 'ai',          icon: 'fa-brain',            label: 'AI Detection',     href: 'dashboard.html#ai' },
    { id: 'missions',    icon: 'fa-crosshairs',       label: 'Mission Control',  href: 'mission-control.html' },
    { id: 'robots',      icon: 'fa-robot',            label: 'Robot Fleet',      href: 'dashboard.html#fleet', section: 'FLEETS' },
    { id: 'drones',      icon: 'fa-plane',            label: 'Drone Fleet',      href: 'drone-surveillance.html#fleet' },
    { id: 'boats',       icon: 'fa-ship',             label: 'Boat Fleet',       href: 'water-surveillance.html#fleet' },
    { id: 'sensors',     icon: 'fa-microchip',        label: 'Sensor Monitoring',href: 'dashboard.html#sensors', section: 'SYSTEMS' },
    { id: 'alerts',      icon: 'fa-bell',             label: 'Alerts Center',    href: 'alerts.html',       badge: '4' },
    { id: 'comms',       icon: 'fa-satellite-dish',   label: 'Communication',    href: 'dashboard.html#comms' },
    { id: 'reports',     icon: 'fa-chart-bar',        label: 'Reports',          href: 'reports.html',      section: 'ANALYTICS' },
    { id: 'settings',    icon: 'fa-gear',             label: 'Settings',         href: 'settings.html',     section: 'CONFIG' },
  ];

  let html = `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <div class="brand-icon"><i class="fa-solid fa-shield-halved"></i></div>
      <div class="brand-text">
        <div class="brand-name">Sentinel-X</div>
        <div class="brand-sub">Unified Surveillance v2.1</div>
      </div>
    </div>
    <nav class="sidebar-nav">`;

  navItems.forEach(item => {
    if (item.section) {
      html += `<div class="nav-section-label">${item.section}</div>`;
    }
    const isActive = item.id === activePage ? 'active' : '';
    html += `
      <a class="nav-item ${isActive}" href="${item.href}">
        <span class="nav-icon"><i class="fa-solid ${item.icon}"></i></span>
        <span class="nav-label">${item.label}</span>
        ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
      </a>`;
  });

  html += `
    </nav>
    <div class="sidebar-footer">
      <div class="nav-item" onclick="toggleSidebar()">
        <span class="nav-icon"><i class="fa-solid fa-chevron-left" id="collapse-icon"></i></span>
        <span class="nav-label">Collapse</span>
      </div>
      <div class="nav-item">
        <span class="nav-icon"><i class="fa-solid fa-circle-dot text-green"></i></span>
        <span class="nav-label mono fs-10" style="color:var(--accent-green)">All Systems Online</span>
      </div>
    </div>
  </aside>`;
  return html;
}

/* ---- TOPBAR HTML ---- */
function buildTopbar(pageTitle, pageSubtitle) {
  return `
  <header class="topbar">
    <div class="topbar-left">
      <button class="btn-icon d-lg-none" onclick="toggleSidebar()">
        <i class="fa-solid fa-bars"></i>
      </button>
      <div>
        <div class="page-title">${pageTitle}</div>
        <div class="page-subtitle">
          <span class="live-dot"></span> ${pageSubtitle}
        </div>
      </div>
    </div>
    <div class="topbar-right">
      <div class="topbar-pill d-none d-md-flex">
        <i class="fa-solid fa-shield-halved text-green"></i>
        <span class="text-green">SECURED</span>
      </div>
      <div class="topbar-pill d-none d-lg-flex" id="topbar-clock">
        <i class="fa-regular fa-clock"></i>
        <span id="clock-display">--:--:--</span>
      </div>
      <div class="topbar-pill d-none d-lg-flex" id="weather-pill">
        <i class="fa-solid fa-sun text-amber"></i>
        <span>38°C • Clear</span>
      </div>
      <div class="btn-icon" id="mute-btn-topbar" onclick="toggleMute()" title="Toggle alert sound">
        <i class="fa-solid fa-volume-high" id="mute-icon-topbar"></i>
      </div>
      <div class="btn-icon" style="position:relative">
        <i class="fa-solid fa-bell"></i>
        <span class="notif-badge" id="topbar-alert-count">4</span>
      </div>
      <div class="btn-icon">
        <i class="fa-solid fa-user"></i>
      </div>
    </div>
  </header>`;
}

/* ---- SIDEBAR TOGGLE ---- */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const mc = document.getElementById('main-content');
  const icon = document.getElementById('collapse-icon');
  sb.classList.toggle('collapsed');
  if (mc) mc.classList.toggle('expanded');
  if (icon) {
    icon.classList.toggle('fa-chevron-left');
    icon.classList.toggle('fa-chevron-right');
  }
}

/* ---- REAL-TIME CLOCK ---- */
function startClock() {
  function tick() {
    const now = new Date();
    const el = document.getElementById('clock-display');
    if (el) el.textContent = now.toLocaleTimeString('en-US', { hour12: false });
  }
  tick();
  setInterval(tick, 1000);
}

/* ================================================================
   ALERT SOUND ENGINE (HTML5 Audio API)
   Plays synthesized wave-MP3 files with Volume, Mute and No-Overlap
   ================================================================ */
const CRITICAL_ALARM_URL = 'https://cdn.pixabay.com/download/audio/2026/06/02/audio_26933dce5c.mp3?filename=tithuh-warning-545568.mp3';

let activeAudio = null;
let isMuted = false;
let alertVolume = 0.6;

function playAlertSound(soundPath = CRITICAL_ALARM_URL) {
  if (isMuted) return;

  // Prevent overlapping sounds
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }

  // Create HTML5 Audio Object
  const audio = new Audio(soundPath);
  audio.volume = alertVolume;
  activeAudio = audio;

  audio.play().catch(err => {
    console.log("Audio playback not started (requires user interaction first):", err);
  });

  // Limit duration to exactly 2 seconds
  setTimeout(() => {
    if (activeAudio === audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, 2000);
}

function toggleMute() {
  isMuted = !isMuted;
  const icons = document.querySelectorAll('[id^="mute-icon"]');
  icons.forEach(icon => {
    icon.className = isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
  });
  const btns = document.querySelectorAll('[id^="mute-btn"]');
  btns.forEach(btn => btn.classList.toggle('muted', isMuted));

  if (isMuted && activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }
}

function setAlertVolume(val) {
  alertVolume = parseFloat(val);
  if (activeAudio) {
    activeAudio.volume = alertVolume;
  }
}

/* ================================================================
   ALERT POPUP SYSTEM
   ================================================================ */
let alertCount = 0;

const ALERT_POOL = [
  { type: 'danger',  icon: 'fa-triangle-exclamation', title: '⚠ Human Detected Near Border',         loc: 'Sector Alpha, Grid C7',   prio: 'CRITICAL' },
  { type: 'danger',  icon: 'fa-ship',                 title: '⚠ Unauthorized Boat Entered Zone',      loc: 'Maritime Zone B, Coords 24.7°N', prio: 'CRITICAL' },
  { type: 'warning', icon: 'fa-helicopter',           title: '⚠ Drone Battery Low — RVL-D04',         loc: 'Sector Delta, Alt 120m',  prio: 'WARNING' },
  { type: 'warning', icon: 'fa-car',                  title: '⚠ Suspicious Vehicle Detected',         loc: 'Checkpoint 3, Road Alpha',prio: 'WARNING' },
  { type: 'danger',  icon: 'fa-fire',                 title: '⚠ Fire Detected — Thermal Signature',   loc: 'Sector Bravo, Zone 4',    prio: 'CRITICAL' },
  { type: 'warning', icon: 'fa-fish',                 title: '⚠ Illegal Fishing Activity Detected',   loc: 'EEZ Boundary, Coord 18.2°N', prio: 'WARNING' },
  { type: 'info',    icon: 'fa-microchip',            title: '⚠ Sensor Offline — LiDAR Unit 3',       loc: 'Base Station, Array C',   prio: 'INFO' },
  { type: 'danger',  icon: 'fa-satellite-dish',       title: '⚠ Communication Lost — RVL-005',        loc: 'Sector Echo, Remote Post',prio: 'CRITICAL' },
  { type: 'warning', icon: 'fa-user-secret',          title: '⚠ Intrusion Alert — Perimeter Breach',  loc: 'Fence Line, Sector Foxtrot', prio: 'WARNING' },
  { type: 'danger',  icon: 'fa-radiation',            title: '⚠ Geofence Breach — Restricted Zone',   loc: 'Restricted Area R-7',     prio: 'CRITICAL' },
  { type: 'info',    icon: 'fa-droplet',              title: '⚠ Oil Spill Signature Detected',        loc: 'Coastal Zone 3, Buoy 12', prio: 'INFO' },
  { type: 'warning', icon: 'fa-person-falling-burst', title: '⚠ Human Overboard Detected',            loc: 'Marine Sector 5, 22.4°N', prio: 'WARNING' },
];

function spawnAlertPopup() {
  const pool = ALERT_POOL;
  const alert = pool[Math.floor(Math.random() * pool.length)];
  alertCount++;

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });

  const container = document.getElementById('alert-popup-container');
  if (!container) return;

  const el = document.createElement('div');
  el.className = `alert-popup ${alert.type}`;
  el.innerHTML = `
    <div class="alert-popup-header">
      <div class="alert-popup-type">
        <i class="fa-solid ${alert.icon} alert-blink"></i>
        <span>${alert.prio} ALERT #${alertCount}</span>
      </div>
      <button class="alert-popup-close" onclick="this.closest('.alert-popup').remove()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="alert-popup-title">${alert.title}</div>
    <div class="alert-popup-meta">
      <div class="alert-meta-item"><i class="fa-solid fa-location-dot"></i> ${alert.loc}</div>
      <div class="alert-meta-item"><i class="fa-regular fa-clock"></i> ${dateStr} ${timeStr}</div>
      <div class="alert-meta-item"><i class="fa-solid fa-hashtag"></i> ID-${String(alertCount).padStart(4,'0')}</div>
    </div>
    <div class="alert-progress-bar"></div>`;

  container.appendChild(el);

  // Update notification counter
  const countEl = document.getElementById('topbar-alert-count');
  if (countEl) countEl.textContent = alertCount;

  const sidebarBadge = document.querySelector('.nav-item.active .nav-badge') || document.querySelector('.nav-badge');
  if (sidebarBadge) sidebarBadge.textContent = alertCount;

  // Push to activity feed if visible
  pushActivityFeedItem(alert, timeStr);

  // Play alarm only for CRITICAL alerts
  if (alert.prio === 'CRITICAL') {
    playAlertSound(CRITICAL_ALARM_URL);
  }

  // Auto-remove after 5s
  setTimeout(() => {
    if (el.parentNode) {
      el.style.transition = 'opacity .3s, transform .3s';
      el.style.opacity = '0';
      el.style.transform = 'translateX(30px)';
      setTimeout(() => el.remove(), 300);
    }
  }, 5000);
}

/* ---- ACTIVITY FEED PUSH ---- */
function pushActivityFeedItem(alert, timeStr) {
  const feed = document.getElementById('activity-feed');
  if (!feed) return;
  const colorMap = { danger: 'red', warning: 'amber', info: 'blue' };
  const col = colorMap[alert.type] || 'green';
  const item = document.createElement('div');
  item.className = 'activity-item';
  item.style.animation = 'float-up .3s ease';
  item.innerHTML = `
    <div class="activity-icon-wrap ${col}">
      <i class="fa-solid ${alert.icon}"></i>
    </div>
    <div class="activity-text">
      <div class="activity-title">${alert.title}</div>
      <div class="activity-meta">${alert.loc} &bull; ${alert.prio}</div>
    </div>
    <div class="activity-time">${timeStr}</div>`;
  feed.insertBefore(item, feed.firstChild);
  
  // Keep only 20 items
  while (feed.children.length > 20) feed.removeChild(feed.lastChild);
}

/* ---- STAT COUNTER ANIMATION ---- */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(interval);
    }, 30);
  });
}

/* ---- PROGRESS BAR ANIMATION ---- */
function animateProgressBars() {
  document.querySelectorAll('.prog-bar[data-width]').forEach(bar => {
    setTimeout(() => {
      bar.style.width = bar.dataset.width + '%';
    }, 200);
  });
}

/* ---- INIT ALL COMPONENTS ---- */
function initComponents() {
  startClock();
  animateCounters();
  animateProgressBars();
  // Spawn popup every 5 seconds
  setTimeout(spawnAlertPopup, 2000);
  setInterval(spawnAlertPopup, 5000);
}
