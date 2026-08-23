/**
 * Единственный источник контента сайта.
 *
 * ВНИМАНИЕ — заглушки, которые нужно заменить реальными данными заказчика:
 * e-mail, url, оценка 4,9/5 (если публикуете — нужна проверка), USt-IdNr.
 * Телефон, 24/7 и Impressum (Igor Voytok SAVO) — подтверждены заказчиком.
 */

export const contacts = {
  /** Основной номер */
  phoneLabel: "+49 151 51828063",
  phoneHref: "+4915151828063",
  /** Резервный номер — совладелец */
  phoneSecondaryLabel: "+49 157 38777399",
  phoneSecondaryHref: "+4915738777399",
  phoneSecondaryNote: "Reservenummer",
  /** Номер для wa.me — без + и пробелов */
  whatsapp: "4915151828063",
  email: "info@savoberlin.de",
  instagram: "https://www.instagram.com/savo_berlin",
  instagramHandle: "@savo_berlin",
  hoursShort: "24/7 erreichbar",
  hours: "24/7 erreichbar — Tag und Nacht",
  area: "Berlin & Brandenburg",
} as const;

/** Impressum / Datenschutz — данные заказчика */
export const legal = {
  companyName: "Igor Voytok SAVO",
  owner: "Igor Voytok",
  street: "Raoul-Wallenberg-Straße 68",
  zip: "12679",
  city: "Berlin",
  /** USt-IdNr. — добавить, когда будет у заказчика */
  vatId: undefined as string | undefined,
} as const;

export const legalAddress = `${legal.street}, ${legal.zip} ${legal.city}` as const;

export const site = {
  name: "SAVO",
  legalName: legal.companyName,
  /** Девиз компании */
  motto: "Bruder muss los — aber mit SAVO",
  tagline: "Ihr starker Partner in Berlin & Brandenburg",
  url: "https://savoberlin.de",
  cities: ["Berlin", "Potsdam", "Oranienburg", "Bernau", "Falkensee", "Königs Wusterhausen"],
} as const;

export const promo = {
  newClientDiscount: 30,
  newClientTitle: "30 % Neukunden-Rabatt",
  newClientText:
    "Bei Ihrer ersten Buchung bei SAVO — auf jede Leistung, egal ob Entrümpelung, Umzug oder Rückbau.",
  demontageTitle: "Kostenlose Möbeldemontage",
  demontageText: "Möbeldemontage ist bei uns inklusive — ohne Aufpreis.",
} as const;

