import { motion } from 'framer-motion'
import { Battery, Signal, Thermometer, Navigation, Bot, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getBatteryColor, getBatteryBg } from '../../utils/helpers'
import { formatHeading } from '../../utils/formatters'
import { ROBOT_STATUS } from '../../utils/constants'

export default function RobotCard({ robot }) {
  const status = ROBOT_STATUS[robot.status] || ROBOT_STATUS.offline
  const battColor = getBatteryColor(robot.battery)
  const battBg = getBatteryBg(robot.battery)

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-5 border border-dark-border hover:border-accent-green/20 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${status.bg} border ${status.border}`}>
            <Bot size={18} className={status.color} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">{robot.name}</h3>
            <p className="text-gray-600 font-mono text-[10px]">{robot.id} • {robot.model}</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${status.color} ${status.bg} border ${status.border}`}>
          {status.label}
        </span>
      </div>

      {/* Mission */}
      <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-dark-bg border border-dark-border">
        <Navigation size={12} className="text-accent-blue" />
        <span className="text-gray-400 font-mono text-[10px] uppercase">{robot.mission}</span>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 rounded-lg bg-dark-bg border border-dark-border">
          <Battery size={12} className={`mx-auto mb-1 ${battColor}`} />
          <div className={`font-mono text-sm font-bold ${battColor}`}>{robot.battery}%</div>
          <div className="text-gray-600 text-[9px] uppercase">Battery</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-dark-bg border border-dark-border">
          <Signal size={12} className="mx-auto mb-1 text-accent-blue" />
          <div className="font-mono text-sm font-bold text-accent-blue">{robot.signal}%</div>
          <div className="text-gray-600 text-[9px] uppercase">Signal</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-dark-bg border border-dark-border">
          <Thermometer size={12} className="mx-auto mb-1 text-accent-amber" />
          <div className="font-mono text-sm font-bold text-accent-amber">{robot.temperature}°C</div>
          <div className="text-gray-600 text-[9px] uppercase">Temp</div>
        </div>
      </div>

      {/* Battery bar */}
      <div className="mb-3">
        <div className="h-1.5 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${robot.battery}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-full rounded-full ${battBg}`}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full ${robot.status === 'active' ? 'bg-accent-green animate-pulse' : 'bg-gray-600'}`} />
            <span className="text-gray-600 font-mono text-[10px]">{robot.lastSync}</span>
          </div>
          <span className="text-gray-700 font-mono text-[10px]">{robot.speed > 0 ? `${robot.speed} km/h` : 'IDLE'}</span>
        </div>
        <Link
          to={`/fleet/${robot.id}`}
          className="flex items-center gap-1 text-accent-green hover:text-white font-mono text-[10px] uppercase transition-colors"
        >
          Details <ChevronRight size={10} />
        </Link>
      </div>
    </motion.div>
  )
}
