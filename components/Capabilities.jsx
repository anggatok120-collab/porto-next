"use client";

import React from "react";
import Reveal from "./Reveal";
import TypewriterTitle from "./TypewriterTitle";

const TOOLS = [
  { name: "MikroTik", color: "#cc0000", tag: "RouterOS" },
  { name: "Zabbix", color: "#d40000", tag: "Monitoring" },
  { name: "Grafana", color: "#f46800", tag: "Dashboard" },
  { name: "Linux", color: "#fcc624", tag: "Server Admin" },
  { name: "SSH", color: "#38bdf8", tag: "Remote CLI" },
  { name: "MRTG", color: "#00ccaa", tag: "SNMP Graph" },
  { name: "Juniper", color: "#84b135", tag: "Switching" },
  { name: "Winbox", color: "#3b82f6", tag: "GUI Management" },
  { name: "Huawei", color: "#e41e2b", tag: "Enterprise Switch" },
  { name: "Ruijie", color: "#0066cc", tag: "Network Switch" },
  { name: "VPN", color: "#a855f7", tag: "Tunneling" },
  { name: "Python", color: "#3776ab", tag: "Automation" },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="section">
      <Reveal>
        <div className="section-label">My Capabilities</div>
        <TypewriterTitle text="What I Can Do" />
        <div className="section-desc">
          Mengombinasikan keahlian network engineering, monitoring 24/7, troubleshooting, dan administrasi infrastruktur IT untuk keandalan operasional tingkat tinggi.
        </div>
      </Reveal>

      <div className="capabilities-grid">
        {/* Left Side: Tools & Icon Grid */}
        <Reveal delay={100} className="capabilities-sidebar">
          <h4 className="capabilities-sidebar-title">Core Tools & Stack</h4>
          <p className="capabilities-sidebar-desc">
            Alat dan platform yang saya gunakan sehari-hari dalam pengawasan dan konfigurasi infrastruktur.
          </p>

          <div className="capabilities-tools-grid">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="capability-tool-badge">
                <span className="tool-indicator-dot" style={{ backgroundColor: tool.color }} />
                <span className="tool-name">{tool.name}</span>
                <span className="tool-tag">{tool.tag}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right Side: Columns 01 & 02 */}
        <div className="capabilities-columns">
          {/* Card 01 */}
          <Reveal delay={150}>
            <div className="capability-card">
              <div className="capability-card-header">
                <span className="capability-num">01</span>
                <span className="capability-category">NOC & Engineering</span>
              </div>
              <h3 className="capability-card-title">Network Operations Center & Engineering</h3>
              <p className="capability-card-desc">
                Pemantauan real-time 24/7, mitigasi insiden jaringan, manajemen routing BGP/OSPF, konfigurasi switch VLAN, firewall security, dan pemenuhan SLA tingkat ISP & Enterprise.
              </p>

              <div className="capability-tags">
                <span className="tag-pill">24/7 Monitoring</span>
                <span className="tag-pill">Troubleshooting Jaringan</span>
                <span className="tag-pill">MikroTik RouterOS</span>
                <span className="tag-pill">Routing & Switching</span>
                <span className="tag-pill">VLAN Segmentation</span>
                <span className="tag-pill">Firewall & Security</span>
                <span className="tag-pill">IP Management</span>
                <span className="tag-pill">Traffic Packet Analysis</span>
                <span className="tag-pill">Fiber Optic Basics</span>
                <span className="tag-pill">Zabbix & Grafana</span>
              </div>
            </div>
          </Reveal>

          {/* Card 02 */}
          <Reveal delay={200}>
            <div className="capability-card">
              <div className="capability-card-header">
                <span className="capability-num">02</span>
                <span className="capability-category">IT Support & Ops</span>
              </div>
              <h3 className="capability-card-title">IT Infrastructure & Technical Support</h3>
              <p className="capability-card-desc">
                Dukungan teknis responsif kepada client & internal melalui ticketing system, administrasi server Linux, konfigurasi secure VPN, serta panduan troubleshooting modem & ONU.
              </p>

              <div className="capability-tags">
                <span className="tag-pill">Helpdesk Support</span>
                <span className="tag-pill">Remote Assistance</span>
                <span className="tag-pill">Linux Server Admin</span>
                <span className="tag-pill">Secure VPN Setup</span>
                <span className="tag-pill">Ticketing & SLA</span>
                <span className="tag-pill">Modem & ONU Setup</span>
                <span className="tag-pill">Incident Documentation</span>
                <span className="tag-pill">Root Cause Analysis</span>
                <span className="tag-pill">Service Orientation</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
