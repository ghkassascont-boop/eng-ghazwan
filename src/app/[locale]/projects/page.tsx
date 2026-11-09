import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import ProjectCard from "@/components/project-card";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
export const revalidate = 60;
export default async function ProjectsPage({params}:{params:Promise<{locale:string}>}) {
 const {locale:raw}=await params;if(raw!=="en"&&raw!=="ar")notFound();const locale=raw as "en"|"ar";const ar=locale==="ar";
 const supabase=await createClient();const {data}=await supabase.from("projects").select("*").eq("published",true).order("created_at",{ascending:false});
 const projects=(data||[]) as Project[];
 return <main dir={ar?"rtl":"ltr"}><SiteHeader locale={locale}/><section className="container py-20"><p className="eyebrow">PORTFOLIO / PROJECTS</p><h1 className="display mt-4 text-6xl">{ar?"جميع المشاريع":"Selected work"}</h1><p className="mt-5 text-[var(--muted)]">{ar?"مجموعة من الأعمال المعمارية والهندسية.":"A collection of architectural and engineering work."}</p><div className="mt-14 grid gap-8 md:grid-cols-2">{projects.map(p=><ProjectCard key={p.id} project={p} locale={locale}/>)}</div></section></main>;
}