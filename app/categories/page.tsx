import productsData from '@/data/products.json'
import { Product } from '@/types/product'
import Link from 'next/link'

export default function CategoriesPage() {
  const products: Product[] = productsData
  
  // Group products by category
  const categories = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, Product[]>)

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16 animate-slideDown">
          <h1 className="text-4xl font-bold text-white mb-4 animate-fadeIn">
            Watch Categories
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto animate-slideUp" style={{animationDelay: '0.3s'}}>
            Explore our curated collections of luxury timepieces, each category crafted for different lifestyles and occasions.
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(categories).map(([categoryName, categoryProducts], categoryIndex) => (
            <div key={categoryName} className="space-y-8 animate-slideUp" style={{animationDelay: `${categoryIndex * 0.2}s`}}>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2 hover:text-yellow-400 transition-colors cursor-default">{categoryName}</h2>
                <p className="text-gray-400">
                  {categoryProducts.length} timepiece{categoryProducts.length !== 1 ? 's' : ''} available
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((product, productIndex) => (
                  <div key={product.id} className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-all duration-300 group border border-gray-700 hover-lift animate-zoomIn" style={{animationDelay: `${(categoryIndex * 0.2) + (productIndex * 0.1)}s`}}>
                    <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 p-8">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                          {product.name}
                        </h3>
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
                      
                      <Link
                        href={`/products/${product.slug}`}
                        className="block w-full bg-yellow-500 text-black text-center py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Category Overview */}
        <div className="mt-16 bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-semibold text-white mb-6">Our Collections</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(categories).map(([categoryName, categoryProducts]) => (
              <div key={categoryName} className="bg-gray-700 rounded-lg p-6 text-center">
                <h4 className="font-medium text-yellow-400 mb-2">{categoryName}</h4>
                <p className="text-gray-300 text-sm mb-3">
                  {categoryProducts.length} model{categoryProducts.length !== 1 ? 's' : ''}
                </p>
                <p className="text-gray-400 text-xs">
                  Starting from ${Math.min(...categoryProducts.map(p => p.price))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}