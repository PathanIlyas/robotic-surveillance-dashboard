import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Clock, Bot, Play, Pause, StopCircle, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import MissionChart from '../components/charts/MissionChart'
import LiveMap from '../components/maps/LiveMap'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { useMissionStore } from '../store/missionStore'
import { MISSION_STATUS } from '../utils/constants'
import { timeAgo } from '../utils/helpers'
import { formatDateTime } from '../utils/formatters'

export default function MissionControl() {
  const { missions } = useMissionStore()
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [expanded, setExpanded] = useState({})

  const toggle = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }))

  const priorityColor = { critical: 'text-accent-red', high: 'text-accent-amber', medium: 'text-accent-blue', low: 'text-accent-green' }

  return (
    <PageContainer title="Mission Control">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {['active', 'scheduled', 'completed', 'aborted'].map(s => {
            const count = missions.filter(m => m.status === s).length
            const c = MISSION_STATUS[s]
            return (
              <div key={s} className="glass-card border border-dark-border p-4 text-center">
                <div className={`font-mono text-3xl font-bold ${c?.color}`}>{count}</div>
                <div className="text-gray-600 font-mono text-[10px] uppercase mt-1">{s}</div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Mission list */}
          <div className="col-span-12 lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-xs text-accent-green uppercase tracking-wide">All Missions</h2>
              <Button variant="primary" size="sm" icon={Plus} onClick={() => setShowModal(true)}>New Mission</Button>
            </div>

            {missions.map(mission => {
              const s = MISSION_STATUS[mission.status]
              const isExpanded = expanded[mission.id]
              return (
                <motion.div
                  key={mission.id}
                  layout
                  className={`glass-card border border-dark-border overflow-hidden ${selected?.id === mission.id ? 'border-accent-green/30' : ''}`}
                >
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer hover:bg-dark-hover transition-all"
                    onClick={() => { setSelected(mission); toggle(mission.id) }}
                  >
                    <div className={`p-2 rounded-lg bg-dark-bg border border-dark-border`}>
                      <Target size={16} className={s?.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-gray-200 text-sm font-semibold truncate">{mission.name}</h3>
                        <span className={`font-mono text-[10px] uppercase flex-shrink-0 ${s?.color}`}>{mission.status}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`font-mono text-[10px] uppercase ${priorityColor[mission.priority]}`}>{mission.priority}</span>
                        <span className="text-gray-700">•</span>
                        <span className="text-gray-600 font-mono text-[10px]">{mission.zone}</span>
                        <span className="text-gray-700">•</span>
                        <span className="text-gray-600 font-mono text-[10px]">{mission.assignedRobots.join(', ')}</span>
                      </div>
                      {mission.status === 'active' && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${mission.progress}%` }}
                              className="h-full bg-accent-green rounded-full"
                            />
                          </div>
                          <span className="font-mono text-[10px] text-accent-green">{mission.progress}%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {mission.status === 'active' && (
                        <>
                          <button className="p-1.5 rounded border border-accent-amber/30 text-accent-amber hover:bg-accent-amber/10 transition-all">
                            <Pause size={12} />
                          </button>
                          <button className="p-1.5 rounded border border-accent-red/30 text-accent-red hover:bg-red-950/30 transition-all">
                            <StopCircle size={12} />
                          </button>
                        </>
                      )}
                      {mission.status === 'scheduled' && (
                        <button className="p-1.5 rounded border border-accent-green/30 text-accent-green hover:bg-accent-green/10 transition-all">
                          <Play size={12} />
                        </button>
                      )}
                      {isExpanded ? <ChevronUp size={14} className="text-gray-600" /> : <ChevronDown size={14} className="text-gray-600" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-dark-border px-4 pb-4 pt-3"
                    >
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <div className="text-gray-600 font-mono text-[10px] uppercase mb-1">Start Time</div>
                          <div className="text-gray-300 font-mono text-xs">{formatDateTime(mission.startTime)}</div>
                        </div>
                        <div>
                          <div className="text-gray-600 font-mono text-[10px] uppercase mb-1">Commander</div>
                          <div className="text-gray-300 font-mono text-xs">{mission.commandedBy}</div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="text-gray-600 font-mono text-[10px] uppercase mb-2">Objectives</div>
                        <div className="space-y-1">
                          {mission.objectives.map((obj, i) => (
                            <div key={i} className="flex items-center gap-2 text-[11px] text-gray-400">
                              <span className="text-accent-green">▸</span> {obj}
                            </div>
                          ))}
                        </div>
                      </div>
                      {mission.notes && (
                        <div className="px-3 py-2 rounded bg-dark-bg border border-dark-border">
                          <span className="font-mono text-[10px] text-gray-600">NOTE: </span>
                          <span className="font-mono text-[10px] text-gray-400">{mission.notes}</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Right: map + chart */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            <div className="glass-card border border-dark-border p-4">
              <h3 className="font-mono text-xs text-accent-green uppercase mb-3">Mission Map</h3>
              <LiveMap height={280} />
            </div>
            <div className="glass-card border border-dark-border p-5">
              <h3 className="font-mono text-xs text-accent-green uppercase mb-4">6-Month Analytics</h3>
              <MissionChart />
            </div>
          </div>
        </div>
      </div>

      {/* New mission modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Mission" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Mission Name</label>
            <input className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-accent-green/30" placeholder="Operation ..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Type</label>
              <select className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-accent-green/30">
                <option>Patrol</option>
                <option>Reconnaissance</option>
                <option>Surveillance</option>
                <option>Sweep</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Priority</label>
              <select className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-accent-green/30">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Zone</label>
            <input className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-accent-green/30" placeholder="Sector Alpha" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="default" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" size="sm">Deploy Mission</Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  )
}
