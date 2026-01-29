function ErrorMessage({ message, onRetry }) {
  return (
    <div className="terminal-box border-red-900">
      <div className="terminal-header bg-red-950/50">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <span className="text-red-500 text-xs ml-2">error.log</span>
      </div>
      <div className="p-6">
        <pre className="text-red-500 text-xs mb-4">
{`
  ╔══════════════════════════════════════╗
  ║  ⚠ ERROR_DETECTED                    ║
  ╚══════════════════════════════════════╝
`}
        </pre>
        <p className="text-red-400 text-sm mb-4 font-mono">
          {'>'} {message}
        </p>
        <button
          onClick={onRetry}
          className="px-4 py-2 border border-red-700 text-red-500 hover:bg-red-950 hover:border-red-500 rounded text-xs transition-all"
        >
          [RETRY]
        </button>
      </div>
    </div>
  )
}

export default ErrorMessage
