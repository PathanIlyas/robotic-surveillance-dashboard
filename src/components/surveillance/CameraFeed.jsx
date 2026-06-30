import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Maximize2, CircleDot, Thermometer, Moon, Sun, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

const cameraTypes = {
  day: { label: 'DAY CAM', color: 'text-accent-green', overlay: '' },
  night: { label: 'NIGHT IR', color: 'text-purple-400', overlay: 'brightness-75 sepia hue-rotate-60' },
  thermal: { label: 'THERMAL', color: 'text-accent-red', overlay: '' },
}

// Simulated camera backgrounds
const bgColors = {
  day: 'linear-gradient(135deg, #0a1a0a 0%, #0d200d 50%, #0a150a 100%)',
  night: 'linear-gradient(135deg, #050a05 0%, #080d08 50%, #050805 100%)',
  thermal: 'linear-gradient(135deg, #1a0505 0%, #2d0a00 50%, #1a0505 100%)',
}

export default function CameraFeed({ robotId = 'RVL-001', type = 'day', index = 1 }) {
  const [isRecording, setIsRecording] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const cam = cameraTypes[type] || cameraTypes.day

  return (
    <div className={`camera-feed relative ${isFullscreen ? 'fixed inset-4 z-50' : 'aspect-video'} bg-black`}
      style={{ background: bgColors[type] }}
    >
      {/* Scan line overlay */}
      <div className="scan-overlay" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Simulated scene */}
      <div className="absolute inset-0 flex items-center justify-center">
        {type === 'thermal' ? (
          <div className="relative w-full h-full overflow-hidden">
            {/* Thermal blobs */}
            <div className="absolute w-24 h-20 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, #ff6b00, transparent)', top: '30%', left: '40%' }} />
            <div className="absolute w-16 h-14 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #ff3131, transparent)', top: '50%', left: '20%' }} />
            <div className="absolute w-10 h-8 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #ffb800, transparent)', top: '60%', left: '65%' }} />
          </div>
        ) : (
          <div className="text-center opacity-30">
            <Camera size={32} className={cam.color} />
          </div>
        )}
      </div>

      {/* Corner brackets */}
      {['tl', 'tr', 'bl', 'br'].map(corner => (
        <div key={corner} className={`absolute w-5 h-5 ${
          corner === 'tl' ? 'top-2 left-2 border-t-2 border-l-2' :
          corner === 'tr' ? 'top-2 right-2 border-t-2 border-r-2' :
          corner === 'bl' ? 'bottom-2 left-2 border-b-2 border-l-2' :
          'bottom-2 right-2 border-b-2 border-r-2'
        } border-accent-green/60`} />
      ))}

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[10px] font-bold ${cam.color}`}>{cam.label}</span>
          <span className="text-gray-600 font-mono text-[10px]">CAM-{index} • {robotId}</span>
        </div>
        <div className="flex items-center gap-2">
          {isRecording && (
            <span className="flex items-center gap-1 text-accent-red font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" /> REC
            </span>
          )}
          <span className="text-accent-green font-mono text-[10px]">LIVE</span>
        </div>
      </div>

      {/* Targeting reticle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-16 h-16 opacity-30">
          <div className="absolute inset-0 border border-accent-green/50 rounded-full" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-accent-green/50" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent-green/50" />
        </div>
      </div>

      {/* AI detection boxes (simulated) */}
      {type !== 'thermal' && (
        <div className="absolute" style={{ top: '35%', left: '25%', width: '120px', height: '80px' }}>
          <div className="w-full h-full border border-accent-amber/60 rounded-sm relative">
            <span className="absolute -top-4 left-0 font-mono text-[9px] text-accent-amber bg-black/80 px-1">HUMAN 94.2%</span>
          </div>
        </div>
      )}

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center gap-3">
          <span className="text-gray-500 font-mono text-[9px] tabular-nums">
            {new Date().toLocaleTimeString('en-US', { hour12: false })}
          </span>
          <span className="text-gray-600 font-mono text-[9px]">34.0522°N 118.2437°W</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoom(z => Math.min(z + 0.5, 3))}
            className="p-1 rounded text-gray-600 hover:text-accent-green transition-colors"
          >
            <ZoomIn size={10} />
          </button>
          <span className="font-mono text-[9px] text-gray-600 w-7 text-center">{zoom}x</span>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.5, 1))}
            className="p-1 rounded text-gray-600 hover:text-accent-green transition-colors"
          >
            <ZoomOut size={10} />
          </button>
          <button
            onClick={() => setIsRecording(r => !r)}
            className={`p-1 rounded transition-colors ${isRecording ? 'text-accent-red' : 'text-gray-600 hover:text-accent-red'}`}
          >
            <CircleDot size={10} />
          </button>
          <button
            onClick={() => setIsFullscreen(f => !f)}
            className="p-1 rounded text-gray-600 hover:text-accent-green transition-colors"
          >
            <Maximize2 size={10} />
          </button>
        </div>
      </div>

      {/* Fullscreen close */}
      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 px-3 py-1 bg-dark-card border border-dark-border rounded text-accent-green font-mono text-xs hover:bg-dark-hover z-10"
        >
          ESC
        </button>
      )}
    </div>
  )
}
