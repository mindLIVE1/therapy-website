// Central place for site-wide data: identity, navigation, contact, services.
// Edit values here and they update across every page.

export const isDemo =
  import.meta.env.PUBLIC_IS_DEMO === "true" ||
  import.meta.env.IS_DEMO === "true";

export const isSiteInProgress =
  import.meta.env.PUBLIC_SITE_IN_PROGRESS === "true";

export const site = {
  name: isDemo ? "Erika Mustermann" : "Elena Roehrborn",
  firstName: isDemo ? "Erika" : "Elena",
  // Combined title (used for structured data / job title).
  role: "Klinische Psychologin (M.Sc.) · Heilpraktikerin für Psychotherapie",
  // Individual credential lines (footer, Über mich).
  titles: [
    "Klinische Psychologin (M.Sc.)",
    "Heilpraktikerin für Psychotherapie",
  ],
  tagline: "Online-Psychotherapie, Paar- & Sexualtherapie",
  // Used in SEO, structured data and the footer. Swap before launch.
  url: "https://www.elena-roehrborn.de",
  locale: "de-DE",
  lang: "de",
  languages: "Deutsch & Englisch",
  email: isDemo ? "erika.mustermann@example.com" : "elena.roehrborn@gmail.com",
  // No external booking tool is used — all CTAs lead to the contact form.
  bookingUrl: "/kontakt#termin",
  // Optional phone — leave empty to hide it everywhere.
  phone: "",
  city: "Online · deutschland- & europaweit",
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: "Start", href: "/" },
  {
    label: "Therapieangebote",
    href: "/therapieangebote",
    children: [
      { label: "Einzeltherapie", href: "/therapieangebote/einzeltherapie" },
      { label: "Paartherapie", href: "/therapieangebote/paartherapie" },
      { label: "Sexualtherapie", href: "/therapieangebote/sexualtherapie" },
    ],
  },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Honorar & Ablauf", href: "/honorar" },
  { label: "Kontakt", href: "/kontakt" },
];

export type Service = {
  slug: string;
  href: string;
  title: string;
  short: string; // one line, for cards / overview
  blurb: string; // 2–3 sentences, for the overview section
  icon: "heart" | "rings" | "bloom" | "speech" | "speech2";
};

export const services: Service[] = [
  {
    slug: "einzeltherapie",
    href: "/therapieangebote/einzeltherapie",
    title: "Einzeltherapie",
    short:
      "Ein geschützter Raum, um Gedanken zu ordnen, Emotionen zu verstehen und neue Wege im Umgang mit Ängsten, Stress, Selbstwert, Krisen oder persönlichen Herausforderungen zu entwickeln.",
    blurb:
      "Ein geschützter Raum, um Gedanken zu ordnen, Emotionen zu verstehen und neue Wege im Umgang mit Ängsten, Stress, Selbstwert, Krisen oder persönlichen Herausforderungen zu entwickeln.",
    icon: "bloom",
  },
  {
    slug: "paartherapie",
    href: "/therapieangebote/paartherapie",
    title: "Paartherapie",
    short:
      "Für Paare, die festgefahrene Konflikte lösen, Vertrauen stärken oder wieder mehr Nähe und Verständnis füreinander entwickeln möchten.",
    blurb:
      "Für Paare, die festgefahrene Konflikte lösen, Vertrauen stärken oder wieder mehr Nähe und Verständnis füreinander entwickeln möchten.",
    icon: "speech2",
  },
  {
    slug: "sexualtherapie",
    href: "/therapieangebote/sexualtherapie",
    title: "Sexualtherapie",
    short:
      "Ein wertfreier Raum für Fragen rund um Sexualität, Intimität, Lust, Unsicherheiten oder unterschiedliche Bedürfnisse – einfühlsam und ohne Tabus.",
    blurb:
      "Ein wertfreier Raum für Fragen rund um Sexualität, Intimität, Lust, Unsicherheiten oder unterschiedliche Bedürfnisse – einfühlsam und ohne Tabus.",
    icon: "heart",
  },
];
