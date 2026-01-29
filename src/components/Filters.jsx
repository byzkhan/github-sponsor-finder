import { TIME_PERIODS } from '../utils/github'

function Filters({ timePeriod, onTimePeriodChange }) {
  return (
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
  )
}

export default Filters
