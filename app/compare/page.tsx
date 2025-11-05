'use client'

import productsData from '@/data/products.json'
import { Product } from '@/types/product'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [availableProducts, setAvailableProducts] = useState<Product[]>(productsData)

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('swalay-compare')
    if (saved) {
      try {
        const productIds = JSON.parse(saved)
        const products = productsData.filter(p => productIds.includes(p.id))
        setSelectedProducts(products)
      } catch (error) {
        console.error('Error loading comparison:', error)
      }
    }
  }, [])

  useEffect(() => {
    // Save to localStorage
    const productIds = selectedProducts.map(p => p.id)
    localStorage.setItem('swalay-compare', JSON.stringify(productIds))
  }, [selectedProducts])

  const addProduct = (product: Product) => {
    if (selectedProducts.length < 4 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product])
    }
  }

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  const clearAll = () => {
    setSelectedProducts([])
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8 animate-slideUp">
          <h1 className="text-3xl font-bold text-white mb-4">
            Compare Timepieces
          </h1>
          <p className="text-gray-400">
            Compare up to 4 luxury watches side by side
          </p>
        </div>

        {selectedProducts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 animate-fadeIn">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <svg className="w-full h-full text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Start Comparing</h2>
            <p className="text-gray-400 mb-8">Select timepieces to compare their features</p>
            
            {/* Product Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {availableProducts.slice(0, 6).map((product, index) => (
                <div 
                  key={product.id}
                  className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer group animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => addProduct(product)}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-lg mb-3">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-white font-medium group-hover:text-yellow-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Comparison Table */
          <div className="animate-slideUp">
            {/* Actions */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">
                Comparing {selectedProducts.length} of 4 timepieces
              </p>
              <div className="space-x-4">
                <button
                  onClick={clearAll}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Clear All
                </button>
                {selectedProducts.length < 4 && (
                  <span className="text-yellow-400">Add more to compare</span>
                )}
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-6 text-gray-400 font-medium w-48">Features</th>
                      {selectedProducts.map((product, index) => (
                        <th key={product.id} className="text-center p-6 min-w-64">
                          <div className="animate-fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className="relative group">
                              <img 
                                src={product.image}
                                alt={product.name}
                                className="w-24 h-24 object-cover rounded-lg mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                              />
                              <button
                                onClick={() => removeProduct(product.id)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                            <h3 className="text-white font-semibold">{product.name}</h3>
                            <p className="text-gray-400 text-sm">{product.category}</p>
                          </div>
                        </th>
                      ))}
                      {/* Empty slots */}
                      {[...Array(4 - selectedProducts.length)].map((_, i) => (
                        <th key={`empty-${i}`} className="text-center p-6 min-w-64">
                          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 hover:border-yellow-500/50 transition-colors cursor-pointer">
                            <div className="text-gray-500 text-sm">Add Product</div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Price */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                      <td className="p-6 font-medium text-white">Price</td>
                      {selectedProducts.map(product => (
                        <td key={product.id} className="p-6 text-center">
                          <div className="space-y-1">
                            {product.originalPrice && (
                              <div className="text-gray-500 line-through text-sm">${product.originalPrice}</div>
                            )}
                            <div className="text-2xl font-bold text-yellow-400">${product.price}</div>
                            {product.originalPrice && (
                              <div className="text-green-400 text-sm">
                                Save ${product.originalPrice - product.price}
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Inventory */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                      <td className="p-6 font-medium text-white">Availability</td>
                      {selectedProducts.map(product => (
                        <td key={product.id} className="p-6 text-center">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            product.inventory > 10 ? 'bg-green-500/20 text-green-400' :
                            product.inventory > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Movement */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                      <td className="p-6 font-medium text-white">Movement</td>
                      {selectedProducts.map(product => (
                        <td key={product.id} className="p-6 text-center text-gray-300">
                          Swiss Automatic
                        </td>
                      ))}
                    </tr>

                    {/* Case Size */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                      <td className="p-6 font-medium text-white">Case Size</td>
                      {selectedProducts.map(product => (
                        <td key={product.id} className="p-6 text-center text-gray-300">
                          42mm
                        </td>
                      ))}
                    </tr>

                    {/* Water Resistance */}
                    <tr className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                      <td className="p-6 font-medium text-white">Water Resistance</td>
                      {selectedProducts.map(product => (
                        <td key={product.id} className="p-6 text-center text-gray-300">
                          100m
                        </td>
                      ))}
                    </tr>

                    {/* Actions */}
                    <tr>
                      <td className="p-6 font-medium text-white">Actions</td>
                      {selectedProducts.map(product => (
                        <td key={product.id} className="p-6 text-center">
                          <div className="space-y-2">
                            <Link
                              href={`/products/${product.slug}`}
                              className="block bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                            >
                              View Details
                            </Link>
                            <button className="block w-full border border-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                              Add to Cart
                            </button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add More Products */}
            {selectedProducts.length < 4 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">Add More Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {availableProducts
                    .filter(p => !selectedProducts.find(sp => sp.id === p.id))
                    .slice(0, 4)
                    .map((product, index) => (
                    <div 
                      key={product.id}
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer group animate-fadeIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => addProduct(product)}
                    >
                      <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 p-3 rounded mb-2">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="text-white text-sm font-medium group-hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-gray-400 text-xs">${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}