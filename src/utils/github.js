const GITHUB_API_BASE = 'https://api.github.com'
const TRENDING_API_BASE = 'https://api.ossinsight.io/v1/trends/repos'

export const TIME_PERIODS = {
  'daily': { label: 'Today', param: 'past_24_hours' },
  'weekly': { label: 'This week', param: 'past_week' },
  'monthly': { label: 'This month', param: 'past_month' },
}

// Fetch real-time repo data from GitHub API
async function fetchRepoDetails(fullName) {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${fullName}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

// Fetch user data to check sponsorship status
async function fetchUserDetails(username) {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
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
      stars_in_period: parseInt(repo.stars) || 0,
      forks_in_period: parseInt(repo.forks) || 0,
      language: repo.primary_language,
      trending_score: parseFloat(repo.total_score) || 0,
      owner: {
        login: owner || repo.repo_name?.split('/')[0],
        avatar_url: `https://github.com/${owner || repo.repo_name?.split('/')[0]}.png`
      }
    }
  })
}

// Enrich trending repos with real-time GitHub data
async function enrichWithGitHubData(repos) {
  const enrichedRepos = await Promise.all(
    repos.map(async (repo) => {
      // Fetch repo and user data in parallel
      const [githubData, userData] = await Promise.all([
        fetchRepoDetails(repo.full_name),
        fetchUserDetails(repo.owner.login)
      ])

      const is_sponsorable = userData?.is_sponsoring !== undefined ||
                             userData?.has_sponsors_listing === true

      if (githubData) {
        return {
          ...repo,
          id: githubData.id,
          name: githubData.name,
          full_name: githubData.full_name,
          description: githubData.description,
          stargazers_count: githubData.stargazers_count,
          forks_count: githubData.forks_count,
          language: githubData.language,
          is_sponsorable,
          owner: {
            login: githubData.owner.login,
            avatar_url: githubData.owner.avatar_url
          }
        }
      }
      // Fallback to OSS Insight data if GitHub fetch fails
      return {
        ...repo,
        stargazers_count: repo.stars_in_period,
        forks_count: repo.forks_in_period,
        is_sponsorable
      }
    })
  )
  return enrichedRepos
}

// Enrich search results with sponsorship data
async function enrichSearchResultsWithSponsorship(repos) {
  const enrichedRepos = await Promise.all(
    repos.map(async (repo) => {
      const userData = await fetchUserDetails(repo.owner.login)
      const is_sponsorable = userData?.is_sponsoring !== undefined ||
                             userData?.has_sponsors_listing === true
      return {
        ...repo,
        is_sponsorable
      }
    })
  )
  return enrichedRepos
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

  // Enrich with sponsorship data
  const enrichedRepos = await enrichSearchResultsWithSponsorship(data.items || [])

  return {
    repos: enrichedRepos,
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

    // Enrich with real-time GitHub data (current name, total stars, sponsorship)
    const enrichedRepos = await enrichWithGitHubData(paginatedRepos)

    return {
      repos: enrichedRepos,
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
