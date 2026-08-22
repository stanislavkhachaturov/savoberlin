import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { contacts, site } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "SAVO — Entrümpelung, Haushaltsauflösung, Umzug, Transport, Rückbau und Endreinigung in Berlin und Brandenburg. Kostenlose Besichtigung, Festpreis-Angebot und Bestpreis-Garantie.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Entrümpelung, Umzug & Rückbau in Berlin und Brandenburg`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "Entrümpelung Berlin",
    "Haushaltsauflösung Berlin",
    "Umzugsunternehmen Berlin",
    "Entrümpelung Brandenburg",
    "Entkernung Berlin",
    "Rückbau Berlin",
    "Endreinigung Berlin",
    "Möbeltransport Berlin",
  ],
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: site.name,
  legalName: site.legalName,
  slogan: "Höchste Qualität. Maximale Zuverlässigkeit. Garantiert niedrige Preise.",
  description,
  url: site.url,
  telephone: contacts.phoneHref,
  email: contacts.email,
  image: `${site.url}/og.jpg`,
  logo: `${site.url}/favicon.svg`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  areaServed: site.cities.map((city) => ({ "@type": "City", name: city })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  makesOffer: [
    "Entrümpelung",
    "Haushaltsauflösung",
    "Umzug & Transport",
    "Kurierdienst",
    "Möbelmontage",
    "Entkernung & Rückbau",
    "Endreinigung",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${sora.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