export const nav = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#rechner", label: "Preisrechner" },
  { href: "/#warum", label: "Warum SAVO" },
  { href: "/#ablauf", label: "Ablauf" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;

export const hero = {
  badge: "30 % Neukunden-Rabatt · 24/7 erreichbar",
  headline: ["Ihr starker", "Partner für"],
  headlineAccent: "Entrümpelung & Umzug",
  lead: {
    before:
      "Entrümpelung, Haushaltsauflösung, Umzug und Rückbau — schnell, sauber und diskret. ",
    highlight: promo.newClientTitle,
    after:
      " bei Ihrer ersten Buchung, kostenlose Möbeldemontage inklusive. Alles aus einer Hand in Berlin und Brandenburg — anrufen können Sie jederzeit, auch nachts.",
  },
  stats: [
    { value: "30", suffix: " %", label: "Rabatt für Neukunden" },
    { value: "24", suffix: "/7", label: "Erreichbar – auch nachts" },
    { value: "0", suffix: " €", label: "Möbeldemontage inkl." },
    { value: "60", suffix: " Min.", label: "Rückmeldung garantiert" },
  ],
} as const;

export const ticker = [
  "Entrümpelung",
  "Haushaltsauflösung",
  "Umzug",
  "Kostenlose Möbeldemontage",
  "30 % Neukunden-Rabatt",
  "Möbelmontage",
  "Entkernung",
  "Endreinigung",
  "24/7 erreichbar",
  "Bruder muss los — aber mit SAVO",
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
      {
        term: "Kostenlose Möbeldemontage",
        text: "Demontage Ihrer Möbel ohne Aufpreis — spart Zeit und Nerven",
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
      {
        term: "Kostenlose Möbeldemontage",
        text: "Abbau vor dem Transport inklusive — bei uns ohne Zusatzkosten",
      },
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
    icon: "tag",
    title: promo.newClientTitle,
    text: promo.newClientText,
  },
  {
    icon: "wrench",
    title: promo.demontageTitle,
    text: promo.demontageText,
  },
  {
    icon: "clock",
    title: "24/7 erreichbar",
    text: "Rufen Sie an, wann Sie wollen — tagsüber, abends oder mitten in der Nacht. Wir sind immer für Sie da.",
  },
  {
    icon: "euro",
    title: "Bestpreis-Garantie",
    text: "Die niedrigsten Preise in Berlin und Brandenburg — ohne Abstriche bei der Leistung.",
  },
  {
    icon: "shield",
    title: "Erfahrene Fachkräfte",
    text: "Eingespielte Teams mit Praxis in ihrem jeweiligen Fachgebiet.",
  },
  {
    icon: "box",
    title: "Alles aus einer Hand",
    text: "Planung, Koordination und Ausführung bei einem Anbieter — ein Ansprechpartner für alles.",
  },
] as const;

export const priceCard = {
  eyebrow: "Neukunden-Angebot",
  title: ["30 % Rabatt.", "Erste Buchung."],
  text: `${promo.newClientText} Dazu ${promo.demontageText.toLowerCase()} Zusätzlich: verbindlicher Festpreis nach der kostenlosen Besichtigung — und unsere Bestpreis-Garantie.`,
  cta: "Angebot mit Rabatt anfragen",
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
  lead: "Ziehen Sie den Regler. Zwei echte Beispiele aus unserem Alltag — vor der Entrümpelung und danach, besenrein übergeben.",
  labelBefore: "Vorher",
  labelAfter: "Nachher · besenrein",
  examples: [
    {
      before: "vorher",
      after: "nachher",
      caption: "Bürofläche",
      altBefore: "Bürofläche vollgestellt vor der Entrümpelung",
      altAfter: "Dieselbe Bürofläche geräumt und besenrein",
    },
    {
      before: "vorher2",
      after: "nachher2",
      caption: "Wohnraum",
      altBefore: "Wohnraum mit Umzugskartons und Restmüll",
      altAfter: "Wohnraum leer, sauber und übergabebereit",
    },
  ],
} as const;

export const process = {
  eyebrow: "Ablauf",
  title: "In vier Schritten zum Ergebnis",
  steps: [
    {
      number: "01",
      title: "Anfrage",
      text: "Per Telefon (24/7), WhatsApp oder Formular. Wir melden uns innerhalb von 60 Minuten bei Ihnen.",
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
  { value: 30, suffix: " %", label: "Neukunden-Rabatt" },
  { value: 24, suffix: "/7", label: "Erreichbar – Tag und Nacht" },
  { value: 0, suffix: " €", label: "Möbeldemontage inklusive" },
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
    {
      q: "Gibt es einen Rabatt für Neukunden?",
      a: `Ja. Neukunden erhalten ${promo.newClientDiscount} % Rabatt auf die erste gebuchte Leistung — ob Entrümpelung, Umzug, Rückbau oder Reinigung. Einfach bei der Anfrage kurz Bescheid geben.`,
    },
    {
      q: "Ist die Möbeldemontage wirklich kostenlos?",
      a: "Ja. Die Demontage Ihrer Möbel ist bei uns inklusive — ohne versteckte Zusatzkosten. Das gilt für Entrümpelungen, Umzüge und Haushaltsauflösungen.",
    },
    {
      q: "Kann ich auch nachts anrufen?",
      a: "Ja. Sie erreichen uns rund um die Uhr — tagsüber, abends und auch nachts. Rufen Sie an, wann immer es bei Ihnen passt.",
    },
  ],
} as const;

export const contact = {
  eyebrow: "Kontakt",
  title: "Jetzt unverbindlich anfragen",
  lead: "Beschreiben Sie kurz Ihr Vorhaben. Neukunden erhalten 30 % Rabatt auf die erste Leistung — plus kostenlose Möbeldemontage.",
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
      icon: "phone",
      title: contacts.phoneSecondaryLabel,
      text: contacts.phoneSecondaryNote,
      href: `tel:${contacts.phoneSecondaryHref}`,
    },
    {
      icon: "instagram",
      title: contacts.instagramHandle,
      text: "Folgen Sie uns auf Instagram",
      href: contacts.instagram,
    },
    {
      icon: "mail",
      title: contacts.email,
      text: "Antwort am selben Werktag",
      href: `mailto:${contacts.email}`,
    },
  ] satisfies ContactRow[],
} as const;

type ContactRow = {
  icon: "phone" | "mail" | "pin" | "clock" | "instagram";
  title: string;
  text: string;
  href?: string;
};

export const footer = {
  about:
    "Entrümpelung, Haushaltsauflösung, Umzug, Transport, Rückbau und Reinigung in Berlin und Brandenburg. Kostenlose Möbeldemontage, 30 % Neukunden-Rabatt, 24/7 erreichbar.",
  social: [
    {
      label: "Instagram",
      href: contacts.instagram,
      handle: contacts.instagramHandle,
    },
  ],
  columns: [
    {
      title: "Leistungen",
      links: [
        { label: "Entrümpelung", href: "/#leistungen" },
        { label: "Haushaltsauflösung", href: "/#leistungen" },
        { label: "Umzug & Transport", href: "/#leistungen" },
        { label: "Entkernung & Abbruch", href: "/#leistungen" },
        { label: "Endreinigung", href: "/#leistungen" },
      ],
    },
    {
      title: "Unternehmen",
      links: [
        { label: "Warum SAVO", href: "/#warum" },
        { label: "Preisrechner", href: "/#rechner" },
        { label: "Ablauf", href: "/#ablauf" },
        { label: "Häufige Fragen", href: "/#faq" },
        { label: "Kontakt", href: "/#kontakt" },
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
