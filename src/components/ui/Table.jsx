export default function Table({ columns, data, onRowClick }) {
  return (
    <div className="overflow-x-auto custom-scrollbar rounded-lg border border-dark-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-dark-border bg-dark-hover">
            {columns.map(col => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-[10px] font-mono text-gray-500 uppercase tracking-widest whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-dark-border/50 transition-colors
                ${onRowClick ? 'cursor-pointer hover:bg-dark-hover' : ''}
              `}
            >
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3 text-xs text-gray-400 font-mono whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-600 font-mono text-xs">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
