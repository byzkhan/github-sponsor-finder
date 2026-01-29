import { useState, useCallback } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import RepoList from './components/RepoList'
import Wishlist from './components/Wishlist'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import { useGitHubSearch } from './hooks/useGitHubSearch'
import { getWishlist, addToWishlist, removeFromWishlist } from './utils/wishlist'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [timePeriod, setTimePeriod] = useState('weekly')
  const [wishlist, setWishlist] = useState(() => getWishlist())
  const [showWishlist, setShowWishlist] = useState(false)

  const { repos, loading, loadingMore, error, hasMore, search, loadMore, retry } = useGitHubSearch()

  const handleSearch = useCallback((query) => {
    setSearchQuery(query)
    search(query, '', timePeriod)
  }, [timePeriod, search])

  const handleTimePeriodChange = useCallback((period) => {
    setTimePeriod(period)
    search(searchQuery, '', period)
  }, [searchQuery, search])

  const handleToggleWishlist = useCallback((repo) => {
    const isInList = wishlist.some(r => r.full_name === repo.full_name)
    if (isInList) {
      const updated = removeFromWishlist(repo.full_name)
      setWishlist(updated)
    } else {
      const updated = addToWishlist(repo)
      setWishlist(updated)
    }
  }, [wishlist])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        wishlistCount={wishlist.length}
        onWishlistClick={() => setShowWishlist(true)}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <SearchBar onSearch={handleSearch} />

          <Filters
            timePeriod={timePeriod}
            onTimePeriodChange={handleTimePeriodChange}
          />

          {loading && <LoadingSpinner />}

          {error && <ErrorMessage message={error} onRetry={retry} />}

          {!loading && !error && (
            <RepoList
              repos={repos}
              hasMore={hasMore}
              loadingMore={loadingMore}
              onLoadMore={loadMore}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          )}
        </div>
      </main>

      {showWishlist && (
        <Wishlist
          repos={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onClose={() => setShowWishlist(false)}
        />
      )}
    </div>
  )
}

export default App
