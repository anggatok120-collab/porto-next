"use client";

import React, { useState } from "react";
import { X, ExternalLink, Terminal, Monitor, Sliders, Headset } from "lucide-react";
import Reveal from "./Reveal";
import TypewriterTitle from "./TypewriterTitle";
import { TOOLS_DATA } from "../data/toolsData";

const TOOLS_LIST = [
  { name: "MikroTik", tag: "RouterOS" },
  { name: "Zabbix", tag: "Monitoring" },
  { name: "Grafana", tag: "Dashboard" },
  { name: "Linux", tag: "Server Admin" },
  { name: "SSH", tag: "Remote CLI" },
  { name: "MRTG", tag: "SNMP Graph" },
  { name: "Juniper", tag: "Switching" },
  { name: "Winbox", tag: "GUI Management" },
  { name: "Huawei", tag: "Enterprise Switch" },
  { name: "Ruijie", tag: "Cloud AP & Switch" },
];

const SERVICES = [
  {
    num: "01",
    title: "Network Monitoring 24/7",
    category: "Monitoring & Observability",
    icon: Monitor,
    desc: "Monitoring jaringan 24/7 menggunakan tools seperti Zabbix, Grafana, dan MRTG. Deteksi dini gangguan, trigger alert otomatis, dan monitoring latency/bandwidth untuk memastikan uptime serta ketersediaan layanan yang optimal.",
    tags: ["Zabbix", "Grafana", "MRTG", "SNMP", "Uptime & SLA", "Packet Loss Analysis"],
  },
  {
    num: "02",
    title: "Troubleshooting Jaringan",
    category: "Diagnostics & Mitigation",
    icon: Terminal,
    desc: "Analisis dan penanganan gangguan jaringan secara cepat dan efisien. Identifikasi root cause, isolasi packet loss, down link, serta rekonfigurasi perangkat router dan switch untuk pemulihan koneksi.",
    tags: ["MikroTik", "Winbox", "SSH CLI", "Ping & Traceroute", "Root Cause Analysis"],
  },
  {
    num: "03",
    title: "Konfigurasi & Administrasi Server",
    category: "Infrastructure & Routing",
    icon: Sliders,
    desc: "Konfigurasi dan manajemen segmentasi VLAN, static & dynamic routing, firewall filter rules, serta administrasi server Linux. Pengelolaan alokasi IP Address, backup berkala, dan dokumentasi infrastruktur.",
    tags: ["VLAN 802.1Q", "Firewall Rules", "Linux Server", "NAT / Mangle", "IP Management"],
  },
  {
    num: "04",
    title: "Helpdesk & Customer Support",
    category: "Technical Support & SLA",
    icon: Headset,
    desc: "Dukungan teknis kepada pengguna melalui remote support, ticketing system, dan komunikasi online. Penanganan permasalahan perangkat modem/ONU, koneksi internet, VPN pengguna, dan eskalasi teknis.",
    tags: ["Remote Support", "Sistem Tiket", "Modem / ONU", "VPN Setup", "Orientasi Layanan"],
  },
];

export default function Capabilities() {
  const [activeTool, setActiveTool] = useState(null);

  const selectedToolData = activeTool ? TOOLS_DATA[activeTool] : null;

  return (
    <section id="capabilities" className="section">
      <Reveal>
        <div className="section-label">Kemampuan & Layanan</div>
        <TypewriterTitle text="What I Can Do" />
        <div className="section-desc">
          Mengombinasikan keahlian operasional Network Operations Center (NOC) 24/7, troubleshooting, administrasi server Linux, dan technical support untuk keandalan infrastruktur IT.
        </div>
      </Reveal>

      <div className="capabilities-grid">
        {/* Left Side: Interactive Tools Stack */}
        <Reveal delay={100} className="capabilities-sidebar-reveal">
          <div className="capabilities-sidebar">
            <div className="capabilities-sidebar-header">
              <span className="capabilities-sidebar-badge">NOC STACK & TOOLS</span>
              <h4 className="capabilities-sidebar-title">Tools yang Saya Gunakan</h4>
              <span className="capabilities-sidebar-hint">Klik tool untuk live preview ↗</span>
            </div>
            <p className="capabilities-sidebar-desc">
              Alat dan platform yang saya gunakan sehari-hari dalam monitoring, konfigurasi, dan troubleshooting jaringan.
            </p>

            <div className="capabilities-tools-grid">
              {TOOLS_LIST.map((tool) => {
                const data = TOOLS_DATA[tool.name] || {};
                return (
                  <button
                    key={tool.name}
                    type="button"
                    className={`capability-tool-badge ${activeTool === tool.name ? "active" : ""}`}
                    onClick={() => setActiveTool(tool.name)}
                    title={`Lihat simulasi antarmuka ${tool.name}`}
                  >
                    <span
                      className="tool-indicator-dot"
                      style={{ backgroundColor: data.color || "#888" }}
                    />
                    <span className="tool-name">{tool.name}</span>
                    <span className="tool-tag">{tool.tag}</span>
                  </button>
                );
              })}
            </div>

            <div className="capabilities-sidebar-footer">
              <span className="capabilities-status-dot" />
              <span className="capabilities-status-text">Infrastructure: 24/7 Monitored</span>
            </div>
          </div>
        </Reveal>

        {/* Right Side: 4 Core Services Bento Grid */}
        <div className="capabilities-services-grid">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <Reveal key={srv.num} delay={120 + idx * 50} className="capability-service-reveal">
                <div className="capability-service-card">
                  <div className="capability-service-top">
                    <span className="capability-num">{srv.num}</span>
                    <span className="capability-category">{srv.category}</span>
                    <div className="capability-service-icon">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="capability-service-title">{srv.title}</h3>
                  <p className="capability-service-desc">{srv.desc}</p>

                  <div className="capability-tags">
                    {srv.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Tool Screen Modal Preview */}
      {selectedToolData && (
        <div className="tool-modal-backdrop" onClick={() => setActiveTool(null)}>
          <div
            className="tool-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="tool-modal-header">
              <div className="tool-modal-title-row">
                <span
                  className="tool-modal-badge"
                  style={{
                    backgroundColor: selectedToolData.iconBg,
                    color: selectedToolData.iconText,
                  }}
                >
                  {selectedToolData.iconLabel}
                </span>
                <div>
                  <h4 className="tool-modal-title">{activeTool}</h4>
                  <p className="tool-modal-cat">{selectedToolData.cat}</p>
                </div>
              </div>
              <button
                type="button"
                className="tool-modal-close"
                onClick={() => setActiveTool(null)}
                aria-label="Tutup preview"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="tool-modal-screen"
              dangerouslySetInnerHTML={{ __html: selectedToolData.mock }}
            />

            <div className="tool-modal-footer">
              <p className="tool-modal-desc">{selectedToolData.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
