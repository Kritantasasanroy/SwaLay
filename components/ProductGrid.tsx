'use client'

import { useCart } from '@/contexts/CartContext'
import { Product } from '@/types/product'
import Link from 'next/link'
import { useMemo, useState } from 'react'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { addToCart, isInCart } = useCart()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)))
  }, [products])

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.id)
    await new Promise(resolve => setTimeout(resolve, 500)) // Animation delay
    addToCart(product)
    setAddingToCart(null)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
  }

  return (
    <div id="products" className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Our Collection</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover our curated selection of luxury timepieces, each crafted with precision and elegance.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search timepieces..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-all duration-300 group border border-gray-700">
            <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 p-8">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                    {product.name}
                  </h3>
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  {product.originalPrice && (
                    <p className="text-gray-500 line-through text-sm">${product.originalPrice}</p>
                  )}
                  <p className="text-2xl font-bold text-yellow-400">${product.price}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${product.inventory < 10 ? 'text-red-400' : 'text-green-400'}`}>
                    {product.inventory} in stock
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.inventory === 0 || addingToCart === product.id}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                    product.inventory === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : isInCart(product.id)
                      ? 'bg-green-600 text-white hover:bg-green-500'
                      : 'bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-105'
                  }`}
                >
                  {addingToCart === product.id ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </span>
                  ) : product.inventory === 0 ? (
                    'Out of Stock'
                  ) : isInCart(product.id) ? (
                    '✓ In Cart'
                  ) : (
                    'Add to Cart'
                  )}
                </button>
                
                <Link
                  href={`/products/${product.slug}`}
                  className="block w-full border border-gray-600 text-white text-center py-3 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No timepieces found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}