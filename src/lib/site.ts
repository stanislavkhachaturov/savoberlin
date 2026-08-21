/**
 * Единственный источник контента сайта.
 *
 * ВНИМАНИЕ — заглушки, которые нужно заменить реальными данными заказчика:
 * контакты (phone, whatsapp, email, url), цифры в блоке stats и адрес в Impressum.
 * Всё остальное — согласованные тексты.
 */

export const contacts = {
  /** Формат для отображения */
  phoneLabel: "+49 151 51828063",
  /** Формат для tel: — только цифры и + */
  phoneHref: "+4915151828063",
  /** Номер для wa.me — без + и пробелов */
  whatsapp: "4915151828063",
  email: "info@savo-berlin.de",
  hours: "Mo–Sa, 7:00–20:00 Uhr",
  area: "Berlin & Brandenburg",
} as const;

export const site = {
  name: "SAVO",
  legalName: "SAVO",
  tagline: "Ihr starker Partner in Berlin & Brandenburg",
  url: "https://savo-berlin.de",
  cities: ["Berlin", "Potsdam", "Oranienburg", "Bernau", "Falkensee", "Königs Wusterhausen"],
} as const;

export const nav = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#rechner", label: "Preisrechner" },
  { href: "#warum", label: "Warum SAVO" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const hero = {
  badge: "Berlin & Brandenburg · Rückmeldung in 60 Minuten",
  headline: ["Ihr starker", "Partner für"],
  headlineAccent: "Entrümpelung & Umzug",
  /** Разбит на части, чтобы выделить «Bestpreis-Garantie» без вёрстки в тексте */
  lead: {
    before:
      "Entrümpelung, Haushaltsauflösung, Umzug und Rückbau — schnell, sauber und diskret. Alles aus einer Hand, mit einem festen Ansprechpartner und ",
    highlight: "Bestpreis-Garantie",
    after: " für Berlin und Brandenburg.",
  },
  stats: [
    { value: "12", suffix: "+", label: "Jahre Erfahrung" },
    { value: "3.200", suffix: "+", label: "Abgeschlossene Aufträge" },
    { value: "4,9", suffix: "/5", label: "Durchschnittliche Bewertung" },
    { value: "60", suffix: " Min.", label: "Rückmeldung garantiert" },
  ],
} as const;

export const ticker = [
  "Entrümpelung",
  "Haushaltsauflösung",
  "Umzug",
  "Möbelmontage",
  "Kurierdienst",
  "Entkernung",
  "Abbrucharbeiten",
  "Endreinigung",
  "Warentransport",
  "Bestpreis-Garantie",
] as const;

export const services = [
  {
    id: "entruempelung",
    number: "01",
    kicker: "Königsdisziplin",
    title: "Entrümpelung & Haushaltsauflösung",
    lead: "Wenn es schnell, gründlich und diskret gehen muss, sind wir Ihr erster Ansprechpartner in der Region. Aus vollgestellten Räumen werden bei uns leere, saubere Flächen.",
    tag: "Festpreis nach Besichtigung",
    image: "service-entruempelung",
    alt: "Team von SAVO beim Beladen des Transporters bei einer Entrümpelung",
    items: [
      {
        term: "Haushaltsauflösung",
        text: "Nachlässe komplett abgewickelt — mit dem nötigen Fingerspitzengefühl",
      },
      {
        term: "Entrümpelung",
        text: "Keller, Dachboden, Garage oder Gewerbeobjekt, restlos geräumt",
      },
      {
        term: "Fachgerechte Entsorgung",
        text: "Sortenrein getrennt, zertifiziert und umweltgerecht entsorgt",
      },
      {
        term: "Besenreine Übergabe",
        text: "Sie übergeben den Schlüssel, wir übergeben leere und saubere Räume",
      },
    ],
  },
  {
    id: "umzug",
    number: "02",
    kicker: "Von A nach B",
    title: "Umzug & Transport",
    lead: "Stressfrei innerhalb Berlins oder ins Brandenburger Umland. Wir packen ein, transportieren sicher und bauen am Ziel wieder auf — Sie behalten den Überblick.",
    tag: "Auch kurzfristig",
    image: "service-umzug",
    alt: "Transporter von SAVO bei einem Umzug in einer Berliner Straße",
    items: [
      {
        term: "Privat- & Firmenumzüge",
        text: "Von der Planung bis zum letzten Karton, termingerecht organisiert",
      },
      { term: "Warentransport", text: "Sichere Beförderung Ihrer Güter, auf Wunsch versichert" },
      { term: "Kurierdienst", text: "Direkt- und Sonderfahrten, auch am selben Tag" },
      { term: "Möbelmontage", text: "Fachgerechter Ab- und Aufbau Ihrer Möbel und Küchen" },
    ],
  },
  {
    id: "rueckbau",
    number: "03",
    kicker: "Platz für Neues",
    title: "Rückbau, Entkernung & Reinigung",
    lead: "Wir schaffen die Grundlage für Ihr nächstes Projekt: kontrollierter Rückbau, sauberer Abtransport und eine Endreinigung, nach der sofort weitergearbeitet werden kann.",
    tag: "Staubarm & sicher",
    image: "service-rueckbau",
    alt: "Handwerker bei Entkernungsarbeiten in einer Altbauwohnung",
    items: [
      {
        term: "Entkernung",
        text: "Strukturierter Rückbau von Einbauten, Wänden und Bodenbelägen",
      },
      { term: "Leichte Abbrucharbeiten", text: "Kontrollierte und sichere Demontage nach Plan" },
      {
        term: "Endreinigung",
        text: "Bau- und Feinreinigung — das Objekt wird bezugsfertig übergeben",
      },
    ],
  },
] as const;

export const advantages = [
  {
    icon: "euro",
    title: "Bestpreis-Garantie",
    text: "Die niedrigsten Preise in Berlin und Brandenburg — ohne Abstriche bei der Leistung.",
  },
  {
    icon: "shield",
    title: "Erfahrene Fachkräfte",
    text: "Eingespielte Teams mit jahrelanger Praxis in ihrem jeweiligen Fachgebiet.",
  },
  {
    icon: "chat",
    title: "Klare Kommunikation auf Deutsch",
    text: "Von der Beratung bis zur Übergabe sprechen Sie mit Menschen, die Ihre Sprache sprechen.",
  },
  {
    icon: "spark",
    title: "Höchster Serviceanspruch",
    text: "Pünktlich, sauber und diskret. Mit Ihrem Eigentum gehen wir sorgsam um.",
  },
  {
    icon: "box",
    title: "Alles aus einer Hand",
    text: "Planung, Koordination und Ausführung bei einem Anbieter — ein Ansprechpartner für alles.",
  },
] as const;

export const priceCard = {
  eyebrow: "Preisversprechen",
  title: ["Bestpreis.", "Garantiert."],
  text: "Sie haben ein günstigeres, vergleichbares Angebot aus Berlin oder Brandenburg? Zeigen Sie es uns — wir unterbieten es. Ohne versteckte Kosten und mit verbindlichem Festpreis nach der kostenlosen Besichtigung.",
  cta: "Angebot vergleichen lassen",
} as const;

export const calculator = {
  eyebrow: "Preisrechner",
  title: "Was kostet das bei Ihnen?",
  lead: "Vier Angaben und Sie kennen die Größenordnung — ohne Anruf und ohne Wartezeit. Den verbindlichen Festpreis erhalten Sie nach der kostenlosen Besichtigung.",
  serviceLabel: "Leistung",
  services: [
    { value: "Entrümpelung", rate: 26 },
    { value: "Umzug", rate: 19 },
    { value: "Rückbau & Entkernung", rate: 42 },
    { value: "Endreinigung", rate: 11 },
  ],
  objectLabel: "Objekt",
  objects: [
    { value: "Wohnung", mult: 1 },
    { value: "Haus", mult: 0.95 },
    { value: "Keller", mult: 1.15 },
    { value: "Dachboden", mult: 1.2 },
    { value: "Garage", mult: 1.05 },
    { value: "Gewerbe", mult: 1.1 },
  ],
  areaLabel: "Fläche",
  loadLabel: "Füllgrad",
  loads: [
    { value: "Wenig", mult: 0.72 },
    { value: "Normal", mult: 1 },
    { value: "Randvoll", mult: 1.4 },
  ],
  resultLabel: "Ihre Schätzung",
  priceHint:
    "inkl. Anfahrt, Arbeitszeit, Transport und fachgerechter Entsorgung. Alle Preise inkl. MwSt.",
  rows: {
    duration: "Dauer",
    team: "Team",
    volume: "Geschätztes Volumen",
    handover: "Besenreine Übergabe",
    handoverValue: "inklusive",
  },
  cta: "Festpreis anfragen",
  note: "Alle Angaben sind unverbindlich. Den verbindlichen Festpreis halten wir nach der kostenlosen Besichtigung schriftlich fest.",
} as const;

export const beforeAfter = {
  eyebrow: "Vorher / Nachher",
  title: "Aus vollen Räumen werden freie Flächen",
  lead: "Ziehen Sie den Regler nach links und rechts. So sieht das Ergebnis einer Haushaltsauflösung mit Endreinigung und besenreiner Übergabe aus.",
  labelBefore: "Vorher",
  labelAfter: "Nachher · besenrein",
} as const;

export const process = {
  eyebrow: "Ablauf",
  title: "In vier Schritten zum Ergebnis",
  steps: [
    {
      number: "01",
      title: "Anfrage",
      text: "Per Telefon, WhatsApp oder Formular. Wir melden uns innerhalb von 60 Minuten bei Ihnen.",
    },
    {
      number: "02",
      title: "Kostenlose Besichtigung",
      text: "Wir sehen uns das Objekt an — vor Ort oder per Video. Unverbindlich und kostenlos.",
    },
    {
      number: "03",
      title: "Festpreis-Angebot",
      text: "Schriftlich, transparent und ohne versteckte Kosten. Den Termin bestimmen Sie.",
    },
    {
      number: "04",
      title: "Ausführung & Übergabe",
      text: "Pünktlich, sauber und diskret — inklusive Entsorgung und Endreinigung.",
    },
  ],
} as const;

export const stats = [
  { value: 12, suffix: "+", label: "Jahre Erfahrung in der Region" },
  { value: 3200, suffix: "+", label: "Abgeschlossene Aufträge" },
  { value: 98, suffix: " %", label: "Kunden empfehlen uns weiter" },
  { value: 60, suffix: " Min.", label: "Antwortzeit auf Anfragen" },
] as const;

export const faq = {
  eyebrow: "Häufige Fragen",
  title: "Das fragen unsere Kunden am häufigsten",
  items: [
    {
      q: "Was kostet eine Entrümpelung?",
      a: "Der Preis richtet sich nach Menge, Zugang zum Objekt und Art der Entsorgung. Der Preisrechner auf dieser Seite gibt Ihnen eine erste Größenordnung. Den verbindlichen Festpreis erhalten Sie nach der kostenlosen Besichtigung — schriftlich und ohne versteckte Kosten.",
    },
    {
      q: "Ist die Besichtigung wirklich kostenlos?",
      a: "Ja. Besichtigung und Angebot sind kostenlos und unverbindlich — auch dann, wenn Sie sich anschließend gegen uns entscheiden.",
    },
    {
      q: "Wie schnell können Sie anfangen?",
      a: "In der Regel innerhalb weniger Tage, in dringenden Fällen auch kurzfristig. Auf Wunsch arbeiten wir am Wochenende.",
    },
    {
      q: "Was passiert mit dem geräumten Inventar?",
      a: "Brauchbares wird gespendet oder weiterverwertet, alles Übrige sortenrein getrennt und fachgerecht entsorgt. Entsorgungsnachweise stellen wir Ihnen auf Wunsch aus.",
    },
    {
      q: "Arbeiten Sie auch für Hausverwaltungen und Gewerbebetriebe?",
      a: "Ja. Wir übernehmen Aufträge für Privatpersonen, Hausverwaltungen, Makler, Nachlassverwalter und Gewerbebetriebe — auf Rechnung und mit fester Ansprechperson.",
    },
    {
      q: "In welchem Gebiet sind Sie im Einsatz?",
      a: "In ganz Berlin und im angrenzenden Brandenburg, unter anderem in Potsdam, Oranienburg, Bernau, Falkensee und Königs Wusterhausen.",
    },
  ],
} as const;

export const contact = {
  eyebrow: "Kontakt",
  title: "Jetzt unverbindlich anfragen",
  lead: "Beschreiben Sie kurz Ihr Vorhaben. Sie erhalten von uns ein kostenloses Angebot mit Festpreis — und die Gewissheit, dass hohe Qualität und niedrige Preise zusammengehen.",
  form: {
    name: { label: "Name", placeholder: "Ihr Name" },
    phone: { label: "Telefon", placeholder: "+49 …" },
    service: { label: "Leistung" },
    serviceOptions: [
      "Entrümpelung / Haushaltsauflösung",
      "Umzug / Transport",
      "Rückbau / Entkernung",
      "Endreinigung",
      "Sonstiges",
    ],
    message: {
      label: "Ihr Vorhaben",
      placeholder: "Objekt, Fläche, Wunschtermin …",
    },
    submit: "Kostenloses Angebot anfordern",
    submitting: "WhatsApp wird geöffnet …",
    note: "Unverbindlich · kostenlos · Rückmeldung innerhalb von 60 Minuten",
    privacy:
      "Mit dem Absenden werden Ihre Angaben als WhatsApp-Nachricht vorbereitet. Wir verwenden sie ausschließlich zur Bearbeitung Ihrer Anfrage.",
    fallback: "Kein WhatsApp? Schreiben Sie uns an",
  },
  rows: [
    {
      icon: "phone",
      title: contacts.phoneLabel,
      text: contacts.hours,
      href: `tel:${contacts.phoneHref}`,
    },
    {
      icon: "mail",
      title: contacts.email,
      text: "Antwort am selben Werktag",
      href: `mailto:${contacts.email}`,
    },
    { icon: "pin", title: "Berlin & Brandenburg", text: "Im gesamten Großraum im Einsatz" },
    { icon: "clock", title: "Kurzfristige Termine", text: "Auf Wunsch auch am Wochenende" },
  ] satisfies ContactRow[],
} as const;

type ContactRow = {
  icon: "phone" | "mail" | "pin" | "clock";
  title: string;
  text: string;
  href?: string;
};

export const footer = {
  about:
    "Entrümpelung, Haushaltsauflösung, Umzug, Transport, Rückbau und Reinigung in Berlin und Brandenburg. Höchste Qualität, maximale Zuverlässigkeit, garantiert niedrige Preise.",
  columns: [
    {
      title: "Leistungen",
      links: [
        { label: "Entrümpelung", href: "#leistungen" },
        { label: "Haushaltsauflösung", href: "#leistungen" },
        { label: "Umzug & Transport", href: "#leistungen" },
        { label: "Entkernung & Abbruch", href: "#leistungen" },
        { label: "Endreinigung", href: "#leistungen" },
      ],
    },
    {
      title: "Unternehmen",
      links: [
        { label: "Warum SAVO", href: "#warum" },
        { label: "Preisrechner", href: "#rechner" },
        { label: "Ablauf", href: "#ablauf" },
        { label: "Häufige Fragen", href: "#faq" },
        { label: "Kontakt", href: "#kontakt" },
      ],
    },
    {
      title: "Rechtliches",
      links: [
        { label: "Impressum", href: "/impressum/" },
        { label: "Datenschutz", href: "/datenschutz/" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} SAVO. Alle Rechte vorbehalten.`,
  places: "Berlin · Potsdam · Brandenburg",
} as const;
