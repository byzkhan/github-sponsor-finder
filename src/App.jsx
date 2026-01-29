import { useState, useCallback } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import RepoList from './components/RepoList'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import { useGitHubSearch } from './hooks/useGitHubSearch'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [language, setLanguage] = useState('')
  const [timePeriod, setTimePeriod] = useState('7d')
  const [showSponsorableOnly, setShowSponsorableOnly] = useState(false)

  const { repos, loading, loadingMore, error, hasMore, search, loadMore, retry } = useGitHubSearch()

  const handleSearch = useCallback((query) => {
    setSearchQuery(query)
    search(query, language, timePeriod)
  }, [language, timePeriod, search])

  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang)
    search(searchQuery, lang, timePeriod)
  }, [searchQuery, timePeriod, search])

  const handleTimePeriodChange = useCallback((period) => {
    setTimePeriod(period)
    search(searchQuery, language, period)
  }, [searchQuery, language, search])

  const filteredRepos = showSponsorableOnly
    ? repos.filter(repo => repo.owner?.login)
    : repos

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <SearchBar onSearch={handleSearch} />

          <Filters
            timePeriod={timePeriod}
            onTimePeriodChange={handleTimePeriodChange}
            language={language}
            onLanguageChange={handleLanguageChange}
            showSponsorableOnly={showSponsorableOnly}
            onSponsorableToggle={() => setShowSponsorableOnly(!showSponsorableOnly)}
          />

          {loading && <LoadingSpinner />}

          {error && <ErrorMessage message={error} onRetry={retry} />}

          {!loading && !error && (
            <RepoList
              repos={filteredRepos}
              hasMore={hasMore}
              loadingMore={loadingMore}
              onLoadMore={loadMore}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
