import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Default redirect to the faculty dashboard after successful login
  const next = searchParams.get('next') ?? '/faculty'; 

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Secure session established! Redirect to the dashboard.
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If there's an error, send them back to login
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate`);
}