import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
export default function ProjectCard({ project, locale }: { project: Project; locale: "en" | "ar" }) {
  const ar = locale === "ar";
  return <Link href={`/${locale}/projects/${project.slug}`} className="group block">
    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]">
      {project.cover_image ? <Image src={project.cover_image} alt={ar ? project.title_ar : project.title_en} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width:768px) 100vw, 50vw" /> : <div className="grid h-full place-items-center text-[var(--accent)] display text-5xl">A.</div>}
      <span className="absolute bottom-4 left-4 bg-[var(--bg)] px-3 py-2 text-[10px] tracking-widest">{ar ? project.category_ar : project.category_en}</span>
    </div>
    <div className="flex items-start justify-between border-b border-[var(--line)] py-4"><div><h3 className="display text-2xl">{ar ? project.title_ar : project.title_en}</h3><p className="mt-1 text-xs text-[var(--muted)]">{project.location || (ar ? "الموقع غير محدد" : "Location not specified")} {project.year ? `· ${project.year}` : ""}</p></div><span className="mt-2 text-[var(--accent)] transition group-hover:translate-x-1">↗</span></div>
  </Link>;
}