import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { contacts, legal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und Anbieterkennzeichnung von ${legal.companyName}, Berlin.`,
  robots: { index: false, follow: true },
  alternates: { canonical: "/impressum/" },
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="legal" id="inhalt">
        <div className="shell">
          <span className="eyebrow">Rechtliches</span>
          <h1 style={{ fontSize: "clamp(2rem,4.4vw,3.2rem)", marginTop: "1.1rem" }}>Impressum</h1>

          <div className="prose">
            <p>Angaben gemäß § 5 DDG (ehemals § 5 TMG).</p>

            <h2>Anbieter</h2>
            <p>
              {legal.companyName}
              <br />
              {legal.street}
              <br />
              {legal.zip} {legal.city}
            </p>

            <h2>Kontakt</h2>
            <p>
              Telefon: <a href={`tel:${contacts.phoneHref}`}>{contacts.phoneLabel}</a>
              <br />
              Reservenummer:{" "}
              <a href={`tel:${contacts.phoneSecondaryHref}`}>{contacts.phoneSecondaryLabel}</a>
              <br />
              E-Mail: <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
            </p>

            <h2>Vertreten durch</h2>
            <p>{legal.owner}</p>

            {legal.vatId ? (
              <>
                <h2>Umsatzsteuer-Identifikationsnummer</h2>
                <p>USt-IdNr. gemäß § 27 a UStG: {legal.vatId}</p>
              </>
            ) : null}

            <h2>Verantwortlich für den Inhalt</h2>
            <p>
              {legal.owner}
              <br />
              {legal.street}
              <br />
              {legal.zip} {legal.city}
            </p>

            <h2>Streitschlichtung</h2>
            <p>
              Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2>Haftung für Inhalte und Links</h2>
            <p>
              Die Inhalte dieser Seiten wurden mit Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              Für die Inhalte verlinkter externer Seiten ist stets der jeweilige Anbieter
              verantwortlich.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die durch den Anbieter erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
              deutschen Urheberrecht. Verwendete Fotografien stammen aus lizenzfreien Beständen und
              zeigen beispielhafte Situationen.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
