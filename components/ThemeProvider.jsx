"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [clipStyle, setClipStyle] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light") {
        setDark(false);
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        setDark(true);
        document.documentElement.classList.add("dark");
        document.documentElement.removeAttribute("data-theme");
      }
    }
  }, []);

  const applyTheme = (isDark) => {
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleTheme = (e) => {
    if (animating) return;
    const nextDark = !dark;
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (document.startViewTransition) {
      document.documentElement.style.setProperty("--vt-x", `${x}px`);
      document.documentElement.style.setProperty("--vt-y", `${y}px`);
      document.documentElement.style.setProperty("--vt-r", `${maxRadius}px`);
      document.documentElement.classList.add("vt-disable-anim", "vt-wipe-active");

      const transition = document.startViewTransition(() => {
        flushSync(() => applyTheme(nextDark));
      });

      transition.finished.then(() => {
        document.documentElement.classList.remove("vt-disable-anim", "vt-wipe-active");
      });
      return;
    }

    // Fallback animation
    setAnimating(true);
    const targetBg = nextDark ? "#0f1115" : "#D9DADD";
    setClipStyle({
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      pointerEvents: "none",
      background: targetBg,
      clipPath: `circle(0px at ${x}px ${y}px)`,
      transition: `clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setClipStyle((prev) => ({
          ...prev,
          clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
        }));
      });
    });

    setTimeout(() => {
      applyTheme(nextDark);
      setTimeout(() => {
        setClipStyle({});
        setAnimating(false);
      }, 50);
    }, 500);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
      {animating && (
        <div className="theme-transition-circle" style={clipStyle} aria-hidden="true" />
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
