'use client'

import { useWishlist } from '@/contexts/WishlistContext'
import { Product } from '@/types/product'
import { useState } from 'react'

interface WishlistButtonProps {
  product: Product
}

export default function WishlistButton({ product }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isLoading, setIsLoading] = useState(false)
  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
    
    setIsLoading(false)
  }

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={isLoading}
      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
        inWishlist
          ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
          : 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center justify-center">
          {inWishlist ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              Remove from Wishlist
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Add to Wishlist
            </>
          )}
        </span>
      )}
    </button>
  )
}