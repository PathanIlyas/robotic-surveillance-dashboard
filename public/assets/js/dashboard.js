/* ============================================================
   SENTINEL-X — Dashboard Page Logic
   ============================================================ */

/* ---- MOCK DATA ---- */
const FLEET_DATA = [
  { id:'RVL-001', name:'Alpha Unit',  domain:'Land',  status:'active',  mission:'Perimeter Patrol',  battery:87, signal:94, speed:12.5, sync:'2s ago' },
  { id:'RVL-002', name:'Bravo Unit',  domain:'Land',  status:'active',  mission:'Threat Assessment', battery:62, signal:78, speed:8.3,  sync:'1s ago' },
  { id:'RVL-003', name:'Charlie Unit',domain:'Land',  status:'idle',    mission:'Standby',           battery:100,signal:99, speed:0,    sync:'5s ago' },
  { id:'DRN-001', name:'Eagle',       domain:'Drone', status:'active',  mission:'Aerial Recon',      battery:71, signal:88, speed:45.0, sync:'1s ago' },
  { id:'DRN-002', name:'Hawk',        domain:'Drone', status:'active',  mission:'Auto Patrol',       battery:55, signal:82, speed:38.0, sync:'3s ago' },
  { id:'MRN-001', name:'Tempest',     domain:'Marine',status:'active',  mission:'Coastline Patrol',  battery:80, signal:91, speed:18.0, sync:'2s ago' },
  { id:'MRN-002', name:'Storm',       domain:'Marine',status:'idle',    mission:'Standby',           battery:95, signal:97, speed:0,    sync:'8s ago' },
  { id:'RVL-004', name:'Delta Unit',  domain:'Land',  status:'offline', mission:'Maintenance',       battery:12, signal:0,  speed:0,    sync:'45m ago'},
];

const AI_LOG = [
  { type:'Human',    conf:97.3, unit:'RVL-001', zone:'Sector Alpha', time:'14:32:18', action:'Alert Sent',     status:'threat'  },
  { type:'Vehicle',  conf:92.1, unit:'RVL-004', zone:'Sector Delta', time:'14:28:45', action:'Recording',      status:'monitor' },
  { type:'Drone',    conf:88.7, unit:'DRN-001', zone:'Restricted R7',time:'14:25:12', action:'Logged',         status:'cleared' },
  { type:'Fire',     conf:99.1, unit:'RVL-002', zone:'Sector Bravo', time:'14:19:33', action:'Emergency Alert',status:'threat'  },
  { type:'Boat',     conf:94.8, unit:'MRN-001', zone:'Marine Zone B',time:'14:15:07', action:'Tracking',       status:'monitor' },
  { type:'Weapon',   conf:96.2, unit:'RVL-001', zone:'Grid C7',      time:'14:10:22', action:'Alert Sent',     status:'threat'  },
  { type:'Animal',   conf:85.4, unit:'RVL-003', zone:'Sector Charlie',time:'14:05:55',action:'False Positive', status:'cleared' },
  { type:'Intrusion',conf:98.0, unit:'RVL-002', zone:'Fence Line',   time:'14:01:41', action:'Alert Sent',     status:'threat'  },
];

const SENSORS = [
  { name:'LiDAR',    health:98, status:'online',  icon:'fa-wave-square',  color:'green' },
  { name:'Radar',    health:94, status:'online',  icon:'fa-circle-dot',   color:'green' },
  { name:'Thermal',  health:100,status:'online',  icon:'fa-temperature-high',color:'blue'},
  { name:'GPS',      health:100,status:'online',  icon:'fa-satellite',    color:'green' },
  { name:'Ultrasonic',health:67,status:'warning', icon:'fa-tower-broadcast',color:'amber'},
  { name:'Gas',      health:99, status:'online',  icon:'fa-flask',        color:'green' },
];

const MISSIONS = [
  { name:'Operation Perimeter Watch', status:'active', robots:2, progress:78, color:'green' },
  { name:'Operation Thermal Scan',    status:'active', robots:1, progress:65, color:'blue'  },
  { name:'Marine Border Guard',       status:'active', robots:1, progress:91, color:'amber' },
  { name:'Operation Night Hawk',      status:'scheduled',robots:2,progress:0,color:'purple' },
  { name:'Aerial Zone Clear',         status:'completed',robots:1,progress:100,color:'gray' },
];

