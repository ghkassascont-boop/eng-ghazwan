import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import ProjectCard from "@/components/project-card";
import Reveal from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
export const revalidate = 60;
export default async function ProjectsPage({params}:{params:Promise<{locale:string}>}) {
  const {locale:raw}=await params;
  if(raw!=="en"&&raw!=="ar") notFound();
  const locale=raw as "en"|"ar"; const ar=locale==="ar";
  const supabase=await createClient();
  const {data}=await supabase.from("projects").select("*").eq("published",true).order("created_at",{ascending:false});
  const projects=(data||[]) as Project[];
  return <main dir={ar?"rtl":"ltr"}><SiteHeader locale={locale}/>
    <section className="bg-[#E9E3D9] py-24 md:py-32"><div className="container"><Link href={`/${locale}`} className="text-[10px] tracking-[.15em] text-[var(--muted)] transition hover:text-[var(--coffee)]">← {ar?"الرئيسية":"HOME"}</Link><Reveal><p className="section-kicker mt-16">{ar?"معرض الأعمال":"THE PORTFOLIO"}</p><h1 className="display mt-6 max-w-5xl text-6xl leading-[.98] md:text-8xl">{ar?"مشاريع مختارة":"Selected work."}</h1><p className="mt-7 max-w-xl text-sm leading-8 text-[var(--muted)]">{ar?"مجموعة من المشاريع والأفكار التي تعكس منهجاً يجمع بين الرؤية المعمارية والدقة الهندسية.":"A curated collection of projects and ideas, bringing architectural vision and engineering discipline into one considered approach."}</p></Reveal><div className="mt-16 flex items-center justify-between border-t border-[var(--line)] pt-5 text-[10px] tracking-[.16em] text-[var(--muted)]"><span>{ar?"الأعمال المنشورة":"PUBLISHED WORK"}</span><span>{String(projects.length).padStart(2,"0")} {ar?"مشروع":"PROJECTS"}</span></div></div></section>
    <section className="container py-20 md:py-28">{projects.length?<div className="grid gap-x-8 gap-y-16 md:grid-cols-2">{projects.map((p,i)=><Reveal key={p.id} className={i%2===1?"md:mt-20":""}><ProjectCard project={p} locale={locale} index={i+1}/></Reveal>)}</div>:<div className="border border-[var(--line)] bg-[var(--surface)] p-12 text-center"><p className="display text-3xl">{ar?"الأعمال قيد الإعداد":"The portfolio is taking shape."}</p><p className="mt-3 text-xs text-[var(--muted)]">{ar?"ستظهر المشاريع هنا عند نشرها من لوحة الإدارة.":"Projects will appear here once published from the admin dashboard."}</p></div>}</section>
    <footer className="border-t border-[var(--line)] py-8"><div className="container flex justify-between gap-4 text-[10px] text-[var(--muted)]"><span>© {new Date().getFullYear()}</span><Link href={`/${locale}`}>{ar?"العودة للرئيسية":"BACK TO HOME ↑"}</Link></div></footer>
  </main>;
}
