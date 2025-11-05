import AddToCartButton from '@/components/AddToCartButton'
import WishlistButton from '@/components/WishlistButton'
import productsData from '@/data/products.json'
import { Product } from '@/types/product'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }))
}

async function getProduct(slug: string): Promise<Product | null> {
  const product = productsData.find(p => p.slug === slug)
  return product || null
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            ← Back to Collection
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-12">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="aspect-square bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <img 
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-medium mb-4">
                {product.category}
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              {product.originalPrice && (
                <p className="text-gray-500 line-through text-xl">
                  ${product.originalPrice}
                </p>
              )}
              <p className="text-4xl font-bold text-yellow-400">
                ${product.price}
              </p>
              {product.originalPrice && (
                <p className="text-green-400 text-sm">
                  Save ${product.originalPrice - product.price}
                </p>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-gray-800 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Movement:</span>
                    <span className="text-white">Swiss Automatic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Case Size:</span>
                    <span className="text-white">42mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Water Resistance:</span>
                    <span className="text-white">100m</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Crystal:</span>
                    <span className="text-white">Sapphire</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Strap:</span>
                    <span className="text-white">Leather</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Warranty:</span>
                    <span className="text-white">2 Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-medium">Availability:</span>
                <span className={`font-semibold ${
                  product.inventory > 10 ? 'text-green-400' : 
                  product.inventory > 0 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
                </span>
              </div>
              <div className="space-y-1 text-xs text-gray-400">
                <div>Last updated: {new Date(product.lastUpdated).toLocaleDateString()}</div>
                <div>Page generated: {new Date().toLocaleString()}</div>
                <div className="text-yellow-400">ISR: Revalidates every 60 seconds</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <AddToCartButton product={product} />
              
              <WishlistButton product={product} />
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">Authentic</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">Fast Shipping</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400">Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const revalidate = 60