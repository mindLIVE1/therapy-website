# Elena Roehrborn – Website

Website für die Online-Praxis von Elena Roehrborn (Psychotherapie, Paar- &
Sexualtherapie). Gebaut mit **Astro 5** und **Tailwind CSS 4**, statisch
gerendert, schnell, barrierearm und DSGVO-freundlich.

## Schnellstart

```bash
npm install        # Abhängigkeiten installieren
npm run dev        # Entwicklungsserver auf http://localhost:4321
npm run build      # Produktions-Build nach ./dist
npm run preview    # den Build lokal ansehen
```

## Designsystem

- **Schriften:** Manrope (Überschriften) + Nunito Sans (Fließtext) – identisch
  zur bisherigen Seite, aber **selbst gehostet** (kein Google-Fonts-CDN, daher
  DSGVO-konform).
- **Farben** (definiert in [`src/styles/global.css`](src/styles/global.css) im
  `@theme`-Block):
  - Creme `#f6f1e9`, Sand `#efe7d8` – Flächen
  - Taupe `#6b5b4d`, Tinte `#322a24` – Text
  - Wald `#3f5141` / `#2c3a2f` – tiefer Akzent (Tiefe & Vertrauen)
  - Salbei `#9ca891` – weicher Zweitakzent
  - Ton/Clay `#bd7850` – warme Calls-to-Action
- **Form:** durchgängig runde Ecken und organische „Blob“-Formen.

Möchten Sie die Farben anpassen, ändern Sie nur die Werte im `@theme`-Block –
sie wirken automatisch auf die ganze Seite.

## Struktur

```
src/
  data/
    site.ts            → Name, Navigation, Kontakt, Buchungslink, Angebote
    serviceContent.ts  → Langtexte der drei Therapieangebote
  layouts/             → BaseLayout (SEO + Header/Footer), LegalLayout
  components/          → Header, Footer, Seo, Icon, ServiceCard, …
  pages/
    index.astro                       → Startseite
    ueber-mich.astro                  → Über mich
    therapieangebote/index.astro      → Angebote-Übersicht
    therapieangebote/[slug].astro     → Einzel-/Paar-/Sexualtherapie
    honorar.astro                     → Honorar & Ablauf
    kontakt.astro                     → Kontakt + Terminanfrage
    impressum.astro · datenschutz.astro
public/                → favicon, og-image, robots.txt
```

## ✅ Vor dem Launch ausfüllen

Alle Platzhalter sind bewusst markiert. Bitte ergänzen:

1. **Domain** – in [`astro.config.mjs`](astro.config.mjs) und
   [`src/data/site.ts`](src/data/site.ts) (`url`) sowie
   [`public/robots.txt`](public/robots.txt).
2. **Buchungslink** – `bookingUrl` in [`src/data/site.ts`](src/data/site.ts)
   (z. B. Calendly/Doctolib). Solange `#termin` gesetzt ist, springen die
   „Termin buchen“-Buttons zum Kontaktformular.
3. **Kontaktformular** – der PHP-Endpunkt unter `public/api/contact.php` sendet
   über die beiden ALL-INKL-Postfächer. Zugangsdaten liegen ausschließlich in
   GitHub Actions Secrets; Einrichtung und Produktionstest stehen in
   [`DEPLOYMENT.md`](DEPLOYMENT.md).
4. **Honorar** – echte Preise in [`src/pages/honorar.astro`](src/pages/honorar.astro)
   (aktuell `00 €` als Platzhalter).
5. **Impressum & Datenschutz** – alle <span>-Platzhalter ausfüllen und
   **rechtlich prüfen lassen**. Die Texte sind sorgfältige Vorlagen, keine
   Rechtsberatung.
6. **Bilder** – die runden Platzhalter durch echte Fotos ersetzen (siehe unten).
7. **E-Mail** – die sichtbare und technische E-Mail-Konfiguration wird über
   GitHub Repository Variables gesteuert; siehe [`DEPLOYMENT.md`](DEPLOYMENT.md).

## Bilder einsetzen

Überall, wo `<ImagePlaceholder … />` steht, gehört ein Foto hin. Foto nach
`src/assets/` legen und den Platzhalter ersetzen, z. B.:

```astro
---
import { Image } from "astro:assets";
import portrait from "@/assets/elena.jpg";
---
<Image src={portrait} alt="Elena Roehrborn" class="rounded-[2rem] …" />
```

Astro optimiert das Bild dann automatisch (Größe, Format, Lazy-Loading).

## SEO

Jede Seite hat eigene `<title>`/Description (Komponente
[`Seo.astro`](src/components/Seo.astro)), Open-Graph- und Twitter-Tags,
`canonical`, strukturierte Daten (JSON-LD: `MedicalBusiness`, `Service`,
`FAQPage`, `BreadcrumbList`) sowie eine automatisch erzeugte `sitemap-index.xml`.

## Hinweis zur Sicherheit (npm audit)

`npm audit` meldet eine Schwachstelle in `esbuild`. Sie betrifft **nur den
Entwicklungsserver unter Windows** und nicht das fertige, statische Produktions-
Build. Ein Fix erfordert ein Astro-7-Beta (Breaking Change) und wurde daher
bewusst nicht eingespielt.

## Deployment

`npm run build` erzeugt statisches HTML in `dist/`. Damit funktioniert jedes
statische Hosting: Netlify, Vercel, Cloudflare Pages, GitHub Pages oder ein
klassischer Webspace. Für ein deutsches/EU-Hosting (DSGVO) bieten sich z. B.
Cloudflare Pages (EU) oder ein deutscher Anbieter an.
