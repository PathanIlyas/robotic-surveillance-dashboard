import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { sensorHistory } from '../../mock/sensors'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card border border-dark-border px-3 py-2 rounded-lg text-xs">
        <p className="text-accent-green font-mono mb-1">{label}</p>
        {payload.map(p => (
          <p key={p.dataKey} style={{ color: p.color }} className="font-mono">{p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function SensorChart({ dataKey = 'temperature', color = '#00ff41', name = 'Temperature' }) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <LineChart data={sensorHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,45,30,0.5)" />
        <XAxis dataKey="time" tick={{ fill: '#4a6a4a', fontSize: 9, fontFamily: 'monospace' }} interval={3} />
        <YAxis tick={{ fill: '#4a6a4a', fontSize: 9, fontFamily: 'monospace' }} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          name={name}
          strokeShadowBlur={4}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
