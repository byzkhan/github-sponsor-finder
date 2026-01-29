function RepoList({ repos, hasMore, loadingMore, onLoadMore, wishlist, onToggleWishlist }) {
  if (repos.length === 0) {
    return (
      <div className="terminal-box">
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500"></div>
          <div className="terminal-dot bg-yellow-500"></div>
          <div className="terminal-dot bg-green-500"></div>
          <span className="text-green-700 text-xs ml-2">output.log</span>
        </div>
        <div className="p-8 text-center">
          <p className="text-green-700">{'>'} NO_RESULTS_FOUND</p>
          <p className="text-green-800 text-sm mt-2">Try adjusting filters or search query...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-green-700 text-xs">
        {'>'} FOUND {repos.length} REPOSITORIES
      </div>

      <div className="terminal-box overflow-x-auto">
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500"></div>
          <div className="terminal-dot bg-yellow-500"></div>
          <div className="terminal-dot bg-green-500"></div>
          <span className="text-green-700 text-xs ml-2">repos.dat</span>
        </div>

        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-green-900 text-green-600">
              <th className="text-left py-3 px-4 font-semibold tracking-wider">IDX</th>
              <th className="text-left py-3 px-4 font-semibold tracking-wider">REPOSITORY</th>
              <th className="text-left py-3 px-4 font-semibold tracking-wider">LANG</th>
              <th className="text-right py-3 px-4 font-semibold tracking-wider">STARS</th>
              <th className="text-right py-3 px-4 font-semibold tracking-wider">+NEW</th>
              <th className="text-right py-3 px-4 font-semibold tracking-wider">FORKS</th>
              <th className="text-center py-3 px-4 font-semibold tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo, index) => {
              const isInWishlist = wishlist.some(r => r.full_name === repo.full_name)
              return (
                <tr
                  key={repo.id || repo.full_name}
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
                  <td className="py-3 px-4 text-right font-mono">
                    {repo.stars_in_period > 0 ? (
                      <span className="text-green-300">+{repo.stars_in_period.toLocaleString()}</span>
                    ) : (
                      <span className="text-green-800">--</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right text-green-600 font-mono">
                    {repo.forks_count?.toLocaleString() || '0'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onToggleWishlist(repo)}
                        className={`p-1.5 rounded transition-colors ${
                          isInWishlist
                            ? 'bg-green-500 text-black'
                            : 'border border-green-800 text-green-700 hover:border-green-500 hover:text-green-500'
                        }`}
                        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <svg className="w-3.5 h-3.5" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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
              )
            })}
          </tbody>
        </table>
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="btn-secondary"
          >
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <span className="animate-pulse">LOADING</span>
                <span className="animate-bounce">...</span>
              </span>
            ) : (
              '[LOAD_MORE]'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default RepoList
