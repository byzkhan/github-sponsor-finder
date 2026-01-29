const GITHUB_API_BASE = 'https://api.github.com'

export const TIME_PERIODS = {
  '24h': { label: 'Last 24 hours', days: 1 },
  '7d': { label: 'Last 7 days', days: 7 },
  '30d': { label: 'Last 30 days', days: 30 },
  '90d': { label: 'Last 90 days', days: 90 },
  '1y': { label: 'Last year', days: 365 },
}

function getDateDaysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString().split('T')[0]
}

export async function searchRepositories(query = '', language = '', timePeriod = '7d', page = 1) {
  const days = TIME_PERIODS[timePeriod]?.days || 7
  const dateThreshold = getDateDaysAgo(days)

  let searchQuery = `pushed:>${dateThreshold} stars:>100`

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

export function getSponsorUrl(ownerLogin) {
  return `https://github.com/sponsors/${ownerLogin}`
}

export function getRepoUrl(fullName) {
  return `https://github.com/${fullName}`
}
