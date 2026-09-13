import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(request) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 })
    }

    if (name.length > 80 || email.length > 254 || message.length > 3000) {
      return NextResponse.json({ error: 'Isi pesan melebihi batas yang diizinkan' }, { status: 400 })
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: 'Format email tidak valid' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Layanan email belum dikonfigurasi' }, { status: 503 })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL || 'anggatok120@gmail.com',
      replyTo: email,
      subject: `Pesan baru dari ${name.replace(/[\r\n]/g, ' ')}`,
      html: `
          <h2>Pesan baru dari portfolio</h2>
          <p><strong>Nama:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Pesan:</strong></p>
          <p>${safeMessage}</p>
        `,
    })

    if (error) {
      throw new Error(error.message || 'Resend gagal mengirim email')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    const status = error instanceof SyntaxError ? 400 : 500
    const message = status === 400 ? 'Format permintaan tidak valid' : 'Pesan gagal dikirim. Silakan coba lagi.'
    return NextResponse.json({ error: message }, { status })
  }
}
