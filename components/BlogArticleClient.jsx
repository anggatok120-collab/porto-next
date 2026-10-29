"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Share2, Check, ArrowLeft, ArrowUp, Bookmark } from "lucide-react";

export default function BlogArticleClient({ postTitle, postSlug }) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          url: url,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share cancelled/unsupported
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div
        className="blog-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Share / Action Bar */}
      <div className="blog-action-bar">
        <Link href="/blog" className="blog-action-btn" title="Kembali ke daftar blog">
          <ArrowLeft size={15} style={{ marginRight: 6 }} />
          <span>Kembali</span>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          className={`blog-action-btn ${copied ? "copied" : ""}`}
          title="Bagikan atau salin link artikel"
        >
          {copied ? (
            <>
              <Check size={15} style={{ marginRight: 6, color: "#10b981" }} />
              <span style={{ color: "#10b981" }}>Tersalin!</span>
            </>
          ) : (
            <>
              <Share2 size={15} style={{ marginRight: 6 }} />
              <span>Bagikan</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
