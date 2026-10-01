# Neue Abschnitte und automatische Übersetzungen

Du kannst jede vorhandene Seite um neue Abschnitte erweitern. Die Ausgangssprache ist die Sprache, in der du gerade bearbeitest: Deutsch, Griechisch, Englisch oder Arabisch. Mit eingeschalteter Automatik werden geänderte Texte beim Veröffentlichen in die anderen drei Sprachen übersetzt.

## Einmal DeepL anschließen

1. Ein **DeepL-API-Konto** anlegen: https://www.deepl.com/pro-api . Für den Einstieg kann DeepL API Free verwendet werden. Ein normales DeepL-Übersetzer-Abo ist kein API-Schlüssel.
2. Im DeepL-Konto unter **API Keys** einen Schlüssel erstellen. Bei API Free endet er mit `:fx`. Den Schlüssel nicht hier im Chat oder in GitHub einfügen.
3. Für deinen lokalen Editor im bisherigen vollständigen Website-Ordner eine Datei **.env** anlegen. Wenn sie schon existiert, diese beiden Zeilen ergänzen und die vorhandenen Werte behalten:

```dotenv
CMS_TRANSLATION_PROVIDER=deepl
DEEPL_API_KEY=HIER_DEINEN_DEEPL_API_SCHLUESSEL_EINTRAGEN
```

4. Die lokale Vorschau mit Ctrl+C beenden und mit `npm run dev:cms` erneut starten. Unter http://127.0.0.1:5173/admin/ meldet der Editor jetzt, dass die Übersetzung verfügbar ist.
5. Auf der bearbeiteten Seite **Änderungen in alle Sprachen übersetzen** einschalten. Bei noch nicht bearbeiteten Dateien ist es mit eingerichtetem Dienst bereits eingeschaltet. Ein zuvor ausgeschalteter Schalter bleibt ausgeschaltet, bis du ihn selbst einschaltest.

Für den **Online-Editor** dieselben beiden Werte in Vercel → Projekt → Settings → Environment Variables → **Production** ergänzen und die neue Projektversion deployen. Die bestehende GitHub-OAuth-Einrichtung bleibt erforderlich. Der Schlüssel ist ein serverseitiger Wert; sein Name bekommt keinen `VITE_`-Präfix. Eine lokale .env-Datei wird nicht mit hochgeladen.

DeepL API Free und API Pro verwenden unterschiedliche Endpunkte. Das Projekt wählt den passenden anhand des Schlüssels. Das Kontingent und gegebenenfalls Kosten im DeepL-Konto prüfen. Derselbe geänderte Text wird für drei Zielsprachen übersetzt; unveränderte Textfelder werden nicht erneut übersetzt.

Quellen: https://developers.deepl.com/docs/getting-started/auth und https://developers.deepl.com/docs/resources/usage-limits

## Alternativ OpenAI

Statt der beiden DeepL-Werte kann lokal bzw. in Vercel Folgendes eingetragen werden:

```dotenv
CMS_TRANSLATION_PROVIDER=openai
OPENAI_API_KEY=HIER_DEINEN_OPENAI_API_SCHLUESSEL_EINTRAGEN
CMS_TRANSLATION_MODEL=gpt-4.1-mini
```

Diese Anbindung verwendet einen eigenen OpenAI-API-Schlüssel und dessen API-Kontingent bzw. Abrechnung. Der Schlüssel wird ausschließlich auf dem Server verwendet. Quelle: https://developers.openai.com/api/docs/guides/text

## Neue Abschnitte hinzufügen

1. **Seitentexte · Deutsch** oder **Seitentexte · Griechisch** auswählen und die gewünschte Seite öffnen.
2. Unten bei **Neue Abschnitte** auf **Abschnitt hinzufügen** klicken.
3. Überschrift und Text eintragen. Unter **Position auf der Seite** „Vor dem ersten Abschnitt“ oder „Nach: …“ wählen.
4. Optional unter **Bilder im neuen Abschnitt** Bilder auswählen oder hochladen. Bildunterschrift und Bildbeschreibung in deiner Ausgangssprache eintragen; sie werden mitübersetzt.
5. **Veröffentlichen → Jetzt veröffentlichen** anklicken. Die Seite erst verlassen, wenn „Änderungen gespeichert“ erscheint.

