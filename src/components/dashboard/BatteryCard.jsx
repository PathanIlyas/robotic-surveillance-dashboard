import { motion } from 'framer-motion'
import { Battery, Zap, Thermometer, Clock } from 'lucide-react'
import { getBatteryColor, getBatteryBg } from '../../utils/helpers'
import { POWER_DATA } from '../../utils/constants'

export default function BatteryCard({ robot }) {
  const level = robot?.battery ?? POWER_DATA.battery
  const battColor = getBatteryColor(level)
  const battBg = getBatteryBg(level)

  return (
    <div className="glass-card p-5 border border-dark-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Battery size={16} className={battColor} />
          <h3 className="text-gray-300 font-mono text-xs uppercase tracking-wide">Battery</h3>
        </div>
        <span className={`font-mono text-2xl font-bold ${battColor}`}>{level}%</span>
      </div>

      {/* Visual battery */}
      <div className="relative mb-4">
        <div className="h-6 bg-dark-bg rounded border border-dark-border overflow-hidden flex items-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`h-full ${battBg} relative`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          </motion.div>
          <span className={`absolute right-2 font-mono text-xs font-bold ${battColor}`}>{level}%</span>
        </div>
        {/* Battery tip */}
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-2 h-3 bg-dark-border rounded-r" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 p-2 rounded bg-dark-bg border border-dark-border">
          <Zap size={11} className="text-accent-amber" />
          <div>
            <div className="text-[9px] text-gray-600 font-mono uppercase">Voltage</div>
            <div className="text-xs font-mono text-gray-300">{POWER_DATA.voltage}V</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-dark-bg border border-dark-border">
          <Thermometer size={11} className="text-accent-red" />
          <div>
            <div className="text-[9px] text-gray-600 font-mono uppercase">Temp</div>
            <div className="text-xs font-mono text-gray-300">{POWER_DATA.temperature}°C</div>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-dark-bg border border-dark-border col-span-2">
          <Clock size={11} className="text-accent-green" />
          <div>
            <div className="text-[9px] text-gray-600 font-mono uppercase">Est. Runtime</div>
            <div className="text-xs font-mono text-accent-green">{POWER_DATA.estimatedRuntime}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
