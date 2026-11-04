"use client";

import React, { useEffect, useState } from "react";

const AGENTS = [
  {
    id: "devin",
    name: "Devin · Agent 01",
    color: "#00f2fe",
    accent: "rgba(0, 242, 254, 0.2)",
    path: [
      { x: 18, y: 22, pause: 1400 },
      { x: 42, y: 15, pause: 1800 },
      { x: 68, y: 28, pause: 2000 },
      { x: 50, y: 48, pause: 1500 },
      { x: 25, y: 65, pause: 2200 },
      { x: 75, y: 72, pause: 1900 },
      { x: 82, y: 35, pause: 2100 },
    ],
    speed: 3800,
  },
  {
    id: "noc-bot",
    name: "NOC Watcher · 24/7",
    color: "#ff2a3a",
    accent: "rgba(255, 42, 58, 0.2)",
    path: [
      { x: 78, y: 18, pause: 1600 },
      { x: 62, y: 34, pause: 2200 },
      { x: 30, y: 42, pause: 1900 },
      { x: 45, y: 78, pause: 2400 },
      { x: 85, y: 85, pause: 1700 },
      { x: 20, y: 30, pause: 2000 },
    ],
    speed: 4200,
  },
  {
    id: "visitor-sg",
    name: "Visitor · Singapore",
    color: "#10b981",
    accent: "rgba(16, 185, 129, 0.2)",
    path: [
      { x: 35, y: 30, pause: 2100 },
      { x: 80, y: 52, pause: 1700 },
      { x: 60, y: 70, pause: 2300 },
      { x: 15, y: 82, pause: 1900 },
      { x: 28, y: 25, pause: 2500 },
      { x: 70, y: 20, pause: 1800 },
    ],
    speed: 4600,
  },
  {
    id: "claude",
    name: "Claude · Architect",
    color: "#a855f7",
    accent: "rgba(168, 85, 247, 0.2)",
    path: [
      { x: 55, y: 25, pause: 1800 },
      { x: 22, y: 45, pause: 2400 },
      { x: 72, y: 62, pause: 2000 },
      { x: 38, y: 85, pause: 2200 },
      { x: 88, y: 42, pause: 1600 },
      { x: 48, y: 18, pause: 2100 },
    ],
    speed: 4100,
  },
];

export default function FloatingCursors() {
  const [positions, setPositions] = useState(
    AGENTS.map((a) => ({
      x: a.path[0].x,
      y: a.path[0].y,
      step: 0,
      isClicking: false,
    }))
  );
  const [enabled, setEnabled] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!enabled || !isClient) return;

    const intervals = AGENTS.map((agent, idx) => {
      let currentStep = 0;

      const moveToNext = () => {
        const nextStep = (currentStep + 1) % agent.path.length;
        const target = agent.path[nextStep];
        currentStep = nextStep;

        setPositions((prev) => {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            x: target.x,
            y: target.y,
            step: nextStep,
            isClicking: true,
          };
          return next;
        });

        // Trigger click ripple effect
        setTimeout(() => {
          setPositions((prev) => {
            const next = [...prev];
            if (next[idx]) next[idx].isClicking = false;
            return next;
          });
        }, 600);
      };

      const timer = setInterval(moveToNext, agent.speed);
      return timer;
    });

    return () => {
      intervals.forEach((timer) => clearInterval(timer));
    };
  }, [enabled, isClient]);

  if (!isClient) return null;

  return (
    <>
      {/* Live Collaborative Cursor Layer */}
      <div className="live-cursors-layer" aria-hidden="true">
        {enabled &&
          AGENTS.map((agent, i) => {
            const pos = positions[i] || { x: 50, y: 50, isClicking: false };
            return (
              <div
                key={agent.id}
                className="live-cursor-agent"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transition: `left ${agent.speed * 0.75}ms cubic-bezier(0.25, 1, 0.5, 1), top ${agent.speed * 0.75}ms cubic-bezier(0.25, 1, 0.5, 1)`,
                }}
              >
                {/* SVG Pointer Arrow */}
                <svg
                  className="live-cursor-pointer"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    filter: `drop-shadow(0 2px 6px ${agent.color}88)`,
                  }}
                >
                  <path
                    d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
                    fill={agent.color}
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Name Badge */}
                <div
                  className="live-cursor-badge"
                  style={{
                    backgroundColor: agent.color,
                    boxShadow: `0 2px 8px ${agent.color}66`,
                  }}
                >
                  <span className="live-cursor-label">{agent.name}</span>
                </div>

                {/* Click Ripple Effect */}
                {pos.isClicking && (
                  <span
                    className="live-cursor-ripple"
                    style={{
                      borderColor: agent.color,
                      backgroundColor: agent.accent,
                    }}
                  />
                )}
              </div>
            );
          })}
      </div>

      {/* Floating Interactive Live Agent Control Pill (matching bottom widget in video) */}
      <aside
        className="live-agent-dock"
        aria-label="Live collaboration mode"
      >
        <div className="live-agent-dock-pill">
          <span className="live-pulse-dot" />
          <span className="live-agent-text">
            <strong>4 Agents Active</strong> · Live Redesign
          </span>
          <button
            type="button"
            className="live-agent-toggle-btn"
            onClick={() => setEnabled(!enabled)}
            title={enabled ? "Sembunyikan cursor interaktif" : "Tampilkan cursor interaktif"}
          >
            {enabled ? "Motion: ON" : "Motion: PAUSED"}
          </button>
        </div>
      </aside>
    </>
  );
}
