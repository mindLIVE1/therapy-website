import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const brandDir = path.join(rootDir, "src/assets/brand");
const cardsDir = path.join(brandDir, "business-cards");
const logoDir = path.join(brandDir, "logo");

await Promise.all([
  mkdir(cardsDir, { recursive: true }),
  mkdir(logoDir, { recursive: true }),
]);

const [manropeFont, nunitoFont, portrait] = await Promise.all([
  readFile(
    path.join(
      rootDir,
      "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
    ),
  ),
  readFile(
    path.join(
      rootDir,
      "node_modules/@fontsource-variable/nunito-sans/files/nunito-sans-latin-wght-normal.woff2",
    ),
  ),
  readFile(path.join(rootDir, "src/assets/elena-roehrborn.webp")),
]);

const fontCss = `
  @font-face {
    font-family: "Brand Manrope";
    src: url("data:font/woff2;base64,${manropeFont.toString("base64")}") format("woff2");
    font-style: normal;
    font-weight: 200 800;
  }
  @font-face {
    font-family: "Brand Nunito Sans";
    src: url("data:font/woff2;base64,${nunitoFont.toString("base64")}") format("woff2");
    font-style: normal;
    font-weight: 200 1000;
  }
  .display { font-family: "Brand Manrope", Manrope, Arial, sans-serif; }
  .body { font-family: "Brand Nunito Sans", "Nunito Sans", Arial, sans-serif; }
  text { text-rendering: geometricPrecision; }
`;

const colors = {
  cream: "#F6F1E9",
  sand: "#EFE7D8",
  sandDeep: "#E6DBC8",
  taupe: "#6B5B4D",
  taupeInk: "#463B32",
  ink: "#322A24",
  taupeSoft: "#8A7868",
  forest: "#3F5141",
  forestDeep: "#2C3A2F",
  sage: "#9CA891",
  sageSoft: "#C6CFB8",
  sageMist: "#E4E8DA",
  clay: "#BD7850",
  clayDeep: "#A3623E",
  claySoft: "#ECD0BB",
};

const identity = {
  name: "Elena Roehrborn",
  title1: "Klinische Psychologin (M.Sc.)",
  title2: "Heilpraktikerin für Psychotherapie",
  tagline: "Online-Psychotherapie, Paar- & Sexualtherapie",
  email: "info@elena-roehrborn.de",
  web: "www.elena-roehrborn.de",
  region: "Online · deutschland- & europaweit",
  languages: "Deutsch & Englisch",
};

const xml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const paperTexture = (id, opacity = 0.06) => `
  <filter id="${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="19" result="noise"/>
    <feColorMatrix in="noise" type="saturate" values="0" result="gray"/>
    <feComponentTransfer in="gray" result="softNoise">
      <feFuncA type="table" tableValues="0 ${opacity}"/>
    </feComponentTransfer>
    <feBlend in="SourceGraphic" in2="softNoise" mode="multiply"/>
  </filter>
`;

function leafMark({ x, y, size, stroke, strokeWidth = 1.7, opacity = 1 }) {
  const scale = size / 24;
  return `
    <g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${stroke}"
      stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}">
      <path d="M12 21V12"/>
      <path d="M12 12c5 0 8-3 8-8-5 0-8 3-8 8Z"/>
      <path d="M12 12c-4 0-6.5-2.5-6.5-6.5C9 5.5 12 8 12 12Z"/>
    </g>`;
}

function sproutTile({ x, y, size, fill = colors.forest, stroke = colors.cream, radius = 0.28 }) {
  return `
    <g transform="translate(${x} ${y})">
      <rect width="${size}" height="${size}" rx="${size * radius}" fill="${fill}"/>
      ${leafMark({ x: size * 0.16, y: size * 0.13, size: size * 0.68, stroke, strokeWidth: 1.55 })}
    </g>`;
}

function hiddenGuides(width, height) {
  const landscape = width > height;
  const trimWidth = landscape ? 850 : 550;
  const trimHeight = landscape ? 550 : 850;
  return `
    <g id="production-guides" visibility="hidden" fill="none" pointer-events="none">
      <rect x="30" y="30" width="${trimWidth}" height="${trimHeight}" stroke="#00AEEF" stroke-width="2" stroke-dasharray="12 8"/>
      <rect x="80" y="80" width="${trimWidth - 100}" height="${trimHeight - 100}" stroke="#EC008C" stroke-width="2" stroke-dasharray="8 8"/>
    </g>`;
}

function cardSvg({ width = 910, height = 610, defs = "", content, label }) {
  const widthMm = width / 10;
  const heightMm = height / 10;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    width="${widthMm}mm" height="${heightMm}mm" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
    <title id="title">${label}</title>
    <desc id="desc">Visitenkartenentwurf inklusive 3 Millimeter Beschnitt. Die ausgeblendete Ebene production-guides enthält Schnitt- und Sicherheitslinien.</desc>
    <defs>
      <style>${fontCss}</style>
      ${defs}
    </defs>
    ${content}
    ${hiddenGuides(width, height)}
  </svg>`;
}

function commonTextStyles(extra = "") {
  return `<style>
    .name { font-family: "Brand Manrope", Manrope, Arial, sans-serif; font-weight: 650; letter-spacing: -0.018em; }
    .label { font-family: "Brand Manrope", Manrope, Arial, sans-serif; font-weight: 650; letter-spacing: 0.16em; }
    .copy { font-family: "Brand Nunito Sans", "Nunito Sans", Arial, sans-serif; font-weight: 450; }
    .copy-strong { font-family: "Brand Nunito Sans", "Nunito Sans", Arial, sans-serif; font-weight: 650; }
    ${extra}
  </style>`;
}

const concept1Front = cardSvg({
  label: "Konzept 1 Ruhe und Klarheit – Vorderseite",
  defs: `${commonTextStyles()}${paperTexture("grain1", 0.045)}`,
  content: `
    <rect width="910" height="610" fill="${colors.cream}" filter="url(#grain1)"/>
    <path d="M720 -35C802 26 850 95 924 205V-35Z" fill="${colors.sageMist}"/>
    <circle cx="864" cy="70" r="150" fill="${colors.sage}" opacity="0.18"/>
    ${sproutTile({ x: 92, y: 185, size: 142 })}
    <line x1="278" y1="333" x2="352" y2="333" stroke="${colors.clay}" stroke-width="7" stroke-linecap="round"/>
    <text x="278" y="223" class="name" font-size="55" fill="${colors.ink}">${identity.name}</text>
    <text x="280" y="273" class="copy" font-size="25" fill="${colors.taupeInk}">${identity.title1}</text>
    <text x="280" y="309" class="copy" font-size="25" fill="${colors.taupeInk}">${identity.title2}</text>
    <text x="278" y="390" class="label" font-size="20" fill="${colors.forest}">PSYCHOTHERAPIE · ONLINE</text>
    <text x="278" y="428" class="copy" font-size="24" fill="${colors.taupe}">Ein geschützter Raum für Veränderung.</text>
  `,
});

const concept1Back = cardSvg({
  label: "Konzept 1 Ruhe und Klarheit – Rückseite",
  defs: `${commonTextStyles()}${paperTexture("grain1b", 0.055)}`,
  content: `
    <rect width="910" height="610" fill="${colors.forestDeep}" filter="url(#grain1b)"/>
    ${leafMark({ x: 590, y: -20, size: 360, stroke: colors.sageSoft, strokeWidth: 1.2, opacity: 0.075 })}
    <text x="92" y="112" class="label" font-size="20" fill="${colors.claySoft}">KONTAKT</text>
    <text x="92" y="178" class="name" font-size="39" fill="${colors.cream}">Der erste Schritt</text>
    <text x="92" y="222" class="name" font-size="39" fill="${colors.cream}">darf leicht sein.</text>
    <line x1="92" y1="267" x2="818" y2="267" stroke="${colors.sage}" stroke-width="2" opacity="0.38"/>
    <circle cx="105" cy="333" r="8" fill="${colors.clay}"/>
    <text x="132" y="342" class="copy-strong" font-size="27" fill="${colors.cream}">${identity.email}</text>
    <circle cx="105" cy="391" r="8" fill="${colors.sage}"/>
    <text x="132" y="400" class="copy-strong" font-size="27" fill="${colors.cream}">${identity.web}</text>
    <circle cx="105" cy="449" r="8" fill="${colors.sage}"/>
    <text x="132" y="458" class="copy" font-size="26" fill="${colors.sageSoft}">${xml(identity.region)}</text>
    <rect x="580" y="470" width="238" height="56" rx="28" fill="${colors.cream}"/>
    <text x="699" y="505" text-anchor="middle" class="label" font-size="14" fill="${colors.forestDeep}">TERMIN ANFRAGEN</text>
  `,
});

const concept2Front = cardSvg({
  width: 610,
  height: 910,
  label: "Konzept 2 Geschützter Raum – Vorderseite",
  defs: `${commonTextStyles()}${paperTexture("grain2", 0.055)}`,
  content: `
    <rect width="610" height="910" fill="${colors.forest}" filter="url(#grain2)"/>
    <path d="M73 910V312C73 151 177 72 305 72s232 79 232 240v598Z" fill="${colors.cream}"/>
    <path d="M419 70c84 42 132 115 154 214" fill="none" stroke="${colors.sageSoft}" stroke-width="42" stroke-linecap="round" opacity="0.2"/>
    ${sproutTile({ x: 242, y: 164, size: 126, fill: colors.forestDeep, stroke: colors.cream, radius: 0.5 })}
    <line x1="276" y1="340" x2="334" y2="340" stroke="${colors.clay}" stroke-width="8" stroke-linecap="round"/>
    <text x="305" y="427" text-anchor="middle" class="name" font-size="50" fill="${colors.ink}">Elena</text>
    <text x="305" y="485" text-anchor="middle" class="name" font-size="50" fill="${colors.ink}">Roehrborn</text>
    <text x="305" y="548" text-anchor="middle" class="copy" font-size="24" fill="${colors.taupeInk}">${identity.title1}</text>
    <text x="305" y="586" text-anchor="middle" class="copy" font-size="24" fill="${colors.taupeInk}">${identity.title2}</text>
    <text x="305" y="691" text-anchor="middle" class="label" font-size="17" fill="${colors.clayDeep}">ONLINE-PRAXIS</text>
    <text x="305" y="735" text-anchor="middle" class="copy-strong" font-size="25" fill="${colors.forest}">Psychotherapie · Paartherapie</text>
    <text x="305" y="771" text-anchor="middle" class="copy-strong" font-size="25" fill="${colors.forest}">&amp; Sexualtherapie</text>
  `,
});

const concept2Back = cardSvg({
  width: 610,
  height: 910,
  label: "Konzept 2 Geschützter Raum – Rückseite",
  defs: `${commonTextStyles()}${paperTexture("grain2b", 0.04)}`,
  content: `
    <rect width="610" height="910" fill="${colors.cream}" filter="url(#grain2b)"/>
    <path d="M610 0H354C218 0 130 90 130 226v112c0 131-62 212-130 260V0Z" fill="${colors.sageMist}"/>
    <circle cx="538" cy="840" r="180" fill="${colors.claySoft}" opacity="0.55"/>
    ${leafMark({ x: 392, y: 55, size: 138, stroke: colors.forest, strokeWidth: 1.6 })}
    <text x="80" y="392" class="label" font-size="18" fill="${colors.clayDeep}">EIN GESCHÜTZTER RAUM</text>
    <text x="80" y="451" class="name" font-size="39" fill="${colors.ink}">für das, was Sie</text>
    <text x="80" y="497" class="name" font-size="39" fill="${colors.forest}">gerade bewegt.</text>
    <line x1="80" y1="548" x2="530" y2="548" stroke="${colors.taupeInk}" stroke-width="2" opacity="0.16"/>
    <text x="80" y="596" class="copy-strong" font-size="27" fill="${colors.taupeInk}">${identity.email}</text>
    <text x="80" y="641" class="copy-strong" font-size="27" fill="${colors.taupeInk}">${identity.web}</text>
    <text x="80" y="692" class="copy" font-size="25" fill="${colors.forest}">${xml(identity.region)}</text>
    <text x="80" y="731" class="copy" font-size="24" fill="${colors.taupe}">${xml(identity.languages)}</text>
    <rect x="80" y="757" width="260" height="62" rx="31" fill="${colors.forest}"/>
    <text x="210" y="797" text-anchor="middle" class="label" font-size="17" fill="${colors.cream}">ERSTGESPRÄCH</text>
  `,
});

// librsvg (used by Sharp) does not consistently render embedded WebP inside SVG.
// Convert the existing portrait once and embed a compact PNG for portable previews.
const portraitPng = await sharp(portrait)
  .resize({ width: 1050, height: 1400, fit: "cover", position: "centre" })
  .png({ compressionLevel: 9 })
  .toBuffer();
const portraitDataUri = `data:image/png;base64,${portraitPng.toString("base64")}`;

const concept3Front = cardSvg({
  label: "Konzept 3 Persönlich und nahbar – Vorderseite",
  defs: `${commonTextStyles()}
    <clipPath id="portrait-shape">
      <path d="M560 20H910V610H502c-32-102-29-196 8-280 29-66 50-156 50-310Z"/>
    </clipPath>
    <linearGradient id="portrait-wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${colors.sageMist}" stop-opacity="0.04"/>
      <stop offset="1" stop-color="${colors.forest}" stop-opacity="0.16"/>
    </linearGradient>
    ${paperTexture("grain3", 0.038)}`,
  content: `
    <rect width="910" height="610" fill="${colors.sand}" filter="url(#grain3)"/>
    <circle cx="520" cy="35" r="150" fill="${colors.sage}" opacity="0.2"/>
    <circle cx="485" cy="590" r="122" fill="${colors.clay}" opacity="0.14"/>
    <g clip-path="url(#portrait-shape)">
      <image href="${portraitDataUri}" x="480" y="-58" width="470" height="720" preserveAspectRatio="xMidYMid slice"/>
      <rect x="480" y="-20" width="470" height="670" fill="url(#portrait-wash)"/>
    </g>
    ${sproutTile({ x: 82, y: 84, size: 88, fill: colors.forest, stroke: colors.cream, radius: 0.3 })}
    <text x="82" y="244" class="name" font-size="51" fill="${colors.ink}">Elena Roehrborn</text>
    <line x1="82" y1="280" x2="146" y2="280" stroke="${colors.clay}" stroke-width="7" stroke-linecap="round"/>
    <text x="82" y="335" class="copy" font-size="25" fill="${colors.taupeInk}">${identity.title1}</text>
    <text x="82" y="372" class="copy" font-size="25" fill="${colors.taupeInk}">${identity.title2}</text>
    <text x="82" y="427" class="label" font-size="17" fill="${colors.forest}">ONLINE-PRAXIS</text>
    <text x="82" y="470" class="copy" font-size="24" fill="${colors.forest}">deutschland- &amp; europaweit</text>
    <text x="82" y="518" class="copy-strong" font-size="25" fill="${colors.taupe}">Wärme · Klarheit · Struktur</text>
  `,
});

const concept3Back = cardSvg({
  label: "Konzept 3 Persönlich und nahbar – Rückseite",
  defs: `${commonTextStyles()}${paperTexture("grain3b", 0.052)}`,
  content: `
    <rect width="910" height="610" fill="${colors.forestDeep}" filter="url(#grain3b)"/>
    <path d="M626 0h284v610H716c-55-91-70-180-45-266 28-96 13-205-45-344Z" fill="${colors.sage}" opacity="0.19"/>
    <path d="M780 330c76 18 117 71 144 154" fill="none" stroke="${colors.clay}" stroke-width="72" stroke-linecap="round" opacity="0.34"/>
    <text x="88" y="105" class="label" font-size="19" fill="${colors.claySoft}">ONLINE-PSYCHOTHERAPIE</text>
    <text x="88" y="171" class="name" font-size="40" fill="${colors.cream}">Ein geschützter Raum</text>
    <text x="88" y="218" class="name" font-size="40" fill="${colors.cream}">für das, was Sie bewegt.</text>
    <text x="88" y="298" class="copy" font-size="25" fill="${colors.sageSoft}">Einzeltherapie · Paartherapie · Sexualtherapie</text>
    <line x1="88" y1="343" x2="578" y2="343" stroke="${colors.cream}" stroke-width="2" opacity="0.15"/>
    <text x="88" y="404" class="copy-strong" font-size="27" fill="${colors.cream}">${identity.email}</text>
    <text x="88" y="451" class="copy-strong" font-size="27" fill="${colors.cream}">${identity.web}</text>
    <text x="88" y="505" class="copy" font-size="25" fill="${colors.sageSoft}">${xml(identity.region)}</text>
    ${sproutTile({ x: 716, y: 118, size: 104, fill: colors.cream, stroke: colors.forestDeep, radius: 0.5 })}
  `,
});

const designPalette = [
  ["Primary · Forest", colors.forest, "#3F5141", "Vertrauen, Links, Icons"],
  ["Secondary · Sage", colors.sage, "#9CA891", "Ruhe, Natur, Flächen"],
  ["Accent / CTA · Clay", colors.clay, "#BD7850", "Handlung, Wärme"],
  ["Canvas · Cream", colors.cream, "#F6F1E9", "Seitenhintergrund"],
  ["Card · Sand", colors.sand, "#EFE7D8", "Karten & Paneele"],
  ["Band · Sand Deep", colors.sandDeep, "#E6DBC8", "Wechselnde Flächen"],
  ["Heading · Ink", colors.ink, "#322A24", "Überschriften"],
  ["Body · Taupe Ink", colors.taupeInk, "#463B32", "Fließtext"],
  ["Brand Neutral · Taupe", colors.taupe, "#6B5B4D", "Sekundäre Texte"],
  ["Muted · Taupe Soft", colors.taupeSoft, "#8A7868", "Captions & Meta"],
  ["Forest Deep", colors.forestDeep, "#2C3A2F", "Footer, dunkle Bänder"],
  ["Sage Soft", colors.sageSoft, "#C6CFB8", "Helle Akzente"],
  ["Sage Mist", colors.sageMist, "#E4E8DA", "Subtile Flächen"],
  ["Clay Deep", colors.clayDeep, "#A3623E", "Hover & Kicker"],
  ["Clay Soft", colors.claySoft, "#ECD0BB", "Warme Akzentfläche"],
];

function paletteTile([name, value, hex, use], index) {
  const col = index % 5;
  const row = Math.floor(index / 5);
  const x = 76 + col * 333;
  const y = 300 + row * 142;
  const dark = [colors.forest, colors.forestDeep, colors.ink, colors.taupeInk, colors.taupe, colors.clayDeep].includes(value);
  return `
    <g transform="translate(${x} ${y})">
      <rect width="301" height="112" rx="24" fill="${value}" stroke="${dark ? colors.cream : colors.taupeInk}" stroke-opacity="${dark ? 0.08 : 0.12}"/>
      <text x="22" y="36" class="display" font-size="20" font-weight="650" fill="${dark ? colors.cream : colors.ink}">${xml(name)}</text>
      <text x="22" y="67" class="body" font-size="18" font-weight="650" fill="${dark ? colors.sageSoft : colors.taupeInk}">${xml(hex)}</text>
      <text x="22" y="93" class="body" font-size="15" fill="${dark ? colors.cream : colors.taupe}" opacity="${dark ? 0.78 : 1}">${xml(use)}</text>
    </g>`;
}

const designSheet = `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1320" viewBox="0 0 1800 1320" role="img" aria-labelledby="ds-title ds-desc">
  <title id="ds-title">Designsystem Elena Roehrborn</title>
  <desc id="ds-desc">Übersicht über Logo, Farbpalette, Typografie, Radien, Schatten, Abstände und visuelle Prinzipien der Website.</desc>
  <defs>
    <style>${fontCss}
      .section-label { font-family: "Brand Manrope", Manrope, Arial, sans-serif; font-size: 18px; font-weight: 650; letter-spacing: 0.17em; fill: ${colors.clayDeep}; }
      .section-title { font-family: "Brand Manrope", Manrope, Arial, sans-serif; font-size: 34px; font-weight: 650; letter-spacing: -0.015em; fill: ${colors.ink}; }
      .meta { font-family: "Brand Nunito Sans", "Nunito Sans", Arial, sans-serif; font-size: 17px; fill: ${colors.taupe}; }
    </style>
    ${paperTexture("sheet-grain", 0.025)}
    <filter id="soft-shadow" x="-25%" y="-25%" width="150%" height="170%">
      <feDropShadow dx="0" dy="16" stdDeviation="19" flood-color="#392F26" flood-opacity="0.16"/>
    </filter>
  </defs>
  <rect width="1800" height="1320" fill="${colors.cream}" filter="url(#sheet-grain)"/>
  <circle cx="1710" cy="-30" r="300" fill="${colors.sage}" opacity="0.2"/>
  <circle cx="-50" cy="1240" r="250" fill="${colors.clay}" opacity="0.1"/>

  ${sproutTile({ x: 76, y: 62, size: 104 })}
  <text x="214" y="106" class="display" font-size="48" font-weight="680" letter-spacing="-0.02em" fill="${colors.ink}">Designsystem</text>
  <text x="214" y="145" class="body" font-size="22" fill="${colors.taupeInk}">Elena Roehrborn · Online-Psychotherapie</text>
  <text x="1724" y="104" text-anchor="end" class="display" font-size="18" font-weight="650" letter-spacing="0.14em" fill="${colors.forest}">WARM · RUHIG · KLAR</text>
  <text x="1724" y="137" text-anchor="end" class="body" font-size="17" fill="${colors.taupeSoft}">Bestand der Website · Juli 2026</text>
  <line x1="76" y1="196" x2="1724" y2="196" stroke="${colors.taupeInk}" stroke-opacity="0.12"/>

  <text x="76" y="245" class="section-label">01 · FARBSYSTEM</text>
  ${designPalette.map(paletteTile).join("")}

  <line x1="76" y1="746" x2="1724" y2="746" stroke="${colors.taupeInk}" stroke-opacity="0.12"/>
  <text x="76" y="798" class="section-label">02 · TYPOGRAFIE</text>
  <text x="76" y="861" class="display" font-size="48" font-weight="650" letter-spacing="-0.015em" fill="${colors.ink}">Manrope Variable</text>
  <text x="76" y="899" class="meta">Display · Headlines · UI · Gewicht 600 (variabel 200–800)</text>
  <text x="76" y="960" class="display" font-size="31" font-weight="650" fill="${colors.forest}">Ein geschützter Raum für Veränderung.</text>
  <text x="76" y="1027" class="body" font-size="39" font-weight="500" fill="${colors.ink}">Nunito Sans Variable</text>
  <text x="76" y="1065" class="meta">Fließtext · Formulare · Hinweise · Gewicht 400 (variabel 200–1000)</text>
  <text x="76" y="1117" class="body" font-size="24" fill="${colors.taupeInk}">Einfühlsame, professionelle Begleitung – klar, nahbar und vertraulich.</text>
  <text x="76" y="1173" class="display" font-size="16" font-weight="650" letter-spacing="0.16em" fill="${colors.clayDeep}">EYEBROW · MANROPE 600 · 12.5 PX · +0.16 EM · VERSALIEN</text>
  <text x="76" y="1213" class="body" font-size="16" fill="${colors.taupe}">Skala: Hero 54.4 · H1 48 · H2 36 · H3 24 · Lead 18 · Body 16 · Small 14 px</text>

  <g transform="translate(1018 790)">
    <text x="0" y="8" class="section-label">03 · FORM &amp; SYSTEM</text>
    <rect x="0" y="48" width="706" height="353" rx="32" fill="${colors.sand}" stroke="${colors.taupeInk}" stroke-opacity="0.08" filter="url(#soft-shadow)"/>
    <text x="36" y="94" class="display" font-size="22" font-weight="650" fill="${colors.ink}">Typische Radien</text>
    <rect x="36" y="122" width="74" height="58" rx="12" fill="${colors.sageMist}"/>
    <text x="73" y="209" text-anchor="middle" class="body" font-size="15" fill="${colors.taupe}">12 px</text>
    <rect x="137" y="122" width="74" height="58" rx="16" fill="${colors.sageSoft}"/>
    <text x="174" y="209" text-anchor="middle" class="body" font-size="15" fill="${colors.taupe}">16 px</text>
    <rect x="238" y="122" width="92" height="58" rx="32" fill="${colors.sage}"/>
    <text x="284" y="209" text-anchor="middle" class="body" font-size="15" fill="${colors.taupe}">32 px</text>
    <rect x="357" y="122" width="110" height="58" rx="29" fill="${colors.forest}"/>
    <text x="412" y="209" text-anchor="middle" class="body" font-size="15" fill="${colors.taupe}">Pill</text>

    <rect x="36" y="246" width="190" height="58" rx="29" fill="${colors.clay}"/>
    <text x="131" y="282" text-anchor="middle" class="display" font-size="16" font-weight="650" fill="#FFFFFF">Primärer CTA</text>
    <rect x="244" y="246" width="184" height="58" rx="29" fill="${colors.forest}"/>
    <text x="336" y="282" text-anchor="middle" class="display" font-size="16" font-weight="650" fill="${colors.cream}">Forest CTA</text>
    <rect x="446" y="246" width="208" height="58" rx="29" fill="none" stroke="${colors.forest}" stroke-opacity="0.45" stroke-width="2"/>
    <text x="550" y="282" text-anchor="middle" class="display" font-size="16" font-weight="650" fill="${colors.forest}">Sekundäre Aktion</text>

    <text x="36" y="352" class="body" font-size="18" fill="${colors.taupeInk}">4-px-Basis · 1200 px Inhaltsbreite · weiche, diffuse Schatten</text>
    <text x="36" y="383" class="body" font-size="18" fill="${colors.taupeInk}">Icons: 1.6 px Strich · runde Enden · Spross als Signaturmotiv</text>
  </g>

  <line x1="76" y1="1247" x2="1724" y2="1247" stroke="${colors.taupeInk}" stroke-opacity="0.12"/>
  <text x="76" y="1284" class="body" font-size="16" fill="${colors.taupeSoft}">Kontraststarke Kernpaare: Ink / Cream 12.52:1 · Forest / Cream 7.58:1 · Taupe Ink / Cream 9.67:1</text>
  <text x="1724" y="1284" text-anchor="end" class="body" font-size="16" fill="${colors.taupeSoft}">Bildsprache: warmes Licht · natürliche Räume · Pflanzen · organische Flächen</text>
</svg>`;

const brandMark = `<svg xmlns="http://www.w3.org/2000/svg" width="64mm" height="64mm" viewBox="0 0 640 640" role="img" aria-labelledby="logo-title logo-desc">
  <title id="logo-title">Spross-Marke Elena Roehrborn</title>
  <desc id="logo-desc">Cremefarbener Spross auf einem waldgrünen, weich gerundeten Quadrat.</desc>
  <rect width="640" height="640" rx="180" fill="${colors.forest}"/>
  ${leafMark({ x: 130, y: 105, size: 380, stroke: colors.cream, strokeWidth: 1.75 })}
</svg>`;

const brandLockup = `<svg xmlns="http://www.w3.org/2000/svg" width="180mm" height="44mm" viewBox="0 0 1800 440" role="img" aria-labelledby="lockup-title lockup-desc">
  <title id="lockup-title">Logo Elena Roehrborn</title>
  <desc id="lockup-desc">Spross-Marke mit Name und Unterzeile Psychotherapie Online.</desc>
  <defs><style>${fontCss}</style></defs>
  ${sproutTile({ x: 24, y: 24, size: 392 })}
  <text x="490" y="205" class="display" font-size="124" font-weight="680" letter-spacing="-0.025em" fill="${colors.ink}">${identity.name}</text>
  <text x="496" y="292" class="display" font-size="43" font-weight="650" letter-spacing="0.18em" fill="${colors.taupeSoft}">PSYCHOTHERAPIE · ONLINE</text>
</svg>`;

const files = [
  [path.join(brandDir, "design-system-overview.svg"), designSheet, 1800, 1320],
  [path.join(logoDir, "sprout-mark.svg"), brandMark, 640, 640],
  [path.join(logoDir, "logo-lockup-horizontal.svg"), brandLockup, 1800, 440],
  [path.join(cardsDir, "concept-01-ruhe-klarheit-front.svg"), concept1Front, 1820, 1220],
  [path.join(cardsDir, "concept-01-ruhe-klarheit-back.svg"), concept1Back, 1820, 1220],
  [path.join(cardsDir, "concept-02-geschuetzter-raum-front.svg"), concept2Front, 1220, 1820],
  [path.join(cardsDir, "concept-02-geschuetzter-raum-back.svg"), concept2Back, 1220, 1820],
  [path.join(cardsDir, "concept-03-persoenlich-nahbar-front.svg"), concept3Front, 1820, 1220],
  [path.join(cardsDir, "concept-03-persoenlich-nahbar-back.svg"), concept3Back, 1820, 1220],
];

for (const [svgPath, svg, pngWidth, pngHeight] of files) {
  await writeFile(svgPath, svg, "utf8");
  const pngPath = svgPath.replace(/\.svg$/, ".png");
  await sharp(Buffer.from(svg))
    .resize(pngWidth, pngHeight, { fit: "fill" })
    .png({ compressionLevel: 9, palette: false })
    .toFile(pngPath);
}

const cardPngs = {
  c1f: path.join(cardsDir, "concept-01-ruhe-klarheit-front.png"),
  c1b: path.join(cardsDir, "concept-01-ruhe-klarheit-back.png"),
  c2f: path.join(cardsDir, "concept-02-geschuetzter-raum-front.png"),
  c2b: path.join(cardsDir, "concept-02-geschuetzter-raum-back.png"),
  c3f: path.join(cardsDir, "concept-03-persoenlich-nahbar-front.png"),
  c3b: path.join(cardsDir, "concept-03-persoenlich-nahbar-back.png"),
};

function previewLabel(width, title, subtitle) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="120" viewBox="0 0 ${width} 120">
    <defs><style>${fontCss}</style></defs>
    <text x="0" y="42" class="display" font-size="34" font-weight="680" fill="${colors.ink}">${xml(title)}</text>
    <text x="0" y="79" class="body" font-size="21" fill="${colors.taupe}">${xml(subtitle)}</text>
  </svg>`);
}

