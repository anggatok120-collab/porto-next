"use client";

import React, { useState } from "react";
import { Download, Server, Cpu, ShieldCheck, Activity, Terminal } from "lucide-react";
import Reveal from "./Reveal";

const TOOLKIT = [
  { name: "MikroTik", category: "Routing & Switching", level: "Advanced" },
  { name: "Cisco", category: "Enterprise IOS", level: "Proficient" },
  { name: "Linux Server", category: "Debian / Ubuntu / Nginx", level: "Advanced" },
  { name: "Zabbix & Grafana", category: "Observability & Alerting", level: "Expert" },
  { name: "Docker", category: "Container & Microservices", level: "Intermediate" },
  { name: "Wireshark", category: "Packet & Protocol Analysis", level: "Advanced" },
  { name: "IoT & MQTT", category: "Telemetry & Sensor Data", level: "Proficient" },
  { name: "Next.js / Node.js", category: "Dashboard & Web Utilities", level: "Proficient" },
];

const LIFECYCLE_STEPS = [
  {
    num: "01",
    title: "THE ARCHITECTURE",
    desc: "Perencanaan topologi, subnetting IP, alokasi kapasitas bandwidth, dan pemisahan broadcast domain menggunakan VLAN 802.1Q.",
  },
  {
    num: "02",
    title: "THE CONFIGURATION",
    desc: "Implementasi static & dynamic routing (OSPF/BGP), firewall filter rules, mangle, NAT masq, serta quality of service (QoS).",
  },
  {
    num: "03",
    title: "THE HARDENING",
    desc: "Pengamanan akses router (SSH key, Winbox port isolation), WAN multi-link failover otomatis, dan anti-DDoS filter.",
  },
  {
    num: "04",
    title: "24/7 OBSERVABILITY",
    desc: "Monitoring metrik latency, packet loss, dan load secara real-time melalui Zabbix, MRTG, dan trigger bot Telegram otomatis.",
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState("skills"); // 'skills' | 'workflow'

  return (
    <section id="about" className="cinematic-about-section">
      <div className="cinematic-container">
        {/* Top Header Grid */}
        <Reveal>
          <div className="cinematic-about-header-grid">
            <div className="cinematic-about-header-left">
              <span className="section-step-badge">03 / BEHIND THE SYSTEM</span>
              <h2 className="cinematic-about-heading">
                BUKAN SEKADAR KONEKSI. <br />
                TAPI CARA <span className="highlight-red">MEMASTIKAN KEANDALAN.</span>
              </h2>
            </div>
            <div className="cinematic-about-header-right">
              <p className="cinematic-about-bio">
                Saya Angga, Network Engineer dan NOC Specialist dari Malang. Fokus saya adalah membangun infrastruktur jaringan yang tangguh, routing presisi, mitigasi insiden berkecepatan tinggi, dan menjaga sistem tetap beroperasi tanpa henti.
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="cinematic-about-subnav">
            <button
              type="button"
              className={`cinematic-subnav-btn ${
                activeTab === "skills" ? "cinematic-subnav-btn--active" : ""
              }`}
              onClick={() => setActiveTab("skills")}
            >
              EDUCATION & SKILLS
            </button>
            <button
              type="button"
              className={`cinematic-subnav-btn ${
                activeTab === "workflow" ? "cinematic-subnav-btn--active" : ""
              }`}
              onClick={() => setActiveTab("workflow")}
            >
              FROM PLAN TO PRODUCTION
            </button>
          </div>
        </Reveal>

        {/* Content Body Grid */}
        <div className="cinematic-about-content-grid">
          {/* Main Tab Panel */}
          <div className="cinematic-about-tab-panel">
            {activeTab === "skills" ? (
              <div className="cinematic-skills-view">
                {/* Education Box */}
                <div className="cinematic-edu-card">
                  <span className="cinematic-sub-badge">FORMAL EDUCATION</span>
                  <h4 className="cinematic-edu-title">
                    Universitas Muhammadiyah Malang (UMM)
                  </h4>
                  <p className="cinematic-edu-major">
                    Pemanfaatan Sumberdaya Perikanan & Akuakultur Presisi · Riset IoT Telemetri Kualitas Air
                  </p>
                  <p className="cinematic-edu-desc">
                    Mengintegrasikan keahlian jaringan komputer dan mikrokontroler untuk monitoring otomasi sensor air bioflok secara real-time.
                  </p>
                </div>

                {/* Tech Toolkit Grid */}
                <div className="cinematic-toolkit-block">
                  <span className="cinematic-sub-badge">INFRASTRUCTURE TOOLKIT</span>
                  <div className="cinematic-toolkit-grid">
                    {TOOLKIT.map((tool) => (
                      <div key={tool.name} className="cinematic-tool-card">
                        <span className="cinematic-tool-name">{tool.name}</span>
                        <span className="cinematic-tool-cat">{tool.category}</span>
                        <span className="cinematic-tool-lvl">{tool.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Workflow Steps View */
              <div className="cinematic-workflow-view">
                <div className="cinematic-workflow-list">
                  {LIFECYCLE_STEPS.map((step) => (
                    <div key={step.num} className="cinematic-workflow-item">
                      <div className="cinematic-workflow-num-box">
                        <span className="cinematic-workflow-num">{step.num}</span>
                      </div>
                      <div className="cinematic-workflow-content">
                        <h4 className="cinematic-workflow-title">{step.title}</h4>
                        <p className="cinematic-workflow-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dark Crimson Quote Card (Matching the video) */}
          <div className="cinematic-quote-card">
            <div className="cinematic-quote-card__inner">
              <span className="cinematic-quote-icon">“</span>
              <p className="cinematic-quote-text">
                ... dari latensi milidetik hingga arsitektur zero-downtime, keandalan bukan sekadar konfigurasi—ia adalah cerita yang kami jaga setiap hari.
              </p>
              <div className="cinematic-quote-author">
                <span className="cinematic-quote-name">Angga</span>
                <span className="cinematic-quote-role">Network Engineer & NOC Specialist</span>
              </div>
              <div className="cinematic-quote-seal">
                <span>EST. 2024 · 24/7 NOC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
