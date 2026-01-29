function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-slate-400 text-sm">Searching repositories...</p>
    </div>
  )
}

export default LoadingSpinner
