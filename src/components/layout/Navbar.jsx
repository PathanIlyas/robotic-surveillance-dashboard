import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search, User, Wifi, Battery, Clock, AlertTriangle, Shield } from 'lucide-react'
import { useAlertStore } from '../../store/alertStore'
import { useAuthStore } from '../../store/authStore'
import { useRobotStore } from '../../store/robotStore'
import { nowFormatted } from '../../utils/formatters'

export default function Navbar({ title }) {
  const { unreadCount } = useAlertStore()
  const { user } = useAuthStore()
  const { robots } = useRobotStore()
  const [time, setTime] = useState(nowFormatted())
  const [showAlerts, setShowAlerts] = useState(false)
  const { alerts } = useAlertStore()

  const activeCount = robots.filter(r => r.status === 'active').length
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && a.status === 'active')

  useEffect(() => {
    const t = setInterval(() => setTime(nowFormatted()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <header className="h-16 border-b border-dark-border flex items-center justify-between px-6 bg-dark-card/80 backdrop-blur-sm sticky top-0 z-40">
      {/* Left: page title + marquee ticker */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-white font-semibold text-base tracking-wide">{title}</h1>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            <span className="text-accent-green font-mono text-[10px] uppercase tracking-wider">Live Feed Active</span>
          </div>
        </div>

        {/* Threat ticker */}
        {criticalAlerts.length > 0 && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-red-950/40 border border-accent-red/30">
            <AlertTriangle size={12} className="text-accent-red animate-pulse" />
            <span className="text-accent-red font-mono text-[10px] uppercase">
              {criticalAlerts.length} Critical Alert{criticalAlerts.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">

        {/* System stats pills */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-dark-bg border border-dark-border">
            <Shield size={11} className="text-accent-green" />
            <span className="font-mono text-[10px] text-accent-green">{activeCount} ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-dark-bg border border-dark-border">
            <Wifi size={11} className="text-accent-blue" />
            <span className="font-mono text-[10px] text-gray-400">5G LINK</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-dark-bg border border-dark-border">
            <Battery size={11} className="text-accent-green" />
            <span className="font-mono text-[10px] text-gray-400">AVG 68%</span>
          </div>
        </div>

        {/* Clock */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-dark-bg border border-dark-border">
          <Clock size={11} className="text-gray-500" />
          <span className="font-mono text-[10px] text-gray-400 tabular-nums">{time}</span>
        </div>

        {/* Alert bell */}
        <div className="relative">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative p-2 rounded-lg border border-dark-border bg-dark-bg hover:border-accent-green/30 transition-all"
          >
            <Bell size={16} className={unreadCount > 0 ? 'text-accent-amber' : 'text-gray-500'} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-red rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showAlerts && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-80 glass-card border border-dark-border rounded-xl overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-dark-border flex items-center justify-between">
                  <span className="font-mono text-xs text-accent-green uppercase">Active Alerts</span>
                  <span className="text-xs text-gray-500 font-mono">{criticalAlerts.length} critical</span>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {alerts.filter(a => a.status === 'active').slice(0, 5).map(alert => (
                    <div key={alert.id} className="px-4 py-3 border-b border-dark-border/50 hover:bg-dark-hover">
                      <div className="flex items-start gap-2">
                        <span className={`text-xs font-mono ${alert.severity === 'critical' ? 'text-accent-red' : 'text-accent-amber'}`}>
                          ●
                        </span>
                        <div>
                          <p className="text-xs text-gray-300 font-medium">{alert.title}</p>
                          <p className="text-[10px] text-gray-600 mt-0.5">{alert.robot} • {alert.zone}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dark-border bg-dark-bg">
          <div className="w-6 h-6 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center">
            <User size={12} className="text-accent-green" />
          </div>
          <div className="hidden sm:block">
            <div className="text-[10px] text-gray-300 font-mono leading-tight">{user?.name}</div>
            <div className="text-[9px] text-gray-600 font-mono uppercase">{user?.clearanceLevel}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
