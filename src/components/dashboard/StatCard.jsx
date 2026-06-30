import { motion } from 'framer-motion'

export default function StatCard({ title, value, unit, icon: Icon, color = 'green', trend, subtitle, pulse }) {
  const colorMap = {
    green: { text: 'text-accent-green', border: 'border-accent-green/20', glow: 'rgba(0,255,65,0.1)', icon: 'text-accent-green', bg: 'bg-accent-green/5' },
    red: { text: 'text-accent-red', border: 'border-accent-red/20', glow: 'rgba(255,49,49,0.1)', icon: 'text-accent-red', bg: 'bg-red-950/20' },
    amber: { text: 'text-accent-amber', border: 'border-accent-amber/20', glow: 'rgba(255,184,0,0.1)', icon: 'text-accent-amber', bg: 'bg-amber-950/20' },
    blue: { text: 'text-accent-blue', border: 'border-accent-blue/20', glow: 'rgba(0,212,255,0.1)', icon: 'text-accent-blue', bg: 'bg-blue-950/20' },
    purple: { text: 'text-purple-400', border: 'border-purple-500/20', glow: 'rgba(179,71,255,0.1)', icon: 'text-purple-400', bg: 'bg-purple-950/20' },
    orange: { text: 'text-orange-400', border: 'border-orange-500/20', glow: 'rgba(255,107,53,0.1)', icon: 'text-orange-400', bg: 'bg-orange-950/20' },
  }
  const c = colorMap[color] || colorMap.green

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`glass-card p-5 relative overflow-hidden border ${c.border} cursor-default`}
      style={{ boxShadow: `0 0 20px ${c.glow}` }}
    >
      {/* Top gradient line */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-40 ${c.text}`} />

      {/* Corner accent */}
      <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10 ${c.bg}`} />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-2">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className={`font-mono font-bold text-3xl ${c.text}`}>{value}</span>
            {unit && <span className="text-gray-500 font-mono text-sm">{unit}</span>}
          </div>
          {subtitle && <p className="text-gray-600 text-xs mt-1.5">{subtitle}</p>}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-mono ${trend > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%
              </span>
              <span className="text-gray-600 text-[10px]">vs yesterday</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-lg ${c.bg} border ${c.border} flex-shrink-0`}>
            <Icon className={c.icon} size={20} />
          </div>
        )}
      </div>

      {pulse && (
        <div className="absolute bottom-3 right-3">
          <span className={`w-2 h-2 rounded-full inline-block animate-pulse ${
            color === 'green' ? 'bg-accent-green' :
            color === 'red' ? 'bg-accent-red' :
            color === 'amber' ? 'bg-accent-amber' : 'bg-accent-blue'
          }`} />
        </div>
      )}
    </motion.div>
  )
}
