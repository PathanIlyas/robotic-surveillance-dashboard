import { motion } from 'framer-motion'
import { Zap, Battery, Sun, Thermometer, Clock, Activity } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import BatteryChart from '../components/charts/BatteryChart'
import { useRobotStore } from '../store/robotStore'
import { POWER_DATA } from '../utils/constants'
import { getBatteryColor, getBatteryBg } from '../utils/helpers'

export default function PowerManagement() {
  const { robots } = useRobotStore()

  return (
    <PageContainer title="Power Management">
      <div className="space-y-6">
        {/* Fleet battery overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {robots.map(r => {
            const battColor = getBatteryColor(r.battery)
            const battBg = getBatteryBg(r.battery)
            return (
              <motion.div key={r.id} whileHover={{ y: -2 }} className="glass-card border border-dark-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-gray-400">{r.id}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${r.status === 'active' ? 'bg-accent-green animate-pulse' : 'bg-gray-600'}`} />
                </div>
                <div className={`font-mono text-2xl font-bold ${battColor}`}>{r.battery}%</div>
                <div className="mt-2 h-1.5 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.battery}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-full ${battBg}`}
                  />
                </div>
                <div className="text-gray-600 font-mono text-[9px] mt-1.5 truncate">{r.name}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Master power panel */}
          <div className="col-span-12 lg:col-span-5">
            <div className="glass-card border border-accent-green/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-accent-green/10 border border-accent-green/20">
                  <Zap size={20} className="text-accent-green" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Master Power Unit</h3>
                  <p className="text-gray-500 font-mono text-[10px]">FLEET AVERAGE</p>
                </div>
              </div>

              {/* Main battery gauge */}
              <div className="text-center mb-6">
                <div className="relative inline-flex items-center justify-center w-32 h-32">
                  <svg className="transform -rotate-90" viewBox="0 0 120 120" width="128" height="128">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(30,45,30,0.5)" strokeWidth="8" />
                    <motion.circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke="#00ff41" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - POWER_DATA.battery / 100) }}
                      transition={{ duration: 1.5 }}
                      style={{ filter: 'drop-shadow(0 0 6px #00ff41)' }}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="font-mono text-3xl font-bold text-accent-green">{POWER_DATA.battery}</div>
                    <div className="font-mono text-xs text-gray-500">%</div>
                  </div>
                </div>
                <div className="text-gray-500 font-mono text-xs mt-2">Average Fleet Battery</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Voltage', value: `${POWER_DATA.voltage}V`, icon: Zap, color: 'text-accent-amber' },
                  { label: 'Current', value: `${POWER_DATA.current}A`, icon: Activity, color: 'text-accent-blue' },
                  { label: 'Temperature', value: `${POWER_DATA.temperature}°C`, icon: Thermometer, color: 'text-accent-red' },
                  { label: 'Health', value: `${POWER_DATA.health}%`, icon: Battery, color: 'text-accent-green' },
                  { label: 'Solar Input', value: `${POWER_DATA.solarInput}W`, icon: Sun, color: 'text-accent-amber' },
                  { label: 'Est. Runtime', value: POWER_DATA.estimatedRuntime, icon: Clock, color: 'text-accent-green' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 p-2.5 rounded-lg bg-dark-bg border border-dark-border">
                    <item.icon size={14} className={item.color} />
                    <div>
                      <div className="text-[9px] text-gray-600 font-mono uppercase">{item.label}</div>
                      <div className={`font-mono text-sm font-bold ${item.color}`}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Battery cell health */}
            <div className="glass-card border border-dark-border p-5 mt-4">
              <h3 className="font-mono text-xs text-gray-400 uppercase mb-4">Battery Cell Status</h3>
              <div className="grid grid-cols-6 gap-2">
                {POWER_DATA.cells.map((cell, i) => (
                  <div key={i} className="text-center">
                    <div className="relative h-16 bg-dark-bg rounded-sm border border-dark-border overflow-hidden flex flex-col justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${cell}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`w-full ${cell > 80 ? 'bg-accent-green' : cell > 60 ? 'bg-accent-amber' : 'bg-accent-red'}`}
                        style={{ boxShadow: cell > 80 ? '0 0 8px rgba(0,255,65,0.4)' : '' }}
                      />
                    </div>
                    <div className="font-mono text-[9px] text-gray-600 mt-1">C{i + 1}</div>
                    <div className={`font-mono text-[9px] ${cell > 80 ? 'text-accent-green' : cell > 60 ? 'text-accent-amber' : 'text-accent-red'}`}>{cell}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Battery chart */}
          <div className="col-span-12 lg:col-span-7 space-y-4">
            <div className="glass-card border border-dark-border p-5">
              <h3 className="font-mono text-xs text-accent-green uppercase mb-4">Battery Trend (24H)</h3>
              <BatteryChart />
            </div>

            {/* Per robot table */}
            <div className="glass-card border border-dark-border">
              <div className="px-5 py-4 border-b border-dark-border">
                <h3 className="font-mono text-xs text-accent-green uppercase">Per-Unit Power Status</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-dark-border bg-dark-hover">
                      {['Unit', 'Battery', 'Voltage', 'Temp', 'Cycles', 'Status', 'Runtime'].map(h => (
                        <th key={h} className="px-4 py-2 text-left font-mono text-[10px] text-gray-600 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {robots.map((r, i) => {
                      const battColor = getBatteryColor(r.battery)
                      return (
                        <tr key={r.id} className="border-b border-dark-border/40 hover:bg-dark-hover">
                          <td className="px-4 py-2.5 font-mono text-accent-green">{r.id}</td>
                          <td className="px-4 py-2.5">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
                                <div className={`h-full rounded-full ${getBatteryBg(r.battery)}`} style={{ width: `${r.battery}%` }} />
                              </div>
                              <span className={`font-mono ${battColor}`}>{r.battery}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-2.5 font-mono text-accent-amber">{(POWER_DATA.voltage - i * 0.3).toFixed(1)}V</td>
                          <td className="px-4 py-2.5 font-mono text-gray-400">{r.temperature}°C</td>
                          <td className="px-4 py-2.5 font-mono text-gray-500">{140 + i * 8}</td>
                          <td className="px-4 py-2.5">
                            <span className={`font-mono text-[10px] uppercase ${r.status === 'active' ? 'text-accent-green' : r.status === 'idle' ? 'text-accent-amber' : 'text-gray-600'}`}>{r.status}</span>
                          </td>
                          <td className="px-4 py-2.5 font-mono text-accent-green">{r.status !== 'offline' ? `${Math.floor(r.battery / 8)}h ${r.battery % 8 * 7}m` : '—'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
