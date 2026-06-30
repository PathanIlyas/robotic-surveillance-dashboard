import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Search, Filter } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import RobotCard from '../components/dashboard/RobotCard'
import BatteryCard from '../components/dashboard/BatteryCard'
import SearchBox from '../components/ui/SearchBox'
import Badge from '../components/ui/Badge'
import Table from '../components/ui/Table'
import { useRobotStore } from '../store/robotStore'
import { formatHeading } from '../utils/formatters'
import { ROBOT_STATUS } from '../utils/constants'
import { getBatteryColor } from '../utils/helpers'

const filters = ['all', 'active', 'idle', 'offline']

export default function RobotFleet() {
  const { robots } = useRobotStore()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [view, setView] = useState('cards')

  const filtered = robots.filter(r => {
    const matchFilter = filter === 'all' || r.status === filter
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.mission.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Unit Name' },
    { key: 'status', label: 'Status', render: (v) => {
      const s = ROBOT_STATUS[v]
      return <span className={`font-mono text-[10px] ${s?.color}`}>{s?.label || v}</span>
    }},
    { key: 'mission', label: 'Mission' },
    { key: 'battery', label: 'Battery', render: (v) => (
      <span className={`font-mono ${getBatteryColor(v)}`}>{v}%</span>
    )},
    { key: 'signal', label: 'Signal', render: (v) => (
      <span className="font-mono text-accent-blue">{v}%</span>
    )},
    { key: 'speed', label: 'Speed', render: (v) => `${v} km/h` },
    { key: 'temperature', label: 'Temp', render: (v) => `${v}°C` },
    { key: 'lastSync', label: 'Last Sync' },
  ]

  return (
    <PageContainer title="Robot Fleet">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {filters.filter(f => f !== 'all').map(status => {
            const count = robots.filter(r => r.status === status).length
            const s = ROBOT_STATUS[status]
            return (
              <div key={status} className="glass-card border border-dark-border p-4 text-center">
                <div className={`font-mono text-3xl font-bold ${s?.color}`}>{count}</div>
                <div className="text-gray-600 font-mono text-[10px] uppercase mt-1">{status}</div>
              </div>
            )
          })}
          <div className="glass-card border border-dark-border p-4 text-center">
            <div className="font-mono text-3xl font-bold text-accent-green">{robots.length}</div>
            <div className="text-gray-600 font-mono text-[10px] uppercase mt-1">Total</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Search robots..."
            className="w-56"
          />
          <div className="flex items-center gap-1 p-1 rounded-lg border border-dark-border bg-dark-bg">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded font-mono text-[10px] uppercase transition-all
                  ${filter === f ? 'bg-accent-green/10 text-accent-green border border-accent-green/30' : 'text-gray-600 hover:text-gray-400'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 p-1 rounded-lg border border-dark-border bg-dark-bg ml-auto">
            {['cards', 'table'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded font-mono text-[10px] uppercase transition-all
                  ${view === v ? 'bg-accent-green/10 text-accent-green border border-accent-green/30' : 'text-gray-600 hover:text-gray-400'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {view === 'cards' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(robot => (
              <RobotCard key={robot.id} robot={robot} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-3 text-center py-12 text-gray-600 font-mono text-sm">No robots match filters</div>
            )}
          </div>
        ) : (
          <Table
            columns={tableColumns}
            data={filtered}
          />
        )}
      </div>
    </PageContainer>
  )
}
