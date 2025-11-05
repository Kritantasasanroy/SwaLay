import productsData from '@/data/products.json'
import { Product } from '@/types/product'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/products - Fetch all products
export async function GET() {
  try {
    return NextResponse.json(productsData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Add new product (protected)
export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const newProduct: Product = {
      id: Date.now().toString(),
      slug: body.name.toLowerCase().replace(/\s+/g, '-'),
      lastUpdated: new Date().toISOString(),
      image: body.image || '/images/watch1.jpg',
      ...body
    }

    // In a real app, this would save to database
    // For demo purposes, we'll just return the new product
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}