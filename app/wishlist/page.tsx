'use client'

import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import Link from 'next/link'
import { useState } from 'react'

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null)

  const handleRemove = async (productId: string) => {
    setRemovingId(productId)
    await new Promise(resolve => setTimeout(resolve, 300))
    removeFromWishlist(productId)
    setRemovingId(null)
  }

  const handleAddToCart = async (product: any) => {
    setAddingToCartId(product.id)
    await new Promise(resolve => setTimeout(resolve, 500))
    addToCart(product)
    setAddingToCartId(null)
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center animate-fadeIn">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <svg className="w-full h-full text-gray-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h1>
              <p className="text-gray-400 mb-8">Save your favorite timepieces for later</p>
            </div>
            <Link
              href="/products"
              className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 font-medium"
            >
              Discover Timepieces
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 animate-slideUp">
          <h1 className="text-3xl font-bold text-white mb-4">
            My Wishlist ({items.length})
          </h1>
          <p className="text-gray-400">Your saved luxury timepieces</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div 
              key={item.product.id} 
              className={`bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500/50 transition-all duration-500 group animate-fadeIn ${
                removingId === item.product.id ? 'animate-pulse opacity-50 scale-95' : 'hover:scale-105 hover:-translate-y-2'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 p-8 relative overflow-hidden">
                <img 
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Floating heart */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.product.category}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    {item.product.originalPrice && (
                      <p className="text-gray-500 line-through text-sm">${item.product.originalPrice}</p>
                    )}
                    <p className="text-2xl font-bold text-yellow-400">${item.product.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Added</p>
                    <p className="text-xs text-gray-400">{new Date(item.addedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={() => handleAddToCart(item.product)}
                    disabled={addingToCartId === item.product.id}
                    className="w-full bg-yellow-500 text-black py-3 rounded-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 font-medium disabled:opacity-50"
                  >
                    {addingToCartId === item.product.id ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </span>
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="flex-1 border border-gray-600 text-white text-center py-3 rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleRemove(item.product.id)}
                      disabled={removingId === item.product.id}
                      className="px-4 py-3 border border-red-600 text-red-400 rounded-lg hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-300 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L7.586 12l-1.293 1.293a1 1 0 101.414 1.414L9 13.414l2.293 2.293a1 1 0 001.414-1.414L11.414 12l1.293-1.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Actions */}
        <div className="mt-12 flex justify-between items-center animate-slideUp">
          <button
            onClick={clearWishlist}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Clear Wishlist
          </button>
          <Link
            href="/products"
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}