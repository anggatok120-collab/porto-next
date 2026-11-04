"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, ArrowUp } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowBackToTop(window.scrollY > 500);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickAway = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("touchstart", handleClickAway);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("touchstart", handleClickAway);
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "Karya", href: "#work" },
    { label: "Awards", href: "#recognition" },
    { label: "Tentang", href: "#about" },
    { label: "Perjalanan", href: "#journey" },
    { label: "Blog", href: "/blog" },
    { label: "Kontak", href: "#contact" },
  ];

  const handleContactClick = () => {
    setMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    } else {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className={`cinematic-navbar ${scrolled ? "cinematic-navbar--scrolled" : ""} ${
          menuOpen ? "cinematic-navbar--open" : ""
        }`}
      >
        <div className="cinematic-navbar__inner">
          {/* Brand Logo */}
          <a href="#hero" className="cinematic-brand" onClick={() => setMenuOpen(false)}>
            <span className="cinematic-brand__name">ANGGA</span>
            <span className="cinematic-brand__plus">+</span>
          </a>

          {/* Desktop Center Links */}
          <nav className="cinematic-nav-links" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="cinematic-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button & Theme */}
          <div className="cinematic-nav-right">
            <ThemeToggle className="cinematic-theme-toggle" />
            <button
              type="button"
              className="cinematic-talk-btn"
              onClick={handleContactClick}
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={15} />
            </button>
            <button
              type="button"
              className="cinematic-mobile-burger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="cinematic-mobile-menu">
            <div className="cinematic-mobile-links">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="cinematic-mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                className="cinematic-mobile-talk-btn"
                onClick={handleContactClick}
              >
                Let's Talk <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="cinematic-back-to-top"
          aria-label="Kembali ke atas"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
