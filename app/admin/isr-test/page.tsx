'use client'

import { useState } from 'react'

export default function ISRTestPage() {
  const [isRevalidating, setIsRevalidating] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [selectedPath, setSelectedPath] = useState('')

  const productPaths = [
    '/products/royalis-regent',
    '/products/blackridge-heritage',
    '/products/celestio-diamond',
    '/products/serenade-moonphase',
    '/products/titanium-elite',
    '/products/carbon-fusion'
  ]

  const handleRevalidate = async (path?: string) => {
    setIsRevalidating(true)
    setResult(null)

    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: path || selectedPath,
          secret: 'demo-secret-123'
        })
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to revalidate' })
    } finally {
      setIsRevalidating(false)
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              ISR Testing Panel
            </h1>
            <p className="text-gray-400">
              Test Incremental Static Regeneration (ISR) functionality. Product pages revalidate every 60 seconds automatically.
            </p>
          </div>

          {/* ISR Information */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">How ISR Works</h2>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-400 font-bold">1.</span>
                <div>
                  <strong>Static Generation:</strong> Product pages are pre-built at build time for fast loading
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-yellow-400 font-bold">2.</span>
                <div>
                  <strong>Automatic Revalidation:</strong> Pages automatically regenerate every 60 seconds when accessed
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-yellow-400 font-bold">3.</span>
                <div>
                  <strong>On-Demand Revalidation:</strong> You can manually trigger regeneration using the API below
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-yellow-400 font-bold">4.</span>
                <div>
                  <strong>Stale-While-Revalidate:</strong> Users see cached content while new version generates in background
                </div>
              </div>
            </div>
          </div>

          {/* Manual Revalidation */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Manual Revalidation</h2>
            
            <div className="space-y-6">
              {/* Revalidate All */}
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Revalidate All Product Pages</h3>
                <button
                  onClick={() => handleRevalidate()}
                  disabled={isRevalidating}
                  className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isRevalidating ? 'Revalidating...' : 'Revalidate All Products'}
                </button>
              </div>

              {/* Revalidate Specific Page */}
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Revalidate Specific Product Page</h3>
                <div className="flex gap-4">
                  <select
                    value={selectedPath}
                    onChange={(e) => setSelectedPath(e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="">Select a product page</option>
                    {productPaths.map(path => (
                      <option key={path} value={path}>
                        {path.replace('/products/', '').replace('-', ' ').toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleRevalidate(selectedPath)}
                    disabled={isRevalidating || !selectedPath}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isRevalidating ? 'Revalidating...' : 'Revalidate'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Result Display */}
          {result && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Revalidation Result</h3>
              <pre className="bg-gray-900 p-4 rounded-lg text-green-400 text-sm overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {/* Testing Instructions */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Testing ISR</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="font-medium text-yellow-400 mb-2">To test automatic revalidation:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Visit any product page and note the "Page generated" timestamp</li>
                  <li>Wait 60+ seconds and refresh the page</li>
                  <li>The timestamp should update showing the page was regenerated</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium text-yellow-400 mb-2">To test on-demand revalidation:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Visit a product page and note the timestamp</li>
                  <li>Use the manual revalidation buttons above</li>
                  <li>Refresh the product page to see the updated timestamp</li>
                </ol>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 mt-4">
                <p className="text-blue-300 text-sm">
                  <strong>Note:</strong> In development mode, ISR behavior may differ from production. 
                  For full ISR testing, build and run the production version with <code className="bg-gray-700 px-1 rounded">npm run build && npm start</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}