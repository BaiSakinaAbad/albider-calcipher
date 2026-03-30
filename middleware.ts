import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // We use the 'response' object as a container for our cookies
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Ensure your environment variables are set in Vercel!
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return response
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        // We update the response to ensure cookies are sent back to the browser
        response = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // This is the secure check
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isDashboard = path.startsWith('/faculty') || path.startsWith('/security') || path.startsWith('/superadmin')

  // Redirect if not logged in
  if (!user && isDashboard) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect if logged in and trying to access login page
  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/faculty', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Only run middleware on dashboard routes and login
     * This prevents it from running on images, scripts, etc.
     */
    '/faculty/:path*',
    '/security/:path*',
    '/superadmin/:path*',
    '/login'
  ],
}