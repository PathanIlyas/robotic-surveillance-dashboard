import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Activity, Crosshair } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import LiveMap from '../components/maps/LiveMap'
import { useRobotStore } from '../store/robotStore'
import { useMapStore } from '../store/mapStore'
import { formatCoordinates, formatHeading, formatSpeed } from '../utils/formatters'
import { ROBOT_STATUS } from '../utils/constants'

export default function GPSTracking() {
  const { robots, selectedRobot, setSelectedRobot } = useRobotStore()
  const { showGeofence, showRoutes, toggleGeofence, toggleRoutes } = useMapStore()

  return (
    <PageContainer title="GPS Tracking">
      <div className="space-y-4">
        {/* Map controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleGeofence}
              className={`px-3 py-1.5 rounded border font-mono text-[10px] uppercase transition-all ${showGeofence ? 'border-accent-green/30 bg-accent-green/10 text-accent-green' : 'border-dark-border text-gray-600 bg-dark-bg'}`}
            >
              Geofence
            </button>
            <button
              onClick={toggleRoutes}
              className={`px-3 py-1.5 rounded border font-mono text-[10px] uppercase transition-all ${showRoutes ? 'border-accent-blue/30 bg-accent-blue/10 text-accent-blue' : 'border-dark-border text-gray-600 bg-dark-bg'}`}
            >
              Routes
            </button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="font-mono text-[10px] text-accent-green">LIVE GPS FEED</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Robot list */}
          <div className="col-span-12 lg:col-span-3 space-y-2">
            <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-wide px-1">Robot Positions</h3>
            {robots.map(robot => {
              const s = ROBOT_STATUS[robot.status]
              return (
                <motion.button
                  key={robot.id}
                  whileHover={{ x: 3 }}
                  onClick={() => setSelectedRobot(robot)}
                  className={`w-full text-left p-3 rounded-lg border transition-all
                    ${selectedRobot?.id === robot.id ? 'border-accent-green/40 bg-accent-green/5' : 'border-dark-border bg-dark-bg hover:border-gray-700'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-200 font-mono text-xs font-medium">{robot.name}</span>
                    <span className={`font-mono text-[9px] ${s?.color}`}>{s?.label}</span>
                  </div>
                  <div className="text-gray-600 font-mono text-[10px]">{robot.id}</div>
                  <div className="text-gray-500 font-mono text-[10px] mt-1">
                    {formatCoordinates(robot.location.lat, robot.location.lng)}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-600 font-mono text-[9px]">{robot.speed} km/h</span>
                    <span className="text-gray-600 font-mono text-[9px]">{robot.location.zone}</span>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Map */}
          <div className="col-span-12 lg:col-span-9">
            <div className="glass-card border border-dark-border overflow-hidden">
              <LiveMap height={520} />
            </div>
          </div>
        </div>

        {/* Selected robot details */}
        {selectedRobot && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card border border-accent-green/20 p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <Crosshair size={16} className="text-accent-green" />
              <h3 className="font-mono text-xs text-accent-green uppercase">Selected: {selectedRobot.name}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                ['ID', selectedRobot.id],
                ['Status', selectedRobot.status.toUpperCase()],
                ['Speed', `${selectedRobot.speed} km/h`],
                ['Heading', formatHeading(selectedRobot.heading)],
                ['Zone', selectedRobot.location.zone],
                ['Distance', `${selectedRobot.distanceTraveled} km`],
              ].map(([k, v]) => (
                <div key={k} className="p-3 rounded-lg bg-dark-bg border border-dark-border">
                  <div className="text-gray-600 font-mono text-[9px] uppercase">{k}</div>
                  <div className="text-gray-200 font-mono text-xs font-medium mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* GPS status table */}
        <div className="glass-card border border-dark-border">
          <div className="px-5 py-4 border-b border-dark-border">
            <h3 className="font-mono text-xs text-accent-green uppercase">GPS Status — All Units</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-dark-border bg-dark-hover">
                  {['Unit', 'Status', 'Coordinates', 'Speed', 'Heading', 'Satellites', 'Accuracy', 'Zone'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-mono text-[10px] text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {robots.map(r => (
                  <tr key={r.id} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors cursor-pointer" onClick={() => setSelectedRobot(r)}>
                    <td className="px-4 py-3 font-mono text-accent-green">{r.id}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${r.status === 'active' ? 'bg-accent-green animate-pulse' : r.status === 'idle' ? 'bg-accent-amber' : 'bg-gray-600'}`} />
                        <span className="font-mono text-[10px] uppercase text-gray-400">{r.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-400 text-[11px]">{formatCoordinates(r.location.lat, r.location.lng)}</td>
                    <td className="px-4 py-3 font-mono text-gray-400">{r.speed} km/h</td>
                    <td className="px-4 py-3 font-mono text-gray-400">{formatHeading(r.heading)}</td>
                    <td className="px-4 py-3 font-mono text-accent-blue">14</td>
                    <td className="px-4 py-3 font-mono text-accent-green">±0.8m</td>
                    <td className="px-4 py-3 font-mono text-gray-500">{r.location.zone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