Der neue Abschnitt erscheint an derselben Stelle in allen vier Sprachen, einschließlich der Abschnittsübersicht und der Unterpunkte im rechten Menü. Neue Abschnitte an derselben Position lassen sich über ihren Griff sortieren. Das X entfernt einen neuen Abschnitt aus allen vier Sprachfassungen. Die hochgeladenen Bilddateien bleiben in der Mediensammlung.

Die festen Abschnitte mit Kontaktformular, PDF-Karten und anderen Sonderfunktionen bleiben bestehen. Diese können bearbeitet werden; die neue Liste ergänzt frei gestaltete Text- und Bildabschnitte. Neue Hauptseiten und andere Seitenlayouts benötigen weiterhin eine Änderung am Programm.

## Was beim Übersetzen passiert

- Eine Änderung auf Griechisch übersetzt das betroffene Textfeld ins Deutsche, Englische und Arabische. Eine deutsche Änderung entsprechend ins Griechische, Englische und Arabische. Auch Englisch und Arabisch können Ausgangssprachen sein.
- Nur geänderte Textfelder werden ersetzt. Eine Änderung an der Einleitung verändert beispielsweise keine unabhängig korrigierte Übersetzung eines anderen Abschnitts. Wenn genau dasselbe Textfeld neu übersetzt wird, ersetzt seine neue Übersetzung die bisherige Fassung dieses Feldes.
- Namen im Menü, Überschriften, Einleitungen, Abschnittstexte und die Beschriftungen unter „Beschriftungen & Hinweise“ werden unterstützt. In neuen Abschnitten werden auch Bildunterschriften und Bildbeschreibungen übersetzt.
- Unter **Zusätzliche Bilder** einen Sprachtext pro Bildunterschrift bzw. Bildbeschreibung ändern: Die anderen drei werden übersetzt. Wenn du mehrere Sprachtexte desselben Feldes gleichzeitig bearbeitest, bleiben sie wie eingegeben.
- Fotos, die Position neuer Abschnitte und deren Reihenfolge sind gemeinsam. Kontaktdaten und Links werden schon heute einmal gespeichert und in allen Sprachen verwendet. Hochgeladene PDFs und Texte, die fest in Bildern stehen, werden nicht übersetzt.
- Bei einer fehlgeschlagenen Übersetzung wird der Speichervorgang gestoppt. Eingaben bleiben im Editor, und eine Fehlermeldung erklärt den nächsten Schritt. Erkannte zwischenzeitliche Änderungen führen ebenfalls zum Abbruch; dann die neuere Fassung laden und erneut bearbeiten.

Die Texte werden für die Übersetzung an den gewählten Dienst gesendet. Übersetzte Texte können im Editor geprüft und bei Bedarf manuell korrigiert werden.

## Ohne Schlüssel oder für manuelle Korrekturen

**Änderungen in alle Sprachen übersetzen** ausschalten. Änderungen an bestehenden Texten gelten dann nur für die gewählte Sprache. Bei fehlendem Dienst ist die Automatik für Dateien ohne gespeicherte Einstellung zunächst ausgeschaltet.

Neue Abschnitte werden trotzdem in allen Sprachdateien angelegt. Ihre noch leeren Übersetzungen bleiben auf der Website ausgeblendet. Du kannst sie in jeder Sprache von Hand ausfüllen oder später in der ursprünglichen Sprache die Automatik einschalten und veröffentlichen; dann werden die fehlenden Abschnittsübersetzungen ergänzt. Positionen, Bilder und Löschungen werden auch bei ausgeschalteter Automatik gemeinsam gespeichert.

Lokal gespeicherte Änderungen aktualisieren nur deinen Projektordner. Die Live-Website erhält sie nach dem Upload bzw. Push und einem erfolgreichen Vercel-Build. Im Online-Editor werden alle Sprachdateien einer Seitenänderung zusammen in einem GitHub-Commit gespeichert.

## Geprüfter Stand

Die Programmtests prüfen beide Übersetzungsanbieter mit simulierten Antworten. Der echte lokale Decap-Editor wird beim Bearbeiten und Veröffentlichen geprüft. Für Übersetzungen im Browsertest werden ebenfalls simulierte Antworten verwendet. Ohne deinen API-Schlüssel und deine Konten ist weder die sprachliche Qualität des echten Übersetzungsdienstes noch das Live-Deployment bestätigt.
