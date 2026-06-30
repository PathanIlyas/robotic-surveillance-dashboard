export const formatDate = (iso) => {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: '2-digit'
  })
}

export const formatTime = (iso) => {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  })
}

export const formatDateTime = (iso) => `${formatDate(iso)} ${formatTime(iso)}`

export const formatPercent = (value, decimals = 1) => `${value.toFixed(decimals)}%`

export const formatTemperature = (celsius) => `${celsius.toFixed(1)}°C`

export const formatSpeed = (kmh) => `${kmh.toFixed(1)} km/h`

export const formatDistance = (km) => km >= 1 ? `${km.toFixed(1)} km` : `${(km * 1000).toFixed(0)} m`

export const formatHeading = (degrees) => {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const idx = Math.round(degrees / 22.5) % 16
  return `${String(degrees).padStart(3, '0')}° ${dirs[idx]}`
}

export const formatVoltage = (v) => `${v.toFixed(1)}V`

export const formatCurrent = (a) => `${a.toFixed(1)}A`

export const padZero = (n) => String(n).padStart(2, '0')

export const nowFormatted = () => {
  const d = new Date()
  return `${d.getFullYear()}-${padZero(d.getMonth()+1)}-${padZero(d.getDate())} ${padZero(d.getHours())}:${padZero(d.getMinutes())}:${padZero(d.getSeconds())}`
}

export const formatCoordinates = (lat, lng) => {
  const latDir = lat >= 0 ? 'N' : 'S'
  const lngDir = lng >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`
}
