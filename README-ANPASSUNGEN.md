# Philadelphia International Ministry

Diese Version enthält ein linkes Dropdown-Menü und vier Sprachversionen in einer gemeinsamen React-Website.

## Website in VS Code ansehen

Den Ordner `philadelphia` in VS Code öffnen. Im Terminal:

```sh
npm ci
npm run dev
```

Die im Terminal angezeigte lokale Adresse im Browser öffnen, normalerweise `http://localhost:5173/`. Das Terminal während der Vorschau laufen lassen; mit Ctrl+C stoppen. Node.js 22.12 oder neuer verwenden. Der bisherige Befehl `npm run dev:static --workspace web` funktioniert ebenfalls.

## Menü und Seiten

Das Menü liegt oben links. Mit der Maus öffnet es sich beim Darüberfahren; auf Touch-Geräten durch Antippen. Unterpunkte werden beim Darüberfahren über den jeweiligen Seitenbereich oder durch Antippen des Pfeils aufgeklappt. Die Seitentitel führen zur Seite, die Unterpunkte direkt zum entsprechenden Abschnitt. Escape schließt das Menü. Die Pfeiltaste nach unten öffnet es über die Tastatur; mit Tab werden die Links erreicht.

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

Der Sprachumschalter rechts bietet Englisch, Deutsch, Griechisch und Arabisch. Alle sichtbaren Navigationstexte, Überschriften, Beschreibungstexte, Hinweise, Formularbeschriftungen und die Fehlerseite sind übersetzt. Die URLs verwenden `/en`, `/de`, `/el` und `/ar`; beim Sprachwechsel bleiben Seite und Abschnitt erhalten. Arabisch hat Rechts-nach-links-Leserichtung. Das Menü bleibt wie gewünscht physisch links. Die Auswahl wird lokal im Browser gespeichert, soweit Browserspeicher verfügbar ist.

Originaldokumente aus dem Export bleiben in ihrer ursprünglichen Sprache. Offizielle Eigennamen und die Anschrift werden beibehalten. Griechische und arabische Textentwürfe sollten vor Veröffentlichung von sprachkundigen Gemeindemitgliedern geprüft werden.

## Inhalte ändern

Die aktive Website wird aus folgenden Dateien aufgebaut:

- `apps/web/src/ministry/content.js`: alle Seiten, Abschnitte, Übersetzungen, Adresse, E-Mail, Telefonnummer, Spendenlink und Social-Media-Links.
- `apps/web/src/ministry/Header.jsx`: Dropdown-Menü und Sprachumschalter.
- `apps/web/src/ministry/MinistryPage.jsx`: Seitenaufbau, Footer und Sonderabschnitte.
- `apps/web/src/ministry/ministry.css`: Layout, Farben, mobile Darstellung und Arabisch.
- `apps/web/src/ministry/ContactForm.jsx`: Kontaktformular.

Die Funktion `text(de, en, el, ar)` hält einen Text in allen vier Sprachen zusammen. Zur Bearbeitung freigegebene Texte an dieser Stelle einsetzen. `pending: true` kennzeichnet noch ausstehende Inhalte; nach Fertigstellung auf `false` setzen oder entfernen.

Die früheren Builder-Komponenten unter `src/pages/builder` sind als ursprünglicher Quellcode erhalten; die aktive App verwendet `src/ministry`. Änderungen für diese Version deshalb in `src/ministry` vornehmen.

## Noch benötigte Angaben

Geschichte, offizielle Vision, Glaubensbekenntnis, Team, aktuelle Termine, Spendeninformationen sowie E-Mail, Telefonnummer und Social-Media-Links sind nicht vollständig bestätigt. Dafür werden sichtbare Platzhalter verwendet. Unbestätigte Lebensgeschichten, Projektstände und Zitate werden in der aktiven Website nicht als Tatsachen ausgegeben. Die im Originalprojekt enthaltenen Dokumentlinks zu Maluk, Sunday, dem Sommercamp und dem Missionsbrief bleiben erreichbar.

Die Adresse und der Maps-Link wurden aus dem hochgeladenen Projekt übernommen und sollten vom Leiter bestätigt werden. Die Bilder wurden aus dem Export übernommen und lokal im Ordner `public/media` gespeichert. Die endgültige Bildauswahl und Freigabe bleibt erforderlich.

Impressum und Datenschutzhinweise sind klar als Entwürfe gekennzeichnet und müssen passend zum tatsächlichen Betreiber und Betrieb vervollständigt werden.

## Kontaktformular

Ohne eingerichtetes Backend ist der Senden-Button deaktiviert und ein Hinweis sichtbar; die Website behauptet dann keinen Versand. Nach Eintragen einer bestätigten E-Mail-Adresse steht zusätzlich ein E-Mail-Link zur Verfügung.

Für den tatsächlichen Formularbetrieb kann beim Build `VITE_POCKETBASE_URL` auf die URL eines eingerichteten PocketBase-Backends gesetzt werden. Dort sind die Collection `contact_form` mit `name`, `email`, `message`, passende Zugriffsregeln, Spam-Schutz und ggf. E-Mail-Verarbeitung notwendig. Eine erfolgreiche Speicherung bedeutet keine zugesicherte E-Mail-Zustellung. Der Versand wurde mangels konfiguriertem Backend nicht getestet.

## Statische Dateien bauen

```sh
npm run build
```

