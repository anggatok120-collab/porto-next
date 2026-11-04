"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Coffee, ArrowUp } from "lucide-react";

export default function Footer() {
  const [coffeeCount, setCoffeeCount] = useState(128);
  const [popping, setPopping] = useState(false);

  const handleCoffee = () => {
    setPopping(true);
    setCoffeeCount((c) => c + 1);
    setTimeout(() => setPopping(false), 400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="cinematic-footer">
      <div className="cinematic-container">
        <div className="cinematic-footer__inner">
          {/* Left Brand */}
          <div className="cinematic-footer__left">
            <a href="#hero" className="cinematic-footer__brand">
              <span className="brand-name">ANGGA</span>
              <span className="brand-plus">+</span>
            </a>
            <p className="cinematic-footer__copy">
              © {new Date().getFullYear()} Angga · Network Operations Center (NOC) & Infrastructure Engineer.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="cinematic-footer__links">
            <Link href="/terminal" className="cinematic-footer__link">Terminal</Link>
            <Link href="/network-lab" className="cinematic-footer__link">Network Lab</Link>
            <Link href="/aquaculture" className="cinematic-footer__link">Aquaculture IoT</Link>
            <Link href="/blog" className="cinematic-footer__link">Blog</Link>
            <Link href="/admin" className="cinematic-footer__link">Admin</Link>
            <Link href="/privacy" className="cinematic-footer__link">Privacy</Link>
          </div>

          {/* Right Action: Coffee & Scroll */}
          <div className="cinematic-footer__right">
            <button
              type="button"
              className={`cinematic-coffee-btn ${popping ? "pop" : ""}`}
              onClick={handleCoffee}
              title="Get me a coffee!"
            >
              <span>Traktir Kopi</span>
              <span className="coffee-emoji">☕</span>
              <span className="coffee-counter">{coffeeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
