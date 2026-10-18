"use client";

import React, { useState, useEffect } from "react";
import { Download, Code2, Cpu, Network } from "lucide-react";
import Reveal from "./Reveal";
import TypewriterTitle from "./TypewriterTitle";

const TRAITS = [
  "Pemecahan Masalah",
  "Monitoring Jaringan 24/7",
  "Berpikir Analitis",
  "Troubleshooting MikroTik",
  "Administrasi Server Linux",
  "Komunikasi & Kerja Tim",
  "Manajemen Waktu & SLA",
  "Adaptabilitas Cepat",
  "Orientasi Layanan",
  "Smart Aquaculture IoT",
];

const CARD_SCATTER = [
  { rot: -7, x: 6, y: -4 },
  { rot: 5, x: -8, y: 3 },
  { rot: -3, x: 10, y: 6 },
  { rot: 9, x: -5, y: -6 },
  { rot: -10, x: 4, y: 5 },
  { rot: 4, x: -10, y: -2 },
  { rot: -5, x: 9, y: -5 },
  { rot: 8, x: -3, y: 7 },
  { rot: -8, x: 7, y: 2 },
  { rot: 3, x: -6, y: -7 },
];

export default function About() {
  const [traitIndex, setTraitIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTraitIndex((prev) => (prev + 1) % TRAITS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const advanceTrait = () => {
    setTraitIndex((prev) => (prev + 1) % TRAITS.length);
  };

  return (
    <section id="about" className="section">
      <Reveal>
        <div className="section-label">About Me</div>
        <TypewriterTitle text="Problem Solver. Network Engineer." />
        <div className="section-desc">
          Menjaga stabilitas infrastruktur IT, meminimalkan downtime, dan memastikan setiap paket data terkirim dengan sempurna.
        </div>
      </Reveal>

      <div className="about-grid">
        {/* Main profile card */}
        <Reveal delay={100} className="about-profile-card">
          <div className="about-profile-header">
            <div className="about-avatar-wrap">
              <img
                src="/images/foto_cutout.png"
                alt="Angga"
                className="about-avatar-img"
              />
            </div>
            <div>
              <h3 className="about-name">Angga</h3>
              <p className="about-tagline">Network Operations Center (NOC) & Customer Support</p>
            </div>
          </div>

          <div className="about-stats-row">
            <div className="about-stat-item">
              <span className="about-stat-num">2.5+</span>
              <span className="about-stat-label">Tahun Pengalaman</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-num">4</span>
              <span className="about-stat-label">Perusahaan</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-num">18+</span>
              <span className="about-stat-label">Keahlian Teknis</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-num">24/7</span>
              <span className="about-stat-label">Operasi NOC</span>
            </div>
          </div>

          <p className="about-bio">
            Network Engineer dengan pengalaman 2,5+ tahun — 1,5 tahun karyawan di NOC dan 1 tahun magang di Customer Support, mencakup monitoring jaringan dan customer support.
          </p>
          <p className="about-bio">
            Memiliki kompetensi dalam monitoring jaringan, troubleshooting network, konfigurasi MikroTik, routing & switching, administrasi server Linux, serta pengelolaan VLAN dan firewall.
          </p>
          <p className="about-bio">
            Terbiasa bekerja dalam lingkungan operasional jaringan yang dinamis dengan kemampuan analisis, problem solving, dan komunikasi yang baik. Berkomitmen untuk menjaga stabilitas infrastruktur IT dan meningkatkan kualitas layanan.
          </p>

          <div className="about-meta-grid">
            <div className="about-meta-cell">
              <span className="about-meta-k">Lokasi</span>
              <span className="about-meta-v">Malang, Jawa Timur</span>
            </div>
            <div className="about-meta-cell">
              <span className="about-meta-k">Bahasa</span>
              <span className="about-meta-v">Indonesia (Aktif), Inggris (Menengah)</span>
            </div>
            <div className="about-meta-cell">
              <span className="about-meta-k">Bidang</span>
              <span className="about-meta-v">Networking / IT Infrastructure</span>
            </div>
            <div className="about-meta-cell">
              <span className="about-meta-k">Status</span>
              <span className="about-meta-v about-meta-v--highlight">Mahasiswa Aktif — UMM (Akuakultur)</span>
            </div>
          </div>

          <div className="about-actions">
            <a
              href="/cv/CV_Angga.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="about-cv-btn"
            >
              <Download size={16} /> Unduh Resume / CV
            </a>
            <span className="about-location">📍 Malang, Jawa Timur</span>
          </div>
        </Reveal>

        {/* Right side: Interactive Scattered Trait Cards Stack */}
        <Reveal delay={150} className="about-trait-container">
          <div
            className="trait-stack"
            onClick={advanceTrait}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            title="Klik untuk melihat sifat selanjutnya"
          >
            {TRAITS.map((trait, i) => {
              const count = TRAITS.length;
              const offset = (i - traitIndex + count) % count;
              const isExiting = offset === count - 1;
              if (offset > 2 && !isExiting) return null;

              const scatter = CARD_SCATTER[i % CARD_SCATTER.length];
              let style;

              if (isExiting) {
                style = {
                  transform: `translate(${scatter.x + 140}px, ${scatter.y - 60}px) rotate(${scatter.rot + 35}deg) scale(0.85)`,
                  opacity: 0,
                  zIndex: 2,
                };
              } else {
                const depth = offset;
                style = {
                  transform: `translate(${scatter.x + depth * 10}px, ${scatter.y + depth * 8}px) rotate(${scatter.rot + depth * (scatter.rot >= 0 ? 4 : -4)}deg) scale(${1 - depth * 0.05})`,
                  opacity: depth === 0 ? 1 : 0.6 + (2 - depth) * 0.15,
                  zIndex: 10 - depth,
                };
              }

              return (
                <div key={trait} className="trait-card" style={style}>
                  <span className="trait-card-eyebrow">TRAIT / STRENGTH</span>
                  <div className="trait-card-title">{trait}</div>
                  <span className="trait-card-counter">
                    {i + 1} / {count}
                  </span>
                </div>
              );
            })}
          </div>
          <span className="trait-hint">Klik kartu untuk berganti • Otomatis berotasi</span>
        </Reveal>
      </div>

      {/* Currently Section Cards */}
      <Reveal delay={200}>
        <div className="currently-grid">
          <div className="currently-card">
            <div className="currently-icon-wrap">
              <Network size={20} />
            </div>
            <div>
              <span className="currently-label">BUILDING</span>
              <div className="currently-title">PortoNext & Network Lab Simulator</div>
              <p className="currently-desc">Mengembangkan platform simulasi topologi jaringan dan terminal CLI berbasis web. <a href="/network-lab" style={{ color: "var(--accent)", textDecoration: "underline", marginLeft: 4 }}>Buka Network Lab ↗</a></p>
            </div>
          </div>

          <div className="currently-card">
            <div className="currently-icon-wrap">
              <Cpu size={20} />
            </div>
            <div>
              <span className="currently-label">EXPLORING</span>
              <div className="currently-title">Smart Aquaculture IoT & Telemetri</div>
              <p className="currently-desc">Riset otomasi sensor parameter air tambak real-time berbasis ESP32 dan MQTT. <a href="/aquaculture" style={{ color: "var(--accent)", textDecoration: "underline", marginLeft: 4 }}>Buka Simulator IoT ↗</a></p>
            </div>
          </div>

          <div className="currently-card">
            <div className="currently-icon-wrap">
              <Code2 size={20} />
            </div>
            <div>
              <span className="currently-label">LEARNING</span>
              <div className="currently-title">Enterprise BGP & Cloud Networking</div>
              <p className="currently-desc">Memperdalam routing ISP multi-homed, Cloudflare Edge, dan otomatisasi infrastruktur.</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
