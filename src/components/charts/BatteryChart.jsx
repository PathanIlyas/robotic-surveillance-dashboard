import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { batteryAnalytics } from '../../mock/analytics'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-dark-border px-3 py-2 rounded-lg text-xs">
        <p className="text-accent-green font-mono mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-mono">{p.name}: {p.value}%</p>
        ))}
      </div>
    )
  }
  return null
}

export default function BatteryChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={batteryAnalytics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,30,0.5)" />
        <XAxis dataKey="time" tick={{ fill: '#4a6a4a', fontSize: 10, fontFamily: 'monospace' }} />
        <YAxis domain={[0, 100]} tick={{ fill: '#4a6a4a', fontSize: 10, fontFamily: 'monospace' }} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={30} stroke="#ff3131" strokeDasharray="4 4" strokeWidth={1} />
        <Line type="monotone" dataKey="avg" stroke="#00ff41" strokeWidth={2} dot={false} name="Avg %" />
        <Line type="monotone" dataKey="min" stroke="#ff3131" strokeWidth={1.5} dot={false} name="Min %" strokeDasharray="4 4" />
        <Line type="monotone" dataKey="max" stroke="#00d4ff" strokeWidth={1.5} dot={false} name="Max %" strokeDasharray="4 4" />
      </LineChart>
    </ResponsiveContainer>
  )
}
