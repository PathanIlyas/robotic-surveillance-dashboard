import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Eye, Car, Flame, AlertTriangle, User, PawPrint, ShieldAlert } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import PageContainer from '../components/layout/PageContainer'
import ThreatChart from '../components/charts/ThreatChart'
import Table from '../components/ui/Table'
import Badge from '../components/ui/Badge'
import { aiDetectionLog, detectionDistribution } from '../mock/analytics'

const detectionTypes = [
  { key: 'human', label: 'Human Detection', icon: User, count: 38, color: 'text-accent-red', bg: 'bg-red-950/20', border: 'border-accent-red/20' },
  { key: 'vehicle', label: 'Vehicle Detection', icon: Car, count: 28, color: 'text-accent-amber', bg: 'bg-amber-950/20', border: 'border-accent-amber/20' },
  { key: 'animal', label: 'Animal Detection', icon: PawPrint, count: 22, color: 'text-accent-green', bg: 'bg-green-950/20', border: 'border-accent-green/20' },
  { key: 'fire', label: 'Fire Detection', icon: Flame, count: 5, color: 'text-orange-400', bg: 'bg-orange-950/20', border: 'border-orange-500/20' },
  { key: 'intrusion', label: 'Intrusion Detection', icon: ShieldAlert, count: 12, color: 'text-accent-red', bg: 'bg-red-950/20', border: 'border-accent-red/20' },
  { key: 'face', label: 'Face Recognition', icon: Eye, count: 7, color: 'text-purple-400', bg: 'bg-purple-950/20', border: 'border-purple-500/20' },
]

const detectionColumns = [
  { key: 'id', label: 'ID' },
  { key: 'type', label: 'Type', render: (v) => <span className="capitalize font-mono">{v}</span> },
  { key: 'confidence', label: 'Confidence', render: (v) => (
    <span className={`font-mono ${v > 95 ? 'text-accent-green' : v > 80 ? 'text-accent-amber' : 'text-accent-red'}`}>{v}%</span>
  )},
  { key: 'robot', label: 'Robot' },
  { key: 'zone', label: 'Zone' },
  { key: 'time', label: 'Time' },
  { key: 'status', label: 'Status', render: (v) => (
    <span className={`font-mono text-[10px] uppercase ${v === 'threat' ? 'text-accent-red' : v === 'monitoring' ? 'text-accent-amber' : 'text-accent-green'}`}>{v}</span>
  )},
  { key: 'action', label: 'Action', render: (v) => <span className="text-gray-400 font-mono">{v}</span> },
]

export default function AIDetection() {
  const [activeType, setActiveType] = useState('all')

  return (
    <PageContainer title="AI Detection Engine">
      <div className="space-y-6">
        {/* Header stats */}
        <div className="glass-card border border-dark-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-950/30 border border-purple-500/20">
              <Brain size={18} className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold">AI Detection Engine v3.1</h2>
              <p className="text-gray-500 font-mono text-[10px]">NEURAL NET ACTIVE • 6 MODELS LOADED • GPU ACCEL</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
              <span className="font-mono text-xs text-accent-green">ONLINE</span>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {detectionTypes.map(d => (
              <motion.button
                key={d.key}
                whileHover={{ y: -2 }}
                onClick={() => setActiveType(activeType === d.key ? 'all' : d.key)}
                className={`p-3 rounded-lg border text-center transition-all cursor-pointer
                  ${activeType === d.key ? `${d.bg} ${d.border}` : 'border-dark-border bg-dark-bg hover:border-gray-700'}`}
              >
                <d.icon size={18} className={`mx-auto mb-2 ${d.color}`} />
                <div className={`font-mono text-sm font-bold ${d.color}`}>{d.count}</div>
                <div className="text-gray-600 text-[9px] font-mono uppercase mt-0.5 leading-tight">{d.label.split(' ')[0]}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Threat chart */}
          <div className="col-span-12 lg:col-span-8 glass-card border border-dark-border p-5">
            <h3 className="font-mono text-xs text-accent-green uppercase mb-4">24H Detection Timeline</h3>
            <ThreatChart />
          </div>

          {/* Pie chart */}
          <div className="col-span-12 lg:col-span-4 glass-card border border-dark-border p-5">
            <h3 className="font-mono text-xs text-accent-green uppercase mb-4">Detection Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={detectionDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {detectionDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#0f1410', border: '1px solid #1e2d1e', borderRadius: 8, fontFamily: 'monospace', fontSize: 11 }}
                  labelStyle={{ color: '#00ff41' }}
                />
                <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detection log */}
        <div className="glass-card border border-dark-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
            <h3 className="font-mono text-xs text-accent-green uppercase tracking-wide">Detection Log</h3>
            <span className="font-mono text-[10px] text-gray-600">{aiDetectionLog.length} events today</span>
          </div>
          <div className="p-4">
            <Table
              columns={detectionColumns}
              data={aiDetectionLog.filter(d => activeType === 'all' || d.type === activeType)}
            />
          </div>
        </div>

        {/* AI Features grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { label: 'Face Recognition', status: 'active', desc: '128-bit facial encoding', color: 'green' },
            { label: 'License Plate OCR', status: 'active', desc: '98.2% accuracy', color: 'green' },
            { label: 'Thermal Analysis', status: 'active', desc: 'Heat signature mapping', color: 'amber' },
            { label: 'Gait Analysis', status: 'beta', desc: 'Person re-identification', color: 'blue' },
            { label: 'Behavior Analysis', status: 'active', desc: 'Anomaly detection', color: 'green' },
            { label: 'Crowd Detection', status: 'active', desc: 'Density estimation', color: 'green' },
            { label: 'Night Vision AI', status: 'active', desc: 'IR enhancement', color: 'purple' },
            { label: 'Predictive Threat', status: 'beta', desc: 'ML-based prediction', color: 'amber' },
          ].map(feature => (
            <div key={feature.label} className="glass-card border border-dark-border p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`w-2 h-2 rounded-full ${feature.status === 'active' ? 'bg-accent-green animate-pulse' : 'bg-accent-amber'}`} />
                <span className={`font-mono text-[9px] uppercase ${feature.color === 'green' ? 'text-accent-green' : feature.color === 'amber' ? 'text-accent-amber' : feature.color === 'blue' ? 'text-accent-blue' : 'text-purple-400'}`}>
                  {feature.status}
                </span>
              </div>
              <h4 className="text-gray-300 text-xs font-medium mb-1">{feature.label}</h4>
              <p className="text-gray-600 font-mono text-[10px]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
