"use client";

import { useState } from "react";
import FloatingCursors from "../components/FloatingCursors";
import Header from "../components/Header";
import Hero from "../components/Hero";
import WorkGallery from "../components/WorkGallery";
import Recognition from "../components/Recognition";
import About from "../components/About";
import Timeline from "../components/Timeline";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main className="portfolio-wrapper cinematic-wrapper">
      {/* Live Collaborative Moving Cursors (matching the video's live agents/visitors) */}
      <FloatingCursors />

      {/* Top Navbar */}
      <Header onOpenContact={() => setIsContactModalOpen(true)} />

      {/* Hero Section */}
      <Hero />

      {/* 01 / Selected Work */}
      <WorkGallery />

      {/* 02 / Recognition & Awards */}
      <Recognition />

      {/* 03 / Behind the System (About & Workflow) */}
      <About />

      {/* 04 / The Journey (Experience Timeline) */}
      <Timeline />

      {/* 05 / Let's Work Together (Contact) */}
      <Contact
        isModalOpen={isContactModalOpen}
        setIsModalOpen={setIsContactModalOpen}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
