import { Resend } from 'resend'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DEFAULT_TG_BOT_TOKEN = "8807596669:AAFy3cV14E2uh0kRIaI9OXNXtPU8uAg3cWw"
const DEFAULT_TG_ADMIN_CHAT_ID = "7633699633"

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
  const token = process.env.TELEGRAM_LOGS_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TG_BOT_TOKEN
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
  const token = process.env.TELEGRAM_LOGS_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TG_BOT_TOKEN
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

    // Kirim notifikasi Telegram secara instan
    await sendTelegramContactAlert({ name, email, message })

    // Kirim via Resend jika API key tersedia
    if (process.env.RESEND_API_KEY) {
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
