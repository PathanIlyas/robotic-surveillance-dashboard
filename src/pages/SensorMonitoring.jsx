import { motion } from 'framer-motion'
import { Activity, Radar, Thermometer, Cpu, MapPin, Wind, Zap, Waves, Vibrate, Flame } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import SensorCard from '../components/sensors/SensorCard'
import SensorChart from '../components/charts/SensorChart'
import { useSensorStore } from '../store/sensorStore'

export default function SensorMonitoring() {
  const { sensors } = useSensorStore()
  const { lidar, radar, thermal, ultrasonic, gps, environment, motion: motionSensor, gas, vibration } = sensors

  return (
    <PageContainer title="Sensor Monitoring">
      <div className="space-y-6">
        {/* Sensor status overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: 'LiDAR', icon: Activity, status: lidar.status, health: lidar.health, color: 'green' },
            { name: 'Radar', icon: Radar, status: radar.status, health: radar.health, color: 'blue' },
            { name: 'Thermal', icon: Thermometer, status: thermal.status, health: thermal.health, color: 'red' },
            { name: 'Ultrasonic', icon: Waves, status: ultrasonic.status, health: ultrasonic.health, color: 'amber' },
            { name: 'GPS', icon: MapPin, status: gps.status, health: gps.health, color: 'green' },
          ].map(s => (
            <SensorCard key={s.name} name={s.name} value={s.health} unit="%" icon={s.icon} status={s.status} color={s.color}>
              <div className="mt-2 h-1.5 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.health}%` }}
                  transition={{ duration: 1 }}
                  className={`h-full rounded-full ${s.health > 80 ? 'bg-accent-green' : s.health > 50 ? 'bg-accent-amber' : 'bg-accent-red'}`}
                />
              </div>
            </SensorCard>
          ))}
        </div>

        {/* Detailed sensor rows */}
        <div className="grid grid-cols-12 gap-4">
          {/* LiDAR */}
          <div className="col-span-12 md:col-span-6 glass-card border border-accent-green/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={16} className="text-accent-green" />
              <h3 className="font-mono text-xs text-accent-green uppercase">LiDAR Sensor</h3>
              <span className="ml-auto w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Range', `${lidar.range}m`],
                ['Resolution', lidar.resolution],
                ['Point Cloud', `${(lidar.pointCloud / 1000).toFixed(0)}K pts/s`],
                ['Objects Detected', lidar.objects],
                ['Last Scan', lidar.lastScan],
                ['Health', `${lidar.health}%`],
              ].map(([k, v]) => (
                <div key={k} className="p-2 rounded bg-dark-bg border border-dark-border">
                  <div className="text-gray-600 font-mono text-[9px] uppercase">{k}</div>
                  <div className="text-accent-green font-mono text-xs font-bold mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Radar */}
          <div className="col-span-12 md:col-span-6 glass-card border border-accent-blue/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Radar size={16} className="text-accent-blue" />
              <h3 className="font-mono text-xs text-accent-blue uppercase">Radar Sensor</h3>
              {/* Radar animation */}
              <div className="ml-auto relative w-8 h-8">
                <div className="absolute inset-0 border border-accent-blue/30 rounded-full" />
                <div className="absolute inset-1 border border-accent-blue/20 rounded-full" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                  style={{ transformOrigin: 'center' }}
                >
                  <div className="absolute top-1/2 left-1/2 w-3 h-px bg-accent-blue origin-left" style={{ transform: 'translateY(-50%)' }} />
                </motion.div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Range', `${radar.range}m`],
                ['Frequency', radar.frequency],
                ['Targets', radar.targets],
                ['Velocity', `${radar.velocity} km/h`],
                ['Last Ping', radar.lastPing],
                ['Health', `${radar.health}%`],
              ].map(([k, v]) => (
                <div key={k} className="p-2 rounded bg-dark-bg border border-dark-border">
                  <div className="text-gray-600 font-mono text-[9px] uppercase">{k}</div>
                  <div className="text-accent-blue font-mono text-xs font-bold mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* GPS */}
          <div className="col-span-12 md:col-span-6 glass-card border border-dark-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={16} className="text-accent-green" />
              <h3 className="font-mono text-xs text-gray-300 uppercase">GPS Module</h3>
              <span className="ml-auto font-mono text-[10px] text-accent-green">LOCKED</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['Satellites', gps.satellites],
                ['Accuracy', gps.accuracy],
                ['HDOP', gps.hdop],
                ['Altitude', gps.altitude],
              ].map(([k, v]) => (
                <div key={k} className="p-2 rounded bg-dark-bg border border-dark-border">
                  <div className="text-gray-600 font-mono text-[9px] uppercase">{k}</div>
                  <div className="text-accent-green font-mono text-xs font-bold mt-0.5">{v}</div>
                </div>
              ))}
              <div className="col-span-2 p-2 rounded bg-dark-bg border border-dark-border">
                <div className="text-gray-600 font-mono text-[9px] uppercase">Coordinates</div>
                <div className="text-accent-green font-mono text-xs font-bold mt-0.5">{gps.coordinates}</div>
              </div>
            </div>
          </div>

          {/* Gas sensor */}
          <div className="col-span-12 md:col-span-6 glass-card border border-dark-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={16} className="text-accent-amber" />
              <h3 className="font-mono text-xs text-gray-300 uppercase">Gas / Air Sensor</h3>
              <span className="ml-auto w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ['CO₂', `${gas.co2} ppm`],
                ['CO', `${gas.co} ppm`],
                ['Methane', `${gas.methane} ppm`],
                ['Oxygen', `${gas.oxygen}%`],
              ].map(([k, v]) => (
                <div key={k} className="p-2 rounded bg-dark-bg border border-dark-border">
                  <div className="text-gray-600 font-mono text-[9px] uppercase">{k}</div>
                  <div className="text-accent-amber font-mono text-xs font-bold mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-card border border-dark-border p-5">
            <h3 className="font-mono text-xs text-accent-green uppercase mb-3">Temperature (24H)</h3>
            <SensorChart dataKey="temperature" color="#00ff41" name="Temp °C" />
          </div>
          <div className="glass-card border border-dark-border p-5">
            <h3 className="font-mono text-xs text-accent-blue uppercase mb-3">Humidity (24H)</h3>
            <SensorChart dataKey="humidity" color="#00d4ff" name="Humidity %" />
          </div>
          <div className="glass-card border border-dark-border p-5">
            <h3 className="font-mono text-xs text-accent-amber uppercase mb-3">LiDAR Objects (24H)</h3>
            <SensorChart dataKey="lidarObjects" color="#ffb800" name="Objects" />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
