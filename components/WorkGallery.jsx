"use client";

import React, { useState } from "react";
import { ExternalLink, Terminal, Cpu, Network, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "../data/projects";
import Reveal from "./Reveal";

const CATEGORIES = [
  "Semua",
  "Web & Infrastructure",
  "Network & CLI",
  "Simulation & Routing",
  "IoT & Automation",
];

const LOGOS = [
  { name: "MikroTik", tag: "RouterOS v7" },
  { name: "Cisco", tag: "CCNA IOS" },
  { name: "Linux", tag: "Debian & Ubuntu" },
  { name: "UMM", tag: "Akuakultur IoT" },
  { name: "Zabbix", tag: "Enterprise Monitoring" },
  { name: "Docker", tag: "Containerization" },
  { name: "Nginx", tag: "Reverse Proxy" },
  { name: "Wireshark", tag: "Packet Analysis" },
];

export default function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredProjects =
    activeCategory === "Semua"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="cinematic-work-section">
      <div className="cinematic-container">
        {/* Section Header */}
        <Reveal>
          <div className="cinematic-section-header">
            <span className="section-step-badge">01 / SELECTED WORK</span>
            <h2 className="cinematic-section-title">KARYA YANG BICARA.</h2>
            <p className="cinematic-section-desc">
              Infrastruktur jaringan, simulator interaktif, dan utilitas digital yang dirancang untuk performa tinggi, stabilitas, dan keandalan data.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="cinematic-work-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`cinematic-tab-btn ${
                  activeCategory === cat ? "cinematic-tab-btn--active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 3-Column / Responsive Project Cards Grid */}
        <div className="cinematic-project-grid">
          {filteredProjects.map((project) => (
            <div key={project.num} className="cinematic-project-card">
              <a
                href={project.link}
                className="cinematic-project-card__thumb-link"
                target={project.link.startsWith("http") ? "_blank" : undefined}
                rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <div className="cinematic-project-card__thumb-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="cinematic-project-card__image"
                    loading="lazy"
                  />
                  <div className="cinematic-project-card__thumb-overlay">
                    <span className="cinematic-project-card__play-badge">
                      <span>Buka Project</span>
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </a>

              <div className="cinematic-project-card__info">
                <div className="cinematic-project-card__meta">
                  <span className="cinematic-project-card__num">{project.num}</span>
                  <span className="cinematic-project-card__category">
                    {project.category}
                  </span>
                </div>

                <h3 className="cinematic-project-card__title">
                  <a href={project.link}>{project.title}</a>
                </h3>

                <p className="cinematic-project-card__desc">{project.desc}</p>

                <div className="cinematic-project-card__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="cinematic-project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="cinematic-project-card__footer">
                  <a
                    href={project.link}
                    className="cinematic-project-card__cta"
                    target={project.link.startsWith("http") ? "_blank" : undefined}
                    rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <span>{project.linkText}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Been Part Of / The Bigger Picture Strip */}
        <Reveal className="cinematic-partner-strip">
          <div className="cinematic-partner-header">
            <span className="cinematic-partner-label">BEEN PART OF / THE BIGGER PICTURE</span>
          </div>
          <div className="cinematic-partner-logos">
            {LOGOS.map((item) => (
              <div key={item.name} className="cinematic-partner-item">
                <span className="cinematic-partner-name">{item.name}</span>
                <span className="cinematic-partner-tag">{item.tag}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
