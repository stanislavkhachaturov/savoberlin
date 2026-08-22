import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { site } from "@/lib/site";
import { buildOrganizationJsonLd, seo } from "@/lib/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s — ${site.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.name,
  category: "Entrümpelung und Umzug",
  alternates: {
    canonical: "/",
    languages: { "de-DE": "/" },
  },
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: site.url,
    siteName: site.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${site.name} — Entrümpelung und Umzug in Berlin` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(seo.googleSiteVerification
    ? { verification: { google: seo.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

const organizationJsonLd = buildOrganizationJsonLd();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${sora.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
