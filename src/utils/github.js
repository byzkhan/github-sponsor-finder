const GITHUB_API_BASE = 'https://api.github.com'
const TRENDING_API_BASE = 'https://api.gitterapp.com'

export const TIME_PERIODS = {
  'daily': { label: 'Today', param: 'daily' },
  'weekly': { label: 'This week', param: 'weekly' },
  'monthly': { label: 'This month', param: 'monthly' },
}

// Fetch trending repos from unofficial GitHub trending API
async function fetchTrendingRepos(timePeriod = 'weekly', language = '') {
  const since = TIME_PERIODS[timePeriod]?.param || 'weekly'

  let url = `${TRENDING_API_BASE}/repositories?since=${since}`
  if (language) {
    url += `&language=${encodeURIComponent(language)}`
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Trending API unavailable. Falling back to search.')
  }

  const repos = await response.json()

  // Transform to match GitHub API format
  return repos.map(repo => ({
    id: repo.rank || Math.random(),
    name: repo.name || repo.repositoryName,
    full_name: `${repo.username || repo.author}/${repo.name || repo.repositoryName}`,
    description: repo.description,
    html_url: repo.url,
    stargazers_count: parseInt(repo.totalStars || repo.stars?.replace(/,/g, '') || 0),
    currentPeriodStars: parseInt(repo.currentPeriodStars || repo.starsInPeriod || repo.stars?.replace(/,/g, '') || 0),
    forks_count: parseInt(repo.forks?.replace(/,/g, '') || 0),
    language: repo.language,
    owner: {
      login: repo.username || repo.author,
      avatar_url: repo.avatar || repo.builtBy?.[0]?.avatar || `https://github.com/${repo.username || repo.author}.png`
    }
  }))
}

// Fallback: Search GitHub API directly
async function searchGitHubRepos(query = '', language = '', page = 1) {
  let searchQuery = 'stars:>50'

  if (query.trim()) {
    searchQuery = `${query.trim()} ${searchQuery}`
  }

  if (language) {
    searchQuery += ` language:${language}`
  }

  const params = new URLSearchParams({
    q: searchQuery,
    sort: 'stars',
    order: 'desc',
    per_page: '10',
    page: String(page)
  })

  const response = await fetch(`${GITHUB_API_BASE}/search/repositories?${params}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })

  if (!response.ok) {
    if (response.status === 403) {
      const rateLimitReset = response.headers.get('X-RateLimit-Reset')
      if (rateLimitReset) {
        const resetTime = new Date(parseInt(rateLimitReset) * 1000)
        const waitSeconds = Math.ceil((resetTime - new Date()) / 1000)
        throw new Error(`Rate limit exceeded. Please wait ${waitSeconds} seconds before trying again.`)
      }
      throw new Error('Rate limit exceeded. Please wait a moment before trying again.')
    }
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return {
    repos: data.items || [],
    totalCount: data.total_count || 0,
    hasMore: (page * 10) < (data.total_count || 0)
  }
}

export async function searchRepositories(query = '', language = '', timePeriod = 'weekly', page = 1) {
  // If there's a search query, use GitHub search API
  if (query.trim()) {
    return searchGitHubRepos(query, language, page)
  }

  // Otherwise, fetch trending repos
  try {
    const trendingRepos = await fetchTrendingRepos(timePeriod, language)

    // Paginate client-side (API returns all at once)
    const startIndex = (page - 1) * 10
    const endIndex = startIndex + 10
    const paginatedRepos = trendingRepos.slice(startIndex, endIndex)

    return {
      repos: paginatedRepos,
      totalCount: trendingRepos.length,
      hasMore: endIndex < trendingRepos.length
    }
  } catch (error) {
    // Fallback to GitHub search if trending API fails
    console.warn('Trending API failed, falling back to GitHub search:', error)
    return searchGitHubRepos('', language, page)
  }
}

export function getSponsorUrl(ownerLogin) {
  return `https://github.com/sponsors/${ownerLogin}`
}

export function getRepoUrl(fullName) {
  return `https://github.com/${fullName}`
}
