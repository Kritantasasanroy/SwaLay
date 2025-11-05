'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface CartDropdownProps {
  onClose: () => void
}

export default function CartDropdown({ onClose }: CartDropdownProps) {
  const { items, getTotalPrice, updateQuantity, removeFromCart } = useCart()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  if (items.length === 0) {
    return (
      <div ref={dropdownRef} className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6 w-80 animate-fadeIn">
        <h3 className="text-lg font-semibold text-white mb-4">Your Cart</h3>
        <p className="text-gray-400 text-center py-8">Your cart is empty</p>
        <Link
          href="/products"
          onClick={onClose}
          className="block w-full bg-yellow-500 text-black text-center py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
        >
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div ref={dropdownRef} className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6 w-96 animate-fadeIn">
      <h3 className="text-lg font-semibold text-white mb-4">Your Cart ({items.length})</h3>
      
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {items.map(item => (
          <div key={item.product.id} className="flex items-center space-x-3 bg-gray-700 p-3 rounded-lg">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="text-white text-sm font-medium">{item.product.name}</h4>
              <p className="text-yellow-400 text-sm">${item.product.price}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                className="w-6 h-6 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors flex items-center justify-center"
              >
                -
              </button>
              <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="w-6 h-6 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors flex items-center justify-center"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-red-400 hover:text-red-300 ml-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-600 pt-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white font-semibold">Total:</span>
          <span className="text-yellow-400 font-bold text-lg">${getTotalPrice().toFixed(2)}</span>
        </div>
        
        <div className="space-y-2">
          <Link
            href="/cart"
            onClick={onClose}
            className="block w-full bg-gray-600 text-white text-center py-2 rounded-lg hover:bg-gray-500 transition-colors"
          >
            View Cart
          </Link>
          <Link
            href="/checkout"
            onClick={onClose}
            className="block w-full bg-yellow-500 text-black text-center py-2 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}