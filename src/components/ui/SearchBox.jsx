import { Search, X } from 'lucide-react'
import { useState } from 'react'

export default function SearchBox({ placeholder = 'Search...', value, onChange, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-dark-bg border border-dark-border rounded-lg pl-9 pr-8 py-2 text-xs font-mono text-gray-300
                   placeholder-gray-700 focus:outline-none focus:border-accent-green/30 focus:ring-1 focus:ring-accent-green/10
                   transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
        >
          <X size={12} />
        </button>
      )}
    </div>
  )
}
