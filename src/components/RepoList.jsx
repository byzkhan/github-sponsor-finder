function RepoList({ repos, hasMore, loadingMore, onLoadMore, wishlist, onToggleWishlist }) {
  if (repos.length === 0) {
    return (
      <div className="card p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No repositories found</h3>
        <p className="text-gray-500">Try adjusting your filters or search for a different keyword</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Showing {repos.length} repositories
      </p>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Repository</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stars</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trending</th>
              <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Forks</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {repos.map((repo, index) => {
              const isInWishlist = wishlist.some(r => r.full_name === repo.full_name)
              return (
                <tr key={repo.id || repo.full_name} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-400">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={repo.owner?.avatar_url}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <a
                          href={`https://github.com/${repo.full_name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                        >
                          {repo.full_name}
                        </a>
                        <p className="text-xs text-gray-500 truncate max-w-xs">
                          {repo.description || 'No description'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {repo.language && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        {repo.language}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-gray-900 font-medium">
                    {repo.stargazers_count?.toLocaleString() || '0'}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {repo.stars_in_period > 0 ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        +{repo.stars_in_period.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right text-sm text-gray-500">
                    {repo.forks_count?.toLocaleString() || '0'}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onToggleWishlist(repo)}
                        className={`p-2 rounded-lg transition-colors ${
                          isInWishlist
                            ? 'bg-rose-100 text-rose-600'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                        }`}
                        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <svg className="w-4 h-4" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <a
                        href={`https://github.com/sponsors/${repo.owner?.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 text-gray-400 hover:bg-indigo-100 hover:text-indigo-600 rounded-lg transition-colors"
                        title="Sponsor"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            {loadingMore ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}

export default RepoList
