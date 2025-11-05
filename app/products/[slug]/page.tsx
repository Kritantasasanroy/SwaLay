import productsData from '@/data/products.json'
import { Product } from '@/types/product'
import Link from 'next/link'
import { notFound } from 'next/navigation'

/**
 * PRODUCT DETAIL PAGE - Incremental Static Regeneration (ISR)
 * 
 * This page uses ISR because:
 * 1. Product details need to be SEO-friendly (pre-rendered)
 * 2. Inventory and pricing may change periodically
 * 3. We want fast loading but with fresh data
 * 4. Revalidation every 60 seconds ensures data freshness
 * 
 * ISR allows us to update static pages after deployment without rebuilding the entire site.
 */

interface ProductPageProps {
  params: { slug: string }
}

// Generate static params for all products at build time
export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }))
}

// Fetch product data with ISR revalidation
async function getProduct(slug: string): Promise<Product | null> {
  // In a real app, this would fetch from your API or database
  // For demo purposes, we're using the JSON file
  const product = productsData.find(p => p.slug === slug)
  return product || null
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/" 
          className="text-blue-600 hover:underline flex items-center gap-2"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-yellow-800 mb-2">ISR Implementation</h3>
        <p className="text-yellow-700 text-sm">
          This page uses <strong>Incremental Static Regeneration (ISR)</strong> with 60-second revalidation. 
          The page is statically generated but updates automatically when data changes.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image Placeholder */}
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700 font-medium">Price:</span>
                  <span className="text-3xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700 font-medium">Availability:</span>
                  <span className={`font-semibold ${
                    product.inventory > 10 ? 'text-green-600' : 
                    product.inventory > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-700 font-medium">Last Updated:</span>
                  <span className="text-gray-600">
                    {new Date(product.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button 
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  disabled={product.inventory === 0}
                >
                  {product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ISR Information */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">About ISR on this page:</h3>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>• Page is pre-rendered at build time for fast loading</li>
          <li>• Automatically revalidates every 60 seconds</li>
          <li>• Fresh data is served while maintaining performance</li>
          <li>• Perfect for product pages where inventory changes</li>
        </ul>
      </div>
    </div>
  )
}

// ISR Configuration - revalidate every 60 seconds
export const revalidate = 60