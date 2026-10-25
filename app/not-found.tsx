import Link from "next/link";
import Capsule from "@/components/Capsule";
import { Arrow } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "80vh" }}>
      <div className="container" style={{ display: "grid", justifyItems: "center", gap: 20 }}>
        <div style={{ width: 240 }}><Capsule /></div>
        <h1 className="h-1">
          This page is <span className="serif mint-text">still recovering.</span>
        </h1>
        <Link href="/" className="btn btn-primary" data-magnetic>
          Back home <Arrow />
        </Link>
      </div>
    </section>
  );
}
