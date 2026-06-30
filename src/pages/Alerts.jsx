import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Filter, CheckCircle } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import AlertCard from '../components/dashboard/AlertCard'
import AlertChart from '../components/charts/AlertChart'
import SearchBox from '../components/ui/SearchBox'
import Button from '../components/ui/Button'
import { useAlertStore } from '../store/alertStore'

const severities = ['all', 'critical', 'warning', 'info', 'medium']
const types = ['all', 'intrusion', 'battery', 'communication', 'fire', 'sensor', 'emergency']
const statuses = ['all', 'active', 'resolved']

export default function Alerts() {
  const { alerts, unreadCount } = useAlertStore()
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState('all')
  const [type, setType] = useState('all')
  const [status, setStatus] = useState('all')

  const filtered = alerts.filter(a => {
    const matchSeverity = severity === 'all' || a.severity === severity
    const matchType = type === 'all' || a.type === type
    const matchStatus = status === 'all' || a.status === status
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.robot.toLowerCase().includes(search.toLowerCase())
    return matchSeverity && matchType && matchStatus && matchSearch
  })

  const criticalCount = alerts.filter(a => a.severity === 'critical' && a.status === 'active').length

  return (
    <PageContainer title="Alert Management">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total', count: alerts.length, color: 'text-gray-400' },
            { label: 'Active', count: alerts.filter(a => a.status === 'active').length, color: 'text-accent-red' },
            { label: 'Critical', count: criticalCount, color: 'text-accent-red' },
            { label: 'Resolved', count: alerts.filter(a => a.status === 'resolved').length, color: 'text-accent-green' },
          ].map(s => (
            <div key={s.label} className="glass-card border border-dark-border p-4 text-center">
              <div className={`font-mono text-3xl font-bold ${s.color}`}>{s.count}</div>
              <div className="text-gray-600 font-mono text-[10px] uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="glass-card border border-dark-border p-5">
          <h3 className="font-mono text-xs text-accent-green uppercase mb-4">7-Day Alert Trends</h3>
          <AlertChart />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBox value={search} onChange={setSearch} placeholder="Search alerts..." className="w-52" />

          <div className="flex items-center gap-1 p-1 rounded-lg border border-dark-border bg-dark-bg">
            {severities.map(s => (
              <button key={s}
                onClick={() => setSeverity(s)}
                className={`px-2.5 py-1.5 rounded font-mono text-[10px] uppercase transition-all ${severity === s ? 'bg-accent-green/10 text-accent-green border border-accent-green/30' : 'text-gray-600 hover:text-gray-400'}`}
              >{s}</button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg border border-dark-border bg-dark-bg">
            {statuses.map(s => (
              <button key={s}
                onClick={() => setStatus(s)}
                className={`px-2.5 py-1.5 rounded font-mono text-[10px] uppercase transition-all ${status === s ? 'bg-accent-green/10 text-accent-green border border-accent-green/30' : 'text-gray-600 hover:text-gray-400'}`}
              >{s}</button>
            ))}
          </div>

          <span className="ml-auto font-mono text-[10px] text-gray-600">{filtered.length} alerts shown</span>
        </div>

        {/* Alert list */}
        <div className="space-y-3">
          {filtered.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-600 font-mono text-sm">
              <CheckCircle size={32} className="mx-auto mb-3 text-gray-700" />
              No alerts match your filters
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
