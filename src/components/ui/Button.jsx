import { motion } from 'framer-motion'

export default function Button({ children, variant = 'default', size = 'md', onClick, disabled, className = '', icon: Icon, loading }) {
  const variants = {
    default: 'border-dark-border text-gray-400 hover:text-accent-green hover:border-accent-green/30 bg-dark-bg',
    primary: 'border-accent-green text-accent-green hover:bg-accent-green hover:text-black bg-transparent',
    danger: 'border-accent-red text-accent-red hover:bg-accent-red hover:text-white bg-transparent',
    blue: 'border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-black bg-transparent',
    ghost: 'border-transparent text-gray-400 hover:text-accent-green bg-transparent',
  }
  const sizes = {
    xs: 'px-2 py-1 text-[10px]',
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-base',
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center gap-2 rounded border font-mono uppercase tracking-wide transition-all duration-200 cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading ? (
        <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon ? (
        <Icon size={size === 'xs' ? 10 : size === 'sm' ? 12 : 14} />
      ) : null}
      {children}
    </motion.button>
  )
}
