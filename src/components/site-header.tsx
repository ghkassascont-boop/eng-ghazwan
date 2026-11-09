import Link from "next/link";
export default function SiteHeader({ locale }: { locale: "en" | "ar" }) {
  const ar = locale === "ar";
  const nav = ar ? ["الرئيسية","من أنا","الخدمات","المشاريع","تواصل"] : ["Home","About","Services","Projects","Contact"];
  const ids = ["home","about","services","projects","contact"];
  return <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
    <div className="container flex h-[76px] items-center justify-between">
      <Link href={`/${locale}`} className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center border border-[var(--coffee)] text-[var(--coffee)] display text-xl">A.</span>
        <span><b className="block text-sm tracking-[.18em]">STUDIO / ENGINEER</b><small className="text-[10px] tracking-[.18em] text-[var(--muted)]">PORTFOLIO</small></span>
      </Link>
      <nav className="hidden items-center gap-7 md:flex">{nav.map((n,i)=><a key={ids[i]} href={`#${ids[i]}`} className="text-xs text-[var(--muted)] transition hover:text-[var(--coffee)]">{n}</a>)}</nav>
      <div className="flex items-center gap-3 text-xs"><Link className="border border-[var(--line)] px-3 py-2 hover:border-[var(--coffee)]" href={ar ? "/en" : "/ar"}>{ar ? "EN" : "عربي"}</Link><a className="hidden sm:inline-flex btn !px-4 !py-2 text-xs" href="#contact">{ar ? "تواصل معي" : "Get in touch"}</a></div>
    </div>
  </header>;
}