import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    // 1. Check if ENV vars exist (This is the most common cause of 500s)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("MIDDLEWARE ERROR: Missing Supabase Environment Variables")
      return response
    }

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    })

    // 2. Try to get the user
    const { data: { user } } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname
    const isDashboard = path.startsWith('/faculty') || path.startsWith('/security') || path.startsWith('/superadmin')

    if (!user && isDashboard) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return response

  } catch (e) {
    // 3. If everything crashes, don't show a 500 page, just log it
    console.error("MIDDLEWARE CRASHED:", e)
    return response
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}