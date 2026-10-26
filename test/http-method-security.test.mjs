import test from 'node:test'
import assert from 'node:assert/strict'
import { proxy } from '../proxy.js'
import { checkLoginRateLimit, recordFailedLogin, clearFailedLogin } from '../app/api/admin/login/route.js'
import { checkContactRateLimit, recordContactAttempt } from '../app/api/contact/route.js'

function mockRequest({ pathname, method = 'GET', headers = {} }) {
  const url = `https://anggot.my.id${pathname}`
  return {
    method,
    url,
    nextUrl: { pathname },
    headers: new Headers(headers),
  }
}

test('HTTP Method Security & Headers: Reject invalid methods with 405 and enforce HSTS', async () => {
  const EXPECTED_HSTS = 'max-age=63072000; includeSubDomains; preload'

  // 1. PUT on root / -> 405 Method Not Allowed + HSTS
  const resPutRoot = proxy(mockRequest({ pathname: '/', method: 'PUT' }))
  assert.equal(resPutRoot.status, 405, 'PUT / must return 405')
  assert.equal(resPutRoot.headers.get('Allow'), 'GET, POST, HEAD, OPTIONS')
  assert.equal(resPutRoot.headers.get('Strict-Transport-Security'), EXPECTED_HSTS)

  // 2. DELETE on root / -> 405 Method Not Allowed + HSTS
  const resDeleteRoot = proxy(mockRequest({ pathname: '/', method: 'DELETE' }))
  assert.equal(resDeleteRoot.status, 405, 'DELETE / must return 405')
  assert.equal(resDeleteRoot.headers.get('Strict-Transport-Security'), EXPECTED_HSTS)

  // 3. PUT on /admin -> 405 Method Not Allowed + HSTS
  const resPutAdmin = proxy(mockRequest({ pathname: '/admin', method: 'PUT' }))
  assert.equal(resPutAdmin.status, 405, 'PUT /admin must return 405')
  assert.equal(resPutAdmin.headers.get('Strict-Transport-Security'), EXPECTED_HSTS)

  // 4. DELETE on /admin -> 405 Method Not Allowed + HSTS
  const resDeleteAdmin = proxy(mockRequest({ pathname: '/admin', method: 'DELETE' }))
  assert.equal(resDeleteAdmin.status, 405, 'DELETE /admin must return 405')
  assert.equal(resDeleteAdmin.headers.get('Strict-Transport-Security'), EXPECTED_HSTS)

  // 5. TRACE on /blog -> 405 Method Not Allowed + HSTS
  const resTraceBlog = proxy(mockRequest({ pathname: '/blog', method: 'TRACE' }))
  assert.equal(resTraceBlog.status, 405, 'TRACE /blog must return 405')
  assert.equal(resTraceBlog.headers.get('Strict-Transport-Security'), EXPECTED_HSTS)

  // 6. Normal GET / -> Next with security + HSTS
  const resGetRoot = proxy(mockRequest({ pathname: '/', method: 'GET' }))
  assert.equal(resGetRoot.status, 200, 'GET / must proceed')
  assert.equal(resGetRoot.headers.get('Strict-Transport-Security'), EXPECTED_HSTS)

  // 7. Normal GET /admin -> Next with security + HSTS
  const resGetAdmin = proxy(mockRequest({ pathname: '/admin', method: 'GET' }))
  assert.equal(resGetAdmin.status, 200, 'GET /admin must proceed')
  assert.equal(resGetAdmin.headers.get('Strict-Transport-Security'), EXPECTED_HSTS)

  // 8. Normal POST /api/contact -> Permitted through proxy
  const resPostContact = proxy(mockRequest({ pathname: '/api/contact', method: 'POST' }))
  assert.equal(resPostContact.status, 200, 'POST /api/contact must proceed to API handler')
  assert.equal(resPostContact.headers.get('Strict-Transport-Security'), EXPECTED_HSTS)
})

test('Rate Limiting: Admin login blocks after 5 failed attempts and resets', () => {
  const testIp = '198.51.100.42'
  clearFailedLogin(testIp)

  assert.equal(checkLoginRateLimit(testIp).allowed, true)
  for (let i = 1; i <= 5; i++) {
    recordFailedLogin(testIp)
  }
  assert.equal(checkLoginRateLimit(testIp).allowed, false)
  clearFailedLogin(testIp)
  assert.equal(checkLoginRateLimit(testIp).allowed, true)
})

test('Rate Limiting: Contact form blocks after 5 attempts', () => {
  const testIp = '198.51.100.99'

  assert.equal(checkContactRateLimit(testIp).allowed, true)
  for (let i = 1; i <= 5; i++) {
    recordContactAttempt(testIp)
  }
  assert.equal(checkContactRateLimit(testIp).allowed, false)
})
