export const SYSTEM_NAME = 'Robotic Vehicle Land Surveillance System'
export const SYSTEM_SHORT = 'RVLS'
export const VERSION = 'v4.2.1'
export const BUILD = 'BUILD-2024-0630'

export const ROBOT_STATUS = {
  active: { label: 'ACTIVE', color: 'text-accent-green', bg: 'bg-green-900/20', border: 'border-accent-green/30' },
  idle: { label: 'IDLE', color: 'text-accent-amber', bg: 'bg-amber-900/20', border: 'border-accent-amber/30' },
  offline: { label: 'OFFLINE', color: 'text-gray-500', bg: 'bg-gray-900/20', border: 'border-gray-700' },
  maintenance: { label: 'MAINTENANCE', color: 'text-accent-blue', bg: 'bg-blue-900/20', border: 'border-accent-blue/30' },
}

export const ALERT_SEVERITY = {
  critical: { label: 'CRITICAL', color: 'text-accent-red', bg: 'bg-red-900/20', border: 'border-accent-red/30', icon: '🔴' },
  warning: { label: 'WARNING', color: 'text-accent-amber', bg: 'bg-amber-900/20', border: 'border-accent-amber/30', icon: '🟡' },
  info: { label: 'INFO', color: 'text-accent-blue', bg: 'bg-blue-900/20', border: 'border-accent-blue/30', icon: '🔵' },
  medium: { label: 'MEDIUM', color: 'text-accent-orange', bg: 'bg-orange-900/20', border: 'border-accent-orange/30', icon: '🟠' },
}

export const ALERT_TYPES = {
  intrusion: { label: 'Intrusion', icon: '⚠️', color: 'text-accent-red' },
  battery: { label: 'Battery', icon: '🔋', color: 'text-accent-amber' },
  communication: { label: 'Communication', icon: '📡', color: 'text-accent-blue' },
  fire: { label: 'Fire', icon: '🔥', color: 'text-orange-400' },
  sensor: { label: 'Sensor', icon: '📊', color: 'text-accent-purple' },
  emergency: { label: 'Emergency', icon: '🚨', color: 'text-accent-red' },
  weather: { label: 'Weather', icon: '⛈️', color: 'text-blue-400' },
}

export const MISSION_STATUS = {
  active: { label: 'ACTIVE', color: 'text-accent-green' },
  scheduled: { label: 'SCHEDULED', color: 'text-accent-blue' },
  completed: { label: 'COMPLETED', color: 'text-gray-400' },
  aborted: { label: 'ABORTED', color: 'text-accent-red' },
  paused: { label: 'PAUSED', color: 'text-accent-amber' },
}

export const COMM_CHANNELS = [
  { id: '4g', name: '4G LTE', status: 'active', signal: 87, speed: '45 Mbps', latency: '28ms' },
  { id: '5g', name: '5G NR', status: 'active', signal: 92, speed: '210 Mbps', latency: '12ms' },
  { id: 'lora', name: 'LoRa', status: 'active', signal: 76, speed: '8 kbps', latency: '150ms' },
  { id: 'satellite', name: 'Satellite', status: 'active', signal: 68, speed: '12 Mbps', latency: '600ms' },
  { id: 'rf', name: 'RF Mesh', status: 'warning', signal: 45, speed: '2 Mbps', latency: '45ms' },
  { id: 'encrypted', name: 'Encrypted VPN', status: 'active', signal: 100, speed: '95%', latency: 'AES-256' },
]

export const MAP_ZONES = [
  { id: 'z1', name: 'Sector Alpha', color: '#00ff41', type: 'patrol' },
  { id: 'z2', name: 'Sector Bravo', color: '#ffb800', type: 'threat' },
  { id: 'z3', name: 'Sector Charlie', color: '#00d4ff', type: 'clear' },
  { id: 'z4', name: 'Sector Delta', color: '#ff3131', type: 'restricted' },
  { id: 'z5', name: 'Sector Echo', color: '#b347ff', type: 'mission' },
  { id: 'z6', name: 'Sector Foxtrot', color: '#00ff41', type: 'patrol' },
]

export const POWER_DATA = {
  battery: 68,
  voltage: 48.2,
  current: 12.4,
  temperature: 38,
  health: 87,
  solarInput: 245,
  estimatedRuntime: '4h 32m',
  cycles: 142,
  capacity: 200,
  cells: [95, 92, 88, 91, 87, 93],
}
