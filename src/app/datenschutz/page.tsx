import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { contacts, legal, legalAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Verarbeitung personenbezogener Daten auf savoberlin.de.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/datenschutz/" },
};

/**
 * Базовый текст под DSGVO для статического сайта без трекинга и cookies.
 * Перед публикацией должен проверить юрист заказчика.
 */
export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="legal" id="inhalt">
        <div className="shell">
          <span className="eyebrow">Rechtliches</span>
          <h1 style={{ fontSize: "clamp(2rem,4.4vw,3.2rem)", marginTop: "1.1rem" }}>
            Datenschutzerklärung
          </h1>

          <div className="prose">
            <h2>1. Verantwortlicher</h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist {legal.companyName},{" "}
              {legalAddress}. Sie erreichen uns telefonisch unter{" "}
              <a href={`tel:${contacts.phoneHref}`}>{contacts.phoneLabel}</a> und per E-Mail unter{" "}
              <a href={`mailto:${contacts.email}`}>{contacts.email}</a>.
            </p>

            <h2>2. Hosting und Server-Logfiles</h2>
            <p>
              Beim Aufruf dieser Website werden vom Hosting-Anbieter technisch notwendige Daten
              verarbeitet: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite,
              übertragene Datenmenge sowie Browser- und Betriebssystemangaben. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO — unser berechtigtes Interesse am sicheren und stabilen
              Betrieb der Website.
            </p>

            <h2>3. Kontaktaufnahme</h2>
            <p>
              Das Formular auf dieser Website speichert keine Daten auf unserem Server. Ihre
              Eingaben werden ausschließlich lokal in Ihrem Browser zu einer Nachricht
              zusammengesetzt, die Sie anschließend selbst über WhatsApp versenden. Für die
              Übermittlung über WhatsApp gilt die Datenschutzerklärung von WhatsApp Ireland Ltd.
            </p>
            <p>
              Wenn Sie uns per Telefon, E-Mail oder WhatsApp kontaktieren, verarbeiten wir Ihre
              Angaben zur Bearbeitung Ihrer Anfrage auf Grundlage von Art. 6 Abs. 1 lit. b bzw.
              lit. f DSGVO. Wir löschen die Daten, sobald sie für den Zweck nicht mehr erforderlich
              sind, und beachten gesetzliche Aufbewahrungspflichten.
            </p>

            <h2>4. Cookies und Analyse</h2>
            <p>
              Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken und bindet keine
              Tracking-Dienste ein.
            </p>

            <h2>5. Schriftarten</h2>
            <p>
              Die verwendeten Schriftarten werden mit der Website ausgeliefert und lokal geladen.
              Eine Verbindung zu Servern Dritter findet dabei nicht statt.
            </p>

            <h2>6. Ihre Rechte</h2>
            <ul>
              <li>Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
            </ul>
            <p>
              Zuständige Aufsichtsbehörde ist die Berliner Beauftragte für Datenschutz und
              Informationsfreiheit.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
