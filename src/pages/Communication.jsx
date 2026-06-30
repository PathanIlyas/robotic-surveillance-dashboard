import { motion } from 'framer-motion'
import { Radio, Wifi, Satellite, Lock, Signal, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import PageContainer from '../components/layout/PageContainer'
import { COMM_CHANNELS } from '../utils/constants'
import { networkStats } from '../mock/analytics'

const channelIcons = { '4g': Wifi, '5g': Signal, lora: Radio, satellite: Satellite, rf: Radio, encrypted: Lock }

export default function Communication() {
  return (
    <PageContainer title="Communication">
      <div className="space-y-6">
        {/* Channel cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {COMM_CHANNELS.map(ch => {
            const Icon = channelIcons[ch.id] || Radio
            return (
              <motion.div
                key={ch.id}
                whileHover={{ y: -3 }}
                className={`glass-card p-4 border text-center ${ch.status === 'active' ? 'border-accent-green/20' : 'border-accent-amber/20'}`}
              >
                <div className={`mx-auto w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${ch.status === 'active' ? 'bg-accent-green/10 border border-accent-green/20' : 'bg-amber-950/20 border border-accent-amber/20'}`}>
                  <Icon size={18} className={ch.status === 'active' ? 'text-accent-green' : 'text-accent-amber'} />
                </div>
                <h3 className="text-gray-200 font-mono text-[10px] font-bold uppercase mb-1">{ch.name}</h3>
                <div className={`font-mono text-lg font-bold ${ch.status === 'active' ? 'text-accent-green' : 'text-accent-amber'}`}>{ch.signal}%</div>
                <div className="text-gray-600 font-mono text-[9px] mt-1">{ch.speed}</div>
                <div className="mt-2 h-1 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ch.signal}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-full ${ch.status === 'active' ? 'bg-accent-green' : 'bg-accent-amber'}`}
                  />
                </div>
                <div className={`mt-2 flex items-center justify-center gap-1 font-mono text-[9px] ${ch.status === 'active' ? 'text-accent-green' : 'text-accent-amber'}`}>
                  <span className={`w-1 h-1 rounded-full ${ch.status === 'active' ? 'bg-accent-green animate-pulse' : 'bg-accent-amber animate-pulse'}`} />
                  {ch.status.toUpperCase()}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Network speed chart */}
        <div className="glass-card border border-dark-border p-5">
          <h3 className="font-mono text-xs text-accent-green uppercase mb-4">Network Speed (Mbps)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={networkStats} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,30,0.5)" />
              <XAxis dataKey="time" tick={{ fill: '#4a6a4a', fontSize: 10, fontFamily: 'monospace' }} />
              <YAxis tick={{ fill: '#4a6a4a', fontSize: 10, fontFamily: 'monospace' }} />
              <Tooltip contentStyle={{ background: '#0f1410', border: '1px solid #1e2d1e', fontFamily: 'monospace', fontSize: 11 }} />
              <Line type="monotone" dataKey="speed4g" stroke="#00ff41" strokeWidth={2} dot={false} name="4G (Mbps)" />
              <Line type="monotone" dataKey="speed5g" stroke="#00d4ff" strokeWidth={2} dot={false} name="5G (Mbps)" />
              <Line type="monotone" dataKey="lora" stroke="#ffb800" strokeWidth={1.5} dot={false} name="LoRa (kbps)" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="satellite" stroke="#b347ff" strokeWidth={1.5} dot={false} name="SAT (Mbps)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Robot connection status */}
        <div className="glass-card border border-dark-border">
          <div className="px-5 py-4 border-b border-dark-border">
            <h3 className="font-mono text-xs text-accent-green uppercase">Robot Communication Status</h3>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-dark-border">
                    {['Robot', '4G', '5G', 'LoRa', 'Satellite', 'RF', 'Latency', 'Encryption'].map(h => (
                      <th key={h} className="px-4 py-2 text-left font-mono text-[10px] text-gray-600 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {['RVL-001', 'RVL-002', 'RVL-004', 'RVL-006'].map((id, i) => (
                    <tr key={id} className="border-b border-dark-border/40 hover:bg-dark-hover">
                      <td className="px-4 py-2.5 font-mono text-accent-green">{id}</td>
                      <td className="px-4 py-2.5"><span className="text-accent-green font-mono text-[10px]">✓ {85 + i * 3}%</span></td>
                      <td className="px-4 py-2.5"><span className="text-accent-blue font-mono text-[10px]">✓ {90 + i * 2}%</span></td>
                      <td className="px-4 py-2.5"><span className="text-accent-amber font-mono text-[10px]">✓ 76%</span></td>
                      <td className="px-4 py-2.5"><span className="text-purple-400 font-mono text-[10px]">✓ 68%</span></td>
                      <td className="px-4 py-2.5"><span className={`font-mono text-[10px] ${i === 2 ? 'text-accent-amber' : 'text-accent-green'}`}>{i === 2 ? '⚠ 45%' : '✓ 82%'}</span></td>
                      <td className="px-4 py-2.5 font-mono text-gray-400">{12 + i * 5}ms</td>
                      <td className="px-4 py-2.5"><span className="font-mono text-[10px] text-accent-green bg-accent-green/10 border border-accent-green/20 px-1.5 py-0.5 rounded">AES-256</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
