"use client";

import React from "react";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Original subtle 3D floor perspective grid & ambient glow */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
      </div>

      <div className="hero__inner">
        {/* Left Column: Greeting, Name, Roles, Bio, Actions, Badges */}
        <div className="hero__content">
          <p className="hero__greeting">HALO, SAYA</p>
          <h1 className="hero__name">ANGGA</h1>
          <div className="hero__roles">
            <span className="hero__role">Network Engineer</span>
            <span className="hero__sep">/</span>
            <span className="hero__role">Customer Support</span>
          </div>
          <p className="hero__desc">
            2,5+ tahun pengalaman — 1,5 tahun karyawan di Network Operations Center dan 1 tahun magang di Customer Support, monitoring jaringan 24/7, troubleshooting, dan technical support.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              Hubungi Saya
            </a>
            <a href="#experience" className="btn btn--ghost">
              Lihat Pengalaman
            </a>
            <a
              href="/cv/CV_Angga.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              ↓ Unduh CV
            </a>
          </div>
          <div className="hero__badges">
            <div className="hero__badge">
              <span>📍</span>
              <span>Malang, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Right Column: Original Arch Photo Frame + Non-colliding Terminal + Stats */}
        <div className="hero__photo">
          <div className="hero__photo-wrap">
            <img
              src="/images/foto_cutout.png"
              alt="Angga"
              className="hero__img"
            />
          </div>

          {/* Terminal card positioned safely at the lower left edge */}
          <aside className="hero__terminal" aria-label="Terminal profile summary">
            <div className="hero__terminal-bar">
              <span className="hero__terminal-dot hero__terminal-dot--red" />
              <span className="hero__terminal-dot hero__terminal-dot--yellow" />
              <span className="hero__terminal-dot hero__terminal-dot--green" />
              <span className="hero__terminal-title">angga@portfolio ~</span>
            </div>
            <div className="hero__terminal-body">
              <div>
                <span className="hero__terminal-prompt">$</span> whoami
              </div>
              <p>Angga</p>
              <div>
                <span className="hero__terminal-prompt">$</span> role
              </div>
              <p>Network Engineer</p>
              <div>
                <span className="hero__terminal-prompt">$</span> status
              </div>
              <p className="hero__terminal-status">Monitoring jaringan 24/7</p>
              <span className="hero__terminal-cursor" aria-hidden="true" />
            </div>
          </aside>

          {/* Mini Stats Grid right below the photo frame */}
          <div className="hero__photo-stats">
            <div className="hero__mini-stat">
              <span className="hero__mini-num">2.5+</span>
              <span className="hero__mini-label">TAHUN</span>
            </div>
            <div className="hero__mini-stat">
              <span className="hero__mini-num">4</span>
              <span className="hero__mini-label">PERUSAHAAN</span>
            </div>
            <div className="hero__mini-stat">
              <span className="hero__mini-num">24/7</span>
              <span className="hero__mini-label">NOC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
