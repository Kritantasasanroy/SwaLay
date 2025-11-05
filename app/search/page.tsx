'use client'

import productsData from '@/data/products.json'
import { Product } from '@/types/product'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('name')
  const [isLoading, setIsLoading] = useState(false)

  const products: Product[] = productsData

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)))
  }, [products])

  const filteredAndSortedProducts = useMemo(() => {
    setIsLoading(true)
    
    let filtered = products.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category)
      
      return matchesSearch && matchesPrice && matchesCategory
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        default:
          return 0
      }
    })

    setTimeout(() => setIsLoading(false), 300)
    return filtered
  }, [products, searchQuery, priceRange, selectedCategories, sortBy])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8 animate-slideUp">
          <h1 className="text-3xl font-bold text-white mb-4">
            Search Timepieces
          </h1>
          <p className="text-gray-400">
            Find your perfect luxury watch with advanced filtering
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6 animate-fadeIn">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
              
              {/* Search Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search watches..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full accent-yellow-500"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-yellow-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Categories
                </label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="mr-3 accent-yellow-500"
                      />
                      <span className="text-gray-300 group-hover:text-yellow-400 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchQuery('')
                  setPriceRange([0, 10000])
                  setSelectedCategories([])
                  setSortBy('name')
                }}
                className="w-full mt-6 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6 animate-slideUp">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {isLoading ? 'Searching...' : `${filteredAndSortedProducts.length} Results`}
                </h2>
                {searchQuery && (
                  <p className="text-gray-400 text-sm">
                    Showing results for "{searchQuery}"
                  </p>
                )}
              </div>
              
              {isLoading && (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
              )}
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                    <div className="aspect-square bg-gray-700 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fadeIn">
                <div className="w-24 h-24 mx-auto mb-6 text-gray-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setPriceRange([0, 10000])
                    setSelectedCategories([])
                  }}
                  className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Product Card Component for Search Results
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 group hover:scale-105 hover:-translate-y-1">
      <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 p-6">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm">{product.category}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            {product.originalPrice && (
              <p className="text-gray-500 line-through text-sm">${product.originalPrice}</p>
            )}
            <p className="text-xl font-bold text-yellow-400">${product.price}</p>
          </div>
          <p className={`text-sm ${product.inventory < 10 ? 'text-red-400' : 'text-green-400'}`}>
            {product.inventory} in stock
          </p>
        </div>
      </div>
    </div>
  )
}