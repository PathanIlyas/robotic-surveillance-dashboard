import { SYSTEM_NAME, VERSION, BUILD } from '../../utils/constants'

export default function Footer() {
  return (
    <footer className="border-t border-dark-border px-6 py-3 flex items-center justify-between bg-dark-card/50">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] text-gray-700 uppercase tracking-wider">{SYSTEM_NAME}</span>
        <span className="text-gray-800">|</span>
        <span className="font-mono text-[10px] text-gray-700">{VERSION}</span>
        <span className="text-gray-800">|</span>
        <span className="font-mono text-[10px] text-gray-700">{BUILD}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span className="font-mono text-[10px] text-gray-700">SYS NOMINAL</span>
        </div>
        <span className="font-mono text-[10px] text-gray-700 uppercase">CLASSIFICATION: TOP SECRET</span>
      </div>
    </footer>
  )
}
