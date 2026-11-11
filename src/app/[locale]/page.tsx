import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, DraftingCompass, Layers3, Ruler, Building2, Cuboid, Compass, MoveUpRight } from "lucide-react";
import SiteHeader from "@/components/site-header";
import ProjectCard from "@/components/project-card";
import ContactForm from "@/components/contact-form";
import Reveal from "@/components/reveal";
import { copy, services, type Locale } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";
import type { Project, Profile } from "@/lib/types";

export const revalidate = 60;
const serviceIcons = [DraftingCompass, Building2, Layers3, Cuboid, Ruler, Compass];

export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params; const ar=locale==="ar"; let c:Record<string,string>={};
  try { const sb=await createClient(); const {data}=await sb.from("site_content").select("content").eq("id","global").maybeSingle(); c=(data?.content||{}) as Record<string,string>; } catch {}
  return { title:c[ar?"seo_title_ar":"seo_title_en"] || (ar?"هارموني ديكور | العمارة والتصميم الداخلي":"Harmony Decor | Architecture & Interiors"), description:c[ar?"seo_description_ar":"seo_description_en"] || (ar?"مشاريع معمارية وتصميم داخلي مختارة.":"Selected architecture and interior design projects.") };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "en" && raw !== "ar") notFound();
  const locale = raw as Locale;
  const ar = locale === "ar";
  const t = copy[locale];
  let projects: Project[] = [];
  let profile: Profile | null = null;
  let siteContent: Record<string, string> = {};
  try {
    const supabase = await createClient();
    const [p, pr, sc] = await Promise.all([
      supabase.from("projects").select("*").eq("published", true).eq("featured", true).order("created_at", { ascending: false }).limit(6),
      supabase.from("profile").select("*").limit(1).maybeSingle(),
      supabase.from("site_content").select("content").eq("id", "global").maybeSingle()
    ]);
    projects = (p.data || []) as Project[];
    profile = pr.data as Profile | null;
    siteContent = (sc.data?.content || {}) as Record<string, string>;
  } catch {}

  return <main dir={ar ? "rtl" : "ltr"}>
    <SiteHeader locale={locale} />

    <section id="home" className="hero-shell">
      <div className="container grid min-h-[760px] items-center gap-14 py-16 lg:grid-cols-[.96fr_1.04fr] lg:py-20">
        <div className="relative z-10">
          <div className="mb-5 flex items-center gap-3 animate-rise"><span className="h-px w-9 bg-[var(--coffee)]"></span><span className="text-[11px] font-bold tracking-[.2em] text-[var(--coffee)]">{siteContent[ar?"brand_name_ar":"brand_name_en"]||(ar?"هارموني ديكور":"HARMONY DECOR")}</span></div><p className="section-kicker animate-rise">{siteContent[ar ? "hero_eyebrow_ar" : "hero_eyebrow_en"] || t.heroEyebrow}</p>
          <h1 className="display hero-title mt-8 animate-rise animate-delay-1">{siteContent[`hero_title_${locale}`] || (profile ? (ar ? profile.title_ar : profile.title_en) : (ar ? <>تصميم برؤية.<br/><em>وهندسة بثقة.</em></> : <>Design with vision.<br/><em>Engineering with purpose.</em></>))}</h1>
          <p className="mt-8 max-w-xl animate-rise animate-delay-2 text-[15px] leading-8 text-[var(--muted)]">{siteContent[`hero_text_${locale}`] || (profile ? (ar ? profile.bio_ar : profile.bio_en) : t.heroText)}</p>
          <div className="mt-10 flex flex-wrap gap-3 animate-rise animate-delay-3">
            <a className="btn" href="#projects">{siteContent[`hero_cta_${locale}`]||t.explore}<ArrowUpRight size={15}/></a>
            <a className="btn btn-outline" href="#contact">{siteContent[`hero_secondary_cta_${locale}`] || t.contact}<ArrowUpRight size={15}/></a>
          </div>
          <div className="mt-16 grid max-w-lg grid-cols-3 gap-5 border-t border-[var(--line)] pt-6 animate-rise animate-delay-3">
            <div><p className="display text-2xl">01</p><p className="mt-2 text-[9px] uppercase tracking-[.15em] text-[var(--muted)]">{ar ? "فكرة وتصوّر" : "Concept & vision"}</p></div>
            <div className="stat-card"><p className="display text-2xl">02</p><p className="mt-2 text-[9px] uppercase tracking-[.15em] text-[var(--muted)]">{ar ? "تطوير وتصميم" : "Design development"}</p></div>
            <div className="stat-card"><p className="display text-2xl">03</p><p className="mt-2 text-[9px] uppercase tracking-[.15em] text-[var(--muted)]">{ar ? "تنفيذ وتفاصيل" : "Delivery & detail"}</p></div>
          </div>
        </div>
        <div className="relative animate-rise animate-delay-2">
          <div className="hero-image-wrap">
            <img src={siteContent.hero_image || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90"} alt="Contemporary architectural residence with warm natural materials" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
            <span className="hero-number">ARCHITECTURE / 001</span>
            <div className="hero-stamp"><p className="text-[9px] tracking-[.2em]">{siteContent[ar ? "hero_stamp_ar" : "hero_stamp_en"] || (ar ? "التصميم يبدأ من التفاصيل" : "DESIGN BEGINS WITH DETAIL")}</p><p className="display mt-2 text-3xl">{ar ? "مساحة. معنى. استدامة." : "Space. Meaning. Longevity."}</p></div>
          </div>
          <div className="float-note hidden sm:block"><p className="eyebrow">{ar ? "منهج العمل" : "OUR APPROACH"}</p><p className="display mt-2 text-xl">{ar ? "جمال يخدم الوظيفة" : "Beauty meets function"}</p></div>
          <div className="absolute -bottom-8 end-7 hidden h-24 w-24 items-center justify-center rounded-full border border-[var(--coffee)] bg-[var(--bg)] text-center text-[9px] leading-4 tracking-[.12em] text-[var(--coffee)] lg:flex">EST.<br/>DESIGN<br/>STUDIO</div>
        </div>
      </div>
    </section>

    <div className="marquee" aria-hidden="true"><div className="marquee-track">{Array.from({length:2}).map((_,i)=><span key={i} className="flex items-center gap-8 text-[10px] font-semibold tracking-[.22em] text-[var(--muted)]">{["ARCHITECTURAL DESIGN","CIVIL ENGINEERING","SPATIAL THINKING","TECHNICAL PRECISION","DETAIL-DRIVEN PROCESS"].map(x=><span key={x} className="flex items-center gap-8">{x}<span className="text-[var(--coffee)]">✳</span></span>)}</span>)}</div></div>

    <section id="about" className="about-image-section relative isolate overflow-hidden py-28 text-[var(--bg)] md:py-36" style={{backgroundImage:`linear-gradient(90deg,rgba(43,33,27,.84),rgba(43,33,27,.70)),url("${siteContent.about_background_image || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"}")`}}>
      <div className="container relative z-10 grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
        <Reveal><p className="section-kicker !text-[var(--accent)]">{t.aboutLabel}</p>{siteContent.about_image&&<div className="relative mt-8 aspect-[4/5] max-w-xs overflow-hidden"><Image src={siteContent.about_image} alt="About the studio" fill className="object-cover" sizes="320px"/></div>}<p className="mt-8 max-w-xs text-sm leading-7 text-[var(--accent)]">{siteContent[ar ? "about_intro_ar" : "about_intro_en"] || (ar ? "التوازن بين الجمال، الأداء، وإمكانية التنفيذ." : "A balance of aesthetics, performance and buildability.")}</p></Reveal>
        <Reveal className="reveal-delay-1"><h2 className="display max-w-4xl text-5xl leading-[1.08] md:text-7xl">{siteContent[ar ? "about_heading_ar" : "about_heading_en"] || (ar ? "الهندسة تمنح الفكرة قوتها. والعمارة تمنحها روحها." : "Engineering gives ideas strength. Architecture gives them soul.")}</h2><p className="mt-9 max-w-2xl text-sm leading-8 text-[#D6CBBE]">{profile ? (ar ? profile.bio_ar : profile.bio_en) : t.aboutText}</p>
          <div className="mt-16 grid gap-8 border-t border-white/20 pt-8 sm:grid-cols-3">
            {[{n:"01",title:siteContent[`principle_1_title_${locale}`]||(ar?"رؤية متكاملة":"Integrated thinking"),desc:siteContent[`principle_1_desc_${locale}`]||(ar?"قراءة المشروع كمنظومة واحدة.":"Understanding the project as one connected system.")},{n:"02",title:siteContent[`principle_2_title_${locale}`]||(ar?"دقة تقنية":"Technical clarity"),desc:siteContent[`principle_2_desc_${locale}`]||(ar?"حلول مدروسة وقابلة للتنفيذ.":"Thoughtful, coordinated and buildable solutions.")},{n:"03",title:siteContent[`principle_3_title_${locale}`]||(ar?"تفاصيل مدروسة":"Considered detail"),desc:siteContent[`principle_3_desc_${locale}`]||(ar?"عناية بالتناسب والمواد والتجربة.":"Care for proportion, material and experience.")}].map(x=><div key={x.n} className="process-step"><span className="text-[10px] tracking-[.18em] text-[var(--accent)]">{x.n}</span><h3 className="display mt-5 text-2xl">{x.title}</h3><p className="mt-3 text-xs leading-6 text-[#C6B8A9]">{x.desc}</p></div>)}
          </div>
        </Reveal>
      </div>
    </section>

    <section id="services" className="container py-28 md:py-36">
      <Reveal><div className="flex flex-wrap items-end justify-between gap-8"><div><p className="section-kicker">{siteContent[`services_label_${locale}`]||t.servicesLabel}</p><h2 className="display mt-5 text-5xl md:text-7xl">{siteContent[`services_heading_${locale}`]||t.servicesTitle}<span className="text-[var(--coffee)]">.</span></h2></div><p className="max-w-sm text-sm leading-7 text-[var(--muted)]">{siteContent[ar ? "services_intro_ar" : "services_intro_en"] || (ar ? "خدمات مترابطة تغطي رحلة المشروع من صياغة الفكرة إلى تطوير الحلول والتفاصيل." : "A connected set of disciplines supporting the project journey — from shaping the idea to resolving the technical and spatial detail.")}</p></div></Reveal>
      <div className="mt-14 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{services.map((s,i)=>{const Icon=serviceIcons[i];return <Reveal key={s.icon} className={`reveal-delay-${(i%3)+1}`}><article className="service-card h-full"><div className="flex items-start justify-between"><span className="text-[10px] font-semibold tracking-[.2em] text-[var(--coffee)]">{s.icon} / 06</span><Icon size={23} strokeWidth={1.25} className="text-[var(--coffee)]"/></div><h3 className="display mt-12 text-3xl">{siteContent[`service_${i+1}_title_${locale}`] || (ar?s.ar:s.en)}</h3><p className="mt-4 max-w-sm text-xs leading-7 text-[var(--muted)]">{siteContent[`service_${i+1}_desc_${locale}`] || (ar?s.descAr:s.descEn)}</p><div className="mt-8 flex items-center justify-between"><span className="text-[9px] tracking-[.16em] text-[var(--accent)]">{ar?"التخصص والخبرة":"DISCIPLINE & EXPERTISE"}</span><span className="service-arrow">↗</span></div></article></Reveal>})}</div>
    </section>

    <section className="bg-[#E9E3D9] py-24 md:py-32"><div className="container grid items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
      <Reveal><div className="relative aspect-[4/5] overflow-hidden"><Image src={siteContent.process_image || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"} alt="Architectural interior with natural stone and warm materials" fill className="object-cover transition duration-1000 hover:scale-105" sizes="(max-width:1024px) 100vw, 45vw"/><span className="absolute bottom-5 start-5 bg-[var(--bg)] px-4 py-3 text-[9px] tracking-[.17em]">MATERIAL · LIGHT · FORM</span></div></Reveal>
      <Reveal className="reveal-delay-1"><p className="section-kicker">{ar?"منهجية العمل":"THE PROCESS"}</p><h2 className="display mt-5 text-5xl leading-[1.06] md:text-6xl">{siteContent[ar ? "process_heading_ar" : "process_heading_en"] || (ar?"من الفكرة الأولى إلى الحل المتكامل.":"A clear process. A considered outcome.")}</h2><p className="mt-6 max-w-lg text-sm leading-8 text-[var(--muted)]">{siteContent[ar ? "process_intro_ar" : "process_intro_en"] || (ar?"كل مرحلة تبني على سابقتها، مع وضوح في الرؤية وتنسيق بين المتطلبات التصميمية والتقنية.":"Each phase builds on the last, keeping the design intent, technical requirements and practical decisions aligned.")}</p>
        <div className="mt-10 space-y-7">{[{n:"01",t:siteContent[`process_1_title_${locale}`]||(ar?"الاكتشاف والتحليل":"Discover & define"),d:siteContent[`process_1_desc_${locale}`]||(ar?"فهم الاحتياجات والسياق والقيود الأساسية.":"Understand the brief, context and key constraints.")},{n:"02",t:siteContent[`process_2_title_${locale}`]||(ar?"التصوّر والتطوير":"Concept & develop"),d:siteContent[`process_2_desc_${locale}`]||(ar?"صياغة الاتجاه التصميمي وتطوير البدائل.":"Shape the design direction and develop options.")},{n:"03",t:siteContent[`process_3_title_${locale}`]||(ar?"التنسيق والتفصيل":"Coordinate & detail"),d:siteContent[`process_3_desc_${locale}`]||(ar?"مواءمة الجوانب المعمارية والهندسية.":"Coordinate architectural and engineering decisions.")},{n:"04",t:siteContent[`process_4_title_${locale}`]||(ar?"التسليم والمتابعة":"Deliver & support"),d:siteContent[`process_4_desc_${locale}`]||(ar?"إعداد المخرجات ومساندة الانتقال للتنفيذ.":"Prepare project outputs and support the move toward delivery.")}].map(x=><div key={x.n} className="flex gap-5 border-t border-[var(--line)] pt-5"><span className="text-[10px] tracking-widest text-[var(--coffee)]">{x.n}</span><div><h3 className="display text-2xl">{x.t}</h3><p className="mt-2 text-xs leading-6 text-[var(--muted)]">{x.d}</p></div></div>)}</div>
      </Reveal>
    </div></section>

    <section id="projects" className="container py-28 md:py-36">
      <Reveal><div className="flex flex-wrap items-end justify-between gap-8"><div><p className="section-kicker">{siteContent[`projects_label_${locale}`]||t.projectsLabel}</p><h2 className="display mt-5 text-5xl md:text-7xl">{siteContent[`projects_heading_${locale}`]||t.projectsTitle}<span className="text-[var(--coffee)]">.</span></h2><p className="mt-5 max-w-lg text-sm leading-7 text-[var(--muted)]">{siteContent[`projects_intro_${locale}`]||(ar?"كل مشروع يحمل استجابة مختلفة للمكان والاحتياج والمواد.":"Every project is a distinct response to place, purpose, material and the people who use it.")}</p></div><Link href={`/${locale}/projects`} className="group inline-flex items-center gap-3 border-b border-[var(--coffee)] pb-3 text-xs font-semibold">{t.allProjects}<MoveUpRight size={15} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"/></Link></div></Reveal>
      {projects.length ? <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">{projects.map((p,i)=><Reveal key={p.id} className={i%2===1?"md:mt-20":""}><ProjectCard project={p} locale={locale} index={i+1}/></Reveal>)}</div> : <div className="mt-12 border border-[var(--line)] bg-[var(--surface)] p-12 text-center"><p className="display text-3xl">{ar?"مساحة للأعمال القادمة":"A place for selected work"}</p><p className="mt-3 text-xs text-[var(--muted)]">{t.noProjects}</p></div>}
    </section>

    <section className="bg-[var(--coffee-dark)] py-24 text-[var(--bg)] md:py-28"><div className="container grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><Reveal><p className="section-kicker !text-[var(--accent)]">{ar?"مبادئ التصميم":"DESIGN PRINCIPLES"}</p><p className="mt-6 max-w-xs text-sm leading-7 text-[#C6B8A9]">{ar?"قرارات مدروسة تصنع فرقاً حقيقياً في جودة المكان." : "Thoughtful decisions that make a tangible difference to the quality of a place."}</p></Reveal><div className="grid gap-8 sm:grid-cols-2">{[{i:"A",t:siteContent[`principle_1_title_${locale}`]||(ar?"الوظيفة أولاً":"Function first"),d:siteContent[`principle_1_desc_${locale}`]||(ar?"الجمال الحقيقي يبدأ من حل الاحتياج بوضوح.":"Good design starts by solving the right problem.")},{i:"B",t:siteContent[`principle_2_title_${locale}`]||(ar?"بساطة مدروسة":"Considered simplicity"),d:siteContent[`principle_2_desc_${locale}`]||(ar?"تقليل غير الضروري وإبراز ما يستحق.":"Remove the unnecessary. Give the essential room.")},{i:"C",t:siteContent[`principle_3_title_${locale}`]||(ar?"مواد صادقة":"Honest materials"),d:siteContent[`principle_3_desc_${locale}`]||(ar?"اختيار المواد وفق أدائها وملمسها وعمرها.":"Choose materials for performance, texture and longevity.")},{i:"D",t:siteContent[`principle_4_title_${locale}`]||(ar?"استدامة عملية":"Practical longevity"),d:siteContent[`principle_4_desc_${locale}`]||(ar?"حلول تراعي الاستخدام والصيانة على المدى الطويل.":"Design for use, maintenance and long-term value.")}].map((x,i)=><Reveal key={x.i} className={`reveal-delay-${(i%2)+1}`}><div className="border-t border-white/20 pt-5"><span className="text-[10px] tracking-[.2em] text-[var(--accent)]">{x.i} / 04</span><h3 className="display mt-5 text-3xl">{x.t}</h3><p className="mt-3 max-w-xs text-xs leading-7 text-[#C6B8A9]">{x.d}</p></div></Reveal>)}</div></div></section>

    <section id="contact" className="container py-28 md:py-36"><div className="contact-panel grid lg:grid-cols-[.9fr_1.1fr]">
      <div className="relative overflow-hidden bg-[#E9E3D9] p-8 md:p-12"><div className="absolute -bottom-24 -end-24 h-72 w-72 rounded-full border border-[var(--accent)]"/><div className="absolute -bottom-12 -end-12 h-48 w-48 rounded-full border border-[var(--accent)]"/><div className="relative z-10"><p className="section-kicker">{t.contactLabel}</p><h2 className="display mt-7 text-5xl leading-[1.05] md:text-6xl">{siteContent[ar ? "contact_heading_ar" : "contact_heading_en"] || t.contactTitle}</h2><p className="mt-6 max-w-md text-sm leading-8 text-[var(--muted)]">{siteContent[ar ? "contact_intro_ar" : "contact_intro_en"] || t.contactText}</p><div className="mt-14 space-y-5 text-xs">{profile?.email&&<a href={`mailto:${profile.email}`} className="flex items-center gap-3 transition hover:text-[var(--coffee)]"><span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)]">✉</span>{profile.email}</a>}{profile?.phone&&<a href={`tel:${profile.phone}`} className="flex items-center gap-3 transition hover:text-[var(--coffee)]"><span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)]">⌕</span>{profile.phone}</a>}{profile?.linkedin&&<a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-[var(--coffee)]"><span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)]">in</span>LinkedIn</a>}{(siteContent[ar?"address_ar":"address_en"])&&<p className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)]">⌖</span>{siteContent[ar?"address_ar":"address_en"]}</p>}{siteContent.instagram_url&&<a href={siteContent.instagram_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-[var(--coffee)]"><span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)]">◎</span>Instagram</a>}{siteContent.facebook_url&&<a href={siteContent.facebook_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-[var(--coffee)]"><span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line)]">f</span>Facebook</a>}</div></div></div>
      <div className="p-8 md:p-12"><div className="mb-8"><p className="eyebrow">{ar?"رسالة جديدة":"PROJECT ENQUIRY"}</p><h3 className="display mt-3 text-3xl">{ar?"لنتحدث عن فكرتك":"Tell me what you’re planning."}</h3></div><ContactForm locale={locale}/></div>
    </div></section>

    <footer className="border-t border-[var(--line)] py-8"><div className="container flex flex-wrap items-center justify-between gap-5"><Link href={`/${locale}`} className="site-footer-brand">{siteContent.footer_logo_text||"HARMONY DECOR"}</Link><span className="text-[10px] tracking-[.12em] text-[var(--muted)]">© {new Date().getFullYear()} · {siteContent[ar ? "footer_label_ar" : "footer_label_en"] || (ar?"الهندسة المدنية والعمارة":"CIVIL ENGINEERING & ARCHITECTURE")}</span><div className="flex items-center gap-5 text-[10px] text-[var(--muted)]"><a href="#home" className="transition hover:text-[var(--coffee)]">{ar?"العودة للأعلى":"BACK TO TOP ↑"}</a><Link href="/admin/login">Admin</Link></div></div></footer>
  </main>;
}
