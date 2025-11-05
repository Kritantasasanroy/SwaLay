import { Product } from '@/types/product'
import Link from 'next/link'

interface TopSellersProps {
  products: Product[]
}

export default function TopSellers({ products }: TopSellersProps) {
  return (
    <section className="bg-gray-800 py-20 relative">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-9xl font-bold text-gray-600">TOP SELLERS</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">TOP SELLERS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <div key={product.id} className="text-center group hover-lift" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-900/20 to-transparent rounded-full p-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-full group-hover:brightness-110 transition-all duration-300"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-yellow-600/0 group-hover:from-yellow-400/20 group-hover:to-yellow-600/20 rounded-full transition-all duration-500"></div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  TOP
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">{product.name}</h3>
              
              <div className="space-y-1">
                {product.originalPrice && (
                  <p className="text-gray-400 line-through text-sm">${product.originalPrice}</p>
                )}
                <p className="text-yellow-400 font-bold text-xl group-hover:scale-110 transition-transform duration-300">${product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="#products"
            className="inline-block bg-yellow-500 text-black px-8 py-3 rounded font-medium hover:bg-yellow-400 transition-colors"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  )
}