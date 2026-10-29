import fs from "fs";
import path from "path";
import matter from "gray-matter";
import "./blog.css";
import BlogNav from "../../components/BlogNav";
import BlogListClient from "../../components/BlogListClient";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Blog & Tulisan | Angga",
  description: "Kumpulan esai, riset akuakultur, dan catatan teknis jaringan oleh Angga.",
};

function getPosts() {
  const postsDir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((fileName) => {
    const fullPath = path.join(postsDir, fileName);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContent);

    return {
      title: data.title || fileName.replace(".md", ""),
      slug: data.slug || fileName.replace(".md", ""),
      date: data.date ? String(data.date) : "",
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "",
      tags: data.tags || [],
      author: data.author || "Angga",
      authorRole: data.authorRole || "Mahasiswa Akuakultur & Network Engineer",
      readTime: data.readTime || "3 min baca",
      published: data.published ?? true,
    };
  });

  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="blog-page-root">
      <BlogNav />
      <main className="blog-main-container">
        <BlogListClient initialPosts={posts} />
      </main>
      <Footer />
    </div>
  );
}
