"use client";

import React from "react";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

const AWARDS = [
  {
    num: "01",
    title: "MTCNA — MikroTik Certified Network Associate",
    issuer: "MikroTik RouterOS Academy",
    year: "2025",
  },
  {
    num: "02",
    title: "MTCRE — MikroTik Certified Routing Engineer",
    issuer: "MikroTik Professional Track",
    year: "2025",
  },
  {
    num: "03",
    title: "Cisco Certified Network Associate (CCNA Preparation)",
    issuer: "Enterprise Routing & Switching",
    year: "2024",
  },
  {
    num: "04",
    title: "Linux Server Administration & Hardening",
    issuer: "Linux Enterprise System",
    year: "2024",
  },
  {
    num: "05",
    title: "Smart Aquaculture IoT Research Lead",
    issuer: "Universitas Muhammadiyah Malang (UMM)",
    year: "2023",
  },
  {
    num: "06",
    title: "Network Infrastructure Deployment & Troubleshooting",
    issuer: "NOC Excellence Program",
    year: "2022",
  },
  {
    num: "07",
    title: "High-Availability 99.99% Uptime NOC Recognition",
    issuer: "Infrastructure Operations",
    year: "2026",
  },
];

export default function Recognition() {
  return (
    <section id="recognition" className="recognition-section">
      <div className="recognition-container">
        <div className="recognition-grid">
          {/* Left Column: Big Trophy Card */}
          <Reveal className="recognition-left">
            <span className="section-step-badge">02 / RECOGNITION</span>
            <h2 className="recognition-heading">
              THE WORK. <br />
              <span className="recognition-heading--accent">THE RECOGNITION.</span>
            </h2>

            <div className="recognition-trophy-box">
              <div className="recognition-laurel-row">
                <span className="recognition-laurel recognition-laurel--left">🪽</span>
                <span className="recognition-number">10+</span>
                <span className="recognition-laurel recognition-laurel--right">🪽</span>
              </div>
              <span className="recognition-badge-tag">AWARDS & CERTIFICATIONS</span>
            </div>

            <p className="recognition-description">
              Kompetensi teruji dengan dedikasi penuh. Setiap sertifikasi dan pencapaian menjadi bukti komitmen saya dalam menjaga keandalan infrastruktur dan inovasi jaringan.
            </p>

            <a
              href="/cv/CV_Angga.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="recognition-cta-btn"
            >
              Lihat Sertifikat & CV <ExternalLink size={15} />
            </a>
          </Reveal>

          {/* Right Column: List of Awards by Year */}
          <Reveal className="recognition-right">
            <div className="recognition-list">
              {AWARDS.map((item) => (
                <div key={item.num} className="recognition-item">
                  <div className="recognition-item-left">
                    <span className="recognition-item-num">{item.num}</span>
                    <div>
                      <h4 className="recognition-item-title">{item.title}</h4>
                      <p className="recognition-item-issuer">{item.issuer}</p>
                    </div>
                  </div>
                  <div className="recognition-item-year">
                    <span>{item.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
