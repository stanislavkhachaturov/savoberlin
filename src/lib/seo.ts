import { contacts, faq, legal, services, site } from "./site";

/** Центральные SEO-данные — правки для Google здесь и в `site.ts` (контент). */
export const seo = {
  /** Главная: title для вкладки и выдачи Google */
  title: "Entrümpelung Berlin & Brandenburg | SAVO — Umzug, Haushaltsauflösung, Rückbau",
  description:
    "SAVO: Entrümpelung, Haushaltsauflösung, Umzug, Rückbau und Endreinigung in Berlin und Brandenburg. 30 % Neukunden-Rabatt, kostenlose Möbeldemontage, 24/7 erreichbar.",
  /** Дополнительные ключевые слова (meta keywords — слабый сигнал, но не мешает) */
  keywords: [
    "Entrümpelung Berlin",
    "Entrümpelung Brandenburg",
    "Haushaltsauflösung Berlin",
    "Haushaltsauflösung Brandenburg",
    "Entrümpelungsfirma Berlin",
    "Umzugsunternehmen Berlin",
    "Umzug Berlin Brandenburg",
    "Entkernung Berlin",
    "Rückbau Berlin",
    "Wohnungsauflösung Berlin",
    "Keller entrümpeln Berlin",
    "Dachboden entrümpeln",
    "Entrümpelung Potsdam",
    "Entrümpelung Marzahn",
    "Entrümpelung Hellersdorf",
    "Endreinigung Berlin",
    "Möbeltransport Berlin",
    "Entsorgung Berlin",
    "SAVO Berlin",
    "savoberlin",
  ],
  locale: "de_DE",
  /** Код из Google Search Console → HTML-Tag. Задаётся при сборке: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION */
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
} as const;

/** Координаты офиса (Raoul-Wallenberg-Straße 68, 12679 Berlin) для LocalBusiness */
const geo = {
  latitude: 52.5238,
  longitude: 13.5431,
} as const;

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

/** JSON-LD @graph для layout — LocalBusiness, WebSite, FAQ на главной отдельно */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: seo.description,
        inLanguage: "de-DE",
        publisher: { "@id": organizationId },
      },
      {
        "@type": ["LocalBusiness", "MovingCompany"],
        "@id": organizationId,
        name: site.name,
        legalName: site.legalName,
        alternateName: "SAVO Berlin",
        slogan: site.motto,
        description: seo.description,
        url: site.url,
        telephone: [contacts.phoneHref, contacts.phoneSecondaryHref],
        email: contacts.email,
        sameAs: [contacts.instagram],
        image: `${site.url}/og.jpg`,
        logo: `${site.url}/favicon.svg`,
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: legal.street,
          postalCode: legal.zip,
          addressLocality: legal.city,
          addressRegion: "Berlin",
          addressCountry: "DE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: geo.latitude,
          longitude: geo.longitude,
        },
        areaServed: site.cities.map((city) => ({
          "@type": "City",
          name: city,
          containedInPlace: { "@type": "AdministrativeArea", name: "Berlin-Brandenburg" },
        })),
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
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Leistungen",
          itemListElement: services.map((service, index) => ({
            "@type": "Offer",
            position: index + 1,
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.lead,
              areaServed: site.cities,
              provider: { "@id": organizationId },
            },
          })),
        },
        knowsAbout: [
          "Entrümpelung",
          "Haushaltsauflösung",
          "Umzug",
          "Entkernung",
          "Rückbau",
          "Endreinigung",
        ],
      },
    ],
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
