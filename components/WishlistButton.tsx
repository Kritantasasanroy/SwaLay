'use client'

import { useState } from 'react'

/**
 * WISHLIST BUTTON - Client Component
 * 
 * This is a Client Component because it needs:
 * 1. Interactive state (added to wishlist or not)
 * 2. Click event handlers
 * 3. Dynamic UI updates
 * 4. Browser-only functionality
 * 
 * Client Components are perfect for interactive elements
 * that need to respond to user actions.
 */

interface WishlistButtonProps {
  productId: string
  productName: string
}

export default function WishlistButton({ productId, productName }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleWishlistToggle = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setIsInWishlist(!isInWishlist)
    setIsLoading(false)
    
    // Show feedback to user
    const action = isInWishlist ? 'removed from' : 'added to'
    alert(`${productName} ${action} wishlist!`)
  }

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={isLoading}
      className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
        isInWishlist
          ? 'bg-red-100 text-red-700 hover:bg-red-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
        <>
          {isInWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
        </>
      )}
    </button>
  )
}