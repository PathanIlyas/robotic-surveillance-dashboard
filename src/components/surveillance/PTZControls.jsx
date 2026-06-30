import { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Home } from 'lucide-react'

export default function PTZControls({ robotId }) {
  const [pan, setPan] = useState(0)
  const [tilt, setTilt] = useState(0)
  const [zoom, setZoom] = useState(1)

  const handlePan = (dir) => {
    const delta = 5
    setPan(p => dir === 'left' ? p - delta : p + delta)
  }

  const handleTilt = (dir) => {
    const delta = 5
    setTilt(t => dir === 'up' ? t - delta : t + delta)
  }

  const reset = () => { setPan(0); setTilt(0); setZoom(1) }

  return (
    <div className="glass-card p-4 border border-dark-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-accent-green font-mono text-xs uppercase tracking-wide">PTZ Control</h3>
        <span className="text-gray-600 font-mono text-[10px]">{robotId}</span>
      </div>

      {/* Pan/Tilt readout */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="p-2 rounded bg-dark-bg border border-dark-border">
          <div className="text-[9px] text-gray-600 font-mono uppercase">Pan</div>
          <div className="font-mono text-sm text-accent-green">{pan}°</div>
        </div>
        <div className="p-2 rounded bg-dark-bg border border-dark-border">
          <div className="text-[9px] text-gray-600 font-mono uppercase">Tilt</div>
          <div className="font-mono text-sm text-accent-green">{tilt}°</div>
        </div>
        <div className="p-2 rounded bg-dark-bg border border-dark-border">
          <div className="text-[9px] text-gray-600 font-mono uppercase">Zoom</div>
          <div className="font-mono text-sm text-accent-green">{zoom}x</div>
        </div>
      </div>

      {/* D-pad */}
      <div className="grid grid-cols-3 gap-1.5 w-28 mx-auto mb-4">
        <div />
        <button
          onClick={() => handleTilt('up')}
          className="p-2 rounded border border-dark-border bg-dark-bg hover:border-accent-green/40 hover:bg-accent-green/5 text-gray-400 hover:text-accent-green transition-all flex items-center justify-center"
        >
          <ChevronUp size={14} />
        </button>
        <div />
        <button
          onClick={() => handlePan('left')}
          className="p-2 rounded border border-dark-border bg-dark-bg hover:border-accent-green/40 hover:bg-accent-green/5 text-gray-400 hover:text-accent-green transition-all flex items-center justify-center"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={reset}
          className="p-2 rounded border border-accent-green/20 bg-accent-green/5 text-accent-green hover:bg-accent-green/10 transition-all flex items-center justify-center"
        >
          <Home size={12} />
        </button>
        <button
          onClick={() => handlePan('right')}
          className="p-2 rounded border border-dark-border bg-dark-bg hover:border-accent-green/40 hover:bg-accent-green/5 text-gray-400 hover:text-accent-green transition-all flex items-center justify-center"
        >
          <ChevronRight size={14} />
        </button>
        <div />
        <button
          onClick={() => handleTilt('down')}
          className="p-2 rounded border border-dark-border bg-dark-bg hover:border-accent-green/40 hover:bg-accent-green/5 text-gray-400 hover:text-accent-green transition-all flex items-center justify-center"
        >
          <ChevronDown size={14} />
        </button>
        <div />
      </div>

      {/* Zoom */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setZoom(z => Math.max(z - 0.5, 1))}
          className="flex-1 py-1.5 rounded border border-dark-border bg-dark-bg hover:border-accent-green/30 text-gray-500 hover:text-accent-green transition-all font-mono text-xs flex items-center justify-center gap-1"
        >
          <ZoomOut size={12} /> OUT
        </button>
        <button
          onClick={() => setZoom(z => Math.min(z + 0.5, 8))}
          className="flex-1 py-1.5 rounded border border-dark-border bg-dark-bg hover:border-accent-green/30 text-gray-500 hover:text-accent-green transition-all font-mono text-xs flex items-center justify-center gap-1"
        >
          <ZoomIn size={12} /> IN
        </button>
      </div>
    </div>
  )
}
