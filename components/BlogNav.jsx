"use client";

import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function BlogNav({ currentTitle }) {
  return (
    <header className="blog-navbar">
      <div className="blog-navbar__inner">
        <div className="blog-navbar__left">
          <Link href="/" className="blog-navbar__brand" title="Ke Beranda Portfolio">
            <span className="blog-navbar__logo">AG</span>
          </Link>
          <span className="blog-navbar__separator">/</span>
          <Link href="/blog" className="blog-navbar__link">
            <BookOpen size={15} style={{ marginRight: 6 }} />
            <span>Blog</span>
          </Link>
          {currentTitle && (
            <>
              <span className="blog-navbar__separator">/</span>
              <span className="blog-navbar__crumb" title={currentTitle}>
                {currentTitle.length > 32 ? currentTitle.slice(0, 32) + "..." : currentTitle}
              </span>
            </>
          )}
        </div>

        <div className="blog-navbar__right">
          <Link href="/" className="blog-navbar__back-btn">
            <ArrowLeft size={14} style={{ marginRight: 6 }} />
            <span>Portfolio</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
