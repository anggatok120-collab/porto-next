"use client";

import React from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import Reveal from "./Reveal";

const EXPERIENCES = [
  {
    period: "Agt 2026 – Sep 2026",
    badge: "Karyawan",
    role: "Network Operations Center (NOC)",
    company: "PT Anugerah Media Data Nusantara",
    location: "Malang, Indonesia",
    points: [
      "Memantau dan mengelola infrastruktur jaringan enterprise & ISP 24/7 untuk memastikan stabilitas dan performa optimal.",
      "Melakukan analisis traffic network, penanganan insiden cepat (troubleshooting), serta mitigasi packet loss.",
      "Mengonfigurasi perangkat MikroTik, dynamic routing, switching, VLAN, dan firewall rules.",
      "Menjaga ketersediaan jaringan, pemeliharaan infrastruktur IT, dan pemenuhan target SLA layanan.",
    ],
    tags: ["NOC 24/7", "MikroTik", "VLAN 802.1Q", "Firewall", "SLA"],
  },
  {
    period: "Jul 2025 – Jul 2026",
    badge: "Freelance",
    role: "Network Operations Center (NOC)",
    company: "PT 3D Tech",
    location: "Batam (Remote)",
    points: [
      "Monitoring jaringan dan identifikasi gangguan konektivitas secara remote untuk kelancaran operasional.",
      "Troubleshooting perangkat jaringan dan koordinasi eskalasi teknis untuk percepatan recovery.",
      "Menyusun dokumentasi monitoring, incident report, dan update berkala performa router.",
    ],
    tags: ["Remote NOC", "Troubleshooting", "Monitoring", "Incident Report"],
  },
  {
    period: "Jul 2025 – Jul 2026",
    badge: "Freelance",
    role: "Helpdesk Technical Support",
    company: "Nusantara Global Exchange (NGX)",
    location: "Batam (Remote)",
    points: [
      "Dukungan teknis dan helpdesk kepada user melalui remote support, sistem tiket, dan komunikasi interaktif.",
      "Menangani troubleshooting modem/ONU, koneksi internet, VPN, dan endpoint OS pengguna.",
      "Pencatatan tiket insiden dan follow-up penyelesaian kendala sesuai SOP perusahaan.",
    ],
    tags: ["Helpdesk", "Remote Support", "VPN", "Ticketing"],
  },
  {
    period: "Jan 2025 – Jul 2026",
    badge: "Karyawan",
    role: "Network Operations Center (NOC)",
    company: "PT Inovasi Tjaraka Buana MyNet",
    location: "Bandung, Indonesia",
    points: [
      "Memantau performa jaringan ISP 24/7 menggunakan Zabbix, Grafana, dan MRTG untuk stabilitas layanan.",
      "Analisis traffic, packet loss, down link, dan remote troubleshooting untuk memaksimalkan uptime.",
      "Manajemen VLAN, static/dynamic routing, firewall rules, backup konfigurasi, dan alokasi IP Address.",
    ],
    tags: ["Zabbix", "Grafana", "MRTG", "MikroTik", "Linux Server"],
  },
  {
    period: "Jan 2024 – Des 2024",
    badge: "Magang / PKL",
    role: "Customer Support & Technical Helpdesk",
    company: "PT Inovasi Tjaraka Buana MyNet",
    location: "Bandung, Indonesia",
    points: [
      "Melayani aduan pelanggan terkait koneksi internet, konfigurasi router WiFi rumah, dan eskalasi tim teknis lapangan.",
      "Melakukan diagnosa awal problem jaringan pelanggan melalui command ping, traceroute, dan optical power modem.",
    ],
    tags: ["Customer Support", "Troubleshooting", "Helpdesk", "Modem Optical"],
  },
];

export default function Timeline() {
  return (
    <section id="journey" className="cinematic-journey-section">
      <div className="cinematic-container">
        <Reveal>
          <div className="cinematic-section-header">
            <span className="section-step-badge">04 / THE JOURNEY</span>
            <h2 className="cinematic-section-title">
              TERUS BERGERAK. MEMASTIKAN SISTEM TETAP HIDUP.
            </h2>
            <p className="cinematic-section-desc">
              Rekam jejak pengalaman profesional di Network Operations Center, penanganan insiden infrastruktur, dan dukungan teknis.
            </p>
          </div>
        </Reveal>

        {/* Minimalist Vertical Timeline Matching Frame 032 */}
        <div className="cinematic-timeline-wrap">
          <div className="cinematic-timeline-spine" aria-hidden="true" />

          {EXPERIENCES.map((exp, idx) => (
            <div key={`${exp.company}-${idx}`} className="cinematic-timeline-row">
              {/* Left Column: Period & Badge */}
              <div className="cinematic-timeline-time">
                <span className="cinematic-timeline-period">{exp.period}</span>
                <span className="cinematic-timeline-type-pill">{exp.badge}</span>
              </div>

              {/* Center Node */}
              <div className="cinematic-timeline-node">
                <span className="cinematic-timeline-dot" />
              </div>

              {/* Right Column: Card Content */}
              <div className="cinematic-timeline-body">
                <div className="cinematic-timeline-header">
                  <h3 className="cinematic-timeline-role">{exp.role}</h3>
                  <div className="cinematic-timeline-sub">
                    <span className="cinematic-timeline-company">{exp.company}</span>
                    <span className="cinematic-timeline-sep">·</span>
                    <span className="cinematic-timeline-loc">
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="cinematic-timeline-points">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>

                <div className="cinematic-timeline-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="cinematic-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
