# Philadelphia International Ministry

Diese Version enthält ein rechtes Dropdown-Menü ohne Nummerierung, vier Sprachversionen und einen Browser-Editor für Seiteninhalte, Bilder und Kontaktdaten. Die einmalige Online-Einrichtung ist in `EDITOR-EINRICHTEN.md` beschrieben.

## Website in VS Code ansehen

Den Ordner `philadelphia` in VS Code öffnen. Im Terminal:

```sh
npm ci
npm run dev
```

`npm run dev` startet jetzt Website und lokalen Editor gemeinsam. Website: `http://127.0.0.1:5173/`; Editor: `http://127.0.0.1:5173/admin/`. Das Terminal während der Vorschau laufen lassen; mit Ctrl+C beide Dienste stoppen. Node.js 22.12 oder neuer verwenden. Der Befehl `npm run dev:static --workspace web` startet weiterhin nur die Website.

## Menü und Seiten

Das Menü liegt oben rechts. Mit der Maus öffnet es sich beim Darüberfahren; auf Touch-Geräten durch Antippen. Unterpunkte werden beim Darüberfahren über den jeweiligen Seitenbereich oder durch Antippen des Pfeils aufgeklappt. Die Seitentitel führen zur Seite, die Unterpunkte direkt zum entsprechenden Abschnitt. Escape schließt das Menü. Die Pfeiltaste nach unten öffnet es über die Tastatur; mit Tab werden die Links erreicht. Die dekorativen Menü-, Seiten- und Abschnittsnummern sind entfernt, auch in der Editor-Vorschau.

Die neun Bereiche folgen dem gewünschten Gerüst:

1. Startseite: Vorstellung, Vision, aktuelle Projekte, Bilder, Mehr erfahren / Mitmachen.
2. Über uns: Geschichte, Vision und Ziele, Glaubensgrundlagen, Team / Leitung.
3. Unsere Arbeit: Evangelisation, Flüchtlingsarbeit, Camp-Besuche, praktische Hilfe, Sprachkurse, Jüngerschaft, Freizeit und Gemeinschaft, Camps und Veranstaltungen.
4. Philadelphia Bayt: Erklärung, Ziel und Konzept, Leben im Haus, Begleitung und Jüngerschaft, Unterstützung der Bewohner.
5. Lebensgeschichten: persönliche Geschichten, Bewohnerzeugnisse, Maluk und Sunday.
6. Aktuelles: Missionsberichte, Veranstaltungen, Sommercamps, Neuigkeiten, Gebetsanliegen.
7. Mitmachen: Gebet, Spenden, praktische Unterstützung, Mitarbeit und Missionseinsatz.
8. Kontakt: Kontaktwege, Adresse, Google Maps / Anfahrt, Social Media.
9. Rechtliches: Impressum und Datenschutz, jeweils mit eigener Seite.

## Sprachen

Der Sprachumschalter links bietet Englisch, Deutsch, Griechisch und Arabisch. Alle sichtbaren Navigationstexte, Überschriften, Beschreibungstexte, Hinweise, Formularbeschriftungen und die Fehlerseite sind übersetzt. Die URLs verwenden `/en`, `/de`, `/el` und `/ar`; beim Sprachwechsel bleiben Seite und Abschnitt erhalten. Arabisch hat Rechts-nach-links-Leserichtung. Das Hauptmenü bleibt physisch rechts. Die Auswahl wird lokal im Browser gespeichert, soweit Browserspeicher verfügbar ist.

Originaldokumente aus dem Export bleiben in ihrer ursprünglichen Sprache. Offizielle Eigennamen und die Anschrift werden beibehalten. Griechische und arabische Textentwürfe sollten vor Veröffentlichung von sprachkundigen Gemeindemitgliedern geprüft werden.

## Inhalte im Browser ändern

Der neue Bearbeitungsbereich liegt unter `/admin/`. Für eine lokale Vorschau ohne GitHub-Anmeldung:

```sh
npm ci
npm run dev:cms
```

Dann `http://127.0.0.1:5173/admin/` öffnen. Die lokale Vorschau speichert Änderungen in den Projektdateien. Für Login und automatisches Veröffentlichen auf der Live-Website zuerst `EDITOR-EINRICHTEN.md` befolgen.

Die Inhalte liegen jetzt unter `apps/web/src/ministry/content/`: `pages/*.json` enthält elf Seiten pro Sprache, `ui/*.json` die Beschriftungen, `site.json` die Kontaktdaten, `assets.json` die festen Bilder, `galleries/*.json` die zusätzlichen Bilder pro Seite und Abschnitt und `documents.json` die PDF-Verweise. Im Editor wird jede Sprache separat gepflegt. Abschnittstexte unterstützen einfache Formatierung; die Website zeigt kein eingebettetes HTML aus diesen Texten an.

Unter **Zusätzliche Bilder** lassen sich neue Fotos hochladen und einem vorhandenen Abschnitt zuordnen. Pro Abschnitt kann die Position vor dem Text oder am Ende sowie Galerie oder große Einzelbilder gewählt werden. Bilder hinzufügen, entfernen und ihre Reihenfolge ändern ist im Editor möglich. Fotos werden über alle Sprachversionen geteilt, während Bildunterschriften und Bildbeschreibungen je Sprache gepflegt werden. Die bisherigen Bildplätze bleiben unter **Feste Website-Bilder** austauschbar. Die Anleitung steht in `EDITOR-EINRICHTEN.md`.

Die Projektbilder auf der Startseite werden jetzt vollständig im Rahmen angezeigt. Wenn du schon eigene Bilder oder Texte eingetragen hast, verwende die separate CSS-Korrektur gemäß `BILDER-KORREKTUR.md`. Diese Anleitung beschreibt auch die Prüfung eines fehlenden lokalen Bildes.

`structure.json` enthält feste Seiten- und Abschnitts-IDs. `content.js` setzt diese Struktur mit den JSON-Inhalten zusammen. `Header.jsx`, `MinistryPage.jsx` und `ministry.css` bleiben für Navigation und Layout zuständig. Der Editor verändert Inhaltsfelder; Änderungen am Seitenaufbau erfolgen weiterhin im Code.

Die früheren Builder-Komponenten unter `src/pages/builder` bleiben erhalten; die aktive App verwendet `src/ministry`.

## Noch benötigte Angaben

Geschichte, offizielle Vision, Glaubensbekenntnis, Team, aktuelle Termine, Spendeninformationen sowie E-Mail, Telefonnummer und Social-Media-Links sind nicht vollständig bestätigt. Dafür werden sichtbare Platzhalter verwendet. Unbestätigte Lebensgeschichten, Projektstände und Zitate werden in der aktiven Website nicht als Tatsachen ausgegeben. Die im Originalprojekt enthaltenen Dokumentlinks zu Maluk, Sunday, dem Sommercamp und dem Missionsbrief bleiben erreichbar.

Die Adresse und der Maps-Link wurden aus dem hochgeladenen Projekt übernommen und sollten vom Leiter bestätigt werden. Die Bilder wurden aus dem Export übernommen und lokal im Ordner `public/media` gespeichert. Die endgültige Bildauswahl und Freigabe bleibt erforderlich.

Impressum und Datenschutzhinweise sind klar als Entwürfe gekennzeichnet und müssen passend zum tatsächlichen Betreiber und Betrieb vervollständigt werden.

## Kontaktformular und E-Mail-Versand

Die aktive Website nutzt jetzt eine Vercel-Funktion unter `api/contact.js` und den E-Mail-Dienst Resend. Alle Kontaktanfragen gehen fest an **tsorakis@hotmail.de**. Der Empfänger steht nur im Server-Code; zusätzliche Empfänger oder Absender aus dem Browser werden nicht übernommen. Antworten auf die erhaltene Nachricht gehen über `Reply-To` an die E-Mail-Adresse des Besuchers.

Ein PocketBase-Backend und `VITE_POCKETBASE_URL` sind für dieses Formular nicht mehr erforderlich. Die früheren Builder-Komponenten bleiben im Export erhalten.

### Resend einrichten

