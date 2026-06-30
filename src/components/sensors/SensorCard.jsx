import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export default function SensorCard({ name, value, unit, icon: Icon = Activity, status = 'active', color = 'green', children }) {
  const colorMap = {
    green: { text: 'text-accent-green', border: 'border-accent-green/20', bg: 'bg-accent-green/5' },
    red: { text: 'text-accent-red', border: 'border-accent-red/20', bg: 'bg-red-950/20' },
    amber: { text: 'text-accent-amber', border: 'border-amber-500/20', bg: 'bg-amber-950/20' },
    blue: { text: 'text-accent-blue', border: 'border-accent-blue/20', bg: 'bg-blue-950/20' },
    purple: { text: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-950/20' },
  }
  const c = colorMap[color] || colorMap.green

  const statusConfig = {
    active: { dot: 'bg-accent-green', label: 'ACTIVE' },
    warning: { dot: 'bg-accent-amber', label: 'WARN' },
    offline: { dot: 'bg-gray-600', label: 'OFFLINE' },
    error: { dot: 'bg-accent-red', label: 'ERROR' },
  }
  const s = statusConfig[status] || statusConfig.active

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`glass-card p-4 border ${c.border} relative overflow-hidden`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${c.bg} border ${c.border}`}>
          <Icon size={16} className={c.text} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot} ${status === 'active' ? 'animate-pulse' : ''}`} />
          <span className={`font-mono text-[9px] ${s.dot.replace('bg-', 'text-')}`}>{s.label}</span>
        </div>
      </div>

      <p className="text-gray-500 font-mono text-[10px] uppercase tracking-wider mb-1">{name}</p>

      {value !== undefined && (
        <div className="flex items-baseline gap-1">
          <span className={`font-mono font-bold text-2xl ${c.text}`}>{value}</span>
          {unit && <span className="text-gray-600 font-mono text-xs">{unit}</span>}
        </div>
      )}

      {children}
    </motion.div>
  )
}
