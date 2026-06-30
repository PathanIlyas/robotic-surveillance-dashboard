import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { missionAnalytics } from '../../mock/missions'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-dark-border px-3 py-2 rounded-lg text-xs">
        <p className="text-accent-green font-mono mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-mono">{p.name}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function MissionChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={missionAnalytics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,30,0.5)" />
        <XAxis dataKey="month" tick={{ fill: '#4a6a4a', fontSize: 10, fontFamily: 'monospace' }} />
        <YAxis tick={{ fill: '#4a6a4a', fontSize: 10, fontFamily: 'monospace' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace', color: '#4a6a4a' }} />
        <Bar dataKey="patrol" fill="#00ff41" fillOpacity={0.8} name="Patrol" radius={[2, 2, 0, 0]} />
        <Bar dataKey="recon" fill="#00d4ff" fillOpacity={0.8} name="Recon" radius={[2, 2, 0, 0]} />
        <Bar dataKey="sweep" fill="#ffb800" fillOpacity={0.8} name="Sweep" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
