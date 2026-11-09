import Link from "next/link";
export default function SiteHeader({ locale }: { locale: "en" | "ar" }) {
  const ar = locale === "ar";
  const nav = ar ? ["الرئيسية","نبذة","الخدمات","المشاريع","تواصل"] : ["Home","About","Expertise","Projects","Contact"];
  const ids = ["home","about","services","projects","contact"];
  return <header className="site-header">
    <div className="container flex h-[82px] items-center justify-between gap-4">
      <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3" aria-label="Home">
        <span className="grid h-11 w-11 place-items-center border border-[var(--coffee)] text-[var(--coffee)] display text-xl tracking-[-.12em]">H<span className="text-sm">D</span></span>
        <span><b className="block text-[11px] font-semibold tracking-[.2em]">{ar ? "هارموني ديكور" : "HARMONY DECOR"}</b><small className="mt-1 block text-[9px] tracking-[.24em] text-[var(--muted)]">ARCHITECTURE · INTERIORS · DETAIL</small></span>
      </Link>
      <nav className="hidden items-center gap-8 lg:flex">{nav.map((n,i)=><a key={ids[i]} href={`#${ids[i]}`} className="header-link text-[11px] font-medium">{n}</a>)}</nav>
      <details className="mobile-nav lg:hidden">
        <summary aria-label={ar ? "فتح القائمة" : "Open menu"}><span></span><span></span></summary>
        <nav className="mobile-nav-panel">{nav.map((n,i)=><a key={ids[i]} href={`#${ids[i]}`} onClick={(e)=>{const details=e.currentTarget.closest("details");details?.removeAttribute("open");}}>{n}<span>↗</span></a>)}</nav>
      </details>
      <div className="flex shrink-0 items-center gap-3">
        <Link className="grid h-10 min-w-10 place-items-center border border-[var(--line)] px-3 text-[10px] font-semibold tracking-widest transition hover:border-[var(--coffee)]" href={ar ? "/en" : "/ar"}>{ar ? "EN" : "عربي"}</Link>
        <a className="btn hidden !min-h-10 !px-4 !text-[10px] sm:inline-flex" href="#contact">{ar ? "ابدأ مشروعك" : "LET’S TALK"}<span>↗</span></a>
      </div>
    </div>
  </header>;
}
