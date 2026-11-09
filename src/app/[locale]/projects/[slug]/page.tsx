import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import { createClient } from "@/lib/supabase/server";
export default async function ProjectDetail({params}:{params:Promise<{locale:string;slug:string}>}) {
 const {locale:raw,slug}=await params;if(raw!=="en"&&raw!=="ar")notFound();const locale=raw as "en"|"ar";const ar=locale==="ar";
 const supabase=await createClient();const {data:p}=await supabase.from("projects").select("*").eq("slug",slug).eq("published",true).maybeSingle();if(!p)notFound();
 const {data:images}=await supabase.from("project_images").select("*").eq("project_id",p.id).order("sort_order");
 return <main dir={ar?"rtl":"ltr"}><SiteHeader locale={locale}/><article className="container py-16"><Link href={`/${locale}/projects`} className="text-sm text-[var(--muted)]">← {ar?"كل المشاريع":"All projects"}</Link><p className="eyebrow mt-12">{ar?p.category_ar:p.category_en} · {p.year||""}</p><h1 className="display mt-4 max-w-4xl text-5xl md:text-7xl">{ar?p.title_ar:p.title_en}</h1><p className="mt-6 max-w-2xl leading-8 text-[var(--muted)]">{ar?p.summary_ar:p.summary_en}</p>{p.cover_image&&<div className="relative mt-12 aspect-[16/9] overflow-hidden bg-[var(--surface-2)]"><Image src={p.cover_image} alt={ar?p.title_ar:p.title_en} fill className="object-cover"/></div>}<div className="mt-8 grid gap-5 md:grid-cols-3">{(images||[]).map((im:any)=><div key={im.id} className="relative aspect-[4/3]"><Image src={im.image_url} alt={im.alt_text||"Project image"} fill className="object-cover"/></div>)}</div></article></main>;
}