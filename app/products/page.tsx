import ProductGrid from '@/components/ProductGrid'
import productsData from '@/data/products.json'
import { Product } from '@/types/product'

export default function ProductsPage() {
  const products: Product[] = productsData

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            All Timepieces
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our complete collection of luxury watches. Use the filters below to find your perfect timepiece.
          </p>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  )
}