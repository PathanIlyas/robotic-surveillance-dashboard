import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import LiveSurveillance from '../pages/LiveSurveillance'
import RobotFleet from '../pages/RobotFleet'
import RobotDetails from '../pages/RobotDetails'
import MissionControl from '../pages/MissionControl'
import SensorMonitoring from '../pages/SensorMonitoring'
import AIDetection from '../pages/AIDetection'
import GPSTracking from '../pages/GPSTracking'
import Communication from '../pages/Communication'
import Alerts from '../pages/Alerts'
import Reports from '../pages/Reports'
import Environmental from '../pages/Environmental'
import PowerManagement from '../pages/PowerManagement'
import Users from '../pages/Users'
import Settings from '../pages/Settings'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/surveillance" element={<LiveSurveillance />} />
      <Route path="/fleet" element={<RobotFleet />} />
      <Route path="/fleet/:id" element={<RobotDetails />} />
      <Route path="/missions" element={<MissionControl />} />
      <Route path="/sensors" element={<SensorMonitoring />} />
      <Route path="/ai-detection" element={<AIDetection />} />
      <Route path="/gps" element={<GPSTracking />} />
      <Route path="/communication" element={<Communication />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/environmental" element={<Environmental />} />
      <Route path="/power" element={<PowerManagement />} />
      <Route path="/users" element={<Users />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
