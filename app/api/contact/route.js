import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Missing env vars: SUPABASE_URL or ANON_KEY not set in Vercel' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 })
    }

    const { error } = await supabase
      .from('messages')
      .insert([{ name, email, message }])

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
