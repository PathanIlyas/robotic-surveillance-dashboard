import CameraFeed from './CameraFeed'
import { useRobotStore } from '../../store/robotStore'

const gridLayouts = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  4: 'grid-cols-2',
  6: 'grid-cols-3',
  9: 'grid-cols-3',
}

const cameraConfigs = [
  { robotId: 'RVL-001', type: 'day', index: 1 },
  { robotId: 'RVL-002', type: 'thermal', index: 2 },
  { robotId: 'RVL-004', type: 'night', index: 3 },
  { robotId: 'RVL-006', type: 'day', index: 4 },
]

export default function CameraGrid({ count = 4 }) {
  const configs = cameraConfigs.slice(0, count)
  const colClass = gridLayouts[count] || 'grid-cols-2'

  return (
    <div className={`grid ${colClass} gap-3`}>
      {configs.map(cfg => (
        <CameraFeed key={`${cfg.robotId}-${cfg.type}`} {...cfg} />
      ))}
    </div>
  )
}
