import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner glass">
          <div>
            <Link href="/" className="brand">
              <span className="brand-mark">
                <Image src="/logo.png" alt="" width={34} height={34} />
              </span>
              Remedy
            </Link>
            <p className="muted" style={{ margin: "14px 0 0", maxWidth: 320, fontSize: 15 }}>
              Recovery, made simple. Coming to iPhone {site.launch}.
            </p>
          </div>
          <div>
            <h6>Product</h6>
            <ul>
              <li><Link href="/#how">How it works</Link></li>
              <li><Link href="/#app">The app</Link></li>
              <li><Link href="/screens">Every screen</Link></li>
              <li><Link href="/#safety">Safety</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h6>Partners</h6>
            <ul>
              <li><Link href="/clinics">For clinics</Link></li>
              <li><Link href="/clinics#contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h6>Company</h6>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              {site.socials.map((s) => (
                <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Remedy. All rights reserved.</span>
          <span>Remedy is not medical advice. Always follow your care team’s instructions.</span>
        </div>
        <div className="wordmark" aria-hidden>Remedy</div>
      </div>
    </footer>
  );
}
