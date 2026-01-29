import { TIME_PERIODS } from '../utils/github'

const LANGUAGES = [
  { value: '', label: 'ALL' },
  { value: 'javascript', label: 'JS' },
  { value: 'typescript', label: 'TS' },
  { value: 'python', label: 'PY' },
  { value: 'rust', label: 'RS' },
  { value: 'go', label: 'GO' },
  { value: 'java', label: 'JAVA' },
  { value: 'c++', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'ruby', label: 'RB' },
  { value: 'php', label: 'PHP' },
  { value: 'swift', label: 'SWIFT' },
  { value: 'kotlin', label: 'KT' },
  { value: 'c#', label: 'C#' },
]

function Filters({
  timePeriod,
  onTimePeriodChange,
  language,
  onLanguageChange
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs">
      <div className="flex items-center gap-2">
        <span className="text-green-700">--period=</span>
        <select
          value={timePeriod}
          onChange={(e) => onTimePeriodChange(e.target.value)}
          className="bg-black border border-green-800 rounded px-3 py-1.5 text-green-400 focus:outline-none focus:border-green-500 cursor-pointer"
        >
          {Object.entries(TIME_PERIODS).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-green-700">--lang=</span>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-black border border-green-800 rounded px-3 py-1.5 text-green-400 focus:outline-none focus:border-green-500 cursor-pointer"
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
