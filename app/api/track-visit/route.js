const DEFAULT_TG_LOGS_TOKEN = typeof atob === "function" ? atob("ODgwNzU5NjY2OTpBQUhKcGUxTWNUWUw5djR3b1RMRkxTdG83TWRIRnJOM0ZGMA==") : Buffer.from("ODgwNzU5NjY2OTpBQUhKcGUxTWNUWUw5djR3b1RMRkxTdG83TWRIRnJOM0ZGMA==", "base64").toString("utf-8")
const DEFAULT_TG_ADMIN_CHAT_ID = "7633699633"

// Cache per-IP throttle di runtime (maksimal 1 alert per IP per 1 menit)
const ipThrottleMap = new Map()
const THROTTLE_MS = 60 * 1000

function escapeHtml(value) {
  return String(value ?? "").replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function parseDeviceInfo(uaString) {
  if (!uaString || typeof uaString !== 'string' || !uaString.trim()) {
    return { label: '📱 Perangkat Tidak Dikenal' }
  }
  const ua = uaString.trim()

  if (/(uptime-kuma|curl|wget|bot|spider|crawl|headless|googlebot|bingbot|yandex|bytespider)/i.test(ua)) {
    return { isBot: true, label: `🤖 Bot/Crawler (${ua.slice(0, 30)})` }
  }

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
  } else if (/Windows NT/i.test(ua)) {
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

  return { isBot: false, label }
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

function getClientIp(request) {
  return request.headers.get('cf-connecting-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'
}

export async function POST(request) {
  try {
    const userAgent = request.headers.get('user-agent') || ''
    const device = parseDeviceInfo(userAgent)

    // Abaikan bot, crawler, atau monitoring ping internal seperti Uptime-Kuma
    if (device.isBot || /Uptime-Kuma/i.test(userAgent)) {
      return Response.json({ ignored: true, reason: 'bot_or_monitor' })
    }

    let body = {}
    try {
      body = await request.json()
    } catch {}

    let ip = getClientIp(request)

    // Jika IP dari server terdeteksi privat/internal (misal gateway NAT 10.10.0.1)
    // dan client browser mengirimkan public IP valid, gunakan clientIp
    if (isPrivateIp(ip) && body.clientIp && typeof body.clientIp === 'string') {
      const candidateIp = body.clientIp.trim()
      if (!isPrivateIp(candidateIp)) {
        ip = candidateIp
      }
    }

    const now = Date.now()

    // Throttle alert jika IP yang sama berulang kali refresh/klik dalam 1 menit
    const lastSeen = ipThrottleMap.get(ip) || 0
    if (now - lastSeen < THROTTLE_MS) {
      return Response.json({ ignored: true, reason: 'throttled' })
    }
    ipThrottleMap.set(ip, now)

    const path = typeof body.path === 'string' ? body.path : '/'
    const referrer = typeof body.referrer === 'string' && body.referrer ? body.referrer : ''

    const cfCountry = request.headers.get('cf-ipcountry') || ''
    const cfCity = request.headers.get('cf-ipcity') || ''
    const country = cfCountry || (typeof body.clientCountry === 'string' ? body.clientCountry.trim() : '')
    const city = cfCity || (typeof body.clientCity === 'string' ? body.clientCity.trim() : '')
    const isp = typeof body.clientIsp === 'string' ? body.clientIsp.trim() : ''

    let locStr = ''
    const locParts = []
    if (city) locParts.push(city)
    if (country && country !== city) locParts.push(country)
    if (locParts.length > 0) {
      locStr = ` (${locParts.join(', ')}${isp ? ` · ${isp}` : ''})`
    } else if (isp) {
      locStr = ` (${isp})`
    }

    const nowWib = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Jakarta',
    }).format(new Date())

    const token = process.env.TELEGRAM_LOGS_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || DEFAULT_TG_LOGS_TOKEN
    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID || DEFAULT_TG_ADMIN_CHAT_ID

    if (token && chatId) {
      const text = `🌐 <b>[anggot.my.id] Pengunjung Mengakses Website!</b>\n`
        + `───────────────────────────\n`
        + `📍 <b>Halaman:</b> <code>${escapeHtml(path)}</code>\n`
        + `📱 <b>Perangkat:</b> ${device.label}\n`
        + `🌐 <b>IP Address:</b> <code>${escapeHtml(ip)}</code>${escapeHtml(locStr)}\n`
        + (referrer ? `🔗 <b>Rujukan:</b> <i>${escapeHtml(referrer)}</i>\n` : `🔗 <b>Akses:</b> <i>Langsung (Direct)</i>\n`)
        + `───────────────────────────\n`
        + `🕒 <i>${nowWib} WIB</i>`

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: 'HTML',
          }),
        })
        const tgJson = await tgRes.json()
        if (!tgJson.ok) {
          console.error('Telegram API error:', tgJson)
        }
      } catch (err) {
        console.error('Gagal kirim alert pengunjung Telegram:', err)
      }
    }

    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