const COMM_DATA = [
  { name:'4G LTE',    pct:87, color:'green' },
  { name:'5G NR',     pct:94, color:'blue'  },
  { name:'LoRa',      pct:76, color:'amber' },
  { name:'Satellite', pct:68, color:'purple'},
  { name:'RF Mesh',   pct:45, color:'red'   },
];

/* ---- CHART DEFAULTS ---- */
Chart.defaults.color = '#4a6a4a';
Chart.defaults.borderColor = '#1a2e1a';
Chart.defaults.font.family = "'JetBrains Mono', monospace";
Chart.defaults.font.size = 10;

/* ---- THREAT CHART ---- */
function buildThreatChart() {
  const labels = ['00','02','04','06','08','10','12','14','16','18','20','22'];
  const ctx = document.getElementById('threatChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label:'Human',  data:[2,1,0,3,7,9,12,11,8,6,4,3],  borderColor:'#ff3131', backgroundColor:'rgba(255,49,49,.12)', fill:true, tension:.4, borderWidth:2, pointRadius:2 },
        { label:'Vehicle',data:[1,0,0,2,5,8,10,9,7,5,3,2],  borderColor:'#ffb800', backgroundColor:'rgba(255,184,0,.08)', fill:true, tension:.4, borderWidth:2, pointRadius:2 },
        { label:'Boat',   data:[0,0,0,1,2,4,5,4,3,2,1,1],   borderColor:'#00d4ff', backgroundColor:'rgba(0,212,255,.08)', fill:true, tension:.4, borderWidth:2, pointRadius:2 },
        { label:'Fire',   data:[0,0,0,0,1,1,1,0,0,0,0,0],   borderColor:'#ff6b35', backgroundColor:'rgba(255,107,53,.08)', fill:true, tension:.4, borderWidth:2, pointRadius:2 },
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:true,
      plugins: { legend:{ labels:{ padding:12, boxWidth:10 } } },
      scales: {
        x: { grid:{ color:'rgba(26,46,26,.5)' } },
        y: { grid:{ color:'rgba(26,46,26,.5)' }, beginAtZero:true }
      }
    }
  });
}

/* ---- PIE CHART ---- */
function buildPieChart() {
  const ctx = document.getElementById('detectionPie');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels:['Human','Vehicle','Boat','Drone','Fire','Other'],
      datasets:[{ data:[38,28,15,10,5,4], backgroundColor:['#ff3131','#ffb800','#00d4ff','#b347ff','#ff6b35','#4a6a4a'], borderWidth:1, borderColor:'#0a0f0a' }]
    },
    options: {
      responsive:true, maintainAspectRatio:true, cutout:'60%',
      plugins: { legend:{ position:'bottom', labels:{ padding:8, boxWidth:10 } } }
    }
  });
}

/* ---- BATTERY CHART ---- */
function buildBatteryChart() {
  const ctx = document.getElementById('batteryChart');
  if (!ctx) return;
  const labels = Array.from({length:24},(_,i)=>`${String(i).padStart(2,'0')}:00`);
  new Chart(ctx, {
    type:'line',
    data:{
      labels,
      datasets:[
        { label:'Avg %', data:Array.from({length:24},(_,i)=>82-i*1.4+Math.random()*6), borderColor:'#00ff41', fill:false, tension:.4, borderWidth:2, pointRadius:0 },
        { label:'Min %', data:Array.from({length:24},(_,i)=>55-i*2+Math.random()*8),   borderColor:'#ff3131', borderDash:[4,4], fill:false, tension:.4, borderWidth:1.5, pointRadius:0 },
      ]
    },
    options:{ responsive:true, maintainAspectRatio:true, plugins:{legend:{labels:{padding:10,boxWidth:10}}}, scales:{ x:{grid:{color:'rgba(26,46,26,.5)'},ticks:{maxTicksLimit:6}}, y:{grid:{color:'rgba(26,46,26,.5)'},min:0,max:100} } }
  });
}

/* ---- MISSION CHART ---- */
function buildMissionChart() {
  const ctx = document.getElementById('missionChart');
  if (!ctx) return;
  new Chart(ctx, {
    type:'bar',
    data:{
      labels:['Jan','Feb','Mar','Apr','May','Jun'],
      datasets:[
        { label:'Patrol',  data:[12,15,18,14,20,22], backgroundColor:'rgba(0,255,65,.7)',  borderRadius:3 },
        { label:'Recon',   data:[5,7,9,6,11,13],     backgroundColor:'rgba(0,212,255,.7)', borderRadius:3 },
        { label:'Marine',  data:[3,4,6,5,7,8],       backgroundColor:'rgba(255,184,0,.7)', borderRadius:3 },
      ]
    },
    options:{ responsive:true, maintainAspectRatio:true, plugins:{legend:{labels:{padding:10,boxWidth:10}}}, scales:{ x:{grid:{color:'rgba(26,46,26,.4)'},stacked:false}, y:{grid:{color:'rgba(26,46,26,.4)'},beginAtZero:true} } }
  });
}

/* ---- WEATHER CHART ---- */
function buildWeatherChart() {
  const ctx = document.getElementById('weatherChart');
  if (!ctx) return;
  const labels = ['06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00'];
  new Chart(ctx, {
    type:'line',
    data:{
      labels,
      datasets:[
        { label:'Temp °C', data:[28,31,35,38,40,38,35,30], borderColor:'#ff6b35', fill:false, tension:.4, borderWidth:2, pointRadius:3 },
        { label:'Humidity %',data:[55,50,44,42,40,43,48,53],borderColor:'#00d4ff', fill:false, tension:.4, borderWidth:2, pointRadius:3, yAxisID:'y2' },
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:true,
      plugins:{legend:{labels:{padding:10,boxWidth:10}}},
      scales:{
        x:{grid:{color:'rgba(26,46,26,.4)'}},
        y:{grid:{color:'rgba(26,46,26,.4)'},position:'left'},
        y2:{grid:{display:false},position:'right',min:0,max:100}
      }
    }
  });
}

/* ---- FLEET TABLE ---- */
function buildFleetTable() {
  const tbody = document.getElementById('fleet-tbody');
  if (!tbody) return;
  const battColor = b => b > 60 ? 'green' : b > 30 ? 'amber' : 'red';
  const statusBadge = s => {
    const m = { active:'badge-green', idle:'badge-amber', offline:'badge-gray' };
    return `<span class="badge-military ${m[s] || 'badge-gray'}">${s.toUpperCase()}</span>`;
  };
  const domainIcon = d => ({ Land:'fa-robot', Drone:'fa-helicopter', Marine:'fa-ship' })[d] || 'fa-robot';

  tbody.innerHTML = FLEET_DATA.map(u => `
    <tr>
      <td class="text-green">${u.id}</td>
      <td>${u.name}</td>
      <td><span class="badge-military badge-blue"><i class="fa-solid ${domainIcon(u.domain)} me-1"></i>${u.domain}</span></td>
      <td>${statusBadge(u.status)}</td>
      <td style="color:var(--text-secondary)">${u.mission}</td>
      <td>
        <div class="d-flex align-items-center gap-2">
          <div class="prog-bar-wrap" style="width:60px"><div class="prog-bar ${battColor(u.battery)}" style="width:${u.battery}%"></div></div>
          <span class="mono text-${battColor(u.battery)} fs-10">${u.battery}%</span>
        </div>
      </td>
      <td><span class="mono text-blue fs-10">${u.signal}%</span></td>
      <td class="mono fs-10">${u.speed} km/h</td>
      <td class="mono" style="font-size:10px;color:var(--text-muted)">${u.sync}</td>
    </tr>`).join('');
}

/* ---- AI LOG TABLE ---- */
function buildAITable() {
  const tbody = document.getElementById('ai-tbody');
  if (!tbody) return;
  const actionColor = s => ({ threat:'red', monitor:'amber', cleared:'green' })[s] || 'gray';
  const typeIcon = t => ({
    Human:'fa-person', Vehicle:'fa-car', Drone:'fa-helicopter', Fire:'fa-fire',
    Boat:'fa-ship', Weapon:'fa-gun', Animal:'fa-paw', Intrusion:'fa-user-secret'
  })[t] || 'fa-circle-dot';

  tbody.innerHTML = AI_LOG.map(r => `
    <tr>
      <td><span class="d-flex align-items-center gap-1"><i class="fa-solid ${typeIcon(r.type)} text-amber" style="font-size:11px"></i> ${r.type}</span></td>
      <td><span class="mono text-${actionColor(r.status)}">${r.conf}%</span></td>
      <td class="text-green">${r.unit}</td>
      <td style="font-size:11px;color:var(--text-muted)">${r.zone}</td>
      <td class="mono" style="font-size:10px;color:var(--text-muted)">${r.time}</td>
      <td><span class="badge-military badge-${actionColor(r.status)}" style="font-size:8px">${r.action}</span></td>
    </tr>`).join('');
}

/* ---- SENSOR GRID ---- */
function buildSensorGrid() {
  const el = document.getElementById('sensor-grid');
  if (!el) return;
  el.innerHTML = SENSORS.map(s => `
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div class="d-flex align-items-center gap-2">
        <div class="activity-icon-wrap ${s.color}" style="width:26px;height:26px;border-radius:6px">
          <i class="fa-solid ${s.icon}" style="font-size:11px"></i>
        </div>
        <div>
          <div class="mono" style="font-size:11px;color:var(--text-primary)">${s.name}</div>
          <div class="mono" style="font-size:9px;color:var(--text-muted)">${s.status.toUpperCase()}</div>
        </div>
      </div>
      <div style="text-align:right">
        <div class="mono fs-10 text-${s.color}">${s.health}%</div>
        <span class="status-dot ${s.status === 'online' ? 'online' : 'warning'}"></span>
      </div>
    </div>
    <div class="prog-bar-wrap mb-3" style="height:4px">
      <div class="prog-bar ${s.color}" style="width:${s.health}%"></div>
    </div>`).join('');
}

/* ---- COMM STATUS ---- */
function buildCommStatus() {
  const el = document.getElementById('comms');
  if (!el) return;
  el.innerHTML = COMM_DATA.map(c => `
    <div class="d-flex align-items-center justify-content-between mb-2">
      <span class="mono" style="font-size:10px;color:var(--text-secondary);width:72px">${c.name}</span>
      <div class="prog-bar-wrap flex-fill mx-2" style="height:5px">
        <div class="prog-bar ${c.color}" style="width:${c.pct}%"></div>
      </div>
      <span class="mono text-${c.color}" style="font-size:10px;width:30px;text-align:right">${c.pct}%</span>
    </div>`).join('');
}

/* ---- MISSION TIMELINE ---- */
function buildMissionTimeline() {
  const el = document.getElementById('mission-timeline');
  if (!el) return;
  const colorMap = { green:'green', blue:'blue', amber:'amber', purple:'blue', gray:'' };
  el.innerHTML = `<div class="timeline">` + MISSIONS.map(m => `
    <div class="timeline-item ${colorMap[m.color] || ''}">
      <div class="timeline-title">${m.name}</div>
      <div class="timeline-meta">${m.robots} unit${m.robots>1?'s':''} &bull; ${m.status.toUpperCase()} &bull; ${m.progress}%</div>
      ${m.status === 'active' ? `
      <div class="prog-bar-wrap mt-1" style="height:3px">
        <div class="prog-bar ${m.color === 'gray' ? 'green' : m.color}" style="width:${m.progress}%"></div>
      </div>` : ''}
    </div>`).join('') + `</div>`;
}

/* ---- TICKER TIME ---- */
function updateTicker() {
  const el = document.getElementById('ticker-time');
  if (el) el.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
}

/* ---- MAP GEOFENCE TOGGLE ---- */
let geofenceVisible = true;
function toggleGeofence() {
  const zones = document.querySelectorAll('.map-zone');
  geofenceVisible = !geofenceVisible;
  zones.forEach(z => z.style.display = geofenceVisible ? '' : 'none');
}

/* ---- FEED COUNTER ---- */
let feedItemCount = 5;
function updateFeedCount() {
  const el = document.getElementById('feed-count');
  if (el) el.textContent = feedItemCount + ' events';
  feedItemCount++;
}

/* ---- INIT ---- */
window.addEventListener('DOMContentLoaded', () => {
  // Inject sidebar & topbar
  document.getElementById('sidebar-mount').innerHTML = buildSidebar('dashboard');
  document.getElementById('topbar-mount').innerHTML  = buildTopbar('Command Center Dashboard', 'Live Feed Active — All Domains');

  // Build all components
  buildFleetTable();
  buildAITable();
  buildSensorGrid();
  buildCommStatus();
  buildMissionTimeline();
  buildThreatChart();
  buildPieChart();
  buildBatteryChart();
  buildMissionChart();
  buildWeatherChart();

  // Init shared components (clock, counters, progress bars, alert popups)
  initComponents();
  AOS.init({ duration: 500, once: true, easing: 'ease-out' });

  // Ticker
  setInterval(updateTicker, 1000);

  // Feed counter
  setInterval(updateFeedCount, 5000);
});
