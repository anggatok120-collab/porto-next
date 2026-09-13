'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  async function logout() {
    setPending(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } finally {
      router.replace('/admin')
      router.refresh()
    }
  }

  return <button className="admin-btn admin-btn--ghost" type="button" onClick={logout} disabled={pending}>{pending ? 'Keluar…' : 'Logout'}</button>
}
