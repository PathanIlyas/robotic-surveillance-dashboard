import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Bell, Shield, Wifi, Database, Bot, Monitor, Globe, Moon, Save } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'

const Toggle = ({ enabled, onChange, label, desc }) => (
  <div className="flex items-center justify-between py-3 border-b border-dark-border/50">
    <div>
      <p className="text-gray-300 text-sm font-medium">{label}</p>
      {desc && <p className="text-gray-600 font-mono text-[10px] mt-0.5">{desc}</p>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 ${enabled ? 'bg-accent-green' : 'bg-dark-border'}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${enabled ? 'left-5.5 left-[22px]' : 'left-0.5'}`} />
    </button>
  </div>
)

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    criticalAlerts: true,
    emailAlerts: false,
    smsAlerts: false,
    autoRecord: true,
    nightMode: true,
    encryption: true,
    vpn: true,
    aiDetection: true,
    autoPatrol: false,
    lowBatteryAlert: true,
    geofenceAlert: true,
    cloudSync: true,
    dataRetention: true,
  })

  const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }))

  const sections = [
    {
      icon: Bell, label: 'Alerts & Notifications', color: 'text-accent-amber',
      items: [
        { key: 'notifications', label: 'Push Notifications', desc: 'Real-time alert push to dashboard' },
        { key: 'criticalAlerts', label: 'Critical Alert Sounds', desc: 'Audio alert for critical threats' },
        { key: 'emailAlerts', label: 'Email Alerts', desc: 'Send alerts to registered email' },
        { key: 'smsAlerts', label: 'SMS Alerts', desc: 'SMS to emergency contacts' },
        { key: 'lowBatteryAlert', label: 'Low Battery Alert', desc: 'Alert at 20% battery' },
        { key: 'geofenceAlert', label: 'Geofence Breach Alert', desc: 'Notify on boundary violations' },
      ]
    },
    {
      icon: Bot, label: 'Robot Control', color: 'text-accent-green',
      items: [
        { key: 'autoPatrol', label: 'Auto Patrol', desc: 'Automated patrol scheduling' },
        { key: 'autoRecord', label: 'Auto Recording', desc: 'Auto-record on threat detection' },
      ]
    },
    {
      icon: Shield, label: 'Security', color: 'text-accent-red',
      items: [
        { key: 'encryption', label: 'AES-256 Encryption', desc: 'Encrypt all communications' },
        { key: 'vpn', label: 'VPN Tunnel', desc: 'Route traffic through secure VPN' },
        { key: 'aiDetection', label: 'AI Intrusion Detection', desc: 'ML-based anomaly detection' },
      ]
    },
    {
      icon: Database, label: 'Data & Storage', color: 'text-accent-blue',
      items: [
        { key: 'cloudSync', label: 'Cloud Sync', desc: 'Sync data to secure cloud storage' },
        { key: 'dataRetention', label: 'Auto Data Retention', desc: '90-day retention policy' },
      ]
    },
  ]

  return (
    <PageContainer title="Settings">
      <div className="space-y-6 max-w-4xl">
        {/* System info */}
        <div className="glass-card border border-dark-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Monitor size={18} className="text-accent-green" />
            <h2 className="text-white font-semibold">System Information</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              ['Version', 'v4.2.1'],
              ['Build', '2024-0630'],
              ['License', 'MILITARY'],
              ['Uptime', '14d 6h 32m'],
              ['CPU Usage', '23%'],
              ['Memory', '4.2 / 16 GB'],
              ['Storage', '128 / 500 GB'],
              ['Last Update', '3 days ago'],
            ].map(([k, v]) => (
              <div key={k} className="p-3 rounded-lg bg-dark-bg border border-dark-border">
                <div className="text-gray-600 font-mono text-[9px] uppercase">{k}</div>
                <div className="text-accent-green font-mono text-xs font-medium mt-0.5">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Toggle sections */}
        {sections.map(section => (
          <div key={section.label} className="glass-card border border-dark-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <section.icon size={16} className={section.color} />
              <h3 className={`font-mono text-xs uppercase tracking-wide ${section.color}`}>{section.label}</h3>
            </div>
            <div>
              {section.items.map(item => (
                <Toggle key={item.key} enabled={settings[item.key]} onChange={() => toggle(item.key)} label={item.label} desc={item.desc} />
              ))}
            </div>
          </div>
        ))}

        {/* Network config */}
        <div className="glass-card border border-dark-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Wifi size={16} className="text-accent-blue" />
            <h3 className="font-mono text-xs text-accent-blue uppercase tracking-wide">Network Configuration</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['Server IP', '192.168.1.100'],
              ['Port', '8443'],
              ['Protocol', 'WSS / HTTPS'],
              ['Timeout', '30s'],
            ].map(([k, v]) => (
              <div key={k}>
                <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">{k}</label>
                <input
                  defaultValue={v}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-3 py-2 text-xs text-gray-300 font-mono focus:outline-none focus:border-accent-green/30"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end gap-3">
          <Button variant="default" size="md">Reset Defaults</Button>
          <Button variant="primary" size="md" icon={Save}>Save Settings</Button>
        </div>
      </div>
    </PageContainer>
  )
}
