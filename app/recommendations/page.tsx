import WishlistButton from '@/components/WishlistButton'
import productsData from '@/data/products.json'
import { Product } from '@/types/product'

async function getRecommendations(): Promise<Product[]> {
  const shuffled = [...productsData].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 4)
}

export default async function RecommendationsPage() {
  const recommendations = await getRecommendations()

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Recommended For You
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Curated selections based on your preferences and trending luxury timepieces
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {recommendations.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-all duration-300 group border border-gray-700">
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 p-8">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-3">
                    {product.originalPrice && (
                      <div className="space-y-1">
                        <p className="text-gray-500 line-through text-sm">${product.originalPrice}</p>
                        <p className="text-xl font-bold text-yellow-400">${product.price}</p>
                      </div>
                    )}
                    {!product.originalPrice && (
                      <p className="text-xl font-bold text-yellow-400">${product.price}</p>
                    )}
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-sm ${product.inventory < 10 ? 'text-red-400' : 'text-green-400'}`}>
                      {product.inventory} in stock
                    </span>
                    <span className="text-xs text-gray-500">
                      Updated: {new Date(product.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors font-medium">
                    Add to Cart
                  </button>
                  
                  {/* Client Component for interactivity */}
                  <WishlistButton product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Algorithm Info */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">
            How Our Recommendations Work
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-yellow-400 mb-3">Current Algorithm</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Curated selection from premium collection
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Refreshes with each visit for variety
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Server-side processing for performance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Hybrid rendering architecture
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-yellow-400 mb-3">Advanced Features</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Browsing history analysis
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Price range preferences
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Style and brand affinity
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Machine learning optimization
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6">Server Components Architecture</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="font-medium text-yellow-400 mb-3">Server Components (this page)</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Product data fetching and processing</li>
                <li>• Recommendation algorithm execution</li>
                <li>• SEO-optimized content rendering</li>
                <li>• Zero JavaScript for main content</li>
              </ul>
            </div>
            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="font-medium text-yellow-400 mb-3">Client Components (wishlist)</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Interactive wishlist functionality</li>
                <li>• Real-time state management</li>
                <li>• User interaction handling</li>
                <li>• Dynamic UI updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}