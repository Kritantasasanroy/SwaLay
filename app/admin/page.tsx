'use client'

import { Product } from '@/types/product'
import { useEffect, useState } from 'react'

/**
 * ADMIN PANEL - Client-Side Rendering (CSR)
 * 
 * This page uses CSR because:
 * 1. Interactive forms require client-side state management
 * 2. Real-time form validation and user feedback
 * 3. Dynamic UI updates without page refreshes
 * 4. SEO is not important for admin-only pages
 * 5. Rich interactivity with React hooks and state
 * 
 * CSR provides the best user experience for complex admin interfaces.
 */

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inventory: ''
  })

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      showMessage('error', 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.price || !formData.category) {
      showMessage('error', 'Please fill in all required fields')
      return
    }

    try {
      const url = editingProduct ? `/api/products/${editingProduct.slug}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'demo-admin-key-123' // In real app, this would be from secure storage
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          inventory: parseInt(formData.inventory) || 0
        })
      })

      if (response.ok) {
        showMessage('success', editingProduct ? 'Product updated successfully!' : 'Product created successfully!')
        resetForm()
        fetchProducts() // Refresh the list
      } else {
        const error = await response.json()
        showMessage('error', error.error || 'Operation failed')
      }
    } catch (error) {
      showMessage('error', 'Network error occurred')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      inventory: ''
    })
    setEditingProduct(null)
  }

  const startEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      inventory: product.inventory.toString()
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Admin Panel
        </h1>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-800 mb-2">CSR Implementation</h3>
          <p className="text-purple-700 text-sm">
            This page uses <strong>Client-Side Rendering (CSR)</strong> for rich interactivity, 
            form handling, and real-time updates without page refreshes.
          </p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inventory
                </label>
                <input
                  type="number"
                  value={formData.inventory}
                  onChange={(e) => setFormData({...formData, inventory: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
                <option value="Sports">Sports</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              
              {editingProduct && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Current Products ({products.length})
          </h2>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {products.map(product => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="text-blue-600 font-medium">${product.price}</span>
                      <span className={`${product.inventory < 10 ? 'text-red-600' : 'text-green-600'}`}>
                        {product.inventory} in stock
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => startEdit(product)}
                    className="ml-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSR Information */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Why CSR for this admin panel:</h3>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>• Rich form interactions and real-time validation</li>
          <li>• Dynamic UI updates without page refreshes</li>
          <li>• Complex state management with React hooks</li>
          <li>• Immediate user feedback for better UX</li>
          <li>• SEO not important for admin-only interfaces</li>
        </ul>
      </div>
    </div>
  )
}