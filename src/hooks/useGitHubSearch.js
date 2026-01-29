import { useState, useCallback, useRef, useEffect } from 'react'
import { searchRepositories } from '../utils/github'

export function useGitHubSearch() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)
  const [lastSearch, setLastSearch] = useState({ query: '', language: '', timePeriod: '7d' })
  const [initialized, setInitialized] = useState(false)

  const debounceTimeout = useRef(null)

  const search = useCallback((query, language = '', timePeriod = '7d', resetPage = true) => {
    const newPage = resetPage ? 1 : page
    setLastSearch({ query, language, timePeriod })

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(async () => {
      setLoading(true)
      setError(null)
      if (resetPage) {
        setPage(1)
      }

      try {
        const result = await searchRepositories(query, language, timePeriod, newPage)
        setRepos(result.repos)
        setHasMore(result.hasMore)
        setInitialized(true)
      } catch (err) {
        setError(err.message)
        setRepos([])
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    }, 500)
  }, [page])

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)
    const nextPage = page + 1

    try {
      const result = await searchRepositories(
        lastSearch.query,
        lastSearch.language,
        lastSearch.timePeriod,
        nextPage
      )
      setRepos(prev => [...prev, ...result.repos])
      setHasMore(result.hasMore)
      setPage(nextPage)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, hasMore, page, lastSearch])

  const retry = useCallback(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    setLoading(true)
    setError(null)

    searchRepositories(lastSearch.query, lastSearch.language, lastSearch.timePeriod, 1)
      .then(result => {
        setRepos(result.repos)
        setHasMore(result.hasMore)
        setPage(1)
      })
      .catch(err => {
        setError(err.message)
        setRepos([])
        setHasMore(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [lastSearch])

  // Auto-load on mount
  useEffect(() => {
    if (!initialized) {
      search('', '', '7d')
    }
  }, [initialized, search])

  return {
    repos,
    loading,
    loadingMore,
    error,
    hasMore,
    search,
    loadMore,
    retry
  }
}
