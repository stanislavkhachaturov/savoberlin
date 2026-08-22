import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowIcon, PhoneIcon } from "@/components/icons";
import { contacts, nav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="legal notfound" id="inhalt">
        <div className="shell">
          <span className="eyebrow">Fehler 404</span>
          <p className="notfound-code goldtext">404</p>
          <h1>Diese Seite gibt es nicht</h1>
          <p className="notfound-lead">
            Der Link ist veraltet oder enthält einen Tippfehler. Über die Startseite finden Sie alle
            Leistungen, den Preisrechner und unsere Kontaktdaten.
          </p>

          <div className="hero-cta" style={{ animation: "none", opacity: 1 }}>
            <Link href="/" className="btn btn-gold">
              Zur Startseite <ArrowIcon />
            </Link>
            <a href={`tel:${contacts.phoneHref}`} className="btn btn-ghost">
              <PhoneIcon /> {contacts.phoneLabel}
            </a>
          </div>

          <ul className="notfound-links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
