function Wishlist({ repos, onToggleWishlist, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto scanlines">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-green-400 glow tracking-wider">
                {'>'} MY_WISHLIST.dat
              </h2>
              <p className="text-green-700 text-xs mt-1">
                {repos.length} {repos.length === 1 ? 'entry' : 'entries'} stored
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-green-700 hover:border-green-400 hover:bg-green-950 rounded text-green-500 hover:text-green-400 transition-all text-sm"
            >
              [ESC] CLOSE
            </button>
          </div>

          {repos.length === 0 ? (
            <div className="terminal-box">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
                <span className="text-green-700 text-xs ml-2">wishlist.log</span>
              </div>
              <div className="p-8 text-center">
                <pre className="text-green-700 text-xs">
{`
  ╔════════════════════════════════╗
  ║                                ║
  ║    WISHLIST_EMPTY              ║
  ║                                ║
  ║    Click ♥ to add repos        ║
  ║                                ║
  ╚════════════════════════════════╝
`}
                </pre>
              </div>
            </div>
          ) : (
            <div className="terminal-box overflow-x-auto">
              <div className="terminal-header">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
                <span className="text-green-700 text-xs ml-2">wishlist.dat</span>
              </div>

              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-green-900 text-green-600">
                    <th className="text-left py-3 px-4 font-semibold tracking-wider">IDX</th>
                    <th className="text-left py-3 px-4 font-semibold tracking-wider">REPOSITORY</th>
                    <th className="text-left py-3 px-4 font-semibold tracking-wider">LANG</th>
                    <th className="text-right py-3 px-4 font-semibold tracking-wider">STARS</th>
                    <th className="text-right py-3 px-4 font-semibold tracking-wider">FORKS</th>
                    <th className="text-center py-3 px-4 font-semibold tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {repos.map((repo, index) => (
                    <tr
                      key={repo.full_name}
                      className="border-b border-green-950 hover:bg-green-950/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-green-700">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={repo.owner?.avatar_url}
                            alt=""
                            className="w-6 h-6 rounded border border-green-900"
                          />
                          <div>
                            <a
                              href={`https://github.com/${repo.full_name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-400 hover:text-green-300 font-medium"
                            >
                              {repo.full_name}
                            </a>
                            <p className="text-green-800 text-[10px] truncate max-w-xs">
                              {repo.description || 'No description'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-green-500 bg-green-950 px-2 py-0.5 rounded text-[10px]">
                          {repo.language || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-green-400 font-mono">
                        {repo.stargazers_count?.toLocaleString() || '0'}
                      </td>
                      <td className="py-3 px-4 text-right text-green-600 font-mono">
                        {repo.forks_count?.toLocaleString() || '0'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onToggleWishlist(repo)}
                            className="p-1.5 bg-red-900/50 text-red-500 hover:bg-red-900 rounded transition-colors"
                            title="Remove from wishlist"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <a
                            href={`https://github.com/sponsors/${repo.owner?.login}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 border border-green-800 text-green-700 hover:border-green-500 hover:text-green-500 rounded transition-colors"
                            title="Sponsor"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
