'use client'

import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'
import CartDropdown from './CartDropdown'

export default function CartIcon() {
  const { getTotalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const totalItems = getTotalItems()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-700 rounded-full hover:scale-110 transition-all duration-300 relative"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50">
          <CartDropdown onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  )
}