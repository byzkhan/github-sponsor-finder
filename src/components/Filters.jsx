import { TIME_PERIODS } from '../utils/github'

const LANGUAGES = [
  { value: '', label: 'All Languages' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java' },
  { value: 'c++', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'c#', label: 'C#' },
]

function Filters({
  timePeriod,
  onTimePeriodChange,
  language,
  onLanguageChange
}) {
  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 0.5rem center',
    backgroundSize: '1.5em 1.5em'
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="timePeriod" className="text-sm text-slate-400">
          Trending:
        </label>
        <select
          id="timePeriod"
          value={timePeriod}
          onChange={(e) => onTimePeriodChange(e.target.value)}
          className="input-field py-2 pr-8 appearance-none bg-no-repeat bg-right cursor-pointer font-medium text-emerald-400"
          style={selectStyle}
        >
          {Object.entries(TIME_PERIODS).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="language" className="text-sm text-slate-400">
          Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="input-field py-2 pr-8 appearance-none bg-no-repeat bg-right cursor-pointer"
          style={selectStyle}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Filters
