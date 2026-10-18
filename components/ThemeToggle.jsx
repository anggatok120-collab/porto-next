"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "", style = {} }) {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`nav-theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={style}
    >
      <Sun className="icon-sun" size={18} />
      <Moon className="icon-moon" size={18} />
    </button>
  );
}
