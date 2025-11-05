'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const { items, getTotalPrice, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isClearing, setIsClearing] = useState(false)

  const handleClearCart = async () => {
    setIsClearing(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Animation delay
    clearCart()
    setIsClearing(false)
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="mb-8">
              <svg className="w-24 h-24 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
              <p className="text-gray-400 mb-8">Looks like you haven't added any timepieces to your cart yet.</p>
            </div>
            <Link
              href="/products"
              className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 font-medium"
            >
              Shop Timepieces
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 animate-slideDown">
          <h1 className="text-3xl font-bold text-white mb-4 animate-fadeIn">Shopping Cart</h1>
          <p className="text-gray-400 animate-slideUp" style={{animationDelay: '0.2s'}}>Review your selected timepieces</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={item.product.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 group hover-lift animate-slideRight" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{item.product.category}</p>
                    <p className="text-yellow-400 font-bold text-lg">${item.product.price}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3 bg-gray-700 rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-600 text-white rounded-full hover:bg-gray-500 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-600 text-white rounded-full hover:bg-gray-500 hover:scale-110 transition-all duration-300 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-bold text-lg">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition-all duration-300 p-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L7.586 12l-1.293 1.293a1 1 0 101.414 1.414L9 13.414l2.293 2.293a1 1 0 001.414-1.414L11.414 12l1.293-1.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
              >
                {isClearing ? 'Clearing...' : 'Clear Cart'}
              </button>
              <Link
                href="/products"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal ({items.length} items)</span>
                  <span className="text-white">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-lg font-bold text-yellow-400">
                      ${(getTotalPrice() * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-yellow-500 text-black text-center py-3 rounded-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 font-semibold"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure checkout
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free shipping on all orders
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  30-day return policy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}