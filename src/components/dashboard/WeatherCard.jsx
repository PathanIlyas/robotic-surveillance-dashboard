import { Cloud, Wind, Droplets, Eye, Thermometer } from 'lucide-react'
import { mockSensorData } from '../../mock/sensors'

export default function WeatherCard() {
  const env = mockSensorData.environment

  return (
    <div className="glass-card p-5 border border-dark-border">
      <div className="flex items-center gap-2 mb-4">
        <Cloud size={16} className="text-accent-blue" />
        <h3 className="text-gray-300 font-mono text-xs uppercase tracking-wide">Environment</h3>
        <span className="ml-auto text-[10px] font-mono text-gray-600">LIVE</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-dark-bg border border-dark-border">
          <Thermometer size={14} className="text-accent-red mb-1" />
          <div className="font-mono text-xl font-bold text-white">{env.temperature}°</div>
          <div className="text-gray-600 text-[10px] font-mono uppercase">Celsius</div>
        </div>
        <div className="p-3 rounded-lg bg-dark-bg border border-dark-border">
          <Droplets size={14} className="text-accent-blue mb-1" />
          <div className="font-mono text-xl font-bold text-white">{env.humidity}%</div>
          <div className="text-gray-600 text-[10px] font-mono uppercase">Humidity</div>
        </div>
        <div className="p-3 rounded-lg bg-dark-bg border border-dark-border">
          <Wind size={14} className="text-accent-green mb-1" />
          <div className="font-mono text-sm font-bold text-white">{env.windSpeed}</div>
          <div className="text-gray-600 text-[10px] font-mono uppercase">km/h {env.windDirection}</div>
        </div>
        <div className="p-3 rounded-lg bg-dark-bg border border-dark-border">
          <Eye size={14} className="text-accent-amber mb-1" />
          <div className="font-mono text-sm font-bold text-white">{env.visibility}</div>
          <div className="text-gray-600 text-[10px] font-mono uppercase">km Visibility</div>
        </div>
      </div>
    </div>
  )
}