async function makePairPreview({ output, title, subtitle, front, back, portrait = false }) {
  const width = portrait ? 1500 : 2000;
  const height = portrait ? 1180 : 900;
  const background = { r: 239, g: 231, b: 216, alpha: 1 };
  const cardWidth = portrait ? 520 : 860;
  const cardHeight = portrait ? 776 : 576;
  const left = portrait ? 160 : 75;
  const right = portrait ? 820 : 1065;
  const top = portrait ? 260 : 220;
  const [frontBuffer, backBuffer] = await Promise.all([
    sharp(front).resize(cardWidth, cardHeight).png().toBuffer(),
    sharp(back).resize(cardWidth, cardHeight).png().toBuffer(),
  ]);
  const label = previewLabel(width - 150, title, subtitle);
  await sharp({ create: { width, height, channels: 4, background } })
    .composite([
      { input: label, left: 75, top: 62 },
      { input: frontBuffer, left, top },
      { input: backBuffer, left: right, top },
    ])
    .png({ compressionLevel: 9 })
    .toFile(output);
}

await Promise.all([
  makePairPreview({
    output: path.join(cardsDir, "concept-01-ruhe-klarheit-preview.png"),
    title: "01 · Ruhe & Klarheit",
    subtitle: "Minimalistisch · zeitlos · Vorder- und Rückseite",
    front: cardPngs.c1f,
    back: cardPngs.c1b,
  }),
  makePairPreview({
    output: path.join(cardsDir, "concept-02-geschuetzter-raum-preview.png"),
    title: "02 · Geschützter Raum",
    subtitle: "Organisch · editorial · Vorder- und Rückseite im Hochformat",
    front: cardPngs.c2f,
    back: cardPngs.c2b,
    portrait: true,
  }),
  makePairPreview({
    output: path.join(cardsDir, "concept-03-persoenlich-nahbar-preview.png"),
    title: "03 · Persönlich & nahbar",
    subtitle: "Porträtbasiert · warm · Vorder- und Rückseite",
    front: cardPngs.c3f,
    back: cardPngs.c3b,
  }),
]);

