function Wishlist({ repos, onToggleWishlist, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="card">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
                <p className="text-gray-500 text-sm mt-1">
                  {repos.length} {repos.length === 1 ? 'repository' : 'repositories'} saved
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {repos.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500">Click the heart icon on any repository to add it to your wishlist</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Repository</th>
                    <th className="text-left py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</th>
                    <th className="text-right py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stars</th>
                    <th className="text-right py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Forks</th>
                    <th className="text-center py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {repos.map((repo, index) => (
                    <tr key={repo.full_name} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm text-gray-400">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6">
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
                      <td className="py-4 px-6">
                        {repo.language && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                            {repo.language}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right text-sm text-gray-900 font-medium">
                        {repo.stargazers_count?.toLocaleString() || '0'}
                      </td>
                      <td className="py-4 px-6 text-right text-sm text-gray-500">
                        {repo.forks_count?.toLocaleString() || '0'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onToggleWishlist(repo)}
                            className="p-2 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-lg transition-colors"
                            title="Remove from wishlist"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wishlist
