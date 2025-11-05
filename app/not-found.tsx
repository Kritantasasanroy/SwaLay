import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-yellow-400 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The timepiece you're looking for doesn't exist or has been moved to our vault.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
          >
            Return to Collection
          </Link>
          
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/dashboard" className="text-gray-400 hover:text-yellow-400 transition-colors">
              Dashboard
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/admin" className="text-gray-400 hover:text-yellow-400 transition-colors">
              Admin
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/recommendations" className="text-gray-400 hover:text-yellow-400 transition-colors">
              Recommendations
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}