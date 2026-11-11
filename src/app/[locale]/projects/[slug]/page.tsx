import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteHeader from "@/components/site-header";
import Reveal from "@/components/reveal";
import { createClient } from "@/lib/supabase/server";
export default async function ProjectDetail({params}:{params:Promise<{locale:string;slug:string}>}) {
  const {locale:raw,slug}=await params;
  if(raw!=="en"&&raw!=="ar") notFound();
  const locale=raw as "en"|"ar"; const ar=locale==="ar";
  const supabase=await createClient();
  const {data:p}=await supabase.from("projects").select("*").eq("slug",slug).eq("published",true).maybeSingle();
  if(!p) notFound();
  const {data:images}=await supabase.from("project_images").select("*").eq("project_id",p.id).order("sort_order");
  const title=ar?p.title_ar:p.title_en;
  return <main dir={ar?"rtl":"ltr"}><SiteHeader locale={locale}/>
    <section className="bg-[#E9E3D9] py-20 md:py-28"><div className="container"><Link href={`/${locale}/projects`} className="text-[10px] tracking-[.15em] text-[var(--muted)] transition hover:text-[var(--coffee)]">← {ar?"كل المشاريع":"ALL PROJECTS"}</Link><Reveal><div className="mt-16 flex flex-wrap items-center gap-3 text-[10px] font-semibold tracking-[.17em] text-[var(--coffee)]"><span>{ar?p.category_ar:p.category_en}</span><span>·</span><span>{p.year||"—"}</span>{p.location&&<><span>·</span><span>{p.location}</span></>}</div><h1 className="display mt-6 max-w-5xl text-6xl leading-[.98] md:text-8xl">{title}</h1><p className="mt-8 max-w-2xl text-sm leading-8 text-[var(--muted)]">{ar?p.summary_ar:p.summary_en}</p></Reveal></div></section>
    {p.cover_image&&<section className="container -mt-3"><Reveal><div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-2)] shadow-[var(--shadow)]"><Image src={p.cover_image} alt={title} fill priority className="object-cover" sizes="100vw"/></div></Reveal></section>}
    <section className="container grid gap-12 py-20 md:grid-cols-[.55fr_1.45fr] md:py-28"><Reveal><p className="section-kicker">{ar?"نظرة عامة":"PROJECT OVERVIEW"}</p></Reveal><Reveal className="reveal-delay-1"><h2 className="display text-4xl md:text-5xl">{ar?"الفكرة وراء المشروع":"The thinking behind the project."}</h2><p className="mt-6 max-w-2xl text-sm leading-8 text-[var(--muted)]">{(ar?p.story_ar:p.story_en)|| (ar?p.summary_ar:p.summary_en)}</p><div className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--line)] pt-6 sm:grid-cols-3">{[{l:ar?"التصنيف":"CATEGORY",v:ar?p.category_ar:p.category_en},{l:ar?"السنة":"YEAR",v:p.year||"—"},{l:ar?"الموقع":"LOCATION",v:p.location||"—"},{l:ar?"المساحة":"AREA",v:p.area_sqm?`${p.area_sqm} m²`:"—"},{l:ar?"نوع المشروع":"PROJECT TYPE",v:p.project_type||"—"},{l:ar?"المدة":"DURATION",v:p.duration||"—"}].map(x=><div key={x.l}><p className="text-[9px] tracking-[.16em] text-[var(--muted)]">{x.l}</p><p className="mt-2 text-sm font-medium">{x.v}</p></div>)}</div></Reveal></section>
    {!!images?.length&&<section className="bg-[#E9E3D9] py-20 md:py-28"><div className="container"><Reveal><p className="section-kicker">{ar?"معرض الصور":"VISUAL DOCUMENTATION"}</p><h2 className="display mt-5 text-5xl md:text-6xl">{ar?"تفاصيل المشروع":"Project gallery."}</h2></Reveal><div className="mt-12 grid gap-5 sm:grid-cols-2">{images.map((im:any,i:number)=><Reveal key={im.id} className={i%3===1?"sm:mt-16":""}><div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)]"><Image src={im.image_url} alt={im.alt_text||title} fill className="object-cover transition duration-700 hover:scale-[1.04]" sizes="(max-width:640px) 100vw, 50vw"/></div></Reveal>)}</div></div></section>}
    <section className="container py-20 md:py-28"><div className="flex flex-wrap items-center justify-between gap-8 border-t border-[var(--line)] pt-8"><div><p className="section-kicker">{ar?"لديك مشروع مشابه؟":"HAVE A PROJECT IN MIND?"}</p><h2 className="display mt-4 text-4xl md:text-5xl">{ar?"لنبدأ من فكرتك.":"Let’s start with your idea."}</h2></div><Link href={`/${locale}#contact`} className="btn">{ar?"تواصل معي":"Start a conversation"}<ArrowUpRight size={15}/></Link></div></section>
  </main>;
}
