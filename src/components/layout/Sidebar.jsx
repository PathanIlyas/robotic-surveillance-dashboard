import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Video, Bot, Target, Brain, Activity,
  MapPin, Radio, Bell, FileBarChart, Thermometer, Zap,
  Users, Settings, ChevronLeft, ChevronRight, Shield
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAlertStore } from '../../store/alertStore'
import { SYSTEM_SHORT, VERSION } from '../../utils/constants'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/surveillance', icon: Video, label: 'Live Surveillance' },
  { path: '/fleet', icon: Bot, label: 'Robot Fleet' },
  { path: '/missions', icon: Target, label: 'Mission Control' },
  { path: '/ai-detection', icon: Brain, label: 'AI Detection' },
  { path: '/sensors', icon: Activity, label: 'Sensor Monitoring' },
  { path: '/gps', icon: MapPin, label: 'GPS Tracking' },
  { path: '/communication', icon: Radio, label: 'Communication' },
  { path: '/alerts', icon: Bell, label: 'Alerts' },
  { path: '/reports', icon: FileBarChart, label: 'Reports' },
  { path: '/environmental', icon: Thermometer, label: 'Environmental' },
  { path: '/power', icon: Zap, label: 'Power Management' },
  { path: '/users', icon: Users, label: 'Users' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAuthStore()
  const { unreadCount } = useAlertStore()
  const location = useLocation()

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col border-r border-dark-border bg-dark-card overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d120d 0%, #0a0f0a 100%)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-dark-border min-h-[64px]">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent-green/10 border border-accent-green/30 flex items-center justify-center">
          <Shield className="w-5 h-5 text-accent-green" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="text-accent-green font-mono font-bold text-sm leading-tight">{SYSTEM_SHORT}</div>
              <div className="text-gray-600 font-mono text-[10px]">{VERSION} CLASSIFIED</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 custom-scrollbar">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          const isAlert = path === '/alerts'

          return (
            <NavLink key={path} to={path}>
              <motion.div
                whileHover={{ x: sidebarCollapsed ? 0 : 3 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer relative
                  ${isActive
                    ? 'text-accent-green bg-accent-green/5'
                    : 'text-gray-500 hover:text-gray-200 hover:bg-white/3'
                  }`}
                style={isActive ? {
                  borderLeft: '2px solid #00ff41',
                  boxShadow: 'inset 0 0 20px rgba(0,255,65,0.03)',
                } : {}}
              >
                <div className="relative flex-shrink-0">
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-accent-green' : ''}`} size={18} />
                  {isAlert && unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent-red rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap overflow-hidden font-mono text-xs tracking-wide uppercase"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom: system status */}
      <div className="border-t border-dark-border px-3 py-3">
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-3 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-mono text-[10px] uppercase">System</span>
                <span className="text-accent-green font-mono text-[10px]">ONLINE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                <span className="text-gray-600 font-mono text-[10px]">All systems nominal</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 py-1.5 px-2 rounded-lg text-gray-600 hover:text-accent-green hover:bg-accent-green/5 transition-all duration-200 border border-dark-border"
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : (
            <>
              <ChevronLeft size={14} />
              <span className="font-mono text-[10px] uppercase">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  )
}
