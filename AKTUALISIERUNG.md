# Neue Abschnitte und Sprachsynchronisierung

Dieses Paket erweitert den lokalen und den Online-Editor. Bereits bearbeitete Projekte mit **AKTUALISIEREN.command** aktualisieren; die Anleitung steht in **START-HIER.md**. Das Skript behält eigene Inhaltsdateien, Fotos, .env und .vercel und sichert ersetzte Programmdateien.

## Änderungen

- Neue Text- und Bildabschnitte auf allen vorhandenen Seiten. Die Position kann vor dem ersten oder nach einem festen Abschnitt gewählt werden. Neue Abschnitte und ihre Bilder lassen sich sortieren und entfernen.
- Änderungen an deutschen, griechischen, englischen oder arabischen Texten werden bei eingeschalteter Automatik in die jeweils anderen drei Sprachen übersetzt. Nur geänderte Textfelder werden ersetzt.
- Auch Beschriftungen und Bildtexte werden unterstützt. Gemeinsame Struktur und Bilddateien werden zusammen gespeichert.
- Manuelle Korrekturen bleiben möglich. Noch fehlende Übersetzungen neuer Abschnitte werden ausgeblendet und können später ergänzt werden.
- Bei Übersetzungsfehlern erfolgt keine Speicherung der Inhaltsdateien. Während des Vorgangs erkannte Änderungen werden nicht überschrieben.
- Das rechte Menü und die Entfernung dekorativer Nummern aus der vorherigen Version bleiben enthalten.

## Einrichtung

Standard ist DeepL; alternativ ist OpenAI möglich. Ein eigener serverseitiger API-Schlüssel ist erforderlich. Einzelheiten stehen in **UEBERSETZUNG-EINRICHTEN.md**. Dieses Paket enthält keine echten Schlüssel.

Die Online-Website wird erst nach einem neuen Deployment aktualisiert. Die vorhandene GitHub-/Vercel-Einrichtung bleibt erforderlich. Die lokale Vorschau verwendet keine GitHub-Anmeldung.

## Prüfung

Produktionsbuild und Inhaltsprüfung erfolgreich; alle 74 Programmtests bestehen. Im lokalen Editor wurden neue Abschnitte mit Bildern angelegt, deutsche und griechische Änderungen veröffentlicht und nach dem Neuladen in allen vier Sprachfassungen geprüft. Manuelle Korrekturen und die Darstellung auf Desktop und Handy einschließlich Arabisch wurden geprüft. Übersetzungsanbieter und GitHub-Antworten wurden simuliert.

Das Update-Skript erhält im Test eigene Inhalte, zusätzliche Fotos, .env und .vercel. Es erstellt eine Sicherung, übernimmt eigene Menünamen in die Editor-Konfiguration und setzt Programmänderungen bei einem Fehler zurück. Alle ursprünglichen 63 Inhaltsdateien dieses Pakets bleiben unverändert.

Echte API-Übersetzungen, eine Online-GitHub-Anmeldung und das Veröffentlichen auf Vercel sind ohne die dazugehörigen Schlüssel und Konten nicht bestätigt.
