export default function Badge({ children, variant = 'default', size = 'sm' }) {
  const variants = {
    default: 'text-gray-400 bg-gray-900/30 border-gray-700',
    success: 'text-accent-green bg-green-950/30 border-accent-green/30',
    danger: 'text-accent-red bg-red-950/30 border-accent-red/30',
    warning: 'text-accent-amber bg-amber-950/30 border-accent-amber/30',
    info: 'text-accent-blue bg-blue-950/30 border-accent-blue/30',
    purple: 'text-purple-400 bg-purple-950/30 border-purple-500/30',
  }
  const sizes = {
    xs: 'px-1.5 py-0.5 text-[9px]',
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  }

  return (
    <span className={`inline-flex items-center rounded border font-mono uppercase tracking-wide ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  )
}
