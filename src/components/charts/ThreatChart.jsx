import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { threatAnalytics } from '../../mock/analytics'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-dark-border px-3 py-2 rounded-lg text-xs">
        <p className="text-accent-green font-mono mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-mono">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function ThreatChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={threatAnalytics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="humanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff3131" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ff3131" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="vehicleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffb800" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ffb800" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fireGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ff6b35" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,30,0.5)" />
        <XAxis dataKey="time" tick={{ fill: '#4a6a4a', fontSize: 10, fontFamily: 'monospace' }} />
        <YAxis tick={{ fill: '#4a6a4a', fontSize: 10, fontFamily: 'monospace' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace', color: '#4a6a4a' }} />
        <Area type="monotone" dataKey="human" stroke="#ff3131" fill="url(#humanGrad)" strokeWidth={2} name="Human" />
        <Area type="monotone" dataKey="vehicle" stroke="#ffb800" fill="url(#vehicleGrad)" strokeWidth={2} name="Vehicle" />
        <Area type="monotone" dataKey="fire" stroke="#ff6b35" fill="url(#fireGrad)" strokeWidth={2} name="Fire" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
