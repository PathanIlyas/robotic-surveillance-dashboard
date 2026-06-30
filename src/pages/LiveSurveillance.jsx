import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Grid, Maximize2, Settings, Video, Thermometer, Moon } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import CameraFeed from '../components/surveillance/CameraFeed'
import PTZControls from '../components/surveillance/PTZControls'
import CameraGrid from '../components/surveillance/CameraGrid'
import Button from '../components/ui/Button'

const gridOptions = [1, 2, 4, 6]
const cameraList = [
  { robotId: 'RVL-001', type: 'day', label: 'Alpha - Day', index: 1 },
  { robotId: 'RVL-001', type: 'thermal', label: 'Alpha - Thermal', index: 2 },
  { robotId: 'RVL-002', type: 'thermal', label: 'Bravo - Thermal', index: 3 },
  { robotId: 'RVL-002', type: 'night', label: 'Bravo - Night', index: 4 },
  { robotId: 'RVL-004', type: 'day', label: 'Delta - Day', index: 5 },
  { robotId: 'RVL-006', type: 'thermal', label: 'Foxtrot - Thermal', index: 6 },
]

export default function LiveSurveillance() {
  const [gridCount, setGridCount] = useState(4)
  const [selectedCam, setSelectedCam] = useState(cameraList[0])
  const [view, setView] = useState('grid') // 'grid' | 'single'

  return (
    <PageContainer title="Live Surveillance">
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 p-1 rounded-lg border border-dark-border bg-dark-bg">
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 rounded font-mono text-[10px] uppercase transition-all ${view === 'grid' ? 'bg-accent-green/10 text-accent-green border border-accent-green/30' : 'text-gray-600 hover:text-gray-400'}`}
            >
              <Grid size={12} className="inline mr-1" /> Grid
            </button>
            <button
              onClick={() => setView('single')}
              className={`px-3 py-1.5 rounded font-mono text-[10px] uppercase transition-all ${view === 'single' ? 'bg-accent-green/10 text-accent-green border border-accent-green/30' : 'text-gray-600 hover:text-gray-400'}`}
            >
              <Maximize2 size={12} className="inline mr-1" /> Single
            </button>
          </div>

          {view === 'grid' && (
            <div className="flex items-center gap-1 p-1 rounded-lg border border-dark-border bg-dark-bg">
              {gridOptions.map(n => (
                <button
                  key={n}
                  onClick={() => setGridCount(n)}
                  className={`w-8 h-7 rounded font-mono text-[10px] transition-all ${gridCount === n ? 'bg-accent-green/10 text-accent-green border border-accent-green/30' : 'text-gray-600 hover:text-gray-400'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent-green">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" /> ALL FEEDS LIVE
            </span>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="glass-card border border-dark-border p-4">
            <CameraGrid count={gridCount} />
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            {/* Main feed */}
            <div className="col-span-12 lg:col-span-9">
              <div className="glass-card border border-dark-border p-4">
                <CameraFeed robotId={selectedCam.robotId} type={selectedCam.type} index={selectedCam.index} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3 space-y-4">
              {/* Camera selector */}
              <div className="glass-card border border-dark-border p-4">
                <h3 className="font-mono text-xs text-accent-green uppercase mb-3">Camera Sources</h3>
                <div className="space-y-1.5">
                  {cameraList.map(cam => (
                    <button
                      key={`${cam.robotId}-${cam.type}`}
                      onClick={() => setSelectedCam(cam)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-mono transition-all border
                        ${selectedCam.robotId === cam.robotId && selectedCam.type === cam.type
                          ? 'border-accent-green/30 bg-accent-green/5 text-accent-green'
                          : 'border-dark-border text-gray-500 hover:border-dark-border hover:text-gray-300 bg-dark-bg'
                        }`}
                    >
                      {cam.type === 'thermal' ? <Thermometer size={10} /> : cam.type === 'night' ? <Moon size={10} /> : <Camera size={10} />}
                      {cam.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* PTZ */}
              <PTZControls robotId={selectedCam.robotId} />
            </div>
          </div>
        )}

        {/* Camera status bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {cameraList.map(cam => (
            <div key={`${cam.robotId}-${cam.type}`} className="glass-card border border-dark-border p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                <span className="font-mono text-[9px] text-accent-green uppercase">LIVE</span>
              </div>
              <p className="font-mono text-[10px] text-gray-400 truncate">{cam.label}</p>
              <p className="font-mono text-[9px] text-gray-600">{cam.robotId}</p>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  )
}
