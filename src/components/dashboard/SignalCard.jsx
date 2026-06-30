import { motion } from 'framer-motion'
import { Wifi, Signal } from 'lucide-react'
import { COMM_CHANNELS } from '../../utils/constants'

export default function SignalCard() {
  return (
    <div className="glass-card p-5 border border-dark-border">
      <div className="flex items-center gap-2 mb-4">
        <Signal size={16} className="text-accent-blue" />
        <h3 className="text-gray-300 font-mono text-xs uppercase tracking-wide">Network Health</h3>
      </div>
      <div className="space-y-2">
        {COMM_CHANNELS.slice(0, 4).map(ch => (
          <div key={ch.id} className="flex items-center gap-3">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              ch.status === 'active' ? 'bg-accent-green animate-pulse' : 'bg-accent-amber'
            }`} />
            <span className="text-gray-500 font-mono text-[10px] w-16">{ch.name}</span>
            <div className="flex-1 h-1.5 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${ch.signal}%` }}
                transition={{ duration: 1, delay: 0.1 }}
                className={`h-full rounded-full ${ch.status === 'active' ? 'bg-accent-green' : 'bg-accent-amber'}`}
              />
            </div>
            <span className="text-gray-500 font-mono text-[10px] w-8 text-right">{ch.signal}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
