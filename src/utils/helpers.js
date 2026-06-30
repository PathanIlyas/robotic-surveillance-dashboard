export const getBatteryColor = (level) => {
  if (level > 60) return 'text-accent-green'
  if (level > 30) return 'text-accent-amber'
  return 'text-accent-red'
}

export const getBatteryBg = (level) => {
  if (level > 60) return 'progress-green'
  if (level > 30) return 'progress-amber'
  return 'progress-red'
}

export const getSignalBars = (signal) => {
  if (signal > 80) return 4
  if (signal > 60) return 3
  if (signal > 30) return 2
  return 1
}

export const formatCoordinates = (lat, lng) => {
  const latDir = lat >= 0 ? 'N' : 'S'
  const lngDir = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`
}

export const formatUptime = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  return `${h}h ${m}m`
}

export const timeAgo = (timestamp) => {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

export const getStatusDotColor = (status) => {
  switch (status) {
    case 'active': return '#00ff41'
    case 'idle': return '#ffb800'
    case 'offline': return '#666'
    case 'warning': return '#ffb800'
    case 'critical': return '#ff3131'
    default: return '#666'
  }
}

export const generateId = (prefix = 'ID') => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB'
}
