function Header({ wishlistCount, onWishlistClick }) {
  return (
    <header className="border-b border-green-900 bg-black/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-green-500 glow">
              <pre className="text-xs leading-none">
{`╔═══╗
║ $ ║
╚═══╝`}
              </pre>
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-400 glow tracking-wider">
                GITHUB_SPONSOR_FINDER
              </h1>
              <p className="text-green-700 text-xs tracking-widest">
                {'>'} DISCOVERING TRENDING REPOS...
              </p>
            </div>
          </div>

          <button
            onClick={onWishlistClick}
            className="flex items-center gap-2 px-4 py-2 border border-green-700 hover:border-green-400 hover:bg-green-950 rounded transition-all group"
          >
            <span className="text-green-500 group-hover:text-green-400">[</span>
            <svg className="w-4 h-4 text-green-500 group-hover:text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-green-500 group-hover:text-green-400 text-sm">WISHLIST</span>
            {wishlistCount > 0 && (
              <span className="bg-green-500 text-black text-xs font-bold px-1.5 py-0.5 rounded">
                {wishlistCount}
              </span>
            )}
            <span className="text-green-500 group-hover:text-green-400">]</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