1. Auf https://resend.com ein Konto anlegen.
2. Unter Domains eine eigene Domain oder Subdomain hinzufügen. Die von Resend angezeigten DNS-Einträge beim Domain-Anbieter eintragen und die Bestätigung abwarten. Die kostenlose `vercel.app`-Adresse und die fremde Domain `hotmail.de` können dafür nicht verwendet werden.
3. Unter API Keys einen Schlüssel mit Versandberechtigung anlegen, nach Möglichkeit auf die bestätigte Domain begrenzt.
4. Eine Absenderadresse auf der bestätigten Domain wählen, zum Beispiel `Philadelphia <kontakt@deine-domain.de>`. Der feste Empfänger bleibt `tsorakis@hotmail.de` und benötigt keine eigene Domain.

`onboarding@resend.dev` ist nur eine Test-Absenderadresse. Damit erlaubt Resend Versand nur an die zum Resend-Konto gehörende E-Mail-Adresse. Ein Test an den festen Empfänger ist damit nur möglich, wenn genau `tsorakis@hotmail.de` die Konto-Adresse ist. Für den regulären Betrieb die eigene bestätigte Absenderdomain verwenden. Es wurden weder ein Konto angelegt noch DNS-Einträge verändert oder echte E-Mails verschickt.

### In Vercel aktivieren

Im Projekt `philadelphia-ministry` unter Settings → Environment Variables für **Production** eintragen:

| Name | Wert |
| --- | --- |
| `RESEND_API_KEY` | Der echte Resend-API-Schlüssel |
| `CONTACT_FROM_EMAIL` | Die Absenderadresse auf der bestätigten Domain, zum Beispiel `Philadelphia <kontakt@deine-domain.de>` |

Die Werte ohne zusätzliche äußere Anführungszeichen in Vercel eintragen. Kein `VITE_`-Präfix verwenden: Der Schlüssel bleibt im Server und gehört nicht in das Frontend oder ins Git-Repository. `.env.example` enthält ausschließlich Beispiele.

Den aktualisierten Projektinhalt in den bestehenden lokalen Website-Ordner übernehmen. Den dortigen `.vercel`-Ordner behalten, damit die Projektzuordnung erhalten bleibt. Im Terminal dieses Ordners erneut ausführen:

```sh
npx vercel@latest --prod
```

Die vollständige Projektstruktur inklusive `api` wird benötigt. Nur `dist/static` hochzuladen reicht für den E-Mail-Versand nicht aus. `vercel.json` nimmt `/api` ausdrücklich vom SPA-Fallback aus; Sprachseiten und PDF-Links behalten ihre bisherige Weiterleitung.

Nach der Veröffentlichung die Kontaktseite öffnen und eine eigene kurze Testnachricht absenden. Eingang bei `tsorakis@hotmail.de` einschließlich Spamordner prüfen. Bei Fehlern die Function Logs in Vercel sowie die Versandprotokolle in Resend ansehen. Eine Erfolgsanzeige bedeutet, dass Resend die Nachricht zum Versand angenommen hat; sie bestätigt keinen Posteingang. Provider-Fehler führen zu einer sichtbaren Fehlermeldung, die eingegebene Nachricht bleibt erhalten.

### Verhalten und Prüfung

Das Formular prüft beim Laden, ob die Server-Konfiguration vorhanden ist. Solange sie fehlt oder die API nicht erreichbar ist, bleibt der Senden-Button deaktiviert. `npm run dev` zeigt das Frontend ohne Versand-API; für den echten Versand die konfigurierte Vercel-Veröffentlichung verwenden.

Name, E-Mail und Nachricht werden serverseitig geprüft; HTML wird als Text versendet. Ein unsichtbares Zusatzfeld, Herkunftsprüfung und eine begrenzte Anzahl von Versuchen reduzieren einfachen Missbrauch. Die Begrenzung gilt pro laufender Function-Instanz und ersetzt keine globale Begrenzung über Vercels Firewall oder einen gemeinsamen Datenspeicher. Wiederholungen nach einem Verbindungsfehler verwenden einen Idempotenzschlüssel, damit Resend die gleiche Anfrage nicht erneut verschickt. Nachrichteninhalte und API-Schlüssel werden vom eigenen Server-Code nicht protokolliert.

Die API-Prüfungen laufen ohne echten Versand mit simulierten Resend-Antworten:

```sh
node --test tests/contact.test.cjs
```

Die bisherigen allgemeinen Inhalts- und Rechtstext-Platzhalter bleiben erhalten. Die Datenschutzhinweise nennen jetzt den vorgesehenen Versandweg und müssen durch den Betreiber vollständig ausgearbeitet werden.

## Statische Dateien bauen

```sh
npm run build
```

Das Ergebnis liegt in `dist/static`. Die ZIP enthält bereits einen geprüften Build. Für die reine Frontend-Darstellung auf einem statischen Host genügt dieser Ordner. Der E-Mail-Versand benötigt zusätzlich die Vercel-Funktion im vollständigen Projekt. Bei einem Git-Build: Build-Befehl `npm run build`, Ausgabeverzeichnis `dist/static`. Die `_redirects`-Datei liefert den SPA-Fallback für kompatible Anbieter. Andere Anbieter benötigen eine entsprechende Weiterleitung aller Seiten-URLs auf `index.html`.

Der ursprüngliche PocketBase-Datenordner, die Backend-Binärdatei und das verschachtelte `app.tar.gz` wurden nicht erneut beigepackt. Das Frontend und seine Build-Konfiguration benötigen sie nicht. Alte Hostinger-Editor-Skripte bleiben im Quellcode enthalten; ein Rückimport in den visuellen Hostinger-Editor ist nicht geprüft. Die Hostinger-Live-Seite wurde nicht verändert.

## Prüfung

- Produktions-Build erfolgreich.
- ESLint-Prüfung der aktiven App ohne Fehler.
- Alle elf Seiten (neun Hauptbereiche plus Impressum und Datenschutz) in vier Sprachen im Browser geprüft.
- Dropdown-Menü mit Maus, Tastatur und Touch geprüft.
- Abschnittslinks, Sprachwechsel und arabische Leserichtung geprüft.
- Darstellung auf mehreren Bildschirmbreiten geprüft.
- Kontakt-API: 20 Prüfungen ohne echten E-Mail-Versand bestanden.
- Kontaktformular: vier Sprachen bei 1440 und 390 Pixeln, vier Fehlerfälle, erhaltene Eingaben und blockierte Doppelklicks geprüft. Wiederholungen derselben Nachricht verwenden denselben Idempotenzschlüssel.

Die Originaldokumente wurden nicht neu übersetzt. Ein echter E-Mail-Eingangstest ist erst mit eingerichteten Resend-Zugangsdaten möglich.

## Auf Vercel hosten

Die Datei `vercel.json` im Projektordner enthält die Build-Einstellungen und den notwendigen SPA-Fallback. Dadurch funktionieren direkte Aufrufe und Neuladen von Sprach- und Unterseiten.

1. Den Inhalt des Ordners `philadelphia` in ein GitHub-Repository übernehmen. `node_modules` und `.env` nicht mit hochladen; `.gitignore` ist enthalten.
2. In Vercel ein neues Projekt anlegen und dieses Repository importieren.
3. Root Directory auf den Ordner einstellen, der `package.json` und `vercel.json` enthält: Repository-Wurzel, wenn nur der Inhalt hochgeladen wurde; ansonsten `philadelphia`.
4. Framework Preset: Other. Install Command: `npm ci`. Build Command: `npm run build`. Output Directory: `dist/static`. Node.js: 22.x oder neuer. Diese Befehle und das Ausgabeverzeichnis werden bereits über `vercel.json` festgelegt.
5. Deploy starten. Anschließend auch `/de/ueber-uns` und `/ar/kontakt` direkt öffnen und neu laden.

Der Formularversand bleibt ohne Resend-Konfiguration deaktiviert. Die neue Versandfunktion wurde lokal geprüft; sie wurde noch nicht auf der Live-Seite veröffentlicht. Das zuvor veröffentlichte Frontend wurde durch diese Änderungen nicht verändert.

