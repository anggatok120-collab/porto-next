"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const marqueeTrackRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const syncMarqueeSpeed = () => {
      const track = marqueeTrackRef.current;
      if (!track) return;
      const pxPerSecond = window.innerWidth <= 768 ? 95 : 130;
      const loopDistance = track.scrollWidth / 2;
      const loopSeconds = Math.max(14, loopDistance / pxPerSecond);
      heroRef.current?.style.setProperty("--marquee-loop-duration", `${loopSeconds}s`);
    };

    syncMarqueeSpeed();
    window.addEventListener("resize", syncMarqueeSpeed);
    return () => window.removeEventListener("resize", syncMarqueeSpeed);
  }, []);

  useEffect(() => {
    const alignWithMarquee = () => {
      const marquee = marqueeTrackRef.current?.querySelector(".bg-name-text");
      const name = heroRef.current?.querySelector(".hero-heading-name");
      const leftBox = heroRef.current?.querySelector(".hero-left-box");
      if (!marquee || !name || !leftBox) return;

      if (window.innerWidth <= 768) {
        leftBox.style.transform = "none";
        return;
      }

      leftBox.style.transform = "none";
      const mRect = marquee.getBoundingClientRect();
      const nRect = name.getBoundingClientRect();
      const diff = mRect.bottom - nRect.bottom;
      leftBox.style.transform = `translateY(${diff}px)`;
    };

    alignWithMarquee();
    window.addEventListener("resize", alignWithMarquee);
    if (document.fonts?.ready) {
      document.fonts.ready.then(alignWithMarquee);
    }
    const t = setTimeout(alignWithMarquee, 300);
    return () => {
      window.removeEventListener("resize", alignWithMarquee);
      clearTimeout(t);
    };
  }, []);

  const marqueeText = "ANGGA · NETWORK ENGINEER · NOC · ";

  return (
    <section id="hero" className="hero-root" ref={heroRef}>
      {/* Background SVG grid & wavy lines */}
      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* Center marquee outline text */}
      <div className="bg-name-marquee">
        <div className="bg-name-track" ref={marqueeTrackRef}>
          <span className="bg-name-text">{marqueeText}</span>
          <span className="bg-name-text">{marqueeText}</span>
        </div>
      </div>

      {/* Mobile-only background fill rows */}
      {["t1", "t2", "t3", "t4", "b1", "b2", "b3", "b4"].map((pos) => (
        <div
          key={pos}
          className={`bg-name-marquee bg-name-marquee--mobile-extra bg-name-marquee--${pos}`}
          aria-hidden="true"
        >
          <div className="bg-name-track">
            <span className="bg-name-text">{marqueeText}</span>
            <span className="bg-name-text">{marqueeText}</span>
          </div>
        </div>
      ))}

      {/* Concentric radar circles */}
      <div className="concentric-circles" aria-hidden="true">
        <div className="circle circle-1" />
        <div className="circle circle-2" />
        <div className="circle circle-3" />
      </div>

      {/* Foreground cutout portrait with subtle parallax */}
      <div
        className="profile-wrap"
        style={{
          transform: `translate(${mouse.x * 12}px, ${mouse.y * 8}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <img
          src="/images/foto_cutout.png"
          alt="Angga - Network Engineer"
          className="profile-image"
          draggable={false}
          priority="true"
        />
      </div>

      {/* Hero Content Overlay: Exact original hero data presented cleanly */}
      <div className="hero-content-overlay">
        {/* Left column: Greeting, Title, Description, Action Buttons & Location */}
        <div className="hero-left-box">
          <p className="hero-greeting-tag">HALO, SAYA</p>
          <h1 className="hero-heading-name">ANGGA</h1>
          <div className="hero-role-row">
            <span className="hero-role-primary">Network Engineer</span>
            <span className="hero-role-divider">/</span>
            <span className="hero-role-secondary">Customer Support</span>
          </div>
          <p className="hero-bio-summary">
            2,5+ tahun pengalaman — 1,5 tahun karyawan di Network Operations Center dan 1 tahun magang di Customer Support, monitoring jaringan 24/7, troubleshooting, dan technical support.
          </p>

          <div className="hero-actions-group">
            <a href="#contact" className="hero-btn-action hero-btn-action--primary">
              Hubungi Saya
            </a>
            <a href="#experience" className="hero-btn-action hero-btn-action--ghost">
              Lihat Pengalaman
            </a>
            <a
              href="/cv/CV_Angga.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-action hero-btn-action--ghost"
            >
              ↓ Unduh CV
            </a>
          </div>

          <div className="hero-loc-pill">
            <span className="loc-icon">📍</span>
            <span className="loc-text">Malang, Indonesia</span>
          </div>
        </div>

        {/* Right column: Terminal card & Mini Stats */}
        <div className="hero-right-box">
          <div className="hero-term-badge">
            <div className="hero-term-topbar">
              <span className="term-dot term-dot-red" />
              <span className="term-dot term-dot-yellow" />
              <span className="term-dot term-dot-green" />
              <span className="term-win-title">angga@portfolio ~</span>
            </div>
            <div className="hero-term-console">
              <div className="term-row">
                <span className="term-prompt">$</span> whoami
              </div>
              <div className="term-output">Angga</div>
              <div className="term-row">
                <span className="term-prompt">$</span> role
              </div>
              <div className="term-output">Network Engineer</div>
              <div className="term-row">
                <span className="term-prompt">$</span> status
              </div>
              <div className="term-output term-output--highlight">Monitoring jaringan 24/7</div>
            </div>
          </div>

          <div className="hero-stat-box">
            <div className="hero-stat-col">
              <span className="hero-stat-val">2.5+</span>
              <span className="hero-stat-lbl">TAHUN</span>
            </div>
            <div className="hero-stat-bar" />
            <div className="hero-stat-col">
              <span className="hero-stat-val">4</span>
              <span className="hero-stat-lbl">PERUSAHAAN</span>
            </div>
            <div className="hero-stat-bar" />
            <div className="hero-stat-col">
              <span className="hero-stat-val">24/7</span>
              <span className="hero-stat-lbl">NOC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down indicator */}
      <a href="#work" className="scroll-indicator" aria-label="Scroll down to work">
        <div className="scroll-line" />
        <span className="scroll-text">Scroll Down</span>
      </a>
    </section>
  );
}
