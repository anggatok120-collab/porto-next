import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, CodeXml } from "lucide-react";
import { demoProjects } from "@/data/demo";
import { getProject } from "@/lib/content";

export function generateStaticParams() { return demoProjects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const project = await getProject(slug); return project ? { title: project.title, description: project.description } : { title: "Project not found" }; }

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = await getProject(slug); if (!project) notFound();
  const details = [["Overview", project.content], ["The problem", project.problem ?? "A product constraint that required a dependable and maintainable solution."], ["The solution", project.solution ?? "A focused architecture balancing developer experience, security, and performance."], ["Architecture", project.architecture ?? `A modular system built with ${project.technologies.join(", ")}.`]];
  return <main className="section" style={{ paddingTop: 130 }}><article className="container"><Link href="/projects" className="button"><ArrowLeft size={15}/>All projects</Link><div style={{ marginTop: 40, maxWidth: 900 }}><span className="eyebrow">{project.category} · Case study</span><h1 className="headline">{project.title}</h1><p className="muted" style={{ fontSize: "1.15rem", lineHeight: 1.8 }}>{project.description}</p><div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "24px 0" }}>{project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div><div style={{ display: "flex", gap: 10 }}>{project.githubUrl && <Link className="button" href={project.githubUrl}><CodeXml size={15}/>Source</Link>}{project.liveUrl && <Link className="button button-primary" href={project.liveUrl}>Live demo <ExternalLink size={15}/></Link>}</div></div><div className="glass" style={{ height: "clamp(220px,42vw,480px)", borderRadius: 24, margin: "60px 0", display: "grid", placeItems: "center", backgroundImage: "radial-gradient(circle at 30% 30%,color-mix(in srgb,var(--cyan) 18%,transparent),transparent 35%),radial-gradient(circle at 70% 65%,color-mix(in srgb,var(--purple) 18%,transparent),transparent 35%)" }}><span className="eyebrow">{project.title} / Interface preview</span></div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 18 }}>{details.map(([title, text]) => <section className="card" style={{ padding: 24 }} key={title}><span className="eyebrow">{title}</span><p className="muted" style={{ lineHeight: 1.75 }}>{text}</p></section>)}</div></article></main>;
}
