'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const supabase = createClient(
  'https://bscvyefetbcnzhwmiyjy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzY3Z5ZWZldGJjbnpod21peWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDgzODksImV4cCI6MjA5NjY4NDM4OX0.jk_z_YCtO74YWkWhtTLLPggHInUhBdodzvO1d9cmPZU'
)

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    supabase.from('posts').select('*').eq('slug', slug).eq('published', true).single()
      .then(({ data }) => {
        if (data) setPost(data)
        else setNotFound(true)
      })
  }, [slug])

  function formatDate(d) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  if (notFound) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <p style={{ color: 'var(--text-muted)' }}>Post tidak ditemukan.</p>
      <Link href="/blog" className="blog-back">← Kembali ke Blog</Link>
    </div>
  )

  if (!post) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-muted)' }}>Memuat...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 100, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/blog" className="blog-back">← Blog</Link>
        <article className="blog-article">
          <div className="blog-article__meta">{formatDate(post.created_at)}</div>
          <h1 className="blog-article__title">{post.title}</h1>
          {post.excerpt && <p className="blog-article__excerpt">{post.excerpt}</p>}
          <hr className="blog-article__divider" />
          <div className="blog-article__content">
            {post.content.split('\n').map((line, i) => (
              line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
