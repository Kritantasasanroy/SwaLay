'use client'

import { Product } from '@/types/product'
import Link from 'next/link'
import { useMemo, useState } from 'react'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Client-side filtering for interactivity
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

  return (
    <div>
      {/* Client-side filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${product.inventory < 10 ? 'text-red-600' : 'text-green-600'}`}>
                  {product.inventory} in stock
                </span>
                <Link
                  href={`/products/${product.slug}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}