import { motion } from 'framer-motion'
import { AlertTriangle, Bell, Flame, Radio, Battery, Zap, CheckCircle } from 'lucide-react'
import { timeAgo } from '../../utils/helpers'
import { useAlertStore } from '../../store/alertStore'

const typeIcons = {
  intrusion: AlertTriangle,
  battery: Battery,
  communication: Radio,
  fire: Flame,
  sensor: Zap,
  emergency: Bell,
}

const severityConfig = {
  critical: { color: 'text-accent-red', bg: 'bg-red-950/30', border: 'border-accent-red/30', dot: 'bg-accent-red' },
  warning: { color: 'text-accent-amber', bg: 'bg-amber-950/20', border: 'border-accent-amber/30', dot: 'bg-accent-amber' },
  info: { color: 'text-accent-blue', bg: 'bg-blue-950/20', border: 'border-accent-blue/30', dot: 'bg-accent-blue' },
  medium: { color: 'text-orange-400', bg: 'bg-orange-950/20', border: 'border-orange-500/30', dot: 'bg-orange-400' },
}

export default function AlertCard({ alert, compact = false }) {
  const { acknowledgeAlert, resolveAlert } = useAlertStore()
  const Icon = typeIcons[alert.type] || Bell
  const s = severityConfig[alert.severity] || severityConfig.info

  if (compact) {
    return (
      <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${s.border} ${s.bg} transition-all`}>
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot} ${alert.status === 'active' ? 'animate-pulse' : ''}`} />
        <div className="flex-1 min-w-0">
          <p className={`font-mono text-xs font-medium truncate ${s.color}`}>{alert.title}</p>
          <p className="text-gray-600 text-[10px] font-mono">{alert.robot} • {timeAgo(alert.timestamp)}</p>
        </div>
        <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${s.color} ${s.bg} border ${s.border} flex-shrink-0`}>
          {alert.severity}
        </span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`glass-card border ${s.border} p-4 transition-all`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${s.bg} border ${s.border} flex-shrink-0`}>
          <Icon size={16} className={s.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${s.dot} ${alert.status === 'active' ? 'animate-pulse' : ''} flex-shrink-0`} />
              <h4 className={`font-semibold text-sm ${s.color}`}>{alert.title}</h4>
            </div>
            <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border flex-shrink-0 ${s.color} ${s.bg} ${s.border}`}>
              {alert.severity}
            </span>
          </div>
          <p className="text-gray-400 text-xs mb-2 leading-relaxed">{alert.message}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-mono text-[10px]">{alert.robot}</span>
              <span className="text-gray-700">•</span>
              <span className="text-gray-600 font-mono text-[10px]">{alert.zone}</span>
              <span className="text-gray-700">•</span>
              <span className="text-gray-600 font-mono text-[10px]">{timeAgo(alert.timestamp)}</span>
            </div>
            {alert.status === 'active' && (
              <div className="flex items-center gap-2">
                {!alert.acknowledged && (
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="text-[10px] font-mono text-accent-amber hover:text-white px-2 py-1 rounded border border-accent-amber/30 hover:border-accent-amber transition-all"
                  >
                    ACK
                  </button>
                )}
                <button
                  onClick={() => resolveAlert(alert.id)}
                  className="flex items-center gap-1 text-[10px] font-mono text-accent-green hover:text-white px-2 py-1 rounded border border-accent-green/30 hover:border-accent-green transition-all"
                >
                  <CheckCircle size={10} /> RESOLVE
                </button>
              </div>
            )}
            {alert.status === 'resolved' && (
              <span className="text-[10px] font-mono text-gray-600 flex items-center gap-1">
                <CheckCircle size={10} /> Resolved
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
