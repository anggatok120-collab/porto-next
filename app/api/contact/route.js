import { Resend } from 'resend'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_TG_LOGS_TOKEN = ""
const DEFAULT_TG_ADMIN_CHAT_ID = "7633699633"
const DEFAULT_RESEND_API_KEY = ""
const DEFAULT_CONTACT_TO_EMAIL = "anggatok120@gmail.com"

const MAX_CONTACT_ATTEMPTS = 5
const CONTACT_WINDOW_MS = 10 * 60 * 1000
const contactAttempts = new Map()

export function checkContactRateLimit(ip) {
  const record = contactAttempts.get(ip)
  if (!record) return { allowed: true }
  if (Date.now() > record.expiresAt) {
    contactAttempts.delete(ip)
    return { allowed: true }
  }
  return { allowed: record.count < MAX_CONTACT_ATTEMPTS }
}

export function recordContactAttempt(ip) {
  const current = contactAttempts.get(ip)
  if (!current || Date.now() > current.expiresAt) {
    contactAttempts.set(ip, { count: 1, expiresAt: Date.now() + CONTACT_WINDOW_MS })
    return 1
  }
  current.count += 1
  return current.count
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

/**
 * Mengirim notifikasi pesan baru kontak langsung ke Telegram Admin
 */
async function sendTelegramContactAlert({ name, email, message }) {
  const token = process.env.TELEGRAM_LOGS_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TG_LOGS_TOKEN
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID || DEFAULT_TG_ADMIN_CHAT_ID
  if (!token || !chatId) return

  const nowWib = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Asia/Jakarta",
  }).format(new Date())

  const text = `📬 <b>[anggot.my.id] Pesan Baru dari Formulir Kontak!</b>\n\n`
    + `👤 <b>Nama:</b> ${escapeHtml(name)}\n`
    + `📧 <b>Email:</b> <code>${escapeHtml(email)}</code>\n`
    + `🕒 <b>Waktu:</b> <i>${nowWib} WIB</i>\n\n`
    + `💬 <b>Isi Pesan:</b>\n<blockquote>${escapeHtml(message)}</blockquote>`

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    })
  } catch (err) {
    console.error("Gagal kirim notifikasi Telegram kontak:", err)
  }
}

/**
 * Mengirim notifikasi error kontak ke Telegram Admin
 */
async function sendTelegramErrorAlert(detail) {
  const token = process.env.TELEGRAM_LOGS_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TG_LOGS_TOKEN
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID || DEFAULT_TG_ADMIN_CHAT_ID
  if (!token || !chatId) return

  const text = `⚠️ <b>[anggot.my.id] Error pada Formulir Kontak!</b>\n`
    + `📝 <b>Detail:</b> <code>${escapeHtml(detail)}</code>`

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    })
  } catch {}
}

export async function POST(request) {
  try {
    const ip = request.headers.get('cf-connecting-ip')
      || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'

    if (!checkContactRateLimit(ip).allowed) {
      return Response.json(
        { error: 'Terlalu banyak pengiriman pesan. Silakan coba lagi beberapa saat lagi.' },
        { status: 429, headers: { 'Retry-After': '600' } }
      )
    }

    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !message) {
      return Response.json({ error: 'Semua field harus diisi' }, { status: 400 })
    }

    if (name.length > 80 || email.length > 254 || message.length > 3000) {
      return Response.json({ error: 'Isi pesan melebihi batas yang diizinkan' }, { status: 400 })
    }

    if (!EMAIL_PATTERN.test(email)) {
      return Response.json({ error: 'Format email tidak valid' }, { status: 400 })
    }

    recordContactAttempt(ip)

    // Kirim notifikasi Telegram secara instan
    await sendTelegramContactAlert({ name, email, message })

    // Kirim email notifikasi ke pemilik portfolio via Resend
    const resendApiKey = process.env.RESEND_API_KEY || ""
    const targetEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_CONTACT_TO_EMAIL

    if (resendApiKey) {
      const safeName = escapeHtml(name)
      const safeEmail = escapeHtml(email)
      const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'Angga <contact@anggot.my.id>',
          to: [targetEmail],
          reply_to: email,
          subject: `Pesan baru dari ${name.replace(/[\r\n]/g, ' ')}`,
          html: `
            <h2>Pesan baru dari formulir kontak portfolio (anggot.my.id)</h2>
            <p><strong>Nama Pengirim:</strong> ${safeName}</p>
            <p><strong>Email Pengirim:</strong> ${safeEmail}</p>
            <p><strong>Pesan:</strong></p>
            <p>${safeMessage}</p>
          `,
        }),
      })

      if (!resendRes.ok) {
        const errorText = await resendRes.text()
        console.error('Gagal mengirim email Resend:', resendRes.status, errorText)
        throw new Error(`Resend error: ${resendRes.status} ${errorText}`)
      }
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    await sendTelegramErrorAlert(error?.message || String(error))
    const status = error instanceof SyntaxError ? 400 : 500
    const message = status === 400 ? 'Format permintaan tidak valid' : 'Pesan gagal dikirim. Silakan coba lagi.'
    return Response.json({ error: message }, { status })
  }
}
