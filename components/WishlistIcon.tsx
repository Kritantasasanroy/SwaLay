'use client'

import { useWishlist } from '@/contexts/WishlistContext'
import Link from 'next/link'

export default function WishlistIcon() {
  const { getTotalItems } = useWishlist()
  const totalItems = getTotalItems()

  return (
    <Link href="/wishlist" className="p-2 hover:bg-gray-700 rounded-full hover:scale-110 transition-all duration-300 relative group">
      <svg className="w-5 h-5 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
          {totalItems}
        </span>
      )}
    </Link>
  )
}