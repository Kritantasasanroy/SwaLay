import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import TopSellers from '@/components/TopSellers'
import productsData from '@/data/products.json'
import { Product } from '@/types/product'

export default function HomePage() {
  const products: Product[] = productsData
  const topSellers = products.slice(0, 4)

  return (
    <div className="bg-gray-900">
      <HeroSection />
      <TopSellers products={topSellers} />
      <div className="container mx-auto px-6 py-16">
        <ProductGrid products={products} />
      </div>
    </div>
  )
}