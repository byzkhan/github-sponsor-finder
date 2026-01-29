const WISHLIST_KEY = 'github-sponsor-wishlist'

export function getWishlist() {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function addToWishlist(repo) {
  const wishlist = getWishlist()
  // Check if already in wishlist
  if (wishlist.some(r => r.full_name === repo.full_name)) {
    return wishlist
  }
  const updated = [...wishlist, repo]
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated))
  return updated
}

export function removeFromWishlist(fullName) {
  const wishlist = getWishlist()
  const updated = wishlist.filter(r => r.full_name !== fullName)
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated))
  return updated
}

export function isInWishlist(fullName) {
  const wishlist = getWishlist()
  return wishlist.some(r => r.full_name === fullName)
}
