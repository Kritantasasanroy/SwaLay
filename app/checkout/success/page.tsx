'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CheckoutSuccessPage() {
  const [orderNumber] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase())
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-gray-900 min-h-screen relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 animate-fadeIn">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Thank you for your purchase
            </p>
            <p className="text-gray-400">
              Your luxury timepiece is on its way
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8 animate-slideUp">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Number:</span>
                    <span className="text-white font-mono">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Date:</span>
                    <span className="text-white">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method:</span>
                    <span className="text-white">Credit Card</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Shipping Info</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Delivery:</span>
                    <span className="text-white">3-5 Business Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping Method:</span>
                    <span className="text-white">Free Standard</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tracking:</span>
                    <span className="text-yellow-400">Email Sent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">What's Next?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-black font-bold">1</span>
                </div>
                <p className="text-white font-medium">Order Processing</p>
                <p className="text-gray-400">We're preparing your timepiece</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <p className="text-white font-medium">Shipping</p>
                <p className="text-gray-400">Your order is on its way</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <p className="text-white font-medium">Delivery</p>
                <p className="text-gray-400">Enjoy your new watch!</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 font-medium"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => window.print()}
                className="border border-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
              >
                Print Receipt
              </button>
            </div>
            
            <p className="text-gray-400 text-sm">
              A confirmation email has been sent to your email address
            </p>
          </div>

          {/* Customer Support */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
            <div className="flex justify-center space-x-8 text-sm">
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                Track Your Order
              </a>
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                Contact Support
              </a>
              <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}