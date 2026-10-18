"use client";

import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import WorkGallery from "../components/WorkGallery";
import Capabilities from "../components/Capabilities";
import About from "../components/About";
import Timeline from "../components/Timeline";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main className="portfolio-wrapper">
      <Header onOpenContact={() => setIsContactModalOpen(true)} />
      <Hero />
      <WorkGallery />
      <Capabilities />
      <About />
      <Timeline />
      <Contact
        isModalOpen={isContactModalOpen}
        setIsModalOpen={setIsContactModalOpen}
      />
      <Footer />
    </main>
  );
}
