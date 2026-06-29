# Roadmap & To-dos bis zum Launch

Stand: 29.06.2026 · Diese Liste ist die Arbeitsgrundlage bis zum Go-Live.
Abgehakt = erledigt. Reihenfolge ist eine Empfehlung, keine Pflicht.

---

## Phase 1 — Inhalte & Platzhalter füllen

- [ ] **Domain** eintragen in `astro.config.mjs` (`SITE`), `src/data/site.ts` (`url`) und `public/robots.txt`
- [ ] **E-Mail-Adresse** in `src/data/site.ts` prüfen/bestätigen
- [ ] **Honorar-Preise** in `src/pages/honorar.astro` (aktuell `00 €`) durch echte Sätze ersetzen
- [ ] Texte gegenlesen (Tonalität, Anrede, evtl. Telefonnummer ergänzen in `src/data/site.ts`)
- [x] Porträtfoto von Elena einsetzen (Hero, Über-mich, Teaser)
- [ ] Weitere Fotos einsetzen (Detailaufnahmen, „ruhiger Moment“) — siehe verbleibende `<ImagePlaceholder>` in den Seiten
- [ ] Eigenes OG-Share-Bild gestalten (ersetzt `public/og-image.svg`), optional mit Foto

## Phase 2 — Funktionen anbinden

- [ ] **Kontaktformular** an echten Dienst hängen: `action` in `src/pages/kontakt.astro`
      (`DEINE_FORM_ID`) ersetzen. Empfehlung: Web3Forms oder Formspree (beide DSGVO-tauglich, EU-Optionen vorhanden).
      → *Bis dahin funktioniert der mailto-Fallback bereits.*
- [ ] **Buchungslink** setzen: `bookingUrl` in `src/data/site.ts`
      (z. B. Calendly, Doctolib, eTermin). Aktuell springt der Button zum Kontaktformular (`#termin`).
- [ ] Test: Formularabsendung kommt an + Bestätigungsseite/-meldung
- [ ] **Video-Tool** festlegen (z. B. RED medical, sprechstunde.online, Doxy.me — DSGVO-/Heilberufe-konform) und im Datenschutz benennen

## Phase 3 — Recht & Datenschutz (vor Veröffentlichung zwingend)

- [ ] **Impressum** vollständig ausfüllen (`src/pages/impressum.astro`): Anschrift, Aufsichtsbehörde/Gesundheitsamt, ggf. USt-IdNr.
- [ ] **Datenschutzerklärung** ausfüllen (`src/pages/datenschutz.astro`): Hoster, Formulardienst, Buchungstool, Video-Dienst, Datum
- [ ] Beides **juristisch prüfen lassen** (die Vorlagen sind keine Rechtsberatung)
- [ ] Prüfen, ob ein Cookie-/Consent-Banner nötig ist
      → aktuell **nicht** nötig: keine Cookies, kein Tracking, Schriften selbst gehostet. Bleibt so, solange keine externen Skripte hinzukommen.

## Phase 4 — Qualität & SEO

- [ ] `npm run build` läuft fehlerfrei (CI-tauglich)
- [ ] Lighthouse / PageSpeed prüfen (Performance, A11y, SEO, Best Practices)
- [ ] Alle Links & CTAs klicken (intern + Buchung + mailto)
- [ ] Darstellung auf echtem Smartphone testen
- [ ] `og-image` mit Sharing-Debugger prüfen (z. B. opengraph.xyz)
- [ ] Favicon/Touch-Icons final
- [ ] Nach Launch: Google Search Console einrichten + `sitemap-index.xml` einreichen
- [ ] Google Business Profil / relevante Therapeut:innen-Verzeichnisse (optional, fürs Gefundenwerden)

## Phase 5 — Deployment / Hosting

- [ ] Git-Repository anlegen (ist aktuell **kein** Git-Repo)
- [ ] Host wählen. Empfehlung für DSGVO/EU:
  - **Cloudflare Pages** (EU-Datenstandort möglich, kostenlos, einfach), oder
  - **Netlify / Vercel** (sehr komfortabel, inkl. Formulardienst bei Netlify), oder
  - klassischer **deutscher Webspace** (statisches `dist/` per FTP/Deploy)
- [ ] Build-Command `npm run build`, Output-Verzeichnis `dist/` hinterlegen
- [ ] Domain verbinden + **HTTPS/SSL** aktivieren (i. d. R. automatisch)
- [ ] `www`- und Nicht-`www`-Variante auf eine Form weiterleiten (Canonical)
- [ ] 404-Seite greift (ist vorhanden: `src/pages/404.astro`)

## Phase 6 — Optionale Ausbaustufen

- [ ] **Cookie-freie Analytik** (datensparsam): Plausible oder Umami (self-hosted/EU) statt Google Analytics
- [ ] Blog/„Aktuelles“ für SEO (Astro Content Collections) — falls regelmäßige Texte geplant sind
- [ ] Mehrsprachigkeit (z. B. EN) — nur falls Zielgruppe es verlangt
- [ ] Newsletter/Mailingliste — nur mit sauberem Double-Opt-in
- [ ] Bewertungen/Stimmen (anonymisiert, mit Einwilligung) als Vertrauenselement

---

## Technische Notiz

`npm audit` meldet eine **hohe** Schwachstelle in `esbuild`. Sie betrifft
**ausschließlich den Entwicklungsserver unter Windows** und **nicht** das
fertige statische Produktions-Build. Ein Fix erfordert ein Astro-7-Beta
(Breaking Change) und wurde daher bewusst zurückgestellt.
- [ ] Nach stabilem Astro-7-Release: Upgrade prüfen und `audit` erneut laufen lassen
