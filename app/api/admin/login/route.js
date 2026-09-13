import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, createAdminToken, verifyAdminPassword } from '../../../lib/admin-auth'

export async function POST(request) {
  try {
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type tidak didukung' }, { status: 415 })
    }

    const body = await request.json()
    const password = typeof body.password === 'string' ? body.password : ''
    const token = createAdminToken()

    if (!token) {
      return NextResponse.json({ error: 'Konfigurasi admin belum aman' }, { status: 503 })
    }
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Password salah' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 8,
      path: '/',
    })
    return response
  } catch (error) {
    const status = error instanceof SyntaxError ? 400 : 500
    return NextResponse.json({ error: status === 400 ? 'Format permintaan tidak valid' : 'Login gagal' }, { status })
  }
}
