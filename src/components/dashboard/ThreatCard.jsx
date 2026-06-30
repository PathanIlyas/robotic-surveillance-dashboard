import { motion } from 'framer-motion'
import { AlertTriangle, Eye, MapPin } from 'lucide-react'
import { timeAgo } from '../../utils/helpers'

const levelConfig = {
  high: { color: 'text-accent-red', bg: 'bg-red-950/30', border: 'border-accent-red/30', dot: 'bg-accent-red' },
  medium: { color: 'text-accent-amber', bg: 'bg-amber-950/20', border: 'border-accent-amber/30', dot: 'bg-accent-amber' },
  low: { color: 'text-accent-green', bg: 'bg-green-950/20', border: 'border-accent-green/30', dot: 'bg-accent-green' },
  none: { color: 'text-gray-600', bg: 'bg-dark-bg', border: 'border-dark-border', dot: 'bg-gray-700' },
}

export default function ThreatCard({ detection }) {
  const level = detection.status === 'threat' ? 'high' : detection.status === 'monitoring' ? 'medium' : 'low'
  const s = levelConfig[level]

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${s.border} ${s.bg}`}
    >
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot} ${level === 'high' ? 'animate-pulse' : ''}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`font-mono text-xs font-bold capitalize ${s.color}`}>{detection.type}</span>
          <span className={`text-[9px] font-mono uppercase ${s.color}`}>{detection.confidence}%</span>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-gray-600 text-[10px] font-mono">{detection.robot}</span>
          <span className="text-gray-700">•</span>
          <span className="text-gray-600 text-[10px] font-mono">{detection.time}</span>
        </div>
      </div>
      <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${s.color} ${s.bg} border ${s.border} flex-shrink-0`}>
        {detection.action}
      </span>
    </motion.div>
  )
}
