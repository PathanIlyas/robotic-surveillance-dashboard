import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from './components/layout/Sidebar'
import AppRoutes from './routes/AppRoutes'
import { useAuthStore } from './store/authStore'

function App() {
  const { sidebarCollapsed } = useAuthStore()

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-dark-bg">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <AppRoutes />
          </AnimatePresence>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
