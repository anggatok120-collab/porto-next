"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, MapPin, MessageSquare, Terminal, ExternalLink } from "lucide-react";
import Reveal from "./Reveal";

export default function Contact({ isModalOpen, setIsModalOpen }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setFormStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim pesan.");

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setErrorMessage(err.message || "Terjadi kendala koneksi.");
      setFormStatus("error");
    }
  };

  return (
    <section id="contact" className="cinematic-contact-section">
      <div className="cinematic-container">
        <div className="cinematic-contact-grid">
          {/* Left Column: Let's Work Together & Form */}
          <Reveal className="cinematic-contact-left">
            <span className="section-step-badge">05 / YOUR NEXT STORY</span>
            <h2 className="cinematic-contact-title">LET'S WORK TOGETHER.</h2>
            <p className="cinematic-contact-desc">
              Punya kebutuhan arsitektur jaringan, pengelolaan NOC 24/7, otomasi server Linux, atau integrasi telemetri IoT? Ceritakan kebutuhan Anda, dan mari diskusikan solusinya.
            </p>

            {/* Interactive Contact Form */}
            <form onSubmit={handleSubmit} className="cinematic-form">
              <div className="cinematic-form-row">
                <input
                  type="text"
                  placeholder="Nama Anda"
                  className="cinematic-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="cinematic-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <textarea
                placeholder="Ceritakan proyek atau kebutuhan infrastruktur Anda..."
                className="cinematic-textarea"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />

              <div className="cinematic-form-footer">
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="cinematic-submit-btn"
                >
                  {formStatus === "loading" ? (
                    <span>Mengirim...</span>
                  ) : (
                    <>
                      <span>Mulai Percakapan</span>
                      <Send size={15} />
                    </>
                  )}
                </button>

                {formStatus === "success" && (
                  <div className="cinematic-alert cinematic-alert--success">
                    <CheckCircle size={15} />
                    <span>Pesan berhasil terkirim ke Telegram & Email!</span>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="cinematic-alert cinematic-alert--error">
                    <AlertCircle size={15} />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>
            </form>

            {/* Direct Contact Metadata */}
            <div className="cinematic-contact-direct">
              <div className="cinematic-direct-item">
                <Mail size={16} className="cinematic-direct-icon" />
                <div>
                  <span className="cinematic-direct-label">EMAIL</span>
                  <a href="mailto:anggatok120@gmail.com" className="cinematic-direct-val">
                    anggatok120@gmail.com
                  </a>
                </div>
              </div>

              <div className="cinematic-direct-item">
                <MessageSquare size={16} className="cinematic-direct-icon" />
                <div>
                  <span className="cinematic-direct-label">TELEGRAM / WHATSAPP</span>
                  <a
                    href="https://t.me/anggot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cinematic-direct-val"
                  >
                    @anggot · Chat Langsung ↗
                  </a>
                </div>
              </div>

              <div className="cinematic-direct-item">
                <MapPin size={16} className="cinematic-direct-icon" />
                <div>
                  <span className="cinematic-direct-label">BASED IN</span>
                  <span className="cinematic-direct-val">Malang, Jawa Timur, Indonesia</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Dark Cinematic Visual Card (Matching Video Frame 035) */}
          <Reveal className="cinematic-contact-right">
            <div className="cinematic-heroic-card">
              <div className="cinematic-heroic-card__top">
                <span className="cinematic-heroic-tag">INFRASTRUCTURE READY</span>
                <span className="cinematic-heroic-status">
                  <span className="live-pulse-dot" /> LIVE 24/7
                </span>
              </div>

              <div className="cinematic-heroic-card__body">
                <h3 className="cinematic-heroic-title">
                  ENGINEERED FOR <br />
                  <span className="text-accent-red">99.99% UPTIME.</span>
                </h3>
                <p className="cinematic-heroic-desc">
                  Sistem dirancang untuk menghadapi lonjakan traffic, gangguan rute upstream, dan kegagalan link secara otomatis dengan zero-downtime failover.
                </p>
              </div>

              <div className="cinematic-heroic-card__bottom">
                <div className="cinematic-heroic-actions">
                  <a href="/terminal" className="cinematic-heroic-btn">
                    <Terminal size={14} /> Buka Web CLI
                  </a>
                  <a href="/network-lab" className="cinematic-heroic-btn">
                    <ExternalLink size={14} /> Network Lab
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