const overviewWidth = 2000;
const overviewHeight = 2470;
const overviewBg = { r: 246, g: 241, b: 233, alpha: 1 };
const [c1fSmall, c1bSmall, c2fSmall, c2bSmall, c3fSmall, c3bSmall] = await Promise.all([
  sharp(cardPngs.c1f).resize(820, 550).png().toBuffer(),
  sharp(cardPngs.c1b).resize(820, 550).png().toBuffer(),
  sharp(cardPngs.c2f).resize(440, 657).png().toBuffer(),
  sharp(cardPngs.c2b).resize(440, 657).png().toBuffer(),
  sharp(cardPngs.c3f).resize(820, 550).png().toBuffer(),
  sharp(cardPngs.c3b).resize(820, 550).png().toBuffer(),
]);
const overviewLabels = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2470" viewBox="0 0 2000 2470">
  <defs><style>${fontCss}</style></defs>
  <text x="90" y="92" class="display" font-size="48" font-weight="680" fill="${colors.ink}">Drei Visitenkarten-Richtungen</text>
  <text x="90" y="138" class="body" font-size="24" fill="${colors.taupe}">Elena Roehrborn · Vorder- und Rückseite · 85 × 55 mm plus 3 mm Beschnitt</text>
  <text x="90" y="224" class="display" font-size="28" font-weight="650" fill="${colors.forest}">01 · Ruhe &amp; Klarheit</text>
  <text x="90" y="879" class="display" font-size="28" font-weight="650" fill="${colors.forest}">02 · Geschützter Raum</text>
  <text x="90" y="1660" class="display" font-size="28" font-weight="650" fill="${colors.forest}">03 · Persönlich &amp; nahbar</text>
  <text x="90" y="2410" class="body" font-size="20" fill="${colors.taupeSoft}">Die PNG-Dateien dienen als Vorschau. Für Produktion und Anpassungen die eingebetteten SVG-Quellen verwenden.</text>
</svg>`);

await sharp({
  create: { width: overviewWidth, height: overviewHeight, channels: 4, background: overviewBg },
})
  .composite([
    { input: overviewLabels, left: 0, top: 0 },
    { input: c1fSmall, left: 90, top: 270 },
    { input: c1bSmall, left: 1090, top: 270 },
    { input: c2fSmall, left: 405, top: 935 },
    { input: c2bSmall, left: 1155, top: 935 },
    { input: c3fSmall, left: 90, top: 1710 },
    { input: c3bSmall, left: 1090, top: 1710 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(cardsDir, "business-cards-overview.png"));

console.log(`Generated ${files.length} SVG sources, ${files.length} PNG renders, and 4 card previews in ${brandDir}`);
