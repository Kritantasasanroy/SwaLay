import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 border border-gray-600 rounded-full"></div>
        <div className="absolute top-40 right-20 w-64 h-64 border border-gray-600 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 border border-gray-600 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block">LUXURY THAT</span>
                <span className="block">TICKS WITH</span>
                <span className="block">TIME</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-md">
                Elevate your wristwear with luxury timepieces
              </p>
            </div>

            {/* CTA Section */}
            <div className="bg-yellow-500 text-black p-8 rounded-lg max-w-md">
              <h3 className="text-xl font-bold mb-2">UNCOVER THE ELEGANCE</h3>
              <p className="text-sm mb-4">BROWSE ALL PREMIUM TIMEPIECES.</p>
              <Link 
                href="#products"
                className="inline-block bg-black text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition-colors"
              >
                Explore More
              </Link>
            </div>

            {/* Small Watch Image */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center">
                <img 
                  src="/images/watch1.jpg"
                  alt="Watch"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Content - Large Watch */}
          <div className="relative flex justify-center items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full animate-pulse"></div>
              <img 
                src="/images/hero-watch.jpg"
                alt="Luxury Watch"
                className="w-96 h-96 object-cover rounded-full hover:scale-110 transition-transform duration-700 relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full z-20"></div>
              
              {/* Rotating ring */}
              <div className="absolute inset-0 border-2 border-yellow-400/30 rounded-full animate-rotate"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-10 right-10 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold animate-bounce">
              SwaLay
            </div>
            
            {/* Additional floating elements */}
            <div className="absolute bottom-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute bottom-10 right-20 w-3 h-3 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>
      </div>
    </section>
  )
}