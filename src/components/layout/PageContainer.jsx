import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import { useAuthStore } from '../../store/authStore'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export default function PageContainer({ title, children }) {
  const { sidebarCollapsed } = useAuthStore()

  return (
    <div
      className="flex flex-col min-h-screen transition-all duration-300"
      style={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
    >
      <Navbar title={title} />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25 }}
        className="flex-1 p-6 grid-bg"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}
