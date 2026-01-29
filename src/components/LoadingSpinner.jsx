function LoadingSpinner() {
  return (
    <div className="card p-12">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500 text-sm">Loading repositories...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
