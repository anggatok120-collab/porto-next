export const demoProjects = [
  { title: "Cybersecurity Dashboard", slug: "cybersecurity-dashboard", category: "Cybersecurity", description: "Threat intelligence workspace for monitoring security signals, incidents, and attack surface changes.", technologies: ["Next.js", "TypeScript", "PostgreSQL"], featured: true, githubUrl: "#", liveUrl: "#", content: "A unified security operations dashboard built to turn noisy events into clear, prioritized actions.", problem: "Security signals were fragmented across tools.", solution: "A normalized event pipeline and role-aware dashboard.", architecture: "Next.js, event ingestion API, PostgreSQL, and background workers." },
  { title: "Full Stack Task Manager", slug: "full-stack-task-manager", category: "Full Stack", description: "Collaborative task planning with team workspaces, realtime updates, and auditable activity.", technologies: ["React", "Node.js", "Prisma"], featured: true, githubUrl: "#", liveUrl: "#", content: "A focused productivity platform for modern engineering teams." },
  { title: "Network Monitoring Tool", slug: "network-monitoring-tool", category: "Networking", description: "Lightweight service health monitoring with latency history and incident notifications.", technologies: ["Python", "Redis", "Docker"], featured: true, githubUrl: "#", liveUrl: null, content: "Reliable network visibility without an operationally heavy stack." },
  { title: "Portfolio CMS", slug: "portfolio-cms", category: "Web Development", description: "Secure content management system powering projects, articles, certificates, and messages.", technologies: ["Next.js", "Auth.js", "PostgreSQL"], featured: false, githubUrl: "#", liveUrl: "#", content: "A production-ready personal publishing system." },
  { title: "REST API Backend", slug: "rest-api-backend", category: "Backend", description: "Versioned REST API with validation, rate limiting, documentation, and test coverage.", technologies: ["Node.js", "Zod", "PostgreSQL"], featured: false, githubUrl: "#", liveUrl: null, content: "A maintainable API foundation for product teams." },
  { title: "Automation Toolkit", slug: "automation-toolkit", category: "Automation", description: "Reusable automation jobs for backups, reports, deployments, and environment checks.", technologies: ["Python", "GitHub Actions", "Docker"], featured: false, githubUrl: "#", liveUrl: null, content: "Small, composable tools that remove repetitive operational work." },
];

export const demoSkills = [
  ["TypeScript", "Frontend", "Advanced"], ["React", "Frontend", "Advanced"], ["Next.js", "Frontend", "Comfortable"],
  ["Node.js", "Backend", "Advanced"], ["Python", "Backend", "Comfortable"], ["PostgreSQL", "Database", "Comfortable"],
  ["Linux", "Cybersecurity", "Advanced"], ["Web Security", "Cybersecurity", "Comfortable"], ["Networking", "Cybersecurity", "Comfortable"],
  ["Docker", "DevOps / Tools", "Comfortable"], ["Git", "DevOps / Tools", "Advanced"], ["Burp Suite", "Cybersecurity", "Learning"],
].map(([name, category, level], i) => ({ name, category, level, sortOrder: i }));

export const demoExperiences = [
  { position: "Independent Software Developer", company: "Freelance", location: "Indonesia · Remote", startDate: "2024-01-01", endDate: null, current: true, description: "Membangun aplikasi web dan backend yang berfokus pada reliability, security, dan pengalaman pengguna.", technologies: ["Next.js", "Node.js", "PostgreSQL"] },
  { position: "Cybersecurity Lab Researcher", company: "Independent Study", location: "Indonesia", startDate: "2023-01-01", endDate: "2023-12-31", current: false, description: "Melakukan lab keamanan aplikasi, network analysis, dan dokumentasi mitigasi kerentanan.", technologies: ["Linux", "Nmap", "Wireshark"] },
  { position: "Backend Engineering Trainee", company: "Technology Program", location: "Remote", startDate: "2022-03-01", endDate: "2022-12-31", current: false, description: "Mempelajari desain API, database relational, testing, dan deployment workflow.", technologies: ["REST API", "PostgreSQL", "Docker"] },
];

export const demoCertificates = [
  ["Cybersecurity Essentials", "Cisco", "2025-03-01", ["Network Security", "Threat Analysis"]],
  ["Google Cybersecurity", "Google", "2024-10-01", ["SIEM", "Linux"]],
  ["Cloud Practitioner", "Microsoft", "2024-06-01", ["Cloud", "Identity"]],
  ["Backend Development", "Dicoding", "2023-11-01", ["API", "Node.js"]],
  ["Linux Administration", "Coursera", "2023-04-01", ["Linux", "Bash"]],
].map(([name, issuer, issueDate, skills]) => ({ name: name as string, slug: (name as string).toLowerCase().replaceAll(" ", "-"), issuer: issuer as string, issueDate: issueDate as string, skills: skills as string[] }));

export const demoPosts = [
  { title: "Designing Secure APIs from Day One", slug: "designing-secure-apis", excerpt: "Practical design decisions that reduce attack surface before the first endpoint ships.", category: "Cybersecurity", tags: ["API", "OWASP"], publishedAt: "2025-08-12", content: "# Designing Secure APIs\n\nSecurity works best when it is part of the architecture—not a final checklist.\n\n## Start with boundaries\n\nValidate every input, minimize exposed data, and make authorization decisions close to the data." },
  { title: "A Practical Next.js Backend Architecture", slug: "nextjs-backend-architecture", excerpt: "How to keep server actions, validation, and data access maintainable as a product grows.", category: "Backend", tags: ["Next.js", "Architecture"], publishedAt: "2025-07-03", content: "# A Practical Architecture\n\nUse thin actions, explicit validation, and a small data access layer." },
  { title: "Linux Tools I Use Every Week", slug: "linux-tools-every-week", excerpt: "A compact toolbox for inspecting systems, networks, logs, and processes.", category: "Linux", tags: ["Linux", "CLI"], publishedAt: "2025-05-19", content: "# Linux Tools\n\nGood observability begins with asking the system precise questions." },
  { title: "Learning Networking Through Small Labs", slug: "networking-small-labs", excerpt: "A project-based approach to understanding DNS, routing, HTTP, and packet flow.", category: "Networking", tags: ["Networking", "Labs"], publishedAt: "2025-03-08", content: "# Small Networking Labs\n\nBuild, observe, break, and explain." },
  { title: "Automation That Actually Saves Time", slug: "automation-that-saves-time", excerpt: "Choosing repetitive work worth automating—and keeping scripts reliable.", category: "Programming", tags: ["Automation", "Python"], publishedAt: "2025-01-14", content: "# Useful Automation\n\nAutomate stable, repeated processes with visible failure modes." },
];
