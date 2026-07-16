# Info-Postfach in Apple Mail einrichten

Diese Anleitung gilt für das Postfach `info@elena-roehrborn.de` bei ALL-INKL.
Das Passwort wird nicht in diesem Repository hinterlegt. Verwenden Sie das
Passwort, das im KAS beim Anlegen dieses E-Mail-Postfachs vergeben wurde.

## Zugangsdaten auf einen Blick

| Einstellung | Wert |
| --- | --- |
| Anzeigename | Elena Roehrborn Onlinetherapie |
| E-Mail-Adresse | `info@elena-roehrborn.de` |
| Benutzername | `info@elena-roehrborn.de` |
| Kontotyp | IMAP |
| Server für eintreffende E-Mails | `w021d308.kasserver.com` |
| IMAP-Port | `993` |
| Server für ausgehende E-Mails | `w021d308.kasserver.com` |
| SMTP-Port | `465` |
| Verschlüsselung | SSL/TLS aktiviert |
| Authentifizierung | Passwort |

Wichtig: Als Benutzername immer die vollständige E-Mail-Adresse verwenden.
Das Postfach-Passwort ist nicht das KAS-, FTP- oder GitHub-Passwort.

## iPhone oder iPad

Die Bezeichnungen können je nach iOS-Version geringfügig abweichen.

1. **Einstellungen** öffnen.
2. **Apps** > **Mail** > **Mail-Accounts** > **Account hinzufügen** wählen.
3. **Anderen Account hinzufügen** und danach **Mail-Account** wählen.
4. Folgende Daten eintragen:
   - Name: `Elena Roehrborn Onlinetherapie`
   - E-Mail: `info@elena-roehrborn.de`
   - Passwort: Passwort des info-Postfachs
   - Beschreibung: zum Beispiel `Praxis E-Mail`
5. **Weiter** wählen und oben **IMAP** aktivieren.
6. Unter **Server für eintreffende E-Mails** eintragen:
   - Hostname: `w021d308.kasserver.com`
   - Benutzername: `info@elena-roehrborn.de`
   - Passwort: Passwort des info-Postfachs
7. Unter **Server für ausgehende E-Mails** dieselben Angaben eintragen:
   - Hostname: `w021d308.kasserver.com`
   - Benutzername: `info@elena-roehrborn.de`
   - Passwort: Passwort des info-Postfachs
8. **Weiter** und anschließend **Sichern** wählen. **Mail** muss aktiviert
   bleiben.

Auch wenn iOS Benutzername und Passwort beim SMTP-Server als optional
bezeichnet, müssen beide Felder ausgefüllt werden.

### Ports auf iPhone oder iPad kontrollieren

Falls das Senden oder Empfangen nicht funktioniert:

1. **Einstellungen** > **Apps** > **Mail** > **Mail-Accounts** >
   **Praxis E-Mail** > **Account** öffnen.
2. Unter **Erweitert** prüfen:
   - SSL verwenden: aktiviert
   - Authentifizierung: Passwort
   - Server-Port: `993`
3. Unter **SMTP** > **Primärer Server** prüfen:
   - Server: aktiviert
   - SSL verwenden: aktiviert
   - Authentifizierung: Passwort
   - Server-Port: `465`

## MacBook

1. Die App **Mail** öffnen.
2. In der Menüleiste **Mail** > **Account hinzufügen** wählen.
3. **Anderer Mail-Account** markieren und **Fortfahren** wählen.
4. Folgende Daten eingeben:
   - Name: `Elena Roehrborn Onlinetherapie`
   - E-Mail-Adresse: `info@elena-roehrborn.de`
   - Passwort: Passwort des info-Postfachs
5. Falls Mail die Einstellungen nicht automatisch findet, **IMAP** wählen
   und beide Server mit `w021d308.kasserver.com` eintragen.
6. Als Benutzername für den Eingangs- und Ausgangsserver jeweils
   `info@elena-roehrborn.de` eintragen.
7. Die Einrichtung abschließen und **Mail** für diesen Account aktivieren.

Alternativ lässt sich der Account über **Systemeinstellungen** >
**Internetaccounts** > **Account hinzufügen** > **Anderen Account
hinzufügen** > **Mail-Account** anlegen.

### Ports auf dem Mac kontrollieren

1. In Mail **Mail** > **Einstellungen** > **Accounts** öffnen.
2. Das Konto `Praxis E-Mail` wählen und **Servereinstellungen** öffnen.
3. Falls notwendig, **Verbindungseinstellungen automatisch verwalten**
   deaktivieren und prüfen:
   - Eingangsserver: IMAP, Port `993`, TLS/SSL aktiviert
   - Ausgangsserver: SMTP, Port `465`, TLS/SSL aktiviert
   - Benutzername bei beiden Servern: `info@elena-roehrborn.de`
   - Authentifizierung bei beiden Servern: Passwort

## Funktionstest

Nach der Einrichtung sollten diese Punkte getestet werden:

1. Von einer anderen Adresse eine E-Mail an `info@elena-roehrborn.de` senden.
2. Aus Apple Mail eine Antwort an die externe Adresse senden.
3. Prüfen, ob die gesendete Nachricht auf beiden Geräten im Ordner
   **Gesendet** erscheint.
4. Prüfen, ob als Absender `Elena Roehrborn Onlinetherapie` und
   `info@elena-roehrborn.de` angezeigt werden.
5. Eine Nachricht auf einem Gerät als gelesen markieren und kontrollieren,
   ob der Status auf dem anderen Gerät synchronisiert wird.

## Fehlerbehebung

- **Passwort wird abgelehnt:** Das Passwort des E-Mail-Postfachs verwenden,
  nicht das Passwort für KAS, FTP oder GitHub. Ein geändertes Passwort muss
  beim Eingangs- und Ausgangsserver auf allen Geräten aktualisiert werden.
- **Empfang funktioniert, Versand nicht:** Beim SMTP-Server Benutzername und
  Passwort eintragen und Port `465` mit SSL/TLS prüfen.
- **Zertifikatswarnung:** Keine Ausnahme bestätigen. Der Servername muss exakt
  `w021d308.kasserver.com` lauten.
- **Ordner werden nur lokal gespeichert:** Unter **Postfach-Verhalten** die
  Ordner für Entwürfe, Gesendet, Papierkorb und Spam den entsprechenden
  Serverordnern zuordnen.
- **Keine sofortige Zustellung auf iPhone/iPad:** IMAP unterstützt nicht bei
  jedem Anbieter Push. Unter **Einstellungen** > **Apps** > **Mail** >
  **Mail-Accounts** > **Datenabgleich** kann ein Abrufintervall eingestellt
  werden.

## Sicherheit und Datenschutz

- IMAP statt POP verwenden, damit Nachrichten und Ordner zwischen den
  Geräten synchron bleiben.
- iPhone/iPad mit Code und Face ID oder Touch ID sichern; auf dem Mac FileVault
  und ein Benutzerpasswort aktivieren.
- Das Passwort nicht per E-Mail oder Screenshot weitergeben.
- Für Apple Mail wird nur das Hauptpostfach `info@elena-roehrborn.de`
  benötigt. Das technische Postfach `formular@elena-roehrborn.de` muss nicht
  auf den Geräten eingerichtet werden.

## Offizielle Anleitungen

- [Apple: E-Mail-Account auf iPhone oder iPad hinzufügen](https://support.apple.com/de-de/102619)
- [Apple: E-Mail-Account auf dem Mac hinzufügen](https://support.apple.com/de-de/guide/mail/mail35803/mac)
- [ALL-INKL: E-Mail-Konto in macOS Mail einrichten](https://all-inkl.com/wichtig/anleitungen/programme/e-mail/macos-mail/e-mail-konto-einrichten_294.html)
- [ALL-INKL: E-Mail-Konto und Serverdaten](https://all-inkl.com/wichtig/anleitungen/providerwechsel/einrichtung/e-mail/e-mail-konto-anlegen_98.html)
