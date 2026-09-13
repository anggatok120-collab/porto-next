export const siteConfig = {
  name: "Angga",
  title: "Angga — Software Developer & Cybersecurity Enthusiast",
  role: "Software Developer & Cybersecurity Enthusiast",
  location: "Indonesia",
  tagline: "Building secure, scalable, and modern digital experiences.",
  bio: "Angga adalah Software Developer dan Cybersecurity Enthusiast yang tertarik pada pengembangan aplikasi modern, backend system, automation, networking, cloud technology, dan application security.",
  email: "hello@example.com",
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  instagram: "https://instagram.com/username",
  cvUrl: "/cv/CV_Angga.pdf",
  profileImage: "/images/angga.jpg",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const navItems = [
  ["Home", "/#home"], ["About", "/#about"], ["Skills", "/#skills"],
  ["Experience", "/#experience"], ["Projects", "/projects"],
  ["Certifications", "/#certifications"], ["Blog", "/blog"], ["Contact", "/#contact"],
] as const;
