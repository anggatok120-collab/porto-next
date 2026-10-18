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
            <div className="nav-logo">AG</div>
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
