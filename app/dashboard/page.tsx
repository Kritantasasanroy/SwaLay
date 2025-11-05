import productsData from '@/data/products.json'
import { Product } from '@/types/product'

/**
 * INVENTORY DASHBOARD - Server-Side Rendering (SSR)
 * 
 * This page uses SSR because:
 * 1. Inventory data needs to be real-time and accurate
 * 2. Dashboard data changes frequently throughout the day
 * 3. Each request needs fresh data from the database
 * 4. SEO is less important than data accuracy for admin tools
 * 
 * SSR ensures that every page load shows the most current inventory status.
 */

// This function runs on every request (SSR)
async function getDashboardData() {
  // Simulate real-time data fetching
  // In a real app, this would query your database
  const products: Product[] = productsData
  
  const stats = {
    totalProducts: products.length,
    lowStockProducts: products.filter(p => p.inventory < 10).length,
    outOfStockProducts: products.filter(p => p.inventory === 0).length,
    totalInventoryValue: products.reduce((sum, p) => sum + (p.price * p.inventory), 0),
    lastUpdated: new Date().toISOString()
  }

  const lowStockItems = products.filter(p => p.inventory < 10)

  return { stats, lowStockItems, products }
}

export default async function DashboardPage() {
  // Data is fetched on every request (SSR)
  const { stats, lowStockItems, products } = await getDashboardData()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Inventory Dashboard
        </h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-2">SSR Implementation</h3>
          <p className="text-green-700 text-sm mb-2">
            This page uses <strong>Server-Side Rendering (SSR)</strong> to ensure real-time inventory data.
          </p>
          <p className="text-green-600 text-xs">
            Last updated: {new Date(stats.lastUpdated).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="text-2xl font-semibold text-yellow-600">{stats.lowStockProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-semibold text-red-600">{stats.outOfStockProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <p className="text-2xl font-semibold text-green-600">${stats.totalInventoryValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mb-4">
            ⚠️ Low Stock Alert ({lowStockItems.length} items)
          </h2>
          <div className="grid gap-4">
            {lowStockItems.map(product => (
              <div key={product.id} className="flex justify-between items-center bg-white p-4 rounded border">
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-yellow-600">
                    {product.inventory} left
                  </p>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inventory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.inventory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.inventory === 0 
                        ? 'bg-red-100 text-red-800' 
                        : product.inventory < 10 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.inventory === 0 ? 'Out of Stock' : product.inventory < 10 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SSR Information */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Why SSR for this dashboard:</h3>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>• Real-time inventory data is critical for business decisions</li>
          <li>• Each page load fetches fresh data from the server</li>
          <li>• Ensures accuracy for stock levels and alerts</li>
          <li>• Perfect for admin tools where data freshness matters more than speed</li>
        </ul>
      </div>
    </div>
  )
}

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic'