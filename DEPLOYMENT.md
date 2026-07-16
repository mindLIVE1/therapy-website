# Roadmap & To-dos bis zum Launch

Stand: 29.06.2026 · Diese Liste ist die Arbeitsgrundlage bis zum Go-Live.
Abgehakt = erledigt. Reihenfolge ist eine Empfehlung, keine Pflicht.

---

## Phase 1 — Inhalte & Platzhalter füllen

- [ ] **Domain** eintragen in `astro.config.mjs` (`SITE`), `src/data/site.ts` (`url`) und `public/robots.txt`
- [x] **E-Mail-Adresse** in `src/data/site.ts` prüfen/bestätigen
- [ ] **Honorar-Preise** in `src/pages/honorar.astro` (aktuell `00 €`) durch echte Sätze ersetzen
- [ ] Texte gegenlesen (Tonalität, Anrede, evtl. Telefonnummer ergänzen in `src/data/site.ts`)
- [x] Porträtfoto von Elena einsetzen (Hero, Über-mich, Teaser)
- [ ] Weitere Fotos einsetzen (Detailaufnahmen, „ruhiger Moment“) — siehe verbleibende `<ImagePlaceholder>` in den Seiten
- [x] Eigenes OG-Share-Bild unter `public/og-image-v3.jpg` hinterlegt

## Phase 2 — Funktionen anbinden

- [x] **Kontaktformular** über den eigenen ALL-INKL-Webspace und die beiden
      Domain-Postfächer versenden; es wird kein externer Formulardienst genutzt.
- [ ] **Buchungslink** setzen: `bookingUrl` in `src/data/site.ts`
      (z. B. Calendly, Doctolib, eTermin). Aktuell springt der Button zum Kontaktformular (`#termin`).
- [ ] Produktionstest: Anfrage kommt im `info`-Postfach an und neutrale
      Eingangsbestätigung erreicht die Absenderadresse
- [ ] Organisatorischen Löschprozess im `info`-Postfach festlegen: Anfragen ohne
      Zusammenarbeit einen Monat nach Abschluss der Kommunikation löschen
- [ ] **Video-Tool** festlegen (z. B. RED medical, sprechstunde.online, Doxy.me — DSGVO-/Heilberufe-konform) und im Datenschutz benennen

## Phase 3 — Recht & Datenschutz (vor Veröffentlichung zwingend)

- [ ] **Impressum** vollständig ausfüllen (`src/pages/impressum.astro`): Anschrift, Aufsichtsbehörde/Gesundheitsamt, ggf. USt-IdNr.
- [ ] **Datenschutzerklärung** abschließend prüfen (`src/pages/datenschutz.astro`):
      Hoster und Formular sind eingetragen; der tatsächliche Video-Dienst fehlt noch
- [ ] Vertrag zur Auftragsverarbeitung mit ALL-INKL im Kundenbereich prüfen und
      für die Datenschutzdokumentation ablegen
- [ ] Beides **juristisch prüfen lassen** (die Vorlagen sind keine Rechtsberatung)
- [ ] Prüfen, ob ein Cookie-/Consent-Banner nötig ist
      → aktuell **nicht** nötig: keine Cookies, kein Tracking, Schriften selbst gehostet. Bleibt so, solange keine externen Skripte hinzukommen.

## Phase 4 — Qualität & SEO

- [ ] `npm run build` läuft fehlerfrei (CI-tauglich)
- [ ] Lighthouse / PageSpeed prüfen (Performance, A11y, SEO, Best Practices)
- [ ] Alle Links & CTAs klicken (intern + Buchung + E-Mail)
- [ ] Darstellung auf echtem Smartphone testen
- [ ] `og-image` mit Sharing-Debugger prüfen (z. B. opengraph.xyz)
- [ ] Favicon/Touch-Icons final
- [ ] Nach Launch: Google Search Console einrichten + `sitemap-index.xml` einreichen
- [ ] Google Business Profil / relevante Therapeut:innen-Verzeichnisse (optional, fürs Gefundenwerden)

## Phase 5 — Deployment / Hosting

- [x] Git-Repository auf GitHub angelegt
- [x] ALL-INKL Privat+ als Hosting gewählt
- [x] GitHub-Workflow für Build und FTPS-Deployment angelegt
- [x] GitHub-Secrets `FTP_SERVER`, `FTP_USERNAME` und `FTP_PASSWORD` eintragen
- [ ] In KAS prüfen, dass `elena-roehrborn.de` auf das Verzeichnis
      `/elena-roehrborn.de/` zeigt
- [ ] Ersten Workflow manuell starten und Ergebnis auf der Domain prüfen
- [ ] Domain verbinden + **HTTPS/SSL** aktivieren (i. d. R. automatisch)
- [ ] `www`- und Nicht-`www`-Variante auf eine Form weiterleiten (Canonical)
- [ ] 404-Seite greift (ist vorhanden: `src/pages/404.astro`)

### Automatisches Deployment zu ALL-INKL

Der Workflow `.github/workflows/deploy.yml` wird bei jedem Push auf `main`
ausgeführt. Er installiert die festgeschriebenen Node- und PHP-Abhängigkeiten,
führt die Backend-Tests aus, baut die Astro-Seite und synchronisiert Website und
Formular-Backend per verschlüsseltem FTPS zu ALL-INKL.

#### 1. FTP-Ziel bei ALL-INKL prüfen

Im KAS unter `Domain` die Domain `elena-roehrborn.de` bearbeiten und prüfen,
dass ihr Ziel das Verzeichnis `/elena-roehrborn.de/` ist. Das entspricht dem
gleichnamigen Ordner in WebFTP. Der Account-Stamm mit `cgi-bin` und der
ALL-INKL-Datei `index.htm` ist nicht das Deployment-Ziel.

#### 2. GitHub-Secrets anlegen

Im GitHub-Repository zu `Settings` -> `Secrets and variables` -> `Actions`
gehen und unter `Repository secrets` diese Secrets anlegen:

| Secret | Wert |
| --- | --- |
| `FTP_SERVER` | ALL-INKL-FTP-Server, normalerweise `<KAS-Login>.kasserver.com` |
| `FTP_USERNAME` | Benutzername des FTP-Zugangs |
| `FTP_PASSWORD` | Passwort des FTP-Zugangs |
| `SMTP_FORM_PASSWORD` | Passwort des Formular-Postfachs |
| `SMTP_INFO_PASSWORD` | Passwort des Praxispostfachs |

Keine Zugangsdaten in Dateien, Commits oder Workflow-Text eintragen. Der
FTP-Benutzer muss auf den Account-Stamm zugreifen können. Der Workflow legt
dort `/private/form-backend/` als nicht öffentliches Geschwisterverzeichnis des
Domain-Webroots an. Der öffentliche Webroot bleibt `/elena-roehrborn.de/`.
Ein FTP-Benutzer, der auf den Domainordner eingeschränkt ist, reicht für diese
Struktur nicht aus.

#### 2.1 Nicht geheime Deployment-Variablen

Im selben Bereich unter `Repository variables` können diese Werte angepasst
werden. Sie sind keine Secrets: E-Mail-Adressen und Absendername erscheinen
absichtlich auf der Website beziehungsweise in versendeten E-Mails.

| Variable | Voreinstellung | Zweck |
| --- | --- | --- |
| `CONTACT_INFO_EMAIL` | `info@elena-roehrborn.de` | Öffentliches Praxispostfach, Empfänger der Anfrage und Absender der Bestätigung |
| `CONTACT_FORM_EMAIL` | `formular@elena-roehrborn.de` | SMTP-Absender der internen Formularnachricht |
| `CONTACT_SENDER_NAME` | `Elena Roehrborn Onlinetherapie` | Sichtbarer Absendername beider E-Mails |
| `CONTACT_RECIPIENT_NAME` | `Elena Roehrborn` | Anzeigename des internen Empfängers |
| `CONTACT_REPLY_WITHIN` | `innerhalb von zwei Werktagen` | Antwortzeit in der Eingangsbestätigung |
| `SMTP_HOST` | `w021d308.kasserver.com` | SMTP-Server von ALL-INKL |
| `CONTACT_FORM_ENABLED` | folgt dem Bearbeitungsmodus | Optionale separate Freigabe des PHP-Endpunkts, insbesondere für Tests |
| `ENABLE_DEV_ROUTES` | `false` | Interne QA-Seiten in einem Vorschau-Build mitbauen; in Produktion immer `false` lassen |

Wenn eine Postfachadresse geändert wird, muss das entsprechende Postfach bei
ALL-INKL existieren und das zugehörige Passwort weiterhin im passenden Secret
`SMTP_FORM_PASSWORD` beziehungsweise `SMTP_INFO_PASSWORD` liegen. Eine Änderung
an Variables oder Secrets wird erst mit einem neuen Deployment wirksam.

#### 3. Ersten Deploy starten

Zuerst die Secrets anlegen, danach den Workflow committen und auf `main`
pushen. Alternativ kann er in GitHub unter `Actions` ->
`Deploy website to ALL-INKL` -> `Run workflow` manuell gestartet werden.

Der erste Lauf lädt die vollständige Seite hoch. Spätere Läufe übertragen nur
Änderungen und entfernen Dateien im Domainverzeichnis, die nicht mehr im Build
enthalten sind. Das von ALL-INKL beziehungsweise Let's Encrypt verwendete
Verzeichnis `.well-known` ist davon ausgenommen. Manuelle Uploads deshalb nicht
im Domainverzeichnis, sondern in einem separaten Ordner ablegen.

Die SMTP-Passwörter werden nicht in den Astro-Build eingebettet. GitHub Actions
erzeugt daraus eine PHP-Konfiguration, lädt sie mit Dateirechten `0600` nach
`/private/form-backend/config.php` und veröffentlicht ausschließlich den kleinen
Endpunkt `/api/contact.php`. Im Bearbeitungsmodus ist auch dieser Endpunkt
standardmäßig deaktiviert.

Es müssen keine PHP-Dateien manuell in WebFTP angelegt werden. Der Workflow
erstellt und aktualisiert automatisch diese Struktur:

```text
/elena-roehrborn.de/api/contact.php        öffentlich erreichbarer Endpunkt
/private/form-backend/config.php           private Konfiguration mit SMTP-Passwörtern
/private/form-backend/server/contact/src/  PHP-Anwendungslogik
/private/form-backend/vendor/              PHPMailer und Composer-Autoloader
```

Die Konfiguration liegt außerhalb des Domain-Webroots und ist daher nicht über
eine Website-URL abrufbar. `0600` beschränkt den Dateizugriff zusätzlich auf den
Account-Benutzer. Die Passwörter müssen für die SMTP-Anmeldung zur Laufzeit im
Klartext lesbar sein; die Base64-Darstellung in der PHP-Datei ist keine
Verschlüsselung. Geschützt werden sie durch GitHub Secrets, verschlüsseltes
FTPS, den privaten Speicherort und die Dateirechte. Wer vollständigen Zugriff
auf den ALL-INKL-Account oder den GitHub-Actions-Workflow erlangt, könnte sie
trotzdem auslesen; deshalb gehören dort starke, nur für diese Postfächer
verwendete Passwörter hinein.

Im ALL-INKL-KAS für die Domain eine unterstützte PHP-Version ab 8.1 auswählen;
empfohlen ist PHP 8.3 oder neuer. Für das Formular werden keine Datenbank und
keine KAS-Umgebungsvariablen benötigt.

### Bearbeitungsmodus

Die Build-Variable `PUBLIC_SITE_IN_PROGRESS` steuert die bildschirmfüllende
Wartungsansicht. Im Bearbeitungsmodus werden Navigation, Seiteninhalt, Formulare
und Links nicht ausgegeben. Alle Seiten erhalten zusätzlich `noindex, nofollow`.

Die Variable im GitHub-Repository unter `Settings` -> `Secrets and variables`
-> `Actions` -> `Variables` als Repository-Variable anlegen:

| Wert | Verhalten |
| --- | --- |
| `true` | Wartungsansicht aktiv, Website nicht bedienbar, Indexierung deaktiviert |
| `false` | Vollständige Website aktiv, normale Indexierung aktiviert |

Solange die Variable nicht existiert, baut der Deployment-Workflow die Website
vorsichtshalber mit dem Wert `true`. Eine Änderung der Variable startet keinen
Build. Danach unter `Actions` -> `Deploy website to ALL-INKL` den Workflow über
`Run workflow` neu ausführen.

### Interne QA-Seiten

Die interne Icon-Übersicht unter `/icon-qa/` ist bei `npm run dev` lokal
verfügbar. Normale Produktions-Builds erzeugen diese Route nicht; sie erscheint
daher weder auf dem Webspace noch in der Sitemap. Nur für einen bewusst
geteilten Vorschau-Build kann `ENABLE_DEV_ROUTES=true` gesetzt werden. Die
Variable bleibt beim regulären ALL-INKL-Deployment `false`.

### Formular testen, während die Wartungsseite aktiv bleibt

Für einen echten SMTP-Test kann die Wartungsseite aktiv bleiben:

1. `PUBLIC_SITE_IN_PROGRESS=true` belassen.
2. Repository-Variable `CONTACT_FORM_ENABLED=true` setzen.
3. Den Deployment-Workflow manuell ausführen.
4. Den folgenden Befehl lokal ausführen und `DEINE-TESTADRESSE` ersetzen:

```bash
curl 'https://elena-roehrborn.de/api/contact.php' \
  --request POST \
  --header 'Origin: https://elena-roehrborn.de' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Technischer Test","email":"DEINE-TESTADRESSE","phone":"","topic":"unsicher","message":"Test des Kontaktformulars","consent":true,"website":""}'
```

Erwartet wird `{"success":true,"confirmationSent":true}`. Danach müssen eine
interne Formularnachricht im `info`-Postfach und eine Eingangsbestätigung an der
Testadresse angekommen sein. Anschließend `CONTACT_FORM_ENABLED` wieder löschen
und erneut deployen. Ohne diese Override-Variable folgt der Endpunkt automatisch
dem Bearbeitungsmodus und liefert bei aktiver Wartungsseite wieder HTTP 503.

Der `curl`-Test prüft den kompletten PHP-, SMTP- und Bestätigungsfluss. Die
Animation und Bedienung des Formulars werden beim endgültigen Abschalten der
Wartungsseite zusätzlich direkt im Browser getestet.

Für die lokale Entwicklung kann derselbe Wert in einer nicht eingecheckten
`.env`-Datei gesetzt werden; `.env.example` dient als Vorlage.

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
