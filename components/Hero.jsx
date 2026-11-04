"use client";

import React, { useState, useEffect } from "react";
import { ArrowDown, Terminal, Download, MapPin } from "lucide-react";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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

  const marqueeText = "ANGGA · NETWORK ENGINEER · NOC SPECIALIST · IT INFRASTRUCTURE · ";

  return (
    <section id="hero" className="cinematic-hero">
      {/* Background Radial Ambient Glow */}
      <div className="cinematic-hero__glow" aria-hidden="true" />

      {/* CONTINUOUS MOVING WATERMARK MARQUEE (Animasi Gerak di Belakang Foto) */}
      <div className="cinematic-marquee-wrap" aria-hidden="true">
        <div className="cinematic-marquee-track">
          <span className="cinematic-marquee-text">{marqueeText}</span>
          <span className="cinematic-marquee-text">{marqueeText}</span>
          <span className="cinematic-marquee-text">{marqueeText}</span>
          <span className="cinematic-marquee-text">{marqueeText}</span>
        </div>
      </div>

      {/* Concentric Radar Pulsing Circles Behind Portrait */}
      <div className="cinematic-radar-circles" aria-hidden="true">
        <div className="radar-circle radar-circle--1" />
        <div className="radar-circle radar-circle--2" />
        <div className="radar-circle radar-circle--3" />
      </div>

      {/* Center Grounded Cutout Portrait */}
      <div
        className="cinematic-portrait-wrap"
        style={{
          transform: `translateX(-50%) translate(${mouse.x * 8}px, ${mouse.y * 6}px)`,
        }}
      >
        <img
          src="/images/foto_cutout.png"
          alt="Angga - Network Engineer & NOC Specialist"
          className="cinematic-portrait-img"
          draggable={false}
          priority="true"
        />
        <div className="cinematic-portrait-gradient-fade" />
      </div>

      {/* Floating Interactive Terminal Badge (Levitating on center-left) */}
      <div className="cinematic-floating-badge cinematic-floating-badge--terminal">
        <div className="cinematic-badge-topbar">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
          <span className="badge-title">angga@noc-core ~</span>
        </div>
        <div className="cinematic-badge-body">
          <div className="badge-row">
            <span className="badge-prompt">$</span> whoami
          </div>
          <div className="badge-output">Angga · Network Engineer</div>
          <div className="badge-row">
            <span className="badge-prompt">$</span> status
          </div>
          <div className="badge-output badge-output--live">
            ● 24/7 Monitoring · 99.99% Uptime
          </div>
          <div className="badge-row">
            <span className="badge-prompt">$</span> ping -c 1 core-router
          </div>
          <div className="badge-output badge-output--ping">
            64 bytes from 10.10.0.1: time=0.82ms <span className="term-fake-blink">_</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content Overlay */}
      <div className="cinematic-hero__content">
        {/* Left Column: Role, Bio, CTAs, Location */}
        <div className="cinematic-hero__left">
          <div className="cinematic-role-badge">
            <span className="cinematic-role-badge__dot" />
            <span className="cinematic-role-badge__text">
              NETWORK ENGINEER & NOC SPECIALIST
            </span>
          </div>

          <p className="cinematic-hero__bio">
            Merangkai kestabilan. Mengamankan arus data. Saya memastikan setiap paket, routing, dan konfigurasi server bekerja optimal—dari core router hingga ketersediaan 24/7 tanpa henti.
          </p>

          <div className="cinematic-hero__actions">
            <a href="#work" className="cinematic-btn cinematic-btn--primary">
              <span>Lihat karya saya</span>
              <ArrowDown size={15} />
            </a>

            <div className="cinematic-hero__sub-actions">
              <a
                href="/terminal"
                className="cinematic-btn cinematic-btn--ghost"
                title="Buka Terminal Interaktif CLI"
              >
                <Terminal size={14} />
                <span>Buka Terminal</span>
              </a>
              <a
                href="/cv/CV_Angga.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cinematic-btn cinematic-btn--ghost"
              >
                <Download size={14} />
                <span>CV</span>
              </a>
            </div>
          </div>

          <div className="cinematic-loc-badge">
            <MapPin size={13} className="cinematic-loc-icon" />
            <span>MALANG, INDONESIA</span>
          </div>
        </div>

        {/* Right Column: Stacked Stats & Direct CV Link */}
        <div className="cinematic-hero__right">
          <div className="cinematic-stats-card">
            <div className="cinematic-stat-item">
              <span className="cinematic-stat-value">2.5+</span>
              <span className="cinematic-stat-label">TAHUN PENGALAMAN NOC & IT</span>
            </div>
            <div className="cinematic-stat-divider" />
            <div className="cinematic-stat-item">
              <span className="cinematic-stat-value">18+</span>
              <span className="cinematic-stat-label">PROYEK, LAB & SERVER DEPLOYMENT</span>
            </div>
            <div className="cinematic-stat-divider" />
            <div className="cinematic-stat-item">
              <span className="cinematic-stat-value">10+</span>
              <span className="cinematic-stat-label">SERTIFIKASI & AWARDS</span>
            </div>
          </div>

          <div className="cinematic-hero__cv-download">
            <a
              href="/cv/CV_Angga.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cinematic-cv-link"
            >
              <Download size={14} />
              <span>DOWNLOAD CV</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Down Hint */}
      <a href="#work" className="cinematic-scroll-hint" aria-label="Scroll to work">
        <span className="cinematic-scroll-line" />
        <span className="cinematic-scroll-label">SCROLL TO DISCOVER</span>
      </a>
    </section>
  );
}
