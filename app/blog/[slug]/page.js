import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../blog.css";
import BlogNav from "../../../components/BlogNav";
import BlogArticleClient from "../../../components/BlogArticleClient";
import Footer from "../../../components/Footer";
import { Calendar, Clock, Tag, User, BookOpen, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

function getAllPosts() {
  const postsDir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(postsDir, file);
      const { data } = matter(fs.readFileSync(fullPath, "utf8"));
      return {
        slug: data.slug || file.replace(".md", ""),
        title: data.title || "",
        date: data.date ? String(data.date) : "",
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        coverImage: data.coverImage || "",
        published: data.published ?? true,
      };
    })
    .filter((p) => p.published);
}

function getPost(slug) {
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  if (data.published === false) return null;

  const htmlContent = marked.parse(content);

  return {
    title: data.title || slug,
    slug: data.slug || slug,
    date: data.date ? String(data.date) : "",
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "",
    tags: data.tags || [],
    author: data.author || "Angga",
    authorRole: data.authorRole || "Mahasiswa Akuakultur & Network Engineer",
    readTime: data.readTime || "4 min baca",
    content: htmlContent,
  };
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(".md", "") }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: `${post.title} | Blog Angga`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

function formatDate(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return d;
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts().filter((p) => p.slug !== slug);

  return (
    <div className="blog-page-root">
      <BlogNav currentTitle={post.title} />
      <BlogArticleClient postTitle={post.title} postSlug={post.slug} />

      <main className="blog-article-container">
        {/* Article Header */}
        <header className="blog-article-header">
          {post.tags && post.tags.length > 0 && (
            <div className="blog-article-tags">
              {post.tags.map((t) => (
                <span key={t} className="blog-tag-pill">
                  {t}
                </span>
              ))}
            </div>
          )}

          <h1 className="blog-article-title">{post.title}</h1>

          {post.excerpt && (
            <p className="blog-article-lead">{post.excerpt}</p>
          )}

          {/* Author Card Row */}
          <div className="blog-article-author-card">
            <div className="blog-article-author-avatar">
              <img
                src="/images/angga.jpg"
                alt={post.author}
              />
            </div>
            <div className="blog-article-author-details">
              <div className="blog-article-author-name">{post.author}</div>
              <div className="blog-article-author-role">{post.authorRole}</div>
            </div>
            <div className="blog-article-meta-divider" />
            <div className="blog-article-meta-group">
              <span className="blog-article-meta-item">
                <Calendar size={14} style={{ marginRight: 5 }} />
                {formatDate(post.date)}
              </span>
              <span className="blog-article-meta-item">
                <Clock size={14} style={{ marginRight: 5 }} />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <article className="blog-article-content-wrapper">
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author Bio Box */}
        <div className="blog-author-bio-box">
          <div className="blog-author-bio-header">
            <div className="blog-author-bio-avatar">
              <img
                src="/images/angga.jpg"
                alt="Angga"
              />
            </div>
            <div>
              <h3 className="blog-author-bio-title">Ditulis oleh Angga</h3>
              <p className="blog-author-bio-sub">
                Mahasiswa Akuakultur, Universitas Muhammadiyah Malang &amp; Network Engineer.
              </p>
            </div>
          </div>
          <p className="blog-author-bio-desc">
            Fokus pada riset sains akuakultur modern, teknologi bioflok, serta integrasi teknologi IoT, sensor kualitas air, dan rekayasa infrastruktur jaringan.
          </p>
          <div className="blog-author-bio-links">
            <Link href="/" className="blog-bio-btn">
              Lihat Portfolio
            </Link>
            <a
              href="mailto:anggotok120@gmail.com"
              className="blog-bio-btn blog-bio-btn--secondary"
            >
              Kontak Penulis
            </a>
          </div>
        </div>

        {/* More Articles Navigation */}
        {allPosts.length > 0 && (
          <section className="blog-related-section">
            <div className="blog-related-header">
              <h3 className="blog-related-title">Tulisan Lainnya</h3>
              <Link href="/blog" className="blog-related-link">
                Semua Artikel →
              </Link>
            </div>
            <div className="blog-related-grid">
              {allPosts.slice(0, 2).map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="blog-related-card"
                >
                  <span className="blog-related-date">{formatDate(rel.date)}</span>
                  <h4 className="blog-related-card-title">{rel.title}</h4>
                  {rel.excerpt && (
                    <p className="blog-related-excerpt">{rel.excerpt}</p>
                  )}
                  <span className="blog-related-read">Baca selengkapnya →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
