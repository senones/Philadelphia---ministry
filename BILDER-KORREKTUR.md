# Projektbilder vollständig anzeigen

Die Projektkarten auf der Startseite zeigen Bilder jetzt vollständig im vorgesehenen Rahmen. Die Bildränder bleiben erhalten; je nach Bildformat können freie Flächen im Rahmen sichtbar sein. Das gilt auch für Logos. Beim Darüberfahren wird das Bild nicht mehr vergrößert.

## Bereits bearbeitete Website aktualisieren

Die separate Datei `Philadelphia-Bilder-Korrektur.zip` enthält nur die geänderte CSS-Datei und eine Anleitung. Sie enthält keine Inhalte oder Bilddateien.

1. Die Korrektur-ZIP entpacken.
2. Im bereits bearbeiteten Website-Projekt nur `apps/web/src/ministry/ministry.css` durch die Datei mit demselben Pfad aus der Korrektur ersetzen.
3. Die lokale Website im Browser mit Cmd+R neu laden. `npm run dev:cms` muss weiterlaufen.

Die bereits gewählten und hochgeladenen Bilder bleiben in deinem Projekt erhalten. Für die Live-Seite ist später ein neuer Build bzw. ein Deployment nötig.

## Wenn das Hausfoto weiterhin fehlt

Ein JPG ist grundsätzlich ein geeignetes Format. Im Test wurden drei JPG/JPEG-Dateien hochgeladen und korrekt angezeigt, einschließlich Dateinamen mit Leerzeichen, Umlauten und Großbuchstaben. Der Editor vereinfacht die Dateinamen beim Hochladen. Die gespeicherten Links wurden geprüft. Der konkrete Fehler des fehlenden Fotos aus dem Screenshot wurde damit nicht nachgestellt.

1. Nach dem Veröffentlichen die Website mit Cmd+R neu laden.
2. Falls das Foto weiter fehlt: Unter „Feste Website-Bilder“ beim Feld „Haus Philadelphia“ das gewünschte JPG erneut auswählen, „Ausgewähltes Element verwenden“ anklicken und veröffentlichen. Danach die Website erneut laden.
3. Falls es weiterhin fehlt: Auf das fehlende Bild rechtsklicken, „Bild in neuem Tab öffnen“ wählen und die vollständige Adresse dieses Tabs für die Fehlerprüfung kopieren. Alternativ in `apps/web/src/ministry/content/assets.json` den Wert von `bayt` ablesen. Diese Information zeigt, welche Datei die Website tatsächlich anfordert.

Das Logo unter „Sprachkurse“ entspricht der dort gewählten Bilddatei. Für ein anderes Motiv im Editor das Feld „Sprachkurse“ ändern.

Die lokale Prüfung wurde ohne Änderungen an der Live-Seite durchgeführt. Alle Testbilder und vorübergehenden Inhaltsänderungen wurden anschließend entfernt.
