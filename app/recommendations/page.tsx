import WishlistButton from '@/components/WishlistButton'
import productsData from '@/data/products.json'
import { Product } from '@/types/product'

/**
 * RECOMMENDATIONS PAGE - React Server Components
 * 
 * This page demonstrates Server Components because:
 * 1. Main content is rendered on the server for performance
 * 2. Interactive elements (wishlist button) are client components
 * 3. Hybrid approach: server rendering + client interactivity
 * 4. Reduces JavaScript bundle size
 * 5. Better performance and SEO while maintaining interactivity
 * 
 * Server Components allow us to fetch data on the server while still
 * having interactive client-side components where needed.
 */

// Server Component - runs on the server
async function getRecommendations(): Promise<Product[]> {
  // Simulate recommendation algorithm
  // In a real app, this might use ML or user behavior data
  const shuffled = [...productsData].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 4)
}

export default async function RecommendationsPage() {
  // This runs on the server
  const recommendations = await getRecommendations()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Recommended Products
        </h1>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h3 className="font-semibold text-indigo-800 mb-2">Server Components Implementation</h3>
          <p className="text-indigo-700 text-sm">
            This page uses <strong>React Server Components</strong> for the main content (rendered on server) 
            with <strong>Client Components</strong> for interactive elements like the wishlist button.
          </p>
        </div>
      </div>

      {/* Recommendations Grid - Server Component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {recommendations.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Product Image Placeholder */}
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Product Image</span>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className={`text-sm ${product.inventory < 10 ? 'text-red-600' : 'text-green-600'}`}>
                  {product.inventory} in stock
                </span>
                <span className="text-xs text-gray-500">
                  Updated: {new Date(product.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Add to Cart
                </button>
                
                {/* Client Component for interactivity */}
                <WishlistButton productId={product.id} productName={product.name} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Algorithm Info - Server Component */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          How Recommendations Work
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Current Algorithm</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Random selection for demo purposes</li>
              <li>• Shows 4 products from catalog</li>
              <li>• Refreshes on each page load</li>
              <li>• Server-side processing</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Production Features</h3>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• User behavior analysis</li>
              <li>• Purchase history patterns</li>
              <li>• Category preferences</li>
              <li>• Machine learning models</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Server Components Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Server Components Architecture:</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Server Components (this page):</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Product data fetching</li>
              <li>• Recommendation algorithm</li>
              <li>• Static content rendering</li>
              <li>• SEO-friendly HTML</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Client Components (wishlist button):</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• Interactive state management</li>
              <li>• User click handlers</li>
              <li>• Dynamic UI updates</li>
              <li>• Browser-only features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}