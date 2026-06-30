import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Battery, Signal, Thermometer, Navigation, MapPin, Cpu, Shield, Clock } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import CameraFeed from '../components/surveillance/CameraFeed'
import BatteryCard from '../components/dashboard/BatteryCard'
import LiveMap from '../components/maps/LiveMap'
import Badge from '../components/ui/Badge'
import SensorChart from '../components/charts/SensorChart'
import { useRobotStore } from '../store/robotStore'
import { ROBOT_STATUS } from '../utils/constants'
import { getBatteryColor, getBatteryBg } from '../utils/helpers'
import { formatHeading, formatCoordinates } from '../utils/formatters'
import { mockSensorData } from '../mock/sensors'

export default function RobotDetails() {
  const { id } = useParams()
  const { robots } = useRobotStore()
  const robot = robots.find(r => r.id === id)

  if (!robot) {
    return (
      <PageContainer title="Robot Details">
        <div className="text-center py-16 text-gray-500 font-mono">
          Robot {id} not found. <Link to="/fleet" className="text-accent-green hover:underline">Back to Fleet</Link>
        </div>
      </PageContainer>
    )
  }

  const status = ROBOT_STATUS[robot.status]
  const battColor = getBatteryColor(robot.battery)
  const battBg = getBatteryBg(robot.battery)

  return (
    <PageContainer title={`${robot.name} — ${robot.id}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/fleet" className="p-2 rounded-lg border border-dark-border bg-dark-bg hover:border-accent-green/30 text-gray-500 hover:text-accent-green transition-all">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-white font-bold text-xl">{robot.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className={`font-mono text-xs ${status?.color}`}>{status?.label}</span>
              <span className="text-gray-700">•</span>
              <span className="text-gray-500 font-mono text-xs">{robot.model}</span>
              <span className="text-gray-700">•</span>
              <span className="text-gray-500 font-mono text-xs">{robot.firmware}</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className={`px-3 py-1 rounded border font-mono text-xs ${status?.color} ${status?.bg} ${status?.border}`}>
              {status?.label}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {/* Camera */}
            <div className="glass-card border border-dark-border p-4">
              <CameraFeed robotId={robot.id} type="day" index={1} />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Speed', value: `${robot.speed} km/h`, icon: Navigation, color: 'text-accent-blue' },
                { label: 'Heading', value: formatHeading(robot.heading), icon: Navigation, color: 'text-accent-green' },
                { label: 'Temperature', value: `${robot.temperature}°C`, icon: Thermometer, color: 'text-accent-amber' },
                { label: 'Uptime', value: robot.uptime, icon: Clock, color: 'text-purple-400' },
              ].map(item => (
                <div key={item.label} className="glass-card border border-dark-border p-4">
                  <item.icon size={16} className={`${item.color} mb-2`} />
                  <div className={`font-mono text-lg font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-gray-600 font-mono text-[10px] uppercase mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Sensor history */}
            <div className="glass-card border border-dark-border p-5">
              <h3 className="font-mono text-xs text-accent-green uppercase mb-4">24H Temperature History</h3>
              <SensorChart dataKey="temperature" color="#00ff41" name="Temperature °C" />
            </div>

            {/* Sensor status */}
            <div className="glass-card border border-dark-border p-5">
              <h3 className="font-mono text-xs text-accent-green uppercase mb-4">Sensor Array</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(robot.sensors).map(([key, active]) => (
                  <div key={key} className={`p-3 rounded-lg border text-center ${active ? 'border-accent-green/20 bg-accent-green/5' : 'border-dark-border bg-dark-bg'}`}>
                    <div className={`w-2 h-2 rounded-full mx-auto mb-2 ${active ? 'bg-accent-green animate-pulse' : 'bg-gray-700'}`} />
                    <div className={`font-mono text-[10px] uppercase ${active ? 'text-accent-green' : 'text-gray-600'}`}>{key}</div>
                    <div className={`font-mono text-[9px] mt-0.5 ${active ? 'text-accent-green/70' : 'text-gray-700'}`}>{active ? 'ONLINE' : 'OFFLINE'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Battery */}
            <BatteryCard robot={robot} />

            {/* Signal */}
            <div className="glass-card border border-dark-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <Signal size={14} className="text-accent-blue" />
                <h3 className="font-mono text-xs text-gray-300 uppercase">Signal Strength</h3>
              </div>
              <div className="text-center mb-3">
                <span className="font-mono text-4xl font-bold text-accent-blue">{robot.signal}</span>
                <span className="text-gray-500 font-mono text-sm">%</span>
              </div>
              <div className="h-2 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${robot.signal}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-accent-blue rounded-full"
                  style={{ boxShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                />
              </div>
            </div>

            {/* Location */}
            <div className="glass-card border border-dark-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={14} className="text-accent-green" />
                <h3 className="font-mono text-xs text-gray-300 uppercase">Location</h3>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-mono text-[10px]">Zone</span>
                  <span className="text-gray-300 font-mono text-[10px]">{robot.location.zone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-mono text-[10px]">Coords</span>
                  <span className="text-accent-green font-mono text-[10px]">{formatCoordinates(robot.location.lat, robot.location.lng)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-mono text-[10px]">Distance</span>
                  <span className="text-gray-300 font-mono text-[10px]">{robot.distanceTraveled} km</span>
                </div>
              </div>
              <LiveMap height={160} />
            </div>

            {/* Info */}
            <div className="glass-card border border-dark-border p-5">
              <h3 className="font-mono text-xs text-gray-300 uppercase mb-4">Unit Info</h3>
              <div className="space-y-2">
                {[
                  ['Serial No.', robot.serialNumber],
                  ['Firmware', robot.firmware],
                  ['Mission', robot.mission],
                  ['Last Sync', robot.lastSync],
                  ['Cameras', robot.cameras.join(', ')],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center py-1 border-b border-dark-border/50">
                    <span className="text-gray-600 font-mono text-[10px]">{label}</span>
                    <span className="text-gray-300 font-mono text-[10px]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
