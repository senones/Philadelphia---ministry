# Philadelphia · Neue Abschnitte und mehrere Sprachen

Dieses Komplettpaket enthält die vollständige Website, das rechte Menü ohne dekorative Nummern und den erweiterten CMS-Editor. Voraussetzung: Node.js 22.12 oder neuer.

## Du hast schon Texte oder Fotos bearbeitet

Die laufende Vorschau zuerst im Terminal mit Ctrl+C beenden. Deinen bisherigen vollständigen Projektordner behalten. Die neue ZIP in einen **separaten** Ordner entpacken und den enthaltenen Ordner **Philadelphia-CMS-Mehrsprachig** in VS Code öffnen. In dessen Terminal:

```sh
bash AKTUALISIEREN.command
```

Bei der Aufforderung den bisherigen Website-Ordner aus dem Finder ins Terminal ziehen und Enter drücken. Das Skript aktualisiert Programmdateien und erstellt vorher eine Sicherung. Es verändert keine eigenen Seiteninhalte, Fotos, .env-Datei oder .vercel-Zuordnung. Die Editor-Konfiguration wird aus deinen vorhandenen Inhalten neu erzeugt.

Danach den **bisherigen** Website-Ordner in VS Code öffnen und starten:

```sh
npm ci
npm run dev:cms
```

## Du möchtest mit dem vollständigen Paket neu starten

Den entpackten Ordner **Philadelphia-CMS-Mehrsprachig** öffnen. Darin liegen direkt `package.json`, `package-lock.json`, `apps` und `scripts`. Im Terminal:

```sh
npm ci
npm run dev:cms
```

Das Paket enthält den hier vorliegenden Inhaltsstand. Texte und Fotos, die du seitdem nur auf deinem Mac bearbeitet hast, sind darin nicht enthalten. Dafür die Aktualisierung oben verwenden.

## Editor öffnen

http://127.0.0.1:5173/admin/ öffnen und **Login** anklicken. Lokal ist keine GitHub-Anmeldung nötig. Eine Sprachgruppe und eine Seite auswählen. Bei **Neue Abschnitte** kannst du weitere Text- und Bildabschnitte ergänzen. Über **Veröffentlichen → Jetzt veröffentlichen** speichern.

Für die automatische Übersetzung einen eigenen API-Schlüssel gemäß **UEBERSETZUNG-EINRICHTEN.md** hinterlegen. Ohne eingerichteten Übersetzungsdienst ist die manuelle Bearbeitung weiterhin möglich.

Das Terminal offen lassen. Ctrl+C beendet Website und Editor. Nach einem Neustart erneut `npm run dev:cms` ausführen. Alternativ auf dem Mac `bash CMS-STARTEN.command` verwenden.

Lokal gespeicherte Änderungen aktualisieren nicht automatisch die Live-Website. Für den Online-Editor und das Deployment **EDITOR-EINRICHTEN.md** lesen.
