"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Coffee } from "lucide-react";

export default function Footer() {
  const [coffeeCount, setCoffeeCount] = useState(128);
  const [popping, setPopping] = useState(false);

  const handleCoffee = () => {
    setPopping(true);
    setCoffeeCount((c) => c + 1);
    setTimeout(() => setPopping(false), 400);
  };

  return (
    <footer className="footer-root">
      <div className="footer-inner">
        {/* Top Row: Brand & Nav Links */}
        <div className="footer-top-row">
          <div className="footer-left">
            <div className="footer-logo">AG</div>
            <p className="footer-copy">
              © {new Date().getFullYear()} <strong>Angga</strong> · Network Operations Center (NOC) & Infrastructure Engineer.
            </p>
          </div>

          <div className="footer-links">
            <Link href="/terminal" className="footer-link">Terminal</Link>
            <Link href="/network-lab" className="footer-link">Network Lab</Link>
            <Link href="/blog" className="footer-link">Blog</Link>
            <Link href="/admin" className="footer-link">Admin</Link>
            <Link href="/privacy" className="footer-link">Privacy</Link>
          </div>
        </div>

        {/* Bottom Row: Coffee Pill & System Status with ample spacing */}
        <div className="footer-bottom-row">
          <button
            type="button"
            className={`footer-coffee-pill ${popping ? "pop" : ""}`}
            onClick={handleCoffee}
            title="Get me a coffee!"
          >
            <span className="coffee-label">Get me a coffee</span>
            <span className="coffee-icon">☕</span>
            <span className="coffee-count">{coffeeCount}</span>
          </button>

          <div className="footer-status">
            <span className="footer-status-dot" />
            <span className="footer-status-text">All systems operational · Jakarta, ID</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
