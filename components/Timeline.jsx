"use client";

import React, { useState } from "react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import TypewriterTitle from "./TypewriterTitle";

const EXPERIENCES = [
  {
    role: "Network Operations Center (NOC)",
    company: "PT Anugerah Media Data Nusantara",
    location: "Malang",
    period: "Agt 2026 – Sep 2026",
    badge: "Karyawan",
    points: [
      "Memantau dan mengelola infrastruktur jaringan enterprise & ISP 24/7 untuk memastikan stabilitas dan performa jaringan optimal.",
      "Melakukan analisis traffic network, penanganan gangguan jaringan (troubleshooting), serta mitigasi insiden secara cepat dan efisien.",
      "Mengonfigurasi dan mengelola perangkat jaringan MikroTik, routing & switching, VLAN, serta firewall rules.",
      "Berkoordinasi dalam pengawasan ketersediaan jaringan, pemeliharaan infrastruktur IT, dan pemenuhan SLA layanan."
    ],
    tags: ["NOC", "MikroTik", "Routing & Switching", "VLAN", "Firewall", "SLA"]
  },
  {
    role: "Network Operations Center (NOC)",
    company: "PT 3D Tech",
    location: "Batam",
    period: "Jul 2025 – Jul 2026",
    badge: "Freelance",
    points: [
      "Melakukan monitoring jaringan dan identifikasi gangguan konektivitas secara remote untuk memastikan operasional jaringan optimal.",
      "Menangani troubleshooting perangkat jaringan dan koordinasi eskalasi teknis kepada tim terkait untuk percepatan pemulihan layanan.",
      "Membuat dokumentasi monitoring, incident report, dan update status jaringan berkala.",
      "Memantau anomali traffic dan potensi gangguan secara proaktif menggunakan monitoring tools."
    ],
    tags: ["Remote NOC", "Troubleshooting", "Monitoring", "Incident Report"]
  },
  {
    role: "Helpdesk Technical Support",
    company: "Nusantara Global Exchange (NGX)",
    location: "Batam",
    period: "Jul 2025 – Jul 2026",
    badge: "Freelance",
    points: [
      "Memberikan dukungan teknis dan helpdesk kepada pengguna via remote support, ticketing system, dan komunikasi online.",
      "Menangani troubleshooting dasar perangkat, koneksi internet, VPN, serta permasalahan pengguna secara responsif.",
      "Melakukan pencatatan tiket gangguan teknis dan follow-up penyelesaian masalah sesuai standar prosedur.",
      "Membantu konfigurasi perangkat endpoint, instalasi software, dan pemecahan kendala OS remote."
    ],
    tags: ["Helpdesk", "Remote Support", "VPN", "Ticketing", "Windows / Linux"]
  },
  {
    role: "Network Operations Center (NOC)",
    company: "PT Inovasi Tjaraka Buana MyNet",
    location: "Bandung",
    period: "Jan 2025 – Jul 2026",
    badge: "Karyawan",
    points: [
      "Memantau performa jaringan ISP 24/7 menggunakan Zabbix, Grafana, dan MRTG untuk stabilitas dan respons cepat insiden.",
      "Melakukan analisis traffic network, packet loss, down link, dan remote troubleshooting untuk memaksimalkan uptime.",
      "Mengelola konfigurasi VLAN, routing, firewall rules, backup konfigurasi berkala, serta dokumentasi IP Address.",
      "Mengonfigurasi perangkat MikroTik via Winbox dan CLI untuk routing, firewall, dan bandwidth management ISP."
    ],
    tags: ["Zabbix", "Grafana", "MRTG", "MikroTik", "Winbox", "Linux", "BGP"]
  },
  {
    role: "Customer Support",
    company: "PT Inovasi Tjaraka Buana MyNet",
    location: "Bandung",
    period: "Jan 2024 – Des 2024",
    badge: "Magang / PKL",
    points: [
      "Menangani keluhan pelanggan terkait gangguan internet melalui telepon, WhatsApp, dan ticketing system dengan responsif.",
      "Mengidentifikasi problem awal dari sisi pelanggan maupun jaringan serta memandu troubleshooting modem dan ONU.",
      "Melakukan eskalasi tiket gangguan teknis ke tim NOC untuk penanganan lanjutan sesuai prosedur dan SLA.",
      "Mendokumentasikan setiap interaksi dan solusi penanganan untuk peningkatan mutu layanan."
    ],
    tags: ["Customer Service", "Ticketing", "Modem / ONU", "SLA", "WhatsApp Support"]
  }
];

const EDUCATION = [
  {
    school: "Universitas Muhammadiyah Malang (UMM)",
    major: "Akuakultur (Perikanan)",
    period: "Sep 2026 – Sekarang",
    badge: "Mahasiswa Aktif",
    desc: "Menempuh pendidikan tinggi Program Studi Akuakultur (Perikanan) di Universitas Muhammadiyah Malang (UMM). Mempelajari teknologi budidaya perairan modern, manajemen kualitas air & ekosistem akuatik, nutrisi biota air, serta pemanfaatan sistem otomasi dan monitoring berbasis IoT (Smart Aquaculture).",
    tags: ["Akuakultur", "Smart Aquaculture", "IoT Telemetri", "Kualitas Air"]
  },
  {
    school: "SMK PGRI 3 Malang",
    major: "Teknik Komputer dan Jaringan (TKJ)",
    period: "2022 – 2025",
    badge: "Alumni",
    desc: "Melaksanakan proyek praktikum jaringan komputer dan administrasi server sebagai implementasi keterampilan teknis di bidang IT dan networking.",
    tags: ["Konfigurasi MikroTik", "Routing & Switching", "Linux Server", "Fiber Optik Dasar", "Administrasi Jaringan"]
  }
];

export default function Timeline() {
  const [tab, setTab] = useState("experience");

  return (
    <section id="experience" className="section">
      <Reveal>
        <div className="section-label">Trajectory & Background</div>
        <TypewriterTitle text="Experience & Education" />
        <div className="section-desc">
          Rekam jejak profesional dalam operasional NOC dan IT Support, dipadukan dengan dasar akademis rekayasa jaringan dan teknologi otomasi.
        </div>

        <div className="timeline-tabs" id="education">
          <button
            type="button"
            className={`timeline-tab-btn ${tab === "experience" ? "active" : ""}`}
            onClick={() => setTab("experience")}
          >
            <Briefcase size={16} /> Pengalaman Kerja ({EXPERIENCES.length})
          </button>
          <button
            type="button"
            className={`timeline-tab-btn ${tab === "education" ? "active" : ""}`}
            onClick={() => setTab("education")}
          >
            <GraduationCap size={16} /> Pendidikan ({EDUCATION.length})
          </button>
        </div>
      </Reveal>

      {tab === "experience" ? (
        <div className="timeline-list">
          {EXPERIENCES.map((item, index) => (
            <Reveal key={item.company + item.period} delay={index * 60}>
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <span className="timeline-badge">{item.badge}</span>
                    <h3 className="timeline-role">{item.role}</h3>
                    <p className="timeline-company">{item.company} · {item.location}</p>
                  </div>
                  <div className="timeline-period-badge">
                    <Calendar size={13} />
                    <span>{item.period}</span>
                  </div>
                </div>

                <ul className="timeline-points">
                  {item.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>

                <div className="timeline-tags">
                  {item.tags.map((t) => (
                    <span key={t} className="timeline-tag">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="timeline-list">
          {EDUCATION.map((item, index) => (
            <Reveal key={item.school} delay={index * 60}>
              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <span className="timeline-badge timeline-badge--edu">{item.badge}</span>
                    <h3 className="timeline-role">{item.school}</h3>
                    <p className="timeline-company">{item.major}</p>
                  </div>
                  <div className="timeline-period-badge">
                    <Calendar size={13} />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="timeline-desc">{item.desc}</p>

                <div className="timeline-tags">
                  {item.tags.map((t) => (
                    <span key={t} className="timeline-tag">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
