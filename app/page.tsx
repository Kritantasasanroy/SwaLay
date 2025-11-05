import ProductGrid from '@/components/ProductGrid'
import productsData from '@/data/products.json'
import { Product } from '@/types/product'

/**
 * HOME PAGE - Static Site Generation (SSG)
 * 
 * This page uses SSG because:
 * 1. Product catalog data doesn't change frequently
 * 2. Fast loading times improve user experience
 * 3. Better SEO with pre-rendered content
 * 4. Reduced server load as pages are served from CDN
 * 
 * The page is generated at build time and served as static HTML.
 * Client-side filtering is added for interactivity without affecting SEO.
 */

export default function HomePage() {
  // Data is fetched at build time (SSG)
  const products: Product[] = productsData

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Product Catalog
        </h1>
        <p className="text-gray-600 mb-4">
          This page demonstrates <strong>Static Site Generation (SSG)</strong>. 
          Products are fetched at build time for optimal performance.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Why SSG for this page?</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Fast loading times - pages served from CDN</li>
            <li>• Better SEO - content is pre-rendered</li>
            <li>• Reduced server load</li>
            <li>• Perfect for content that doesn't change often</li>
          </ul>
        </div>
      </div>

      <ProductGrid products={products} />
    </div>
  )
}