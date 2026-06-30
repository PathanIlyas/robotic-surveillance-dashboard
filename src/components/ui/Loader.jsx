import { motion } from 'framer-motion'

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-accent-green/20 rounded-full" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 border-2 border-transparent border-t-accent-green rounded-full"
        />
        <div className="absolute inset-3 border border-accent-green/30 rounded-full" />
      </div>
      <span className="font-mono text-xs text-accent-green/70 uppercase tracking-widest animate-pulse">{text}</span>
    </div>
  )
}
