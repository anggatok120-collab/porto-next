'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin_auth') !== 'true') {
      router.push('/admin')
    }
  }, [])

  function logout() {
    localStorage.removeItem('admin_auth')
    router.push('/admin')
  }

  return (
    <div className="admin-dash">
      <div className="admin-dash__header">
        <span className="admin-dash__logo">AG Admin</span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/" className="admin-link">← Portfolio</Link>
          <button className="admin-btn admin-btn--ghost" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="admin-dash__body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>

          <div className="admin-card">
            <div className="admin-card__header">
              <span className="admin-card__name">Pesan Masuk</span>
            </div>
            <p className="admin-card__body" style={{ marginTop: 8 }}>
              Pesan dari contact form dikirim langsung ke email:
              <strong> anggatok120@gmail.com</strong>
            </p>
          </div>

          <div className="admin-card">
            <div className="admin-card__header">
              <span className="admin-card__name">Kelola Blog</span>
            </div>
            <p className="admin-card__body" style={{ marginTop: 8 }}>
              Post blog disimpan sebagai file <code>.md</code> di folder <code>posts/</code> pada repo GitHub.
              Untuk menambah atau mengedit post:
            </p>
            <ol style={{ margin: '10px 0 0 18px', lineHeight: 1.8, color: 'var(--text-muted)', fontSize: 14 }}>
              <li>Buka repo di GitHub</li>
              <li>Masuk ke folder <code>posts/</code></li>
              <li>Buat file baru: <code>nama-post.md</code></li>
              <li>Isi dengan format frontmatter di bawah, lalu commit</li>
            </ol>
            <pre style={{ marginTop: 12, padding: '10px 14px', background: 'var(--bg)', borderRadius: 6, fontSize: 12, overflowX: 'auto', color: 'var(--text-muted)' }}>{`---
title: Judul Post
slug: judul-post
excerpt: Ringkasan singkat.
date: 2026-06-17
published: true
---

Isi konten di sini...`}</pre>
          </div>

        </div>
      </div>
    </div>
  )
}
