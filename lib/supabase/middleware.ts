import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Update the request object with the new cookies
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          // Update the response object with the new cookies
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This will refresh the session if it's expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/auth')
  const isProtectedRoute = 
    request.nextUrl.pathname.startsWith('/faculty') || 
    request.nextUrl.pathname.startsWith('/security') || 
    request.nextUrl.pathname.startsWith('/superadmin')

  // LOGIC 1: If user is NOT logged in and tries to access a dashboard -> redirect to login
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // LOGIC 2: If user IS logged in and tries to go to the login page -> redirect to dashboard
  if (user && isAuthRoute && !request.nextUrl.pathname.includes('/auth/callback')) {
    const url = request.nextUrl.clone()
    url.pathname = '/faculty' // Default redirect for now
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}