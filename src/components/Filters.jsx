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
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="timePeriod" className="text-sm text-gray-600">
          Trending:
        </label>
        <select
          id="timePeriod"
          value={timePeriod}
          onChange={(e) => onTimePeriodChange(e.target.value)}
          className="input-field py-2 pr-8 text-sm"
        >
          {Object.entries(TIME_PERIODS).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="language" className="text-sm text-gray-600">
          Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="input-field py-2 pr-8 text-sm"
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
