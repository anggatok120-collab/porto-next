'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  'https://bscvyefetbcnzhwmiyjy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzY3Z5ZWZldGJjbnpod21peWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDgzODksImV4cCI6MjA5NjY4NDM4OX0.jk_z_YCtO74YWkWhtTLLPggHInUhBdodzvO1d9cmPZU'
)

export default function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('posts').select('id,title,slug,excerpt,created_at').eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => { setPosts(data || []); setLoading(false) })
  }, [])

  function formatDate(d) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 100 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/" className="blog-back">← Kembali ke Portfolio</Link>
        <div className="blog-header">
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">Tulisan seputar jaringan, infrastruktur, dan teknologi.</p>
        </div>
        {loading ? (
          <p className="blog-loading">Memuat...</p>
        ) : posts.length === 0 ? (
          <p className="blog-empty">Belum ada post. Nantikan tulisan pertama!</p>
        ) : (
          <div className="blog-list">
            {posts.map(post => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="blog-item">
                <div className="blog-item__date">{formatDate(post.created_at)}</div>
                <h2 className="blog-item__title">{post.title}</h2>
                {post.excerpt && <p className="blog-item__excerpt">{post.excerpt}</p>}
                <span className="blog-item__read">Baca selengkapnya →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
