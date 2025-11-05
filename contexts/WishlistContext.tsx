'use client'

import { Product } from '@/types/product'
import { WishlistContextType, WishlistItem } from '@/types/wishlist'
import React, { createContext, useContext, useEffect, useReducer } from 'react'

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; product: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; productId: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; items: WishlistItem[] }

function wishlistReducer(state: WishlistItem[], action: WishlistAction): WishlistItem[] {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const existingItem = state.find(item => item.product.id === action.product.id)
      if (existingItem) {
        return state // Already in wishlist
      }
      return [...state, { product: action.product, addedAt: new Date().toISOString() }]
    }
    case 'REMOVE_FROM_WISHLIST':
      return state.filter(item => item.product.id !== action.productId)
    case 'CLEAR_WISHLIST':
      return []
    case 'LOAD_WISHLIST':
      return action.items
    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(wishlistReducer, [])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('swalay-wishlist')
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        dispatch({ type: 'LOAD_WISHLIST', items: parsedWishlist })
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('swalay-wishlist', JSON.stringify(items))
  }, [items])

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', product })
  }

  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', productId })
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
  }

  const isInWishlist = (productId: string) => {
    return items.some(item => item.product.id === productId)
  }

  const getTotalItems = () => {
    return items.length
  }

  const value: WishlistContextType = {
    items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getTotalItems
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}