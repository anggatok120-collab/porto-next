import 'server-only'
import { createHmac, timingSafeEqual } from 'crypto'

export const ADMIN_COOKIE = 'angga_admin_session'

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export function verifyAdminPassword(password) {
  const expected = process.env.ADMIN_PASSWORD
  return typeof expected === 'string' && expected.length >= 12 && safeEqual(password, expected)
}

export function createAdminToken() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) return null
  return createHmac('sha256', secret).update('angga-admin-session-v1').digest('hex')
}

export function verifyAdminToken(value) {
  const expected = createAdminToken()
  return typeof value === 'string' && typeof expected === 'string' && safeEqual(value, expected)
}
