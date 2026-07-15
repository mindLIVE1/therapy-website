import { site } from "./site";

export type SocialMeta = {
  title: string;
  description: string;
};

export const socialImage = {
  path: "/og-image-v2.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: `Social-Media-Vorschau der Online-Praxis von ${site.name}: Spross-Logo, der Claim „Ein geschützter Raum für das, was Sie gerade bewegt.“ und ein Ausschnitt der Website.`,
} as const;

const socialMetaByPath: Record<string, SocialMeta> = {
  "/": {
    title: `Online-Psychotherapie, Paar- & Sexualtherapie | ${site.name}`,
    description: `Vertrauliche Online-Psychotherapie, Paar- und Sexualtherapie bei ${site.name}. Einfühlsame, professionelle Begleitung per Video – deutschlandweit und ganz bequem von zu Hause.`,
  },
  "/therapieangebote": {
    title: `Therapieangebote online – Begleitung, die zu Ihnen passt | ${site.name}`,
    description: `Einzeltherapie, Paartherapie und Sexualtherapie bei ${site.name} – online, vertraulich und individuell auf Ihr Anliegen abgestimmt.`,
  },
  "/therapieangebote/einzeltherapie": {
    title: `Einzeltherapie online – Ein Raum, der ganz Ihnen gehört | ${site.name}`,
    description: `Einfühlsame Online-Einzeltherapie bei Ängsten, Stress, Selbstwertthemen, Krisen und persönlichen Herausforderungen – deutschland- und europaweit.`,
  },
  "/therapieangebote/paartherapie": {
    title: `Paartherapie online – Wieder zueinander finden | ${site.name}`,
    description: `Allparteiliche Online-Paartherapie bei Konflikten, Distanz und Vertrauensfragen – wertschätzend, offen für jede Beziehungsform und per Video.`,
  },
  "/therapieangebote/sexualtherapie": {
    title: `Sexualtherapie online – Ohne Scham über Sexualität sprechen | ${site.name}`,
    description: `Ein geschützter, wertfreier Raum für Fragen rund um Sexualität, Intimität, Lust und Unsicherheiten – diskret, einfühlsam und online.`,
  },
  "/ueber-mich": {
    title: `Über mich – Therapie mit Wärme, Klarheit und Struktur | ${site.name}`,
    description: `Lernen Sie ${site.name} kennen: Klinische Psychologin (M.Sc.) und Heilpraktikerin für Psychotherapie mit einem empathischen, klaren und lösungsorientierten Ansatz.`,
  },
  "/honorar": {
    title: `Honorar & Ablauf – Transparent und unkompliziert | ${site.name}`,
    description: `Alle Informationen zu Honorar, Erstgespräch, Ablauf und Zahlungsmodalitäten der Online-Therapie bei ${site.name} – übersichtlich an einem Ort.`,
  },
  "/kontakt": {
    title: `Kontakt & Terminanfrage – Der erste Schritt darf leicht sein | ${site.name}`,
    description: `Nehmen Sie vertraulich und unverbindlich Kontakt zu ${site.name} auf und fragen Sie unkompliziert einen Termin für eine Online-Sitzung an.`,
  },
  "/impressum": {
    title: `Impressum | ${site.name}`,
    description: `Impressum und Anbieterkennzeichnung der Online-Praxis von ${site.name}.`,
  },
  "/datenschutz": {
    title: `Datenschutzerklärung | ${site.name}`,
    description: `Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten auf der Website von ${site.name}.`,
  },
  "/404": {
    title: `Seite nicht gefunden | ${site.name}`,
    description: `Diese Seite existiert nicht mehr oder wurde verschoben.`,
  },
};

export function getSocialMeta(pathname: string): SocialMeta | undefined {
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  return socialMetaByPath[normalizedPath];
}
