import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js E-commerce Demo',
  description: 'Demonstrating SSG, ISR, SSR, CSR, and Server Components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              E-commerce Demo
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/admin" className="hover:underline">Admin</Link>
              <Link href="/recommendations" className="hover:underline">Recommendations</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}