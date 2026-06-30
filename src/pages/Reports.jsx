import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileBarChart, Download, FileText, Table as TableIcon } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import ThreatChart from '../components/charts/ThreatChart'
import MissionChart from '../components/charts/MissionChart'
import BatteryChart from '../components/charts/BatteryChart'
import AlertChart from '../components/charts/AlertChart'
import Button from '../components/ui/Button'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { detectionDistribution } from '../mock/analytics'

const reportTypes = [
  { id: 'threat', label: 'Threat Analysis', desc: 'Detection events, threat classifications, response times' },
  { id: 'mission', label: 'Mission Analytics', desc: 'Mission completion rates, patrol coverage, objectives' },
  { id: 'robot', label: 'Robot Analytics', desc: 'Fleet performance, uptime, maintenance needs' },
  { id: 'battery', label: 'Battery Analytics', desc: 'Power consumption trends, charging cycles' },
  { id: 'sensor', label: 'Sensor Analytics', desc: 'Sensor health, calibration status, data quality' },
]

const radarData = [
  { metric: 'Threat Detect', value: 92 },
  { metric: 'Response Time', value: 87 },
  { metric: 'Coverage', value: 78 },
  { metric: 'Uptime', value: 94 },
  { metric: 'Comms', value: 89 },
  { metric: 'Battery', value: 72 },
]

export default function Reports() {
  const [activeReport, setActiveReport] = useState('threat')

  const handleExport = (format) => {
    alert(`Exporting ${activeReport} report as ${format.toUpperCase()}...`)
  }

  return (
    <PageContainer title="Reports & Analytics">
      <div className="space-y-6">
        {/* Report type selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {reportTypes.map(r => (
            <motion.button
              key={r.id}
              whileHover={{ y: -2 }}
              onClick={() => setActiveReport(r.id)}
              className={`p-4 rounded-xl border text-left transition-all
                ${activeReport === r.id ? 'border-accent-green/30 bg-accent-green/5' : 'border-dark-border bg-dark-bg hover:border-gray-700'}`}
            >
              <FileBarChart size={16} className={`mb-2 ${activeReport === r.id ? 'text-accent-green' : 'text-gray-600'}`} />
              <h3 className={`font-mono text-[10px] font-bold uppercase ${activeReport === r.id ? 'text-accent-green' : 'text-gray-400'}`}>{r.label}</h3>
              <p className="text-gray-600 text-[9px] mt-0.5 leading-tight">{r.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* Export buttons */}
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-xs text-accent-green uppercase tracking-wide">
            {reportTypes.find(r => r.id === activeReport)?.label}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="default" size="sm" icon={Download} onClick={() => handleExport('pdf')}>PDF</Button>
            <Button variant="default" size="sm" icon={TableIcon} onClick={() => handleExport('csv')}>CSV</Button>
            <Button variant="primary" size="sm" icon={Download} onClick={() => handleExport('excel')}>Excel</Button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 glass-card border border-dark-border p-5">
            <h3 className="font-mono text-xs text-gray-400 uppercase mb-4">
              {activeReport === 'threat' && '24H Threat Detection Timeline'}
              {activeReport === 'mission' && 'Monthly Mission Distribution'}
              {activeReport === 'battery' && 'Battery Level Trends'}
              {activeReport === 'robot' && 'Robot Fleet Activity'}
              {activeReport === 'sensor' && 'Sensor Activity Trends'}
            </h3>
            {activeReport === 'threat' && <ThreatChart />}
            {activeReport === 'mission' && <MissionChart />}
            {activeReport === 'battery' && <BatteryChart />}
            {activeReport === 'robot' && <ThreatChart />}
            {activeReport === 'sensor' && <AlertChart />}
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-4">
            {/* Pie */}
            <div className="glass-card border border-dark-border p-5">
              <h3 className="font-mono text-xs text-gray-400 uppercase mb-3">Detection Types</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={detectionDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                    {detectionDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0f1410', border: '1px solid #1e2d1e', fontFamily: 'monospace', fontSize: 10 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Radar performance */}
            <div className="glass-card border border-dark-border p-5">
              <h3 className="font-mono text-xs text-gray-400 uppercase mb-3">System Performance</h3>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(30,45,30,0.5)" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#4a6a4a', fontSize: 9, fontFamily: 'monospace' }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="System" dataKey="value" stroke="#00ff41" fill="#00ff41" fillOpacity={0.1} strokeWidth={1.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Events', value: '1,247', delta: '+12%', color: 'text-accent-green' },
            { label: 'Avg Response', value: '4.2s', delta: '-8%', color: 'text-accent-blue' },
            { label: 'Threat Rate', value: '18.4%', delta: '+3%', color: 'text-accent-amber' },
            { label: 'System Score', value: '94/100', delta: '+2', color: 'text-accent-green' },
          ].map(s => (
            <div key={s.label} className="glass-card border border-dark-border p-4">
              <div className={`font-mono text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-gray-600 font-mono text-[10px] uppercase mt-1">{s.label}</div>
              <div className={`font-mono text-[10px] mt-1 ${s.delta.startsWith('+') && !s.delta.includes('%') ? 'text-accent-green' : s.delta.startsWith('-') ? 'text-accent-green' : 'text-accent-amber'}`}>{s.delta} this week</div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
