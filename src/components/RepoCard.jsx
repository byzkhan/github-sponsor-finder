import { getSponsorUrl, getRepoUrl } from '../utils/github'

function RepoCard({ repo }) {
  const sponsorUrl = getSponsorUrl(repo.owner.login)
  const repoUrl = getRepoUrl(repo.full_name)

  return (
    <div className="card hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5">
      <div className="flex items-start gap-3 mb-3">
        <img
          src={repo.owner.avatar_url}
          alt={`${repo.owner.login}'s avatar`}
          className="w-10 h-10 rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-slate-100 hover:text-emerald-400 transition-colors truncate block"
          >
            {repo.name}
          </a>
          <a
            href={`https://github.com/${repo.owner.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
          >
            {repo.owner.login}
          </a>
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-4 line-clamp-2">
        {repo.description || 'No description available'}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full" title="Total stars">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {repo.stargazers_count?.toLocaleString() || '0'}
        </span>
        {repo.stars_in_period > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium" title="Stars gained this period">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            +{repo.stars_in_period.toLocaleString()}
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          {repo.forks_count?.toLocaleString() || '0'}
        </span>
      </div>

      <a
        href={sponsorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full text-center block"
      >
        <span className="inline-flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          Sponsor {repo.owner.login}
        </span>
      </a>
    </div>
  )
}

export default RepoCard
