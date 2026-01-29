const GITHUB_API_BASE = 'https://api.github.com'
const TRENDING_API_BASE = 'https://api.ossinsight.io/v1/trends/repos'

export const TIME_PERIODS = {
  'daily': { label: 'Today', param: 'past_24_hours' },
  'weekly': { label: 'This week', param: 'past_week' },
  'monthly': { label: 'This month', param: 'past_month' },
}

// Fetch trending repos from OSS Insight API (powered by TiDB)
async function fetchTrendingRepos(timePeriod = 'weekly', language = '') {
  const period = TIME_PERIODS[timePeriod]?.param || 'past_week'

  let url = `${TRENDING_API_BASE}?period=${period}`
  if (language) {
    url += `&language=${encodeURIComponent(language)}`
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Trending API unavailable')
  }

  const json = await response.json()
  const rows = json.data?.rows || []

  // Transform to match our expected format
  return rows.map((repo, index) => {
    const [owner, name] = (repo.repo_name || '').split('/')
    return {
      id: repo.repo_id || index,
      name: name || repo.repo_name,
      full_name: repo.repo_name,
      description: repo.description,
      html_url: `https://github.com/${repo.repo_name}`,
      stargazers_count: parseInt(repo.stars) || 0,
      forks_count: parseInt(repo.forks) || 0,
      language: repo.primary_language,
      trending_score: parseFloat(repo.total_score) || 0,
      owner: {
        login: owner || repo.repo_name?.split('/')[0],
        avatar_url: `https://github.com/${owner || repo.repo_name?.split('/')[0]}.png`
      }
    }
  })
}

// Search GitHub API directly (for keyword searches)
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
