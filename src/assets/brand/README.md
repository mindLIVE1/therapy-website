# Designsystem und Visitenkarten

Dieser Ordner enthält die aus der bestehenden Website abgeleitete Markenübersicht sowie drei Visitenkartenrichtungen. Die editierbaren SVG-Dateien sind die Master-Dateien; PNG-Dateien dienen als Vorschau.

## Schnellübersicht

- `design-system-overview.svg` / `.png`: visuelles Designsheet
- `logo/sprout-mark.svg` / `.png`: eigenständige Spross-Marke
- `logo/logo-lockup-horizontal.svg` / `.png`: horizontales Logo-Lockup
- `business-cards/business-cards-overview.png`: alle drei Kartenrichtungen auf einer Übersicht
- `business-cards/concept-*-front.svg` und `*-back.svg`: skalierbare Produktionsquellen
- `business-cards/concept-*-preview.png`: Vorder- und Rückseite je Konzept

Die eingebetteten Schriftdateien und das eingebettete Porträt machen die SVG-Master portabel. Verdeckte SVG-Gruppe `production-guides`: Cyan = Endformat, Magenta = Sicherheitsbereich.

## Markenidentität

| Feld | Inhalt |
| --- | --- |
| Name | Elena Roehrborn |
| Berufsbezeichnung | Klinische Psychologin (M.Sc.) |
| Zusatzqualifikation | Heilpraktikerin für Psychotherapie |
| Angebot | Online-Psychotherapie, Paar- & Sexualtherapie |
| E-Mail | info@elena-roehrborn.de |
| Web | www.elena-roehrborn.de |
| Region | Online · deutschland- & europaweit |
| Sprachen | Deutsch & Englisch |

Telefonnummer, Social-Media-Profile und Besuchsadresse wurden bewusst nicht ergänzt: Die Website enthält keine Telefonnummer oder Social Handles und positioniert die Praxis als reine Online-Praxis. Die im Impressum genannte Berliner Anschrift ist daher nicht automatisch als Praxisadresse zu verstehen.

## Farben

### Kernrollen

| Rolle | Token | Hex | Verwendung |
| --- | --- | --- | --- |
| Primary | `forest` | `#3F5141` | Vertrauen, Links, Icons, dunkle CTA |
| Secondary | `sage` | `#9CA891` | Ruhe, Natur, dekorative Flächen |
| Accent / CTA | `clay` | `#BD7850` | Primäre Handlung und warmer Akzent |
| Canvas | `cream` | `#F6F1E9` | Seitenhintergrund und helle Schrift |
| Card | `sand` | `#EFE7D8` | Karten und Paneele |
| Strong text | `ink` | `#322A24` | Überschriften |
| Default text | `taupe-ink` | `#463B32` | Fließtext |

### Vollständige Palette

| Token | Hex | Semantische Rolle |
| --- | --- | --- |
| `cream` | `#F6F1E9` | Canvas / heller Kontrasttext |
| `sand` | `#EFE7D8` | Kartenfläche |
| `sand-deep` | `#E6DBC8` | Alternierendes Band |
| `ink` | `#322A24` | Stärkster Text |
| `taupe-ink` | `#463B32` | Standardtext |
| `taupe` | `#6B5B4D` | Markenneutral |
| `taupe-soft` | `#8A7868` | Caption / Meta |
| `forest` | `#3F5141` | Primärfarbe |
| `forest-deep` | `#2C3A2F` | Footer / dunkle Fläche |
| `sage` | `#9CA891` | Sekundärfarbe |
| `sage-soft` | `#C6CFB8` | Heller Akzent |
| `sage-mist` | `#E4E8DA` | Subtile Fläche / Hover |
| `clay` | `#BD7850` | Primärer CTA |
| `clay-deep` | `#A3623E` | CTA-Hover / Kicker |
| `clay-soft` | `#ECD0BB` | Warme Akzentfläche |
| `line` | `rgba(70, 59, 50, 0.14)` | Standardlinie |
| `line-soft` | `rgba(70, 59, 50, 0.08)` | Dezente Kartenlinie |

Kontraststarke Kernpaare der Website: `ink` auf `cream` = 12,52:1, `taupe-ink` auf `cream` = 9,67:1 und `forest` auf `cream` = 7,58:1. Weiß auf `clay` erreicht nur 3,52:1 und ist deshalb primär für größere bzw. kräftigere CTA-Schrift geeignet.

