import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users as UsersIcon, Plus, Shield, Edit, Trash2, User } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import SearchBox from '../components/ui/SearchBox'

const mockUsers = [
  { id: 'USR-001', name: 'Col. Marcus Webb', role: 'Commander', clearance: 'TOP SECRET', status: 'active', lastLogin: '2 min ago', permissions: ['all'] },
  { id: 'USR-002', name: 'Maj. Sarah Johnson', role: 'Surveillance Operator', clearance: 'SECRET', status: 'active', lastLogin: '15 min ago', permissions: ['surveillance', 'alerts'] },
  { id: 'USR-003', name: 'Capt. Alex Rodriguez', role: 'Mission Commander', clearance: 'TOP SECRET', status: 'active', lastLogin: '1h ago', permissions: ['missions', 'fleet', 'reports'] },
  { id: 'USR-004', name: 'Lt. James Chen', role: 'Sensor Analyst', clearance: 'SECRET', status: 'active', lastLogin: '3h ago', permissions: ['sensors', 'reports'] },
  { id: 'USR-005', name: 'Sgt. Maria Garcia', role: 'Robot Operator', clearance: 'CONFIDENTIAL', status: 'active', lastLogin: '5h ago', permissions: ['fleet'] },
  { id: 'USR-006', name: 'Tech. David Kim', role: 'Systems Technician', clearance: 'CONFIDENTIAL', status: 'inactive', lastLogin: '2d ago', permissions: ['maintenance'] },
  { id: 'USR-007', name: 'Cdr. Emily Torres', role: 'AI Specialist', clearance: 'SECRET', status: 'active', lastLogin: '30 min ago', permissions: ['ai', 'sensors', 'reports'] },
]

const roleColors = {
  'Commander': 'text-accent-red',
  'Mission Commander': 'text-accent-amber',
  'Surveillance Operator': 'text-accent-blue',
  'Sensor Analyst': 'text-accent-green',
  'Robot Operator': 'text-accent-green',
  'Systems Technician': 'text-purple-400',
  'AI Specialist': 'text-purple-400',
}

const clearanceColors = {
  'TOP SECRET': 'text-accent-red bg-red-950/20 border-accent-red/20',
  'SECRET': 'text-accent-amber bg-amber-950/20 border-accent-amber/20',
  'CONFIDENTIAL': 'text-accent-blue bg-blue-950/20 border-accent-blue/20',
}

export default function Users() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const users = mockUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <PageContainer title="User Management">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', count: mockUsers.length, color: 'text-gray-400' },
            { label: 'Active', count: mockUsers.filter(u => u.status === 'active').length, color: 'text-accent-green' },
            { label: 'Top Secret', count: mockUsers.filter(u => u.clearance === 'TOP SECRET').length, color: 'text-accent-red' },
            { label: 'Online Now', count: 4, color: 'text-accent-blue' },
          ].map(s => (
            <div key={s.label} className="glass-card border border-dark-border p-4 text-center">
              <div className={`font-mono text-3xl font-bold ${s.color}`}>{s.count}</div>
              <div className="text-gray-600 font-mono text-[10px] uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3">
          <SearchBox value={search} onChange={setSearch} placeholder="Search users..." className="w-64" />
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setShowModal(true)}>Add User</Button>
        </div>

        {/* Users grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <motion.div key={user.id} whileHover={{ y: -2 }} className="glass-card border border-dark-border p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-green/10 border border-accent-green/20 flex items-center justify-center flex-shrink-0">
                    <User size={18} className="text-accent-green" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold">{user.name}</h3>
                    <p className={`font-mono text-[10px] ${roleColors[user.role] || 'text-gray-500'}`}>{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-gray-600 hover:text-accent-green transition-colors"><Edit size={12} /></button>
                  <button className="p-1.5 text-gray-600 hover:text-accent-red transition-colors"><Trash2 size={12} /></button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-mono text-[10px] uppercase">Clearance</span>
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${clearanceColors[user.clearance] || 'text-gray-500'}`}>
                    {user.clearance}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-mono text-[10px] uppercase">Status</span>
                  <span className={`flex items-center gap-1.5 font-mono text-[10px] ${user.status === 'active' ? 'text-accent-green' : 'text-gray-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-accent-green animate-pulse' : 'bg-gray-600'}`} />
                    {user.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-mono text-[10px] uppercase">Last Login</span>
                  <span className="text-gray-400 font-mono text-[10px]">{user.lastLogin}</span>
                </div>
                <div className="pt-1">
                  <span className="text-gray-600 font-mono text-[10px] uppercase block mb-1">Permissions</span>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.slice(0, 3).map(p => (
                      <span key={p} className="px-1.5 py-0.5 rounded bg-dark-bg border border-dark-border font-mono text-[9px] text-gray-500 capitalize">{p}</span>
                    ))}
                    {user.permissions.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-dark-bg border border-dark-border font-mono text-[9px] text-gray-600">+{user.permissions.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New User">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Full Name</label>
              <input className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-accent-green/30" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Role</label>
              <select className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-accent-green/30">
                <option>Commander</option>
                <option>Surveillance Operator</option>
                <option>Mission Commander</option>
                <option>Sensor Analyst</option>
                <option>Robot Operator</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Clearance Level</label>
            <select className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-accent-green/30">
              <option>CONFIDENTIAL</option>
              <option>SECRET</option>
              <option>TOP SECRET</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="default" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" size="sm">Create User</Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  )
}
