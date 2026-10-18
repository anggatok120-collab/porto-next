"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const marqueeTrackRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const syncMarqueeSpeed = () => {
      const track = marqueeTrackRef.current;
      if (!track) return;
      const pxPerSecond = window.innerWidth <= 768 ? 95 : 130;
      const loopDistance = track.scrollWidth / 2;
      const loopSeconds = Math.max(14, loopDistance / pxPerSecond);
      heroRef.current?.style.setProperty("--marquee-loop-duration", `${loopSeconds}s`);
    };

    syncMarqueeSpeed();
    window.addEventListener("resize", syncMarqueeSpeed);
    return () => window.removeEventListener("resize", syncMarqueeSpeed);
  }, []);

  const marqueeText = "ANGGA · NETWORK ENGINEER · NOC · ";

  return (
    <section id="hero" className="hero-root" ref={heroRef}>
      {/* Background SVG grid & wavy lines */}
      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* Center marquee outline text */}
      <div className="bg-name-marquee">
        <div className="bg-name-track" ref={marqueeTrackRef}>
          <span className="bg-name-text">{marqueeText}</span>
          <span className="bg-name-text">{marqueeText}</span>
        </div>
      </div>

      {/* Mobile-only background fill rows */}
      {["t1", "t2", "t3", "t4", "b1", "b2", "b3", "b4"].map((pos) => (
        <div
          key={pos}
          className={`bg-name-marquee bg-name-marquee--mobile-extra bg-name-marquee--${pos}`}
          aria-hidden="true"
        >
          <div className="bg-name-track">
            <span className="bg-name-text">{marqueeText}</span>
            <span className="bg-name-text">{marqueeText}</span>
          </div>
        </div>
      ))}

      {/* Concentric radar circles */}
      <div className="concentric-circles" aria-hidden="true">
        <div className="circle circle-1" />
        <div className="circle circle-2" />
        <div className="circle circle-3" />
      </div>

      {/* Foreground cutout portrait with subtle parallax */}
      <div
        className="profile-wrap"
        style={{
          transform: `translate(${mouse.x * 12}px, ${mouse.y * 8}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <img
          src="/images/foto_cutout.png"
          alt="Angga - Network Engineer"
          className="profile-image"
          draggable={false}
          priority="true"
        />
      </div>

      {/* Scroll Down indicator */}
      <a href="#work" className="scroll-indicator" aria-label="Scroll down to work">
        <div className="scroll-line" />
        <span className="scroll-text">Scroll Down</span>
      </a>
    </section>
  );
}