Vercels kostenloser Hobby-Tarif ist für persönliche, nichtkommerzielle Nutzung vorgesehen. Spendenaufrufe werden laut Vercels Fair-Use-Richtlinie nicht als kommerzielle Nutzung gewertet. Bezahlte Erstellung, Pflege oder Hosting sowie Verkauf und Werbung können dagegen eine kommerzielle Nutzung darstellen. Stand der Prüfung: 29. September 2026. Quellen: https://vercel.com/docs/plans/hobby und https://vercel.com/docs/limits/fair-use-guidelines .

## Missionsbrief-Bild und PDF-Vorschauen

Das hochgeladene Missionsbrief-Bild „Komm und sieh!“ ist auf der Startseite im Bereich „Große Bilder“ und unter Aktuelles → Missionsberichte eingebunden. Es liegt als `apps/web/public/media/missionsbrief.jpg` im Projekt. Die Darstellung erhält das vollständige Bildformat; über „In voller Größe öffnen“ lässt sich das Original ansehen.

Die drei PDFs zu Maluk, Sunday und dem Sommercamp haben jeweils eine kleine Vorschau ihrer ersten Seite. Ein Klick auf die Vorschau oder den Dokument-Button öffnet die vollständige PDF-Datei. Die PDFs liegen in `public/documents`, die vorbereiteten Vorschaubilder in `public/document-previews`. Dadurch werden keine PDF-Viewer-Plugins für die Vorschau benötigt. Alle drei PDFs haben zwei Seiten. Die Originaldateien wurden unverändert übernommen; die Vorschaubilder sind separate Dateien.

Die Komponente `src/ministry/DocumentPreview.jsx` zeigt die Karten. `src/ministry/content/documents.json` enthält pro Dokument `url`, `preview`, `type` und gegebenenfalls `pages`; die Herkunftslinks sind als `sourceUrl` hinterlegt. Bei einem späteren Austausch eines PDFs muss auch das passende Vorschaubild aktualisiert werden. Texte und Beschriftungen der neuen Elemente sind in allen vier Sprachen vorhanden; die Originaldokumente und das Missionsbrief-Bild bleiben in ihrer Ausgangssprache.

Die neuen Vorschauen wurden in allen vier Sprachen bei 1440, 390 und 360 Pixeln Bildschirmbreite geprüft: 36 PDF-Karten und zwölf Bilddarstellungen. Die drei lokalen PDF-Dateien lassen sich öffnen, alle Vorschaubilder werden geladen. Dabei gab es keine JavaScript-Fehler oder fehlgeschlagenen Dateiabrufe. Desktop- und Handyansichten wurden zusätzlich visuell geprüft.

## Browser-Editor: Validierung

Der Editor und die vier Sprachdateien wurden lokal geprüft. Einzelheiten zum Speichern, zur Vorschau und zur unveränderten Übernahme der bisherigen Inhalte stehen in `pruefergebnisse-cms.json`. `npm test` prüft CMS-Anmeldung und Kontakt-API mit simulierten Dienstantworten; `npm run build` prüft die Inhaltsdateien und erstellt die Website. Die Online-Anmeldung und ein tatsächliches Vercel-Deployment benötigen die Einrichtung aus `EDITOR-EINRICHTEN.md`.

Die Erweiterung für zusätzliche Bilder wurde mit einem tatsächlichen lokalen Datei-Upload geprüft: mehrere Bilder in einem Abschnitt, Auswahl vorhandener Medien, Reihenfolge per Ziehen, Speichern, Entfernen und geladene Vorschau. Beide Bildpositionen und beide Darstellungsarten wurden in allen vier Sprachen auf Desktop und Handy geprüft (16 Ansichten). Beim Entfernen aus einem Abschnitt bleibt die Datei in der Mediensammlung erhalten. Die Prüfung hat die bestehenden Texte, Bilder und PDFs unverändert gelassen und anschließend alle Testeinträge entfernt. Ergebnisse: `pruefergebnisse-bilder.json`; Beispielansichten mit Testbildern: `vorschau/zusatzbilder-*.png`.
