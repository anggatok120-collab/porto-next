import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

function getPosts() {
  const postsDir = path.join(process.cwd(), 'posts')
  if (!fs.existsSync(postsDir)) return []
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const { data } = matter(fs.readFileSync(path.join(postsDir, f), 'utf8'))
      return data
    })
    .filter(p => p.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogList() {
  const posts = getPosts()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 100 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/" className="blog-back">← Kembali ke Portfolio</Link>
        <div className="blog-header">
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">Tulisan seputar jaringan, infrastruktur, dan teknologi.</p>
        </div>
        {posts.length === 0 ? (
          <p className="blog-empty">Belum ada post. Nantikan tulisan pertama!</p>
        ) : (
          <div className="blog-list">
            {posts.map(post => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-item">
                <div className="blog-item__date">{formatDate(post.date)}</div>
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
