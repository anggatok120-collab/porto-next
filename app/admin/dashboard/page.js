'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://bscvyefetbcnzhwmiyjy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzY3Z5ZWZldGJjbnpod21peWp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExMDgzODksImV4cCI6MjA5NjY4NDM4OX0.jk_z_YCtO74YWkWhtTLLPggHInUhBdodzvO1d9cmPZU'
)

const emptyPost = { title: '', slug: '', excerpt: '', content: '', published: false }

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState('messages')
  const [messages, setMessages] = useState([])
  const [posts, setPosts] = useState([])
  const [postForm, setPostForm] = useState(emptyPost)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin_auth') !== 'true') {
      router.push('/admin')
      return
    }
    loadAll()
  }, [])

  async function loadAll() {
    setLoading(true)
    const [{ data: msgs }, { data: pts }] = await Promise.all([
      supabase.from('messages').select('*').order('created_at', { ascending: false }),
      supabase.from('posts').select('*').order('created_at', { ascending: false })
    ])
    setMessages(msgs || [])
    setPosts(pts || [])
    setLoading(false)
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function deleteMessage(id) {
    if (!confirm('Hapus pesan ini?')) return
    await supabase.from('messages').delete().eq('id', id)
    setMessages(prev => prev.filter(m => m.id !== id))
    showToast('Pesan dihapus')
  }

  function startEdit(post) {
    setPostForm({ title: post.title, slug: post.slug, excerpt: post.excerpt || '', content: post.content, published: post.published })
    setEditingId(post.id)
    setShowForm(true)
  }

  function cancelForm() {
    setPostForm(emptyPost)
    setEditingId(null)
    setShowForm(false)
  }

  function autoSlug(title) {
    return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
  }

  async function savePost(e) {
    e.preventDefault()
    setSaving(true)
    const payload = { ...postForm, updated_at: new Date().toISOString() }
    if (editingId) {
      await supabase.from('posts').update(payload).eq('id', editingId)
      setPosts(prev => prev.map(p => p.id === editingId ? { ...p, ...payload } : p))
      showToast('Post diupdate')
    } else {
      const { data } = await supabase.from('posts').insert([payload]).select().single()
      if (data) setPosts(prev => [data, ...prev])
      showToast('Post dibuat')
    }
    setSaving(false)
    cancelForm()
  }

  async function deletePost(id) {
    if (!confirm('Hapus post ini?')) return
    await supabase.from('posts').delete().eq('id', id)
    setPosts(prev => prev.filter(p => p.id !== id))
    showToast('Post dihapus')
  }

  async function togglePublish(post) {
    await supabase.from('posts').update({ published: !post.published }).eq('id', post.id)
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, published: !post.published } : p))
  }

  function logout() {
    localStorage.removeItem('admin_auth')
    router.push('/admin')
  }

  function formatDate(d) {
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="admin-dash">
      {toast && <div className="admin-toast">{toast}</div>}
      <div className="admin-dash__header">
        <span className="admin-dash__logo">AG Admin</span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/" className="admin-link">← Portfolio</a>
          <button className="admin-btn admin-btn--ghost" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="admin-dash__body">
        <div className="admin-tabs">
          <button className={`admin-tab ${tab === 'messages' ? 'active' : ''}`} onClick={() => setTab('messages')}>
            Pesan <span className="admin-badge">{messages.length}</span>
          </button>
          <button className={`admin-tab ${tab === 'blog' ? 'active' : ''}`} onClick={() => setTab('blog')}>
            Blog <span className="admin-badge">{posts.length}</span>
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">Memuat...</div>
        ) : tab === 'messages' ? (
          <div className="admin-section">
            {messages.length === 0 ? (
              <p className="admin-empty">Belum ada pesan masuk.</p>
            ) : messages.map(m => (
              <div className="admin-card" key={m.id}>
                <div className="admin-card__header">
                  <div>
                    <span className="admin-card__name">{m.name}</span>
                    <span className="admin-card__email"> · {m.email}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className="admin-card__date">{formatDate(m.created_at)}</span>
                    <button className="admin-btn admin-btn--danger-sm" onClick={() => deleteMessage(m.id)}>Hapus</button>
                  </div>
                </div>
                <p className="admin-card__body">{m.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="admin-section">
            {!showForm && (
              <button className="admin-btn admin-btn--primary" style={{ marginBottom: 20 }} onClick={() => setShowForm(true)}>
                + Tulis Post Baru
              </button>
            )}
            {showForm && (
              <form className="admin-post-form" onSubmit={savePost}>
                <div className="admin-form-row">
                  <label className="admin-label">Judul</label>
                  <input className="admin-input" value={postForm.title} onChange={e => {
                    const t = e.target.value
                    setPostForm(f => ({ ...f, title: t, slug: editingId ? f.slug : autoSlug(t) }))
                  }} required />
                </div>
                <div className="admin-form-row">
                  <label className="admin-label">Slug (URL)</label>
                  <input className="admin-input" value={postForm.slug} onChange={e => setPostForm(f => ({ ...f, slug: e.target.value }))} required />
                </div>
                <div className="admin-form-row">
                  <label className="admin-label">Excerpt (ringkasan singkat)</label>
                  <input className="admin-input" value={postForm.excerpt} onChange={e => setPostForm(f => ({ ...f, excerpt: e.target.value }))} />
                </div>
                <div className="admin-form-row">
                  <label className="admin-label">Konten</label>
                  <textarea className="admin-textarea" value={postForm.content} onChange={e => setPostForm(f => ({ ...f, content: e.target.value }))} required />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" id="pub" checked={postForm.published} onChange={e => setPostForm(f => ({ ...f, published: e.target.checked }))} />
                  <label htmlFor="pub" className="admin-label" style={{ margin: 0 }}>Publish sekarang</label>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <button className="admin-btn admin-btn--primary" type="submit" disabled={saving}>
                    {saving ? 'Menyimpan...' : editingId ? 'Update Post' : 'Simpan Post'}
                  </button>
                  <button className="admin-btn admin-btn--ghost" type="button" onClick={cancelForm}>Batal</button>
                </div>
              </form>
            )}
            {posts.length === 0 ? (
              <p className="admin-empty">Belum ada post.</p>
            ) : posts.map(p => (
              <div className="admin-card" key={p.id}>
                <div className="admin-card__header">
                  <div>
                    <span className="admin-card__name">{p.title}</span>
                    <span className={`admin-status ${p.published ? 'admin-status--live' : 'admin-status--draft'}`}>
                      {p.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="admin-btn admin-btn--sm" onClick={() => togglePublish(p)}>
                      {p.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button className="admin-btn admin-btn--sm" onClick={() => startEdit(p)}>Edit</button>
                    <button className="admin-btn admin-btn--danger-sm" onClick={() => deletePost(p.id)}>Hapus</button>
                  </div>
                </div>
                <p className="admin-card__date">{formatDate(p.created_at)} · /blog/{p.slug}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