Das Ergebnis liegt in `dist/static`. Die ZIP enthält bereits einen geprüften Build. Ein statischer Host benötigt nur diesen Ordner, nicht das gesamte Projekt. Bei einem Git-Build: Build-Befehl `npm run build`, Ausgabeverzeichnis `dist/static`. Die `_redirects`-Datei liefert den SPA-Fallback für kompatible Anbieter. Andere Anbieter benötigen eine entsprechende Weiterleitung aller Seiten-URLs auf `index.html`.

Der ursprüngliche PocketBase-Datenordner, die Backend-Binärdatei und das verschachtelte `app.tar.gz` wurden nicht erneut beigepackt. Das Frontend und seine Build-Konfiguration benötigen sie nicht. Alte Hostinger-Editor-Skripte bleiben im Quellcode enthalten; ein Rückimport in den visuellen Hostinger-Editor ist nicht geprüft. Die Hostinger-Live-Seite wurde nicht verändert.

## Prüfung

- Produktions-Build erfolgreich.
- ESLint-Prüfung der aktiven App ohne Fehler.
- Alle elf Seiten (neun Hauptbereiche plus Impressum und Datenschutz) in vier Sprachen im Browser geprüft.
- Dropdown-Menü mit Maus, Tastatur und Touch geprüft.
- Abschnittslinks, Sprachwechsel und arabische Leserichtung geprüft.
- Darstellung auf mehreren Bildschirmbreiten geprüft.

Die Originaldokumente wurden nicht neu übersetzt. Ein Formularversandtest ist erst mit einem konfigurierten Backend möglich.

## Auf Vercel hosten

Die Datei `vercel.json` im Projektordner enthält die Build-Einstellungen und den notwendigen SPA-Fallback. Dadurch funktionieren direkte Aufrufe und Neuladen von Sprach- und Unterseiten.

1. Den Inhalt des Ordners `philadelphia` in ein GitHub-Repository übernehmen. `node_modules` und `.env` nicht mit hochladen; `.gitignore` ist enthalten.
2. In Vercel ein neues Projekt anlegen und dieses Repository importieren.
3. Root Directory auf den Ordner einstellen, der `package.json` und `vercel.json` enthält: Repository-Wurzel, wenn nur der Inhalt hochgeladen wurde; ansonsten `philadelphia`.
4. Framework Preset: Other. Install Command: `npm ci`. Build Command: `npm run build`. Output Directory: `dist/static`. Node.js: 22.x oder neuer. Diese Befehle und das Ausgabeverzeichnis werden bereits über `vercel.json` festgelegt.
5. Deploy starten. Anschließend auch `/de/ueber-uns` und `/ar/kontakt` direkt öffnen und neu laden.

Der Formularversand bleibt ohne eigenes, konfiguriertes Backend deaktiviert. Eine Vercel-Veröffentlichung wurde nicht vorgenommen oder getestet; der lokale Produktions-Build und die Browserprüfungen sind erfolgreich.

Vercels kostenloser Hobby-Tarif ist für persönliche, nichtkommerzielle Nutzung vorgesehen. Spendenaufrufe werden laut Vercels Fair-Use-Richtlinie nicht als kommerzielle Nutzung gewertet. Bezahlte Erstellung, Pflege oder Hosting sowie Verkauf und Werbung können dagegen eine kommerzielle Nutzung darstellen. Stand der Prüfung: 29. September 2026. Quellen: https://vercel.com/docs/plans/hobby und https://vercel.com/docs/limits/fair-use-guidelines .

## Missionsbrief-Bild und PDF-Vorschauen

Das hochgeladene Missionsbrief-Bild „Komm und sieh!“ ist auf der Startseite im Bereich „Große Bilder“ und unter Aktuelles → Missionsberichte eingebunden. Es liegt als `apps/web/public/media/missionsbrief.jpg` im Projekt. Die Darstellung erhält das vollständige Bildformat; über „In voller Größe öffnen“ lässt sich das Original ansehen.

Die drei PDFs zu Maluk, Sunday und dem Sommercamp haben jeweils eine kleine Vorschau ihrer ersten Seite. Ein Klick auf die Vorschau oder den Dokument-Button öffnet die vollständige PDF-Datei. Die PDFs liegen in `public/documents`, die vorbereiteten Vorschaubilder in `public/document-previews`. Dadurch werden keine PDF-Viewer-Plugins für die Vorschau benötigt. Alle drei PDFs haben zwei Seiten. Die Originaldateien wurden unverändert übernommen; die Vorschaubilder sind separate Dateien.

Die Komponente `src/ministry/DocumentPreview.jsx` zeigt die Karten. `documents` in `src/ministry/content.js` enthält pro Dokument `url`, `preview`, `type` und gegebenenfalls `pages`; die Herkunftslinks sind als `sourceUrl` hinterlegt. Bei einem späteren Austausch eines PDFs muss auch das passende Vorschaubild aktualisiert werden. Texte und Beschriftungen der neuen Elemente sind in allen vier Sprachen vorhanden; die Originaldokumente und das Missionsbrief-Bild bleiben in ihrer Ausgangssprache.

Die neuen Vorschauen wurden in allen vier Sprachen bei 1440, 390 und 360 Pixeln Bildschirmbreite geprüft: 36 PDF-Karten und zwölf Bilddarstellungen. Die drei lokalen PDF-Dateien lassen sich öffnen, alle Vorschaubilder werden geladen. Dabei gab es keine JavaScript-Fehler oder fehlgeschlagenen Dateiabrufe. Desktop- und Handyansichten wurden zusätzlich visuell geprüft.