## Typografie

| Rolle | Familie | Typischer Schnitt | Regeln |
| --- | --- | --- | --- |
| Display / Headlines / UI | Manrope Variable | 600 | Zeilenhöhe 1,12; Tracking `-0.015em` |
| Fließtext / Formulare | Nunito Sans Variable | 400 | Zeilenhöhe 1,7 |
| Eyebrow / Kicker | Manrope Variable | 600 | 12,48 px; Versalien; Tracking `0.16em` |

CSS-Fallbacks:

```css
--font-display: "Manrope Variable", "Manrope", ui-sans-serif, system-ui, sans-serif;
--font-body: "Nunito Sans Variable", "Nunito Sans", ui-sans-serif, system-ui, sans-serif;
```

Beobachtete Größenskala: Hero 54,4 px; H1 48 px; H2 36 px; H3 24 px; Lead 18 px; Body 16 px; Small 14 px; Micro 11,52–12,48 px.

## Form, Abstand und Bewegung

- Spacing-Basis: 4 px
- Maximale Inhaltsbreite: 1200 px
- Seiten-Padding: 24 px mobil, 40 px ab 768 px
- Radien: 12 px Control, 16 px Icon, 32 px Panel, 40 px Hero, 44 px Feature, `9999px` Pill
- Icons: 1,6 px Strich, runde Linienenden und Ecken
- Signaturmotiv: zweiblättriger Spross
- Reveal: 700 ms, `cubic-bezier(0.22, 1, 0.36, 1)`; reduzierte Bewegung wird respektiert

Schatten:

```css
--shadow-soft: 0 18px 48px -24px rgba(57, 47, 38, 0.45);
--shadow-card:
  0 2px 8px -4px rgba(57, 47, 38, 0.18),
  0 24px 48px -32px rgba(57, 47, 38, 0.35);
```

Gestaltungscharakter: warm, ruhig, naturbezogen und vertrauenswürdig. Große Forest-/Cream-Flächen tragen die Marke; Sage schafft Ruhe; Clay wird gezielt und sparsam als warmer Handlungsakzent eingesetzt. Bildmotive zeigen warmes Licht, natürliche Räume und Pflanzen. Formen sind weich, organisch und großzügig gerundet.

## Visitenkartenrichtungen

### 01 · Ruhe & Klarheit

Minimalistische Querformatkarte. Die Vorderseite nutzt das bestehende Header-Lockup als Ausgangspunkt; die dunkle Rückseite priorisiert die Kontaktaufnahme. Geeignet für eine zeitlose, besonders seriöse Wirkung.

### 02 · Geschützter Raum

Hochformatige, editoriale Karte. Ein organischer Bogen übersetzt den zentralen Website-Claim in eine räumliche Form. Geeignet für eine eigenständigere, prägnantere Markenwirkung.

### 03 · Persönlich & nahbar

Querformatkarte mit dem vorhandenen Porträt von Elena Roehrborn, weichen Farbfeldern und persönlicher Tonalität. Geeignet, wenn Wiedererkennung und Nähe im Vordergrund stehen.

## Druckspezifikation

- Endformat: 85 × 55 mm; Konzept 02 gedreht als 55 × 85 mm
- Beschnitt: 3 mm umlaufend
- SVG-Arbeitsfläche: 91 × 61 mm bzw. 61 × 91 mm
- Sicherheitsabstand: 5 mm innerhalb der Schnittkante
- Kleinste Schrift: mindestens 7 pt
- Vollflächen und Porträt reichen bis zum Rand der Beschnittfläche
- PNG-Vorschauen sind RGB-Dateien und keine Druckmaster

Vor dem Druck bitte E-Mail, Domain, Schreibweisen und Porträtfreigabe bestätigen. Die SVG-Datei anschließend mit dem konkreten Druckerei-Profil in CMYK umwandeln und als PDF/X-4 mit eingebetteten oder in Pfade konvertierten Schriften exportieren. Geeignete Profile sind abhängig vom Material und der Druckerei; nicht pauschal im RGB-Master festlegen.

## Regenerieren

```sh
npm run brand:generate
```

Der Generator liest die selbst gehosteten Website-Schriften und das vorhandene Porträt aus dem Projekt ein und erzeugt SVG-Master sowie PNG-Vorschauen neu.
