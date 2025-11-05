import productsData from '@/data/products.json'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/products/[slug] - Fetch product by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = productsData.find(p => p.slug === params.slug)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[slug] - Update product (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const apiKey = request.headers.get('x-api-key')
    
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const product = productsData.find(p => p.slug === params.slug)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const updatedProduct = {
      ...product,
      ...body,
      lastUpdated: new Date().toISOString()
    }

    // In a real app, this would update the database
    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}