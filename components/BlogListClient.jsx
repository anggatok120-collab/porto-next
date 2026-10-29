"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Tag, Search, ArrowRight, BookOpen, Sparkles } from "lucide-react";

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

export default function BlogListClient({ initialPosts = [] }) {
  const [selectedTag, setSelectedTag] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set(["Semua"]);
    initialPosts.forEach((post) => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach((t) => set.add(t));
      }
    });
    return Array.from(set);
  }, [initialPosts]);

  // Filter posts based on tag & search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchTag =
        selectedTag === "Semua" ||
        (Array.isArray(post.tags) && post.tags.includes(selectedTag));
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        post.title?.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        (Array.isArray(post.tags) && post.tags.some((t) => t.toLowerCase().includes(q)));
      return matchTag && matchSearch;
    });
  }, [initialPosts, selectedTag, searchQuery]);

  return (
    <div className="blog-client-wrapper">
      {/* Blog Hero Header */}
      <div className="blog-hero">
        <div className="blog-hero__badge">
          <Sparkles size={13} className="blog-hero__badge-icon" />
          <span>Wawasan, Esai &amp; Catatan Teknis</span>
        </div>
        <h1 className="blog-hero__title">
          Blog &amp; Publikasi
        </h1>
        <p className="blog-hero__subtitle">
          Eksplorasi seputar sains akuakultur modern, teknologi bioflok, rekayasa infrastruktur jaringan, dan riset terapan.
        </p>

        {/* Search & Filter Bar */}
        <div className="blog-controls">
          <div className="blog-search-box">
            <Search size={16} className="blog-search-icon" />
            <input
              type="text"
              placeholder="Cari artikel, topik, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="blog-search-clear"
              >
                ✕
              </button>
            )}
          </div>

          {/* Tag Filter Pills */}
          <div className="blog-tags-filter">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`blog-tag-btn ${selectedTag === tag ? "active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="blog-empty-state">
          <BookOpen size={40} className="blog-empty-icon" />
          <h3>Tidak ada artikel yang cocok</h3>
          <p>Coba gunakan kata kunci pencarian yang berbeda atau reset filter tag.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedTag("Semua");
              setSearchQuery("");
            }}
            className="blog-empty-reset"
          >
            Tampilkan Semua Artikel
          </button>
        </div>
      ) : (
        <div className="blog-grid">
          {filteredPosts.map((post, idx) => {
            const isFeatured = idx === 0 && selectedTag === "Semua" && !searchQuery && post.coverImage;

            return (
              <article
                key={post.slug}
                className={`blog-card ${isFeatured ? "blog-card--featured" : ""}`}
              >
                <Link href={`/blog/${post.slug}`} className="blog-card__link">
                  {post.coverImage && (
                    <div className="blog-card__image-wrap">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="blog-card__image"
                        loading="lazy"
                      />
                      <div className="blog-card__overlay" />
                    </div>
                  )}

                  <div className="blog-card__body">
                    {/* Tags & Meta Row */}
                    <div className="blog-card__meta-top">
                      {Array.isArray(post.tags) && post.tags.length > 0 && (
                        <div className="blog-card__tags">
                          {post.tags.slice(0, 3).map((t) => (
                            <span key={t} className="blog-tag-pill">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="blog-card__meta-info">
                        <span className="blog-card__meta-item">
                          <Calendar size={13} style={{ marginRight: 4 }} />
                          {formatDate(post.date)}
                        </span>
                        {post.readTime && (
                          <span className="blog-card__meta-item">
                            <Clock size={13} style={{ marginRight: 4 }} />
                            {post.readTime}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="blog-card__title">{post.title}</h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                    )}

                    {/* Bottom Author & CTA */}
                    <div className="blog-card__footer">
                      <div className="blog-card__author">
                        <div className="blog-card__avatar">
                          <img src="/images/angga.jpg?v=2" alt="Angga" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <span>AG</span>
                        </div>
                        <div className="blog-card__author-info">
                          <span className="blog-card__author-name">{post.author || "Angga"}</span>
                          <span className="blog-card__author-role">{post.authorRole || "Penulis"}</span>
                        </div>
                      </div>

                      <div className="blog-card__read-more">
                        <span>Baca Artikel</span>
                        <ArrowRight size={15} className="blog-card__arrow" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
