function LoadingSpinner() {
  return (
    <div className="terminal-box">
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500"></div>
        <div className="terminal-dot bg-yellow-500"></div>
        <div className="terminal-dot bg-green-500"></div>
        <span className="text-green-700 text-xs ml-2">loading.sh</span>
      </div>
      <div className="p-8 text-center">
        <pre className="text-green-500 text-xs animate-pulse">
{`
  ╔══════════════════════════════╗
  ║                              ║
  ║   FETCHING_DATA...           ║
  ║   ████████████░░░░░  75%     ║
  ║                              ║
  ╚══════════════════════════════╝
`}
        </pre>
        <p className="text-green-700 text-xs mt-4">
          {'>'} Connecting to GitHub API...
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner
