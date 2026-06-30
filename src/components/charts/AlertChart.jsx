import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { alertStats } from '../../mock/alerts'

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

export default function AlertChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={alertStats} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,30,0.5)" />
        <XAxis dataKey="day" tick={{ fill: '#4a6a4a', fontSize: 10, fontFamily: 'monospace' }} />
        <YAxis tick={{ fill: '#4a6a4a', fontSize: 10, fontFamily: 'monospace' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace', color: '#4a6a4a' }} />
        <Bar dataKey="critical" fill="#ff3131" fillOpacity={0.85} name="Critical" radius={[2, 2, 0, 0]} stackId="a" />
        <Bar dataKey="warning" fill="#ffb800" fillOpacity={0.85} name="Warning" radius={[2, 2, 0, 0]} stackId="a" />
        <Bar dataKey="info" fill="#00d4ff" fillOpacity={0.85} name="Info" radius={[2, 2, 0, 0]} stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  )
}
