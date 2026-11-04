"use client";

import React, { useState } from "react";
import { ExternalLink, Terminal, Waves } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "../data/projects";
import Reveal from "./Reveal";
import TypewriterTitle from "./TypewriterTitle";

const CARD_SCATTER = [
  { rot: -6, x: 6, y: -4 },
  { rot: 4, x: -8, y: 3 },
  { rot: -3, x: 8, y: 5 },
  { rot: 7, x: -5, y: -5 },
];

function WorkAlbumStackMobile({ projects, activeIndex, onAdvance }) {
  const count = projects.length;

  return (
    <div className="work-mobile-stack" onClick={onAdvance}>
      {projects.map((project, i) => {
        const offset = (i - activeIndex + count) % count;
        const isExiting = offset === count - 1;
        if (offset > 2 && !isExiting) return null;

        const scatter = CARD_SCATTER[i % CARD_SCATTER.length];
        let style;

        if (isExiting) {
          style = {
            "--tx": `${scatter.x + 100}px`,
            "--ty": `${scatter.y - 40}px`,
            "--rot": `${scatter.rot + 25}deg`,
            "--sc": 0.88,
            "--op": 0,
            zIndex: 5,
          };
        } else {
          const depth = offset;
          const isFront = depth === 0;
          const calm = 0.4;
          const dir = depth % 2 === 1 ? -1 : 1;
          style = {
            "--tx": isFront ? "0px" : `${scatter.x * calm + depth * 8}px`,
            "--ty": isFront ? "0px" : `${scatter.y * calm + dir * depth * 10}px`,
            "--rot": isFront ? "0deg" : `${scatter.rot * calm + depth * (scatter.rot >= 0 ? 1.5 : -1.5)}deg`,
            "--sc": isFront ? 1 : 1 - depth * 0.06,
            "--op": isFront ? 1 : 0.75 - (depth - 1) * 0.2,
            zIndex: 30 - depth * 10,
          };
        }

        return (
          <img
            key={project.num}
            src={project.image}
            alt={project.title}
            className={`stacked-image${offset === 0 ? " stacked-image-front" : ""}`}
            style={style}
            draggable={false}
          />
        );
      })}
    </div>
  );
}

export default function WorkGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  const goTo = (index) => {
    const normalized = ((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    setActiveIndex(normalized);
  };

  return (
    <section id="work" className="section">
      <Reveal>
        <div className="work-header">
          <div>
            <div className="section-label">Selected Work</div>
            <TypewriterTitle text="Work Gallery" />
            <div className="section-desc">
              Koleksi sistem infrastruktur jaringan, terminal interaktif, dan utilitas digital yang telah saya bangun.
            </div>
          </div>
          <div className="work-header-actions">
            <a
              href="/terminal"
              className="work-album-btn-top"
              title="Buka Terminal Interaktif Linux"
            >
              <Terminal size={14} /> Buka Terminal
            </a>
            <a
              href="/network-lab"
              className="work-album-btn-top"
              title="Masuk Simulator Topologi Jaringan"
            >
              <ExternalLink size={14} /> Network Lab
            </a>
            <a
              href="/aquaculture"
              className="work-album-btn-top"
              title="Buka Smart Aquaculture IoT Simulator"
            >
              <Waves size={14} /> Smart Aquaculture
            </a>
          </div>
        </div>
      </Reveal>

      {/* Desktop 3D Coverflow Album */}
      <Reveal delay={100}>
        <div className="work-album">
          <div className="work-album-inner">
            {PROJECTS.map((project, index) => {
              const total = PROJECTS.length;
              let diff = (index - activeIndex + total) % total;
              if (diff > total / 2) diff -= total;

              const isCenter = diff === 0;
              const distance = Math.abs(diff);
              const dir = isCenter ? 0 : diff / distance;

              const style = isCenter
                ? {
                    transform: "translate(-50%, -50%) scale(1)",
                    zIndex: 10,
                    opacity: 1,
                  }
                : {
                    transform: `translate(calc(-50% + ${
                      dir * (210 + (distance - 1) * 120)
                    }px), -50%) scale(${Math.max(0.55, 1 - distance * 0.25)})`,
                    zIndex: 10 - distance,
                    opacity: distance <= 2 ? Math.max(0, 0.85 - (distance - 1) * 0.45) : 0,
                    pointerEvents: distance <= 2 ? "auto" : "none",
                  };

              return (
                <div
                  key={project.num}
                  className={`work-album-item${isCenter ? " work-album-item-center" : ""}`}
                  style={style}
                  onClick={() => !isCenter && goTo(index)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="work-album-img"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Mobile-only Stack */}
      <Reveal delay={120}>
        <div className="work-mobile-stack-wrap">
          <WorkAlbumStackMobile
            projects={PROJECTS}
            activeIndex={activeIndex}
            onAdvance={() => goTo(activeIndex + 1)}
          />
        </div>
      </Reveal>

      {/* Active Project Info */}
      <Reveal delay={180}>
        <div className="work-info" key={activeProject.num}>
          <div className="work-info-meta">
            <span className="work-info-num">{activeProject.num}</span>
            <span className="work-info-category">{activeProject.category}</span>
          </div>
          <h3 className="work-info-title">{activeProject.title}</h3>
          <p className="work-info-desc">{activeProject.desc}</p>
          <div className="work-info-tags">
            {activeProject.tags.map((t) => (
              <span key={t} className="work-tag">{t}</span>
            ))}
          </div>

          <a
            href={activeProject.link}
            className="work-info-link"
          >
            {activeProject.linkText}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
