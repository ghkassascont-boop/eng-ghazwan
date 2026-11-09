import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import ProjectCard from "@/components/project-card";
import ContactForm from "@/components/contact-form";
import { copy, services, type Locale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
import type { Project, Profile } from "@/lib/types";

export const revalidate = 60;
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; if(raw !== "en" && raw !== "ar") notFound();
  const locale = raw as Locale; const ar = locale === "ar"; const t = copy[locale];
  let projects: Project[] = []; let profile: Profile | null = null;
  try {
    const supabase = await createClient();
    const [p, pr] = await Promise.all([
      supabase.from("projects").select("*").eq("published",true).eq("featured",true).order("created_at",{ascending:false}).limit(6),
      supabase.from("profile").select("*").limit(1).maybeSingle()
    ]);
    projects = (p.data || []) as Project[]; profile = pr.data as Profile | null;
  } catch {}
  return <main dir={ar ? "rtl" : "ltr"}>
    <SiteHeader locale={locale}/>
    <section id="home" className="container grid min-h-[650px] items-center gap-12 py-20 md:grid-cols-[1.02fr_.98fr]">
      <div className="max-w-2xl"><p className="eyebrow mb-7">{t.heroEyebrow}</p><h1 className="display text-5xl leading-[1.08] md:text-7xl">{profile ? (ar ? profile.title_ar : profile.title_en) : t.heroTitle}</h1><p className="mt-7 max-w-xl text-base leading-8 text-[var(--muted)]">{profile ? (ar ? profile.bio_ar : profile.bio_en) : t.heroText}</p><div className="mt-9 flex flex-wrap gap-3"><a className="btn" href="#projects">{t.explore} ↗</a><a className="btn btn-outline" href="#contact">{t.contact}</a></div><p className="mt-16 text-[10px] tracking-[.2em] text-[var(--muted)]">{t.scroll} ↓</p></div>
      <div className="relative min-h-[430px] overflow-hidden bg-[var(--surface-2)]">
        <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85" alt="Contemporary architectural interior" fill priority className="object-cover"/>
        <div className="absolute bottom-5 left-5 bg-[var(--bg)]/90 px-5 py-4"><span className="eyebrow">DESIGN / ENGINEERING</span><p className="display mt-1 text-xl">Form follows purpose.</p></div>
      </div>
    </section>
    <section id="about" className="bg-[var(--coffee-dark)] py-24 text-[var(--bg)]"><div className="container grid gap-10 md:grid-cols-[.7fr_1.3fr]"><p className="eyebrow !text-[var(--accent)]">{t.aboutLabel}</p><div><h2 className="display max-w-3xl text-4xl leading-tight md:text-6xl">{t.aboutTitle}</h2><p className="mt-7 max-w-2xl leading-8 text-[var(--surface-2)]">{t.aboutText}</p><div className="mt-12 grid grid-cols-3 gap-5 border-t border-white/20 pt-6"><div><b className="display text-3xl">01</b><p className="mt-2 text-xs text-[var(--accent)]">{ar ? "رؤية متكاملة" : "Integrated vision"}</p></div><div><b className="display text-3xl">02</b><p className="mt-2 text-xs text-[var(--accent)]">{ar ? "دقة تقنية" : "Technical precision"}</p></div><div><b className="display text-3xl">03</b><p className="mt-2 text-xs text-[var(--accent)]">{ar ? "اهتمام بالتفاصيل" : "Detail focused"}</p></div></div></div></div></section>
    <section id="services" className="container py-24"><div className="mb-12"><p className="eyebrow">{t.servicesLabel}</p><h2 className="display mt-3 text-5xl">{t.servicesTitle}</h2></div><div className="grid gap-px bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">{services.map(s=><article key={s.icon} className="bg-[var(--bg)] p-8"><span className="eyebrow">{s.icon}</span><h3 className="display mt-8 text-2xl">{ar?s.ar:s.en}</h3><p className="mt-3 text-sm leading-7 text-[var(--muted)]">{ar?s.descAr:s.descEn}</p></article>)}</div></section>
    <section id="projects" className="bg-[var(--surface-2)] py-24"><div className="container"><div className="mb-12 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">{t.projectsLabel}</p><h2 className="display mt-3 text-5xl">{t.projectsTitle}</h2></div><Link href={`/${locale}/projects`} className="border-b border-[var(--coffee)] pb-2 text-sm">{t.allProjects} ↗</Link></div>{projects.length ? <div className="grid gap-8 md:grid-cols-2">{projects.map(p=><ProjectCard key={p.id} project={p} locale={locale}/>)}</div> : <div className="card p-12 text-center text-sm text-[var(--muted)]">{t.noProjects}</div>}</div></section>
    <section id="contact" className="container grid gap-12 py-24 md:grid-cols-2"><div><p className="eyebrow">{t.contactLabel}</p><h2 className="display mt-4 text-5xl leading-tight">{t.contactTitle}</h2><p className="mt-6 max-w-md leading-8 text-[var(--muted)]">{t.contactText}</p>{profile?.email && <a className="mt-8 inline-block border-b border-[var(--accent)] pb-2" href={`mailto:${profile.email}`}>{profile.email}</a>}</div><div className="card p-7"><ContactForm locale={locale}/></div></section>
    <footer className="border-t border-[var(--line)] py-8"><div className="container flex flex-wrap justify-between gap-3 text-xs text-[var(--muted)]"><span>© {new Date().getFullYear()} · STUDIO / ENGINEER</span><span>{t.footer}</span><Link href="/admin/login">Admin</Link></div></footer>
  </main>;
}