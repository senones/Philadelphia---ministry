# Website-Texte im Browser bearbeiten

Der Bearbeitungsbereich ist in diesem Projekt eingebaut. Er wird unter `/admin/` aufgerufen. Die Website behält ihre bisherigen Seiten, Sprach-URLs und Bilder. Decap CMS 3.16.3 wird mit der Website ausgeliefert.

## Sofort lokal ausprobieren

Im vollständigen Website-Ordner in VS Code ein Terminal öffnen; im aktuellen Komplettpaket heißt er `Philadelphia-CMS-Mehrsprachig`:

```sh
npm ci
npm run dev:cms
```

Website: `http://127.0.0.1:5173/`

Bearbeitungsbereich: `http://127.0.0.1:5173/admin/`

Diese lokale Vorschau benötigt keine GitHub-Anmeldung. Änderungen werden direkt in den Inhaltsdateien dieses Ordners gespeichert. Die Live-Website wird dadurch nicht geändert. Beide lokalen Server laufen nur auf dem eigenen Rechner. Ctrl+C beendet die Vorschau. Falls schon eine andere Vorschau läuft, diese vorher beenden.

`npm run dev` startet ebenfalls Website und Editor gemeinsam. Auf dem Mac kann im vollständigen Website-Ordner alternativ `CMS-STARTEN.command` gestartet werden; sie installiert bei Bedarf die Pakete und öffnet anschließend den Bearbeitungsbereich.

### Wenn der lokale Start nicht funktioniert

- **Nur die Korrektur-ZIP entpackt:** Die Korrektur enthält einzelne geänderte Dateien. Diese zuerst in den bestehenden vollständigen Website-Ordner kopieren. Im Ordner mit `package.json`, `package-lock.json`, `apps` und `scripts` starten.
- **Pakete fehlen:** Im Website-Ordner `npm ci` ausführen, danach `npm run dev:cms`.
- **Port 5173 oder 8081 belegt:** Die bisherige Vorschau in ihrem Terminal mit Ctrl+C beenden und erneut starten. Bei Bedarf `CMS_DEV_PORT=5174 CMS_PROXY_PORT=8082 npm run dev:cms` verwenden und die im Terminal ausgegebene Adresse öffnen.
- **Browser meldet, dass die Seite nicht erreichbar ist:** Das Terminal muss geöffnet bleiben und die beiden lokalen Server müssen laufen. Nach einem Neustart des Macs erneut `npm run dev:cms` ausführen.
- **Editor zeigt die Sperrmeldung auf einer lokalen Adresse:** Die Vorschau beenden und im Website-Ordner mit `npm run dev:cms` starten. `vite preview` und `dev:static` starten keinen lokalen Bearbeitungsdienst.

### Seiten bearbeiten

Zuerst auf **Login** klicken; lokal ist keine GitHub-Anmeldung nötig. Dann links im Editor **Seitentexte · Deutsch** oder eine andere Sprache auswählen. Die gewünschte Seite anklicken. **Große Überschrift**, **Einleitung** und die aufgeklappten **Abschnitte** bearbeiten. Über **Veröffentlichen → Jetzt veröffentlichen** lokal speichern und anschließend die Website neu laden. Die Vorschau im Editor enthält dieselben Überschriften und Texte ohne Abschnittsnummern.

## Einmalige Einrichtung für die Live-Website

### 1. Das richtige Website-Repository verbinden

Alle Projektdateien aus dem Ordner `philadelphia` gehören in ein GitHub-Repository für diese Website. Die Repository-Wurzel muss `package.json`, `vercel.json`, `api`, `lib`, `scripts` und `apps` enthalten. `node_modules`, `.env` und lokale Zugangsdaten werden nicht hochgeladen.

Das zuvor von der Vercel-CLI angezeigte Repository `senones/codemy-review-backend` ist kein bestätigtes Website-Repository. Für den Editor das tatsächliche Philadelphia-Website-Repository verwenden.

Das vorhandene Vercel-Projekt `philadelphia-ministry` unter Settings → Git mit diesem Website-Repository verbinden. Die Dateien müssen bereits auf dem gewählten Branch vorhanden sein, normalerweise `main`. Für automatische Veröffentlichungen muss dies auch Vercels Production Branch sein.

Build-Einstellungen: Framework Other, Install `npm ci`, Build `npm run build`, Output `dist/static`, Node.js 22.x oder neuer. Das Root Directory ist die Repository-Wurzel, wenn der Inhalt des Ordners hochgeladen wird.

Bei einem kostenlosen Vercel-Hobby-Projekt mit privatem Repository kann Vercel Veröffentlichungen anderer GitHub-Nutzer blockieren. Für eine dauerhafte Übergabe sollte der Kollege das Website-Repository und das Vercel-Projekt besitzen und sein GitHub-Konto mit seinem Vercel-Konto verknüpfen. Eine Alternative ist passende Team-Mitgliedschaft in einem Pro-Projekt. Vor der Übergabe einmal mit dem tatsächlichen Konto des Kollegen eine kleine Änderung veröffentlichen und das erfolgreiche Vercel-Deployment prüfen. Der lokale Test bestätigt diese Kontozuordnung nicht.

Quellen: https://vercel.com/docs/git und https://vercel.com/docs/deployments/troubleshoot-project-collaboration

### 2. GitHub-Anmeldung registrieren

Auf https://github.com/settings/developers unter OAuth Apps → New OAuth App eine Anwendung anlegen:

| Feld | Wert für die bisherige Live-Adresse |
| --- | --- |
| Application name | Philadelphia Website Editor |
| Homepage URL | `https://philadelphia-ministry-topaz.vercel.app` |
| Authorization callback URL | `https://philadelphia-ministry-topaz.vercel.app/api/cms-callback` |

Wenn die Website eine andere dauerhafte Adresse bekommt, diese in beiden URLs einsetzen. Danach Client ID übernehmen und einen Client Secret erzeugen. Den Secret nur in Vercel speichern.

Quellen: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app und https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

### 3. Vier Werte in Vercel hinterlegen

Im vorhandenen Projekt unter Settings → Environment Variables für Production:

| Name | Wert |
| --- | --- |
| `CMS_SITE_URL` | `https://philadelphia-ministry-topaz.vercel.app` ohne weiteren Pfad |
| `CMS_GITHUB_REPO` | Das tatsächliche Repository, z. B. `GITHUB-NAME/philadelphia-website` |
| `CMS_GITHUB_CLIENT_ID` | Client ID der gerade angelegten OAuth App |
| `CMS_GITHUB_CLIENT_SECRET` | Client Secret der OAuth App |

Falls der Produktionsbranch anders heißt: zusätzlich `CMS_GITHUB_BRANCH` setzen. Für ein öffentliches Repository kann `CMS_GITHUB_SCOPE=public_repo` verwendet werden; für ein privates bleibt der Standard `repo`. GitHubs OAuth-Berechtigung `repo` gilt für die privaten Repositories, auf die das Konto Zugriff hat. Der Anmeldeserver prüft zusätzlich das Schreibrecht für das konfigurierte Website-Repository.

Diese Variablen erhalten **keinen `VITE_`-Präfix**. Keine realen Zugangsdaten in den Quellcode oder die ZIP schreiben. Die vorhandenen Resend-Variablen bleiben separat bestehen.

### 4. Berechtigung des Kollegen und Deployment

Der Kollege benötigt ein eigenes GitHub-Konto. In den Repository-Einstellungen unter Collaborators Zugriff mit Schreibrecht geben; eine Einladung muss er selbst annehmen. Wenn er das Repository besitzt, ist keine Einladung nötig. Die Vercel-Kontozuordnung aus Schritt 1 beachten.

Die neue Projektversion mit allen Dateien auf dem Produktionsbranch speichern; Vercel baut dann die neue Website. Falls zusätzlich einmal per CLI hochgeladen wird:

```sh
npx vercel@latest --prod
```

Dabei den bestehenden Ordner `.vercel` auf deinem Mac behalten und das richtige vorhandene Projekt verwenden. Ein reiner CLI-Upload ohne Git-Verbindung reicht nicht für die spätere automatische Übernahme von CMS-Änderungen.

Nach dem Deployment öffnen:

`https://philadelphia-ministry-topaz.vercel.app/admin/`

Mit dem vorgesehenen GitHub-Konto anmelden und einen kurzen Testtext veröffentlichen. In Vercel muss der neue Build erfolgreich sein. Anschließend die Website neu laden. Bei fehlenden Einstellungen erscheint statt des Logins ein Hinweis, dass der Bearbeitungsbereich noch nicht freigeschaltet ist.

## So arbeitet dein Kollege danach

1. Die gespeicherte Adresse mit `/admin/` im Browser öffnen und mit GitHub anmelden.
2. Links die Sprache auswählen, beispielsweise „Seitentexte · Deutsch“.
3. Die Seite öffnen, beispielsweise „Über uns“.
4. Überschrift oder Einleitung ändern. Für einen Abschnitt den kleinen Pfeil links in dessen grauem Balken anklicken und den Text bearbeiten. Fett, kursiv, Listen und Links sind über die Werkzeugleiste möglich.
5. Die Vorschau rechts prüfen und veröffentlichen. Die Änderung steht nach dem erfolgreichen Vercel-Build auf der Website.

Die Vorschau zeigt die Überschriften und Textabschnitte; Sonderbereiche wie Kontaktformular, Bildgalerien und PDF-Karten werden auf der eigentlichen Website geprüft. Arabische Textfelder erkennen die Leserichtung, und die arabische Vorschau verwendet Rechts-nach-links.

Mit eingerichtetem Übersetzungsdienst und eingeschaltetem **Änderungen in alle Sprachen übersetzen** werden geänderte Texte automatisch in die anderen drei Sprachen übersetzt. Jede Sprache kann die Ausgangssprache sein. Für Einrichtung, manuelle Korrekturen und neue Abschnitte **UEBERSETZUNG-EINRICHTEN.md** lesen. „Noch nicht fertig“ ausschalten, wenn ein Abschnitt freigegeben ist.

Unter **Kontaktdaten** lassen sich Adresse, öffentliche E-Mail-Adresse, Telefon, Anfahrt, Spendenlink und Social Media ändern. Der Empfänger des Kontaktformulars bleibt serverseitig `tsorakis@hotmail.de`.

Unter **Feste Website-Bilder** lassen sich Logo, Startbild, Haus-, Camp-, Sprachkursbild und Missionsbrief austauschen. Neues Bild hochladen bzw. auswählen und die Änderung veröffentlichen.

### Zusätzliche Bilder hochladen und platzieren

1. Links **Zusätzliche Bilder** öffnen und die gewünschte Seite wählen, zum Beispiel „Über uns“.
2. Den kleinen Pfeil am gewünschten Abschnitt anklicken, zum Beispiel „Team / Leitung“.
3. Unter **Position der zusätzlichen Bilder** „Vor dem Text“ oder „Am Ende des Abschnitts“ wählen. Unter **Darstellung** zwischen einer Galerie und großen Bildern untereinander wählen.
4. **Bild hinzufügen** anklicken. Bei **Bilddatei** ein Bild auswählen und in der Mediensammlung über **Hochladen** eine JPG-, PNG- oder WebP-Datei vom Computer hochladen. Danach **Ausgewähltes Element verwenden** anklicken. Ein schon vorhandenes Bild kann ebenfalls verwendet werden.
5. Bei **Bezeichnung im Editor** einen erkennbaren Namen eintragen. Dieser Name dient nur der Übersicht. Optional die Bildunterschriften und Bildbeschreibungen für die einzelnen Sprachen eintragen.
6. Weitere Bilder mit **Bild hinzufügen** ergänzen. Die Reihenfolge durch Ziehen am Griff mit den zwei Strichen ändern. Ein Bild lässt sich über das **X** am Listeneintrag aus diesem Abschnitt entfernen.
7. Die Vorschau rechts prüfen und veröffentlichen. Die Bilder werden nach dem erfolgreichen Vercel-Build sichtbar.

Die Fotos werden einmal hochgeladen und erscheinen in allen vier Sprachversionen an derselben Stelle. Bei eingeschalteter Automatik wird eine Änderung in einem Sprachfeld in die anderen drei Sprachen übersetzt. Bei mehreren gleichzeitig geänderten Sprachfassungen desselben Bildtextes bleiben diese wie eingegeben. Leere Sprachfelder erzeugen keine Bildunterschrift. Eine Bildbeschreibung hilft Menschen mit Screenreader; ohne eigenen Beschreibungstext verwendet die Website die Bildunterschrift oder ihre allgemeine Bildbeschreibung. Auf dem Handy werden die Bilder untereinander dargestellt. Ein Klick auf ein Foto öffnet dessen Originalgröße.

Ein Bild aus der Liste zu entfernen nimmt es aus diesem Abschnitt heraus. Die Datei bleibt in der Mediensammlung und kann an anderer Stelle weiterverwendet werden. Bilder, die noch auf der Website verwendet werden, nicht über „Ausgewähltes Element löschen“ aus der Mediensammlung löschen.

Unter **Neue Abschnitte** innerhalb einer Sprachfassung kannst du zusätzliche Text- und Bildabschnitte anlegen. Die Position wird vor dem ersten oder nach einem festen Abschnitt gewählt. Freies Verschieben an beliebige Pixelpositionen und neue Hauptseiten bleiben Entwicklungsarbeit.

Unter **PDF-Dokumente** können PDFs und die zugehörigen Vorschaubilder ersetzt werden. Bei einer neuen PDF auch das Bild der ersten Seite und die Seitenanzahl aktualisieren; die Vorschau wird bei neuen Uploads nicht automatisch aus der PDF erzeugt.

Ältere Inhaltsstände sind im GitHub-Verlauf vorhanden und können vom technischen Verantwortlichen wiederhergestellt werden.

## Technische Grenzen und Prüfungen

Der Editor ist für Inhalte und Medien eingerichtet. Neue Seitenarten oder Änderungen am Seitenlayout bleiben Entwicklungsarbeit. Anmeldung und Veröffentlichung auf echten GitHub-/Vercel-Konten müssen nach deren Einrichtung geprüft werden; dieses Paket enthält keine Zugangsdaten und wurde nicht auf der Live-Seite veröffentlicht.

Der Build prüft vollständige Sprachdateien, Links und vorhandene Bilder/PDFs. Eine ungültige Änderung kann dadurch einen Build stoppen; der technische Verantwortliche kann die betroffene Änderung im GitHub-Verlauf korrigieren.

Bisherige Prüfprotokolle stehen in den Dateien `pruefergebnisse-*.json`. Die aktuelle Menü- und CMS-Prüfung ist in `AKTUALISIERUNG.md` beschrieben. Authentifizierungsprüfungen verwenden simulierte GitHub-Antworten. Es wurden keine echten GitHub-Anmeldungen, Veröffentlichungen oder E-Mails ausgelöst.
