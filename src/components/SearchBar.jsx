import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="terminal-box">
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500"></div>
          <div className="terminal-dot bg-yellow-500"></div>
          <div className="terminal-dot bg-green-500"></div>
          <span className="text-green-700 text-xs ml-2">search.sh</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <span className="text-green-500">$</span>
            <span className="text-green-700">grep</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="enter_search_query..."
              className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-800"
            />
            <button
              type="submit"
              className="btn-primary"
            >
              [EXEC]
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
