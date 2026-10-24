"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, X, Minus, CheckCircle, ExternalLink, MapPin } from "lucide-react";
import Reveal from "./Reveal";

function GithubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact({ isModalOpen, setIsModalOpen }) {
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
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
      setErrorMessage(err.message || "Terjadi kesalahan koneksi.");
      setFormStatus("error");
    }
  };

  const CONTACTS = [
    {
      num: "01",
      label: "EMAIL",
      value: "anggatok120@gmail.com",
      href: "mailto:anggatok120@gmail.com?subject=Peluang%20Kerja%20%2F%20Kolaborasi&body=Halo%20Angga%2C%0A%0ANama%20saya%20%5BNama%5D%20dari%20%5BPerusahaan%2FInstansi%5D.%0A%0ASaya%20tertarik%20untuk%20berdiskusi%20mengenai%20%5BTopik%5D.%0A%0ATerima%20kasih.",
      icon: Mail,
    },
    {
      num: "02",
      label: "WHATSAPP",
      value: "085147470379",
      href: "https://wa.me/6285147470379?text=Halo%20Angga%2C%20nama%20saya%20%5BNama%5D%20dari%20%5BPerusahaan%2FInstansi%5D.%20Saya%20tertarik%20untuk%20berdiskusi%20mengenai%20%5BTopik%5D.%20Apakah%20Anda%20tersedia%3F",
      icon: MessageSquare,
    },
    {
      num: "03",
      label: "GITHUB",
      value: "github.com/anggatok120-collab",
      href: "https://github.com/anggatok120-collab",
      icon: GithubIcon,
    },
    {
      num: "04",
      label: "LINKEDIN",
      value: "linkedin.com/in/angga-angga-1147b1369",
      href: "https://www.linkedin.com/in/angga-angga-1147b1369",
      icon: LinkedinIcon,
    },
    {
      num: "05",
      label: "LOKASI",
      value: "Malang, Jawa Timur, Indonesia",
      href: "https://www.google.com/maps/search/Malang,+Jawa+Timur,+Indonesia",
      icon: MapPin,
    },
  ];

  return (
    <>
      <section id="contact" className="section contact-section">
        <div className="contact-inner">
          <div className="contact-left">
            <Reveal>
              <div className="contact-eyebrow">GET IN TOUCH</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="contact-headline">
                LET'S<br />
                <span className="contact-headline-accent">WORK</span><br />
                TOGETHER
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="contact-description">Looking for the next problem worth solving.</p>
            </Reveal>
            <Reveal delay={200}>
              <p className="contact-secondary">
                Tertarik untuk bekerja sama atau ingin tahu lebih lanjut? Saya terbuka untuk peluang kerja baru, kolaborasi, maupun diskusi seputar jaringan dan IT. Jangan ragu untuk menghubungi saya.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <div className="contact-btn-group">
                <a
                  href="/cv/CV_Angga.pdf"
                  className="contact-resume-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DOWNLOAD CV ↓
                </a>
              </div>
            </Reveal>
          </div>

          <div className="contact-right">
            <div className="contact-cards">
              {CONTACTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.label} delay={100 + index * 50}>
                    <a
                      href={item.href}
                      className="contact-card"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="contact-card-number">{item.num}</span>
                      <div className="contact-card-icon">
                        <Icon size={20} />
                      </div>
                      <div className="contact-card-info">
                        <div className="contact-card-label">{item.label}</div>
                        <div className="contact-card-value">{item.value}</div>
                      </div>
                      <ExternalLink size={14} className="contact-card-arrow" />
                    </a>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={350}>
              <button
                type="button"
                className="contact-send-cta"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsModalMinimized(false);
                }}
              >
                SEND ME A MESSAGE →
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Floating window-style Contact Modal */}
      {isModalOpen && (
        <div className={`contact-modal ${isModalMinimized ? "contact-modal--minimized" : ""}`}>
          <div
            className="contact-modal-header"
            onClick={() => isModalMinimized && setIsModalMinimized(false)}
          >
            <h3 className="contact-modal-title">Send Me a Message</h3>
            <div className="contact-modal-controls">
              <button
                type="button"
                className="contact-modal-icon-btn"
                aria-label={isModalMinimized ? "Expand" : "Minimize"}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalMinimized((v) => !v);
                }}
              >
                <Minus size={15} />
              </button>
              <button
                type="button"
                className="contact-modal-icon-btn"
                aria-label="Close"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(false);
                }}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {!isModalMinimized && (
            <div className="contact-modal-inner">
              {formStatus === "success" ? (
                <div className="contact-success-state">
                  <CheckCircle size={44} className="contact-success-icon" />
                  <h4>Pesan Berhasil Terkirim!</h4>
                  <p>Terima kasih telah menghubungi saya. Saya akan segera membalas email Anda.</p>
                  <button
                    type="button"
                    className="contact-modal-submit-btn"
                    onClick={() => {
                      setFormStatus("idle");
                      setIsModalOpen(false);
                    }}
                  >
                    Tutup Jendela
                  </button>
                </div>
              ) : (
                <form className="contact-modal-form" onSubmit={handleSubmit}>
                  <div className="contact-field">
                    <label htmlFor="contact-name">FULL NAME</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Nama lengkap Anda"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-email">EMAIL ADDRESS</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="nama@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-message">MESSAGE</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Ceritakan proyek, peluang, atau pertanyaan Anda..."
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {formStatus === "error" && (
                    <div className="contact-error-text">{errorMessage}</div>
                  )}

                  <button
                    type="submit"
                    className="contact-modal-submit-btn"
                    disabled={formStatus === "loading"}
                  >
                    {formStatus === "loading" ? "Mengirim..." : (
                      <>
                        <Send size={15} /> SEND MESSAGE →
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
