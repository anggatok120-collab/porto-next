"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUp } from "lucide-react";
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
    { label: "WORK", href: "#work" },
    { label: "WHAT I CAN DO", href: "#capabilities" },
    { label: "ABOUT", href: "#about" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "EDUCATION", href: "#education" },
    { label: "BLOG", href: "/blog" },
  ];

  return (
    <>
      <nav ref={navRef} className={`nav-bar ${scrolled ? "scrolled" : ""} ${menuOpen ? "nav-bar--expanded" : ""}`}>
        <div className="nav-mobile-header">
          <a href="#hero" className="nav-left">
            <div className="nav-logo" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="256,105 336,245 292,245 256,182 220,245 176,245" fill="currentColor"/>
                <polygon points="164,268 210,268 144,400 96,400" fill="currentColor" fillOpacity="0.85"/>
                <polygon points="302,268 348,268 416,400 368,400" fill="currentColor" fillOpacity="0.75"/>
                <polygon points="176,312 336,312 322,342 190,342" fill="#10b981"/>
                <circle cx="256" cy="98" r="10" fill="#34d399"/>
              </svg>
            </div>
            <div className="nav-brand">ANGGA</div>
          </a>
          <div className="nav-mobile-actions">
            <ThemeToggle className="nav-theme-toggle" />
            <button
              className="nav-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="nav-links">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <ThemeToggle className="nav-theme-toggle" />
          <button
            type="button"
            className="nav-hire-btn"
            onClick={onOpenContact || (() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            })}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="nav-mobile-menu">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              className="nav-hire-btn nav-hire-btn--mobile"
              onClick={() => {
                setMenuOpen(false);
                if (onOpenContact) onOpenContact();
                else {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Hire Me
            </button>
          </div>
        )}
      </nav>

      {/* Back to top floating pill */}
      {showBackToTop && (
        <button
          type="button"
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
