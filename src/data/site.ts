// Central place for site-wide data: identity, navigation, contact, services.
// Edit values here and they update across every page.

export const isDemo =
  import.meta.env.PUBLIC_IS_DEMO === "true" ||
  import.meta.env.IS_DEMO === "true";

export const site = {
  name: isDemo ? "Erika Mustermann" : "Elena Roehrborn",
  firstName: isDemo ? "Erika" : "Elena",
  role: "Heilpraktikerin für Psychotherapie",
  tagline: "Online-Psychotherapie, Paar- & Sexualtherapie",
  // Used in SEO, structured data and the footer. Swap before launch.
  url: "https://www.elena-roehrborn.de",
  locale: "de-DE",
  lang: "de",
  email: isDemo ? "erika.mustermann@example.com" : "elena.roehrborn@gmail.com",
  // Placeholder external booking link — replace with the real one
  // (Calendly, Doctolib, eterminservice …) when it exists.
  bookingUrl: "#termin",
  // Optional phone — leave empty to hide it everywhere.
  phone: "",
  city: "Online · deutschlandweit",
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
  icon: "heart" | "rings" | "bloom";
};

export const services: Service[] = [
  {
    slug: "einzeltherapie",
    href: "/therapieangebote/einzeltherapie",
    title: "Einzeltherapie",
    short: "Raum für Sie allein – bei Belastungen, Krisen und Veränderung.",
    blurb:
      "Ein vertraulicher Raum, in dem Sie in Ihrem Tempo verstehen, ordnen und Schritt für Schritt verändern dürfen – ob bei Ängsten, depressiven Phasen, Stress oder Lebensfragen.",
    icon: "heart",
  },
  {
    slug: "paartherapie",
    href: "/therapieangebote/paartherapie",
    title: "Paartherapie",
    short: "Wieder ins Gespräch kommen – und einander neu zuhören.",
    blurb:
      "Begleitung für Paare, die sich festgefahren fühlen, viel streiten oder einander verloren haben. Gemeinsam finden wir zurück zu Verständnis, Nähe und einer Sprache füreinander.",
    icon: "rings",
  },
  {
    slug: "sexualtherapie",
    href: "/therapieangebote/sexualtherapie",
    title: "Sexualtherapie",
    short: "Offen und ohne Scham über Intimität sprechen.",
    blurb:
      "Ein geschützter Rahmen für Fragen rund um Sexualität, Lust, Unsicherheiten und Veränderung – wertfrei, respektvoll und in Ihrem eigenen Tempo.",
    icon: "bloom",
  },
];
