'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const [pending, setPending] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setPending(true)
    setError('')
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Login gagal')
      router.replace('/admin/dashboard')
      router.refresh()
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">AG</div>
        <h1 className="admin-login__title">Admin Panel</h1>
        <form className="admin-login__form" onSubmit={handleLogin}>
          <input
            className="admin-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            required
          />
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="admin-btn admin-btn--primary" type="submit" disabled={pending}>{pending ? 'Memeriksa…' : 'Masuk'}</button>
        </form>
      </div>
    </div>
  )
}
