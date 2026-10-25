import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import Interactions from "@/components/Interactions";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8000"),
  title: "Remedy — Recovery, made simple",
  description:
    "Remedy turns the papers you get before and after surgery into a simple, day-by-day plan: what to take, what to stop, what you can and can't do yet, and when your visits are — every item confirmed by you.",
  openGraph: {
    title: "Remedy",
    description: "Recovery, made simple. Coming soon to iPhone.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FCD3DF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Background />
        <Interactions />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
