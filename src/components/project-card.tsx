import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
export default function ProjectCard({ project, locale, index = 1 }: { project: Project; locale: "en" | "ar"; index?: number }) {
  const ar = locale === "ar";
  return <Link href={`/${locale}/projects/${project.slug}`} className="project-card group">
    <div className="project-image">
      {project.cover_image ? <Image src={project.cover_image} alt={ar ? project.title_ar : project.title_en} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" /> : <div className="grid h-full place-items-center display text-6xl text-[var(--coffee)]">A.</div>}
      <span className="absolute bottom-4 start-4 z-10 bg-[var(--bg)] px-4 py-2 text-[9px] font-semibold tracking-[.16em]">{ar ? project.category_ar : project.category_en}</span>
      <span className="absolute end-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-[var(--bg)]/90 text-sm transition duration-500 group-hover:rotate-45 group-hover:bg-[var(--coffee)] group-hover:text-white">↗</span>
    </div>
    <div className="project-meta flex items-start justify-between gap-4">
      <div><p className="project-index mb-2">{String(index).padStart(2,"0")} / {ar ? "مشروع" : "PROJECT"}</p><h3 className="display text-2xl md:text-[2rem]">{ar ? project.title_ar : project.title_en}</h3><p className="mt-2 text-[11px] text-[var(--muted)]">{[project.location, project.year, project.area_sqm ? `${project.area_sqm} m²` : null].filter(Boolean).join(" · ")}</p></div>
      <span className="mt-5 text-[var(--coffee)]">↗</span>
    </div>
  </Link>;
}
