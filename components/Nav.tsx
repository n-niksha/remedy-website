"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#app", label: "The app" },
  { href: "/#safety", label: "Safety" },
  { href: "/clinics", label: "For clinics" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Highlight the section currently in view (home page only)
  const [section, setSection] = useState("");
  useEffect(() => {
    if (pathname !== "/") return setSection("");
    const ids = ["how", "app", "safety", "faq"];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? pathname === "/" && section === href.slice(2) : pathname.startsWith(href);

  return (
    <div className="nav-wrap">
      <nav className={`nav glass ${scrolled ? "scrolled" : ""}`} aria-label="Main">
        <Link href="/" className="brand" aria-label="Remedy home">
          <span className="brand-mark">
            <Image src="/logo.png" alt="" width={34} height={34} priority />
          </span>
          Remedy
        </Link>

        <div className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav-cta">
          <Link href="/clinics#contact" className="btn btn-glass btn-sm">
            Book a demo
          </Link>
          <Link href="/#waitlist" className="btn btn-primary btn-sm" data-magnetic>
            Join waitlist
          </Link>
          <button
            className={`nav-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu glass ${open ? "open" : ""}`}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/clinics#contact" onClick={() => setOpen(false)}>
          Book a demo
        </Link>
        <Link href="/#waitlist" className="btn btn-primary" onClick={() => setOpen(false)}>
          Join waitlist
        </Link>
      </div>
    </div>
  );
}
