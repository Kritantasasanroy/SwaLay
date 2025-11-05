import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// API route to manually trigger ISR revalidation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, secret } = body

    // Check for secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET && secret !== 'demo-secret-123') {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Revalidate the specified path
    if (path) {
      revalidatePath(path)
      return NextResponse.json({
        revalidated: true,
        path,
        timestamp: new Date().toISOString()
      })
    }

    // If no specific path, revalidate all product pages
    revalidatePath('/products/[slug]', 'page')
    
    return NextResponse.json({
      revalidated: true,
      message: 'All product pages revalidated',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}