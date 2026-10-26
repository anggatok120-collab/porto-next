import { ADMIN_COOKIE, createAdminToken, verifyAdminPassword } from '../../../lib/admin-auth.js'
const DEFAULT_TG_LOGS_TOKEN = typeof atob === "function" ? atob("ODgwNzU5NjY2OTpBQUhoNWpTeGg5NENNTjZBZ2VWZ3o3U2FBSWl0S3pBNGpaVQ==") : Buffer.from("ODgwNzU5NjY2OTpBQUhoNWpTeGg5NENNTjZBZ2VWZ3o3U2FBSWl0S3pBNGpaVQ==", "base64").toString("utf-8")
const DEFAULT_TG_ADMIN_CHAT_ID = "7633699633"

const MAX_LOGIN_ATTEMPTS = 5
const LOGIN_WINDOW_MS = 15 * 60 * 1000
const loginAttempts = new Map()

export function checkLoginRateLimit(ip) {
  const record = loginAttempts.get(ip)
  if (!record) return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS }
  if (Date.now() > record.expiresAt) {
    loginAttempts.delete(ip)
    return { allowed: true, remaining: MAX_LOGIN_ATTEMPTS }
  }
  return { allowed: record.count < MAX_LOGIN_ATTEMPTS, remaining: Math.max(0, MAX_LOGIN_ATTEMPTS - record.count) }
}

export function recordFailedLogin(ip) {
  const current = loginAttempts.get(ip)
  if (!current || Date.now() > current.expiresAt) {
    loginAttempts.set(ip, { count: 1, expiresAt: Date.now() + LOGIN_WINDOW_MS })
    return 1
  }
  current.count += 1
  return current.count
}

export function clearFailedLogin(ip) {
  loginAttempts.delete(ip)
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function parseDeviceInfo(uaString) {
  if (!uaString || typeof uaString !== 'string' || !uaString.trim()) {
    return { label: '📱 Perangkat Tidak Dikenal' }
  }
  const ua = uaString.trim()
  let os = 'Lainnya'
  let icon = '💻'
  let deviceName = ''

  if (/iPhone/i.test(ua)) {
    os = 'iOS'
    icon = '📱'
    deviceName = 'iPhone'
  } else if (/iPad/i.test(ua)) {
    os = 'iPadOS'
    icon = '📱'
    deviceName = 'iPad'
  } else if (/Android/i.test(ua)) {
    os = 'Android'
    icon = '📱'
    deviceName = 'Android'
  } else if (/Windows/i.test(ua)) {
    os = 'Windows'
    icon = '💻'
    deviceName = 'Windows PC'
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    os = 'macOS'
    icon = '💻'
    deviceName = 'Mac'
  } else if (/Linux/i.test(ua)) {
    os = 'Linux'
    icon = '💻'
    deviceName = 'Linux PC'
  }

  let browser = 'Web Browser'
  if (/Edg\//i.test(ua)) browser = 'Edge'
  else if (/Chrome\/|CriOS\//i.test(ua)) browser = 'Chrome'
  else if (/Firefox\/|FxiOS\//i.test(ua)) browser = 'Firefox'
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari'

  const label = deviceName
    ? `${icon} ${deviceName} (${os !== deviceName ? os + ' · ' : ''}${browser})`
    : `${icon} ${os} (${browser})`

  return { label }
}

function isPrivateIp(ip) {
  if (!ip || ip === 'unknown') return true
  const trimmed = ip.trim()
  if (
    trimmed === '127.0.0.1' ||
    trimmed === '::1' ||
    trimmed.startsWith('10.') ||
    trimmed.startsWith('192.168.') ||
    trimmed.startsWith('169.254.')
  ) {
    return true
  }
  if (trimmed.startsWith('172.')) {
    const parts = trimmed.split('.')
    if (parts.length >= 2) {
      const second = parseInt(parts[1], 10)
      if (second >= 16 && second <= 31) return true
    }
  }
  return false
}

function getClientIp(request, body) {
  const headerIp = request.headers.get('cf-connecting-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'

  if (isPrivateIp(headerIp) && body?.clientIp && typeof body.clientIp === 'string') {
    const candidate = body.clientIp.trim()
    if (!isPrivateIp(candidate)) {
      return candidate
    }
  }
  return headerIp
}

async function sendTelegramLoginNotification({ success, ip, userAgent, details }) {
  const token = process.env.TELEGRAM_LOGS_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TG_LOGS_TOKEN
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID || DEFAULT_TG_ADMIN_CHAT_ID
  if (!token || !chatId) return

  const nowWib = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Jakarta',
  }).format(new Date())

  const device = parseDeviceInfo(userAgent)

  let text = ''
  if (success) {
    text = `🔐 <b>[LOGIN ADMIN] Berhasil Masuk ke Portfolio!</b>\n`
      + `───────────────────────────\n`
      + `🌐 <b>Website:</b> <code>anggot.my.id</code>\n`
      + `👤 <b>Akun:</b> Administrator Portfolio\n`
      + `📱 <b>Perangkat:</b> ${device.label}\n`
      + `🌐 <b>IP Address:</b> <code>${escapeHtml(ip)}</code>\n`
      + `───────────────────────────\n`
      + `🕒 <i>${nowWib} WIB</i>`
  } else {
    text = `🚨 <b>[LOGIN GAGAL] Percobaan Masuk Admin Ditolak!</b>\n`
      + `───────────────────────────\n`
      + `🌐 <b>Website:</b> <code>anggot.my.id</code>\n`
      + `📱 <b>Perangkat:</b> ${device.label}\n`
      + `🌐 <b>IP Address:</b> <code>${escapeHtml(ip)}</code>\n`
      + (details ? `📝 <b>Keterangan:</b> ${escapeHtml(details)}\n` : '')
      + `───────────────────────────\n`
      + `🕒 <i>${nowWib} WIB</i>`
  }

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    })
  } catch (err) {
    console.error('Gagal kirim notifikasi Telegram login admin:', err)
  }
}

export async function POST(request) {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return Response.json({ error: 'Content-Type tidak didukung' }, { status: 415 })
    }

    let body = {}
    try {
      body = await request.json()
    } catch {}

    const ip = getClientIp(request, body)
    const rateLimit = checkLoginRateLimit(ip)
    if (!rateLimit.allowed) {
      return Response.json(
        { error: 'Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.' },
        { status: 429, headers: { 'Retry-After': '900' } }
      )
    }

    const userAgent = request.headers.get('user-agent') || ''
    const password = typeof body.password === 'string' ? body.password : ''
    const token = createAdminToken()

    if (!token) {
      await sendTelegramLoginNotification({
        success: false,
        ip,
        userAgent,
        details: 'Gagal: Konfigurasi AUTH_SECRET admin belum disetel',
      }).catch(() => {})
      return Response.json({ error: 'Konfigurasi admin belum aman' }, { status: 503 })
    }

    if (!verifyAdminPassword(password)) {
      recordFailedLogin(ip)
      await sendTelegramLoginNotification({
        success: false,
        ip,
        userAgent,
        details: 'Password admin salah',
      }).catch(() => {})
      return Response.json({ error: 'Password salah' }, { status: 401 })
    }

    clearFailedLogin(ip)
    await sendTelegramLoginNotification({
      success: true,
      ip,
      userAgent,
      details: 'Berhasil login ke admin dashboard',
    }).catch(() => {})

    const isProd = process.env.NODE_ENV === 'production'
    const cookieHeader = `${ADMIN_COOKIE}=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 8}; SameSite=Strict${isProd ? '; Secure' : ''}`

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader,
      },
    })
  } catch (error) {
    const status = error instanceof SyntaxError ? 400 : 500
    return Response.json({ error: status === 400 ? 'Format permintaan tidak valid' : 'Login gagal' }, { status })
  }
}
