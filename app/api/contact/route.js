import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
  'https://bscvyefetbcnzhwmiyjy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzY3Z5ZWZldGJjbnpod21peWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDgzODksImV4cCI6MjA5NjY4NDM4OX0.jk_z_YCtO74YWkWhtTLLPggHInUhBdodzvO1d9cmPZU'
)

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 })
    }

    const { error: dbError } = await supabase
      .from('messages')
      .insert([{ name, email, message }])

    if (dbError) throw dbError

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: 'anggatok120@gmail.com',
        subject: `Pesan baru dari ${name}`,
        html: `
          <h2>Pesan baru dari portfolio</h2>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Pesan:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
