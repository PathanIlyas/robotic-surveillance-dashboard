import { motion } from 'framer-motion'
import {
  Bot, Shield, WifiOff, Target, AlertTriangle, Bell,
  Battery, Wifi, MapPin, Cloud, Activity, Eye
} from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import StatCard from '../components/dashboard/StatCard'
import RobotCard from '../components/dashboard/RobotCard'
import AlertCard from '../components/dashboard/AlertCard'
import MissionCard from '../components/dashboard/MissionCard'
import ThreatCard from '../components/dashboard/ThreatCard'
import WeatherCard from '../components/dashboard/WeatherCard'
import SignalCard from '../components/dashboard/SignalCard'
import BatteryCard from '../components/dashboard/BatteryCard'
import ThreatChart from '../components/charts/ThreatChart'
import MissionChart from '../components/charts/MissionChart'
import LiveMap from '../components/maps/LiveMap'
import { useRobotStore } from '../store/robotStore'
import { useAlertStore } from '../store/alertStore'
import { useMissionStore } from '../store/missionStore'
import { aiDetectionLog } from '../mock/analytics'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
}

export default function Dashboard() {
  const { robots } = useRobotStore()
  const { alerts } = useAlertStore()
  const { missions } = useMissionStore()

  const activeRobots = robots.filter(r => r.status === 'active').length
  const offlineRobots = robots.filter(r => r.status === 'offline').length
  const activeMissions = missions.filter(m => m.status === 'active').length
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && a.status === 'active').length
  const todayAlerts = alerts.filter(a => new Date(a.timestamp).toDateString() === new Date().toDateString()).length
  const avgBattery = Math.round(robots.reduce((s, r) => s + r.battery, 0) / robots.length)

  return (
    <PageContainer title="Command Center Dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Threat ticker */}
        {criticalAlerts > 0 && (
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-accent-red/30 bg-red-950/20"
          >
            <AlertTriangle size={14} className="text-accent-red animate-pulse" />
            <span className="font-mono text-xs text-accent-red uppercase tracking-wide">
              THREAT CONDITION ELEVATED — {criticalAlerts} CRITICAL ALERTS ACTIVE
            </span>
            <span className="ml-auto font-mono text-[10px] text-accent-red/60">
              {new Date().toLocaleTimeString('en-US', { hour12: false })}
            </span>
          </motion.div>
        )}

        {/* Stat cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard title="Total Robots" value={robots.length} icon={Bot} color="green" subtitle="Fleet size" pulse />
          <StatCard title="Active" value={activeRobots} icon={Shield} color="green" trend={5} />
          <StatCard title="Offline" value={offlineRobots} icon={WifiOff} color="red" subtitle="Maintenance" />
          <StatCard title="Missions" value={activeMissions} icon={Target} color="blue" trend={2} />
          <StatCard title="Threats" value={criticalAlerts} icon={AlertTriangle} color="red" subtitle="Active" pulse />
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard title="Alerts Today" value={todayAlerts} icon={Bell} color="amber" />
          <StatCard title="Avg Battery" value={avgBattery} unit="%" icon={Battery} color={avgBattery > 60 ? 'green' : avgBattery > 30 ? 'amber' : 'red'} />
          <StatCard title="Network" value="5G" icon={Wifi} color="blue" subtitle="Active" pulse />
          <StatCard title="GPS Lock" value={robots.filter(r => r.sensors?.gps).length} unit={`/${robots.length}`} icon={MapPin} color="green" />
          <StatCard title="Cloud Sync" value="ONLINE" icon={Cloud} color="green" subtitle="Last sync: now" pulse />
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Live Map */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-7">
            <div className="glass-card border border-dark-border overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-accent-green" />
                  <h2 className="text-gray-200 font-mono text-xs uppercase tracking-wide">Live Tactical Map</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    <span className="font-mono text-[10px] text-gray-500">LIVE</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-amber" />
                    <span className="font-mono text-[10px] text-gray-600">Geofence</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-red" />
                    <span className="font-mono text-[10px] text-gray-600">Restricted</span>
                  </div>
                </div>
              </div>
              <LiveMap height={380} />
            </div>
          </motion.div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {/* Active Alerts */}
            <motion.div variants={itemVariants} className="glass-card border border-dark-border">
              <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
                <div className="flex items-center gap-2">
                  <Bell size={14} className="text-accent-amber" />
                  <h2 className="text-gray-200 font-mono text-xs uppercase tracking-wide">Active Alerts</h2>
                </div>
                <span className="text-accent-red font-mono text-[10px]">{criticalAlerts} CRITICAL</span>
              </div>
              <div className="p-4 space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                {alerts.filter(a => a.status === 'active').slice(0, 5).map(alert => (
                  <AlertCard key={alert.id} alert={alert} compact />
                ))}
              </div>
            </motion.div>

            {/* Weather + Signal */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={itemVariants}><WeatherCard /></motion.div>
              <motion.div variants={itemVariants}><SignalCard /></motion.div>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-12 gap-4">
          {/* Threat Analytics */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-7 glass-card border border-dark-border">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-dark-border">
              <Activity size={14} className="text-accent-red" />
              <h2 className="text-gray-200 font-mono text-xs uppercase tracking-wide">24H Threat Analytics</h2>
            </div>
            <div className="p-5">
              <ThreatChart />
            </div>
          </motion.div>

          {/* Active Missions */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-5 glass-card border border-dark-border">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-dark-border">
              <Target size={14} className="text-accent-blue" />
              <h2 className="text-gray-200 font-mono text-xs uppercase tracking-wide">Active Missions</h2>
            </div>
            <div className="p-4 space-y-2">
              {missions.filter(m => m.status === 'active').map(mission => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Robot Fleet */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bot size={14} className="text-accent-green" />
              <h2 className="text-gray-200 font-mono text-xs uppercase tracking-wide">Robot Fleet Status</h2>
            </div>
            <span className="font-mono text-[10px] text-gray-600">{robots.length} UNITS REGISTERED</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {robots.map(robot => (
              <RobotCard key={robot.id} robot={robot} />
            ))}
          </div>
        </motion.div>

        {/* AI Detection Log */}
        <motion.div variants={itemVariants} className="glass-card border border-dark-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-dark-border">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-accent-purple" />
              <h2 className="text-gray-200 font-mono text-xs uppercase tracking-wide">Recent AI Detections</h2>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {aiDetectionLog.slice(0, 5).map(d => (
              <ThreatCard key={d.id} detection={d} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </PageContainer>
  )
}
