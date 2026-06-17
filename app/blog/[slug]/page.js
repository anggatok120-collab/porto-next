import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { notFound } from 'next/navigation'

function getPost(slug) {
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  if (!data.published) return null
  return { ...data, content }
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts')
  if (!fs.existsSync(postsDir)) return []
  return fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => ({ slug: f.replace('.md', '') }))
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 100, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/blog" className="blog-back">← Blog</Link>
        <article className="blog-article">
          <div className="blog-article__meta">{formatDate(post.date)}</div>
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
