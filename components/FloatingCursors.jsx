"use client";

import React, { useState } from "react";

export default function FloatingCursors() {
  const [enabled, setEnabled] = useState(true);

  return (
    <>
      {/* 60FPS Pure CSS Continuous Multi-Agent Flying Cursors (Rendered directly in SSR & Client) */}
      <div className={`live-cursors-layer ${!enabled ? "live-cursors-layer--paused" : ""}`} aria-hidden="true">
        {/* Agent 1: Cyan (Devin · Agent 01) */}
        <div className="live-cursor-agent live-cursor-agent--1">
          <svg
            className="live-cursor-pointer"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
              fill="#00f2fe"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="live-cursor-badge live-cursor-badge--cyan">
            <span className="live-cursor-label">Devin · Agent 01</span>
          </div>
          <span className="live-cursor-ripple live-cursor-ripple--cyan" />
        </div>

        {/* Agent 2: Crimson Red (NOC Watcher · 24/7) */}
        <div className="live-cursor-agent live-cursor-agent--2">
          <svg
            className="live-cursor-pointer"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
              fill="#ff2a3a"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="live-cursor-badge live-cursor-badge--red">
            <span className="live-cursor-label">NOC Watcher · 24/7</span>
          </div>
          <span className="live-cursor-ripple live-cursor-ripple--red" />
        </div>

        {/* Agent 3: Emerald Green (Visitor · Singapore) */}
        <div className="live-cursor-agent live-cursor-agent--3">
          <svg
            className="live-cursor-pointer"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
              fill="#10b981"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="live-cursor-badge live-cursor-badge--green">
            <span className="live-cursor-label">Visitor · Singapore</span>
          </div>
          <span className="live-cursor-ripple live-cursor-ripple--green" />
        </div>

        {/* Agent 4: Violet / Purple (Claude · Architect) */}
        <div className="live-cursor-agent live-cursor-agent--4">
          <svg
            className="live-cursor-pointer"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
              fill="#a855f7"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="live-cursor-badge live-cursor-badge--purple">
            <span className="live-cursor-label">Claude · Architect</span>
          </div>
          <span className="live-cursor-ripple live-cursor-ripple--purple" />
        </div>
      </div>

      {/* Floating Interactive Live Agent Control Pill (matching bottom widget in video) */}
      <aside className="live-agent-dock" aria-label="Live collaboration mode">
        <div className="live-agent-dock-pill">
          <span className="live-pulse-dot" />
          <span className="live-agent-text">
            <strong>4 Agents Active</strong> · Live Multi-Cursor
          </span>
          <button
            type="button"
            className="live-agent-toggle-btn"
            onClick={() => setEnabled(!enabled)}
            title={enabled ? "Pause animasi kursor" : "Aktifkan animasi kursor"}
          >
            {enabled ? "Motion: ON" : "Motion: OFF"}
          </button>
        </div>
      </aside>
    </>
  );
}
