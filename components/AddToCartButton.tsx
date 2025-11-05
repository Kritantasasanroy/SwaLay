'use client'

import { useCart } from '@/contexts/CartContext'
import { Product } from '@/types/product'
import { useState } from 'react'

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Animation delay
    addToCart(product, quantity)
    setIsAdding(false)
  }

  const inCart = isInCart(product.id)

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-white font-medium">Quantity:</span>
        <div className="flex items-center space-x-3 bg-gray-700 rounded-lg p-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 bg-gray-600 text-white rounded-full hover:bg-gray-500 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            -
          </button>
          <span className="text-white font-medium w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
            className="w-8 h-8 bg-gray-600 text-white rounded-full hover:bg-gray-500 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={product.inventory === 0 || isAdding}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
          product.inventory === 0
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : inCart
            ? 'bg-green-600 text-white hover:bg-green-500 hover:scale-105'
            : 'bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-105'
        } ${className}`}
      >
        {isAdding ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding to Cart...
          </span>
        ) : product.inventory === 0 ? (
          'Out of Stock'
        ) : inCart ? (
          '✓ Added to Cart'
        ) : (
          `Add ${quantity} to Cart`
        )}
      </button>
    </div>
  )
}