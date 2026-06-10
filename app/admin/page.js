'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin_auth') === 'true') {
      router.push('/admin/dashboard')
    }
  }, [])

  function handleLogin(e) {
    e.preventDefault()
    if (password === 'portoadmin') {
      localStorage.setItem('admin_auth', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Password salah')
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
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="admin-error">{error}</p>}
          <button className="admin-btn admin-btn--primary" type="submit">Masuk</button>
        </form>
      </div>
    </div>
  )
}
