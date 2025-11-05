import CartIcon from '@/components/CartIcon'
import WishlistIcon from '@/components/WishlistIcon'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SwaLay Watches - Luxury Timepieces',
  description: 'Elevate your wristwear with luxury timepieces',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <CartProvider>
          <WishlistProvider>
            <nav className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <span className="text-black font-bold text-sm">S</span>
                  </div>
                  <span className="text-xl font-bold tracking-wider group-hover:text-yellow-400 transition-colors duration-300">SwaLay Watches</span>
                </Link>
                
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 hover:scale-105 transition-all duration-300 font-medium">
                    Home
                  </Link>
                  <Link href="/products" className="hover:text-yellow-400 hover:scale-110 transition-all duration-300">Products</Link>
                  <Link href="/categories" className="hover:text-yellow-400 hover:scale-110 transition-all duration-300">Categories</Link>
                  <Link href="/search" className="hover:text-yellow-400 hover:scale-110 transition-all duration-300">Search</Link>
                  <Link href="/compare" className="hover:text-yellow-400 hover:scale-110 transition-all duration-300">Compare</Link>
                </div>

                <div className="flex items-center space-x-4">
                  <Link href="/search" className="p-2 hover:bg-gray-700 rounded-full hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </Link>
                  <WishlistIcon />
                  <CartIcon />
                  <Link href="/dashboard" className="p-2 hover:bg-gray-700 rounded-full hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </Link>
                  <div className="relative group">
                    <Link href="/admin" className="p-2 hover:bg-gray-700 rounded-full hover:scale-110 transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </Link>
                    
                    {/* Admin Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link href="/admin" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-t-lg transition-colors">
                        Product Admin
                      </Link>
                      <Link href="/admin/isr-test" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-b-lg transition-colors">
                        ISR Testing
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
            <main className="min-h-screen">
              {children}
            </main>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}