import { motion } from 'framer-motion'
import { Thermometer, Droplets, Wind, Eye, Sun, Cloud, Gauge } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import SensorChart from '../components/charts/SensorChart'
import { mockSensorData } from '../mock/sensors'

export default function Environmental() {
  const env = mockSensorData.environment

  const envMetrics = [
    { label: 'Temperature', value: env.temperature, unit: '°C', icon: Thermometer, color: 'red', warn: env.temperature > 45 },
    { label: 'Humidity', value: env.humidity, unit: '%', icon: Droplets, color: 'blue' },
    { label: 'Wind Speed', value: env.windSpeed, unit: 'km/h', icon: Wind, color: 'green', extra: env.windDirection },
    { label: 'Visibility', value: env.visibility, unit: 'km', icon: Eye, color: 'amber' },
    { label: 'UV Index', value: env.uvIndex, unit: '', icon: Sun, color: 'orange' },
    { label: 'Air Quality', value: env.airQuality, unit: ' AQI', icon: Cloud, color: 'green' },
    { label: 'Pressure', value: env.pressure, unit: ' hPa', icon: Gauge, color: 'blue' },
  ]

  const colorMap = {
    red: { text: 'text-accent-red', border: 'border-accent-red/20', bg: 'bg-red-950/20' },
    blue: { text: 'text-accent-blue', border: 'border-accent-blue/20', bg: 'bg-blue-950/20' },
    green: { text: 'text-accent-green', border: 'border-accent-green/20', bg: 'bg-accent-green/5' },
    amber: { text: 'text-accent-amber', border: 'border-amber-500/20', bg: 'bg-amber-950/20' },
    orange: { text: 'text-orange-400', border: 'border-orange-500/20', bg: 'bg-orange-950/20' },
  }

  return (
    <PageContainer title="Environmental Monitoring">
      <div className="space-y-6">
        {/* Metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {envMetrics.map(m => {
            const c = colorMap[m.color]
            return (
              <motion.div key={m.label} whileHover={{ y: -2 }} className={`glass-card p-4 border ${c.border} ${m.warn ? 'border-accent-red/40' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <m.icon size={16} className={`${c.text} ${m.warn ? 'text-accent-red' : ''}`} />
                  {m.warn && <span className="text-accent-red font-mono text-[9px] animate-pulse">WARN</span>}
                </div>
                <div className={`font-mono text-2xl font-bold ${c.text} ${m.warn ? 'text-accent-red' : ''}`}>
                  {m.value}{m.unit}
                </div>
                <div className="text-gray-600 font-mono text-[9px] uppercase mt-1">{m.label}</div>
                {m.extra && <div className="text-gray-500 font-mono text-[9px]">{m.extra}</div>}
              </motion.div>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card border border-dark-border p-5">
            <h3 className="font-mono text-xs text-accent-green uppercase mb-4">Temperature Trend (24H)</h3>
            <SensorChart dataKey="temperature" color="#ff3131" name="Temp °C" />
          </div>
          <div className="glass-card border border-dark-border p-5">
            <h3 className="font-mono text-xs text-accent-blue uppercase mb-4">Humidity Trend (24H)</h3>
            <SensorChart dataKey="humidity" color="#00d4ff" name="Humidity %" />
          </div>
          <div className="glass-card border border-dark-border p-5">
            <h3 className="font-mono text-xs text-accent-amber uppercase mb-4">Pressure Trend (24H)</h3>
            <SensorChart dataKey="pressure" color="#ffb800" name="hPa" />
          </div>
          <div className="glass-card border border-dark-border p-5">
            <h3 className="font-mono text-xs text-purple-400 uppercase mb-4">LiDAR Detections (24H)</h3>
            <SensorChart dataKey="lidarObjects" color="#b347ff" name="Objects" />
          </div>
        </div>

        {/* Operational impact */}
        <div className="glass-card border border-dark-border p-5">
          <h3 className="font-mono text-xs text-accent-green uppercase mb-4">Environmental Impact on Operations</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Camera Visibility', status: 'Good', value: 85, color: 'green' },
              { label: 'Sensor Accuracy', status: 'Nominal', value: 94, color: 'green' },
              { label: 'Battery Performance', status: 'Reduced', value: 72, color: 'amber' },
              { label: 'Mobility Index', status: 'Caution', value: 65, color: 'amber' },
            ].map(item => (
              <div key={item.label} className="p-4 rounded-lg bg-dark-bg border border-dark-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 font-mono text-[10px] uppercase">{item.label}</span>
                  <span className={`font-mono text-[9px] ${item.color === 'green' ? 'text-accent-green' : 'text-accent-amber'}`}>{item.status}</span>
                </div>
                <div className={`font-mono text-xl font-bold ${item.color === 'green' ? 'text-accent-green' : 'text-accent-amber'}`}>{item.value}%</div>
                <div className="mt-2 h-1.5 bg-dark-card rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-full ${item.color === 'green' ? 'bg-accent-green' : 'bg-accent-amber'}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
