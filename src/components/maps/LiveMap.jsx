import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import { useRobotStore } from '../../store/robotStore'
import { useMapStore } from '../../store/mapStore'

// Custom robot marker icon
const createRobotIcon = (status) => {
  const color = status === 'active' ? '#00ff41' : status === 'idle' ? '#ffb800' : '#666'
  return L.divIcon({
    html: `
      <div style="
        width: 32px; height: 32px;
        background: rgba(0,0,0,0.85);
        border: 2px solid ${color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 12px ${color}80;
        font-size: 14px;
      ">🤖</div>
      <div style="
        position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%);
        width: 0; height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid ${color};
      "></div>
    `,
    className: '',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  })
}

const geofencePositions = [
  [34.0622, -118.2637],
  [34.0722, -118.2437],
  [34.0622, -118.2237],
  [34.0422, -118.2237],
  [34.0322, -118.2437],
  [34.0422, -118.2637],
]

function MapController() {
  const { center, zoom } = useMapStore()
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom])
  return null
}

export default function LiveMap({ height = 400 }) {
  const { robots } = useRobotStore()
  const { showGeofence, showRoutes, showRobots } = useMapStore()

  return (
    <div className="rounded-xl overflow-hidden border border-dark-border" style={{ height }}>
      <MapContainer
        center={[34.0522, -118.2437]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <MapController />

        {/* Geofence */}
        {showGeofence && (
          <Polyline
            positions={[...geofencePositions, geofencePositions[0]]}
            pathOptions={{ color: '#00ff41', weight: 2, dashArray: '8 4', opacity: 0.7 }}
          />
        )}

        {/* Restricted zone circle */}
        <Circle
          center={[34.0572, -118.2487]}
          radius={500}
          pathOptions={{ color: '#ff3131', fillColor: '#ff3131', fillOpacity: 0.05, weight: 1, dashArray: '4 4' }}
        />

        {/* Patrol zone */}
        <Circle
          center={[34.0622, -118.2437]}
          radius={800}
          pathOptions={{ color: '#00d4ff', fillColor: '#00d4ff', fillOpacity: 0.03, weight: 1 }}
        />

        {/* Robot markers */}
        {showRobots && robots.filter(r => r.coordinates).map(robot => (
          <Marker
            key={robot.id}
            position={robot.coordinates}
            icon={createRobotIcon(robot.status)}
          >
            <Popup>
              <div style={{ background: '#0f1410', color: '#ccc', border: '1px solid #1e2d1e', borderRadius: 8, padding: 12, minWidth: 180, fontFamily: 'monospace', fontSize: 11 }}>
                <div style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: 6 }}>{robot.name}</div>
                <div>ID: {robot.id}</div>
                <div>Status: <span style={{ color: robot.status === 'active' ? '#00ff41' : '#ffb800' }}>{robot.status.toUpperCase()}</span></div>
                <div>Mission: {robot.mission}</div>
                <div>Battery: <span style={{ color: robot.battery < 30 ? '#ff3131' : '#00ff41' }}>{robot.battery}%</span></div>
                <div>Signal: {robot.signal}%</div>
                <div>Speed: {robot.speed} km/h</div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Patrol routes */}
        {showRoutes && robots.filter(r => r.status === 'active').map(robot => (
          <Polyline
            key={`route-${robot.id}`}
            positions={[
              robot.coordinates,
              [robot.coordinates[0] + 0.008, robot.coordinates[1] - 0.006],
              [robot.coordinates[0] + 0.015, robot.coordinates[1] + 0.004],
            ]}
            pathOptions={{ color: '#00ff41', weight: 1.5, opacity: 0.4, dashArray: '4 6' }}
          />
        ))}
      </MapContainer>
    </div>
  )
}
