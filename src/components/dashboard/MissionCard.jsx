import { motion } from 'framer-motion'
import { Target, Clock, Bot, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MISSION_STATUS } from '../../utils/constants'
import { timeAgo } from '../../utils/helpers'

export default function MissionCard({ mission }) {
  const s = MISSION_STATUS[mission.status] || MISSION_STATUS.active

  return (
    <motion.div
      whileHover={{ x: 3 }}
      className="flex items-center gap-4 px-4 py-3 rounded-lg border border-dark-border bg-dark-bg hover:border-accent-green/20 transition-all cursor-pointer"
    >
      <div className="p-2 rounded-lg bg-dark-card border border-dark-border flex-shrink-0">
        <Target size={14} className={s.color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-gray-200 text-xs font-semibold truncate">{mission.name}</h4>
          <span className={`text-[9px] font-mono uppercase ${s.color} flex-shrink-0`}>{mission.status}</span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1">
            <Bot size={9} className="text-gray-600" />
            <span className="text-gray-600 text-[10px] font-mono">{mission.assignedRobots.length} robots</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={9} className="text-gray-600" />
            <span className="text-gray-600 text-[10px] font-mono">{timeAgo(mission.startTime)}</span>
          </div>
        </div>
        {mission.status === 'active' && (
          <div className="mt-2">
            <div className="h-1 bg-dark-card rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${mission.progress}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-accent-green rounded-full"
              />
            </div>
          </div>
        )}
      </div>
      <ChevronRight size={12} className="text-gray-700 flex-shrink-0" />
    </motion.div>
  )
}
