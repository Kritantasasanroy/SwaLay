import { Product } from './product'

export interface WishlistItem {
  product: Product
  addedAt: string
}

export interface WishlistContextType {
  items: WishlistItem[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  getTotalItems: () => number
}