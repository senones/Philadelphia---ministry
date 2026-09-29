import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/pages/builder/shared/Header";
import Footer from "@/pages/builder/shared/Footer";

export default function DatenschutzPage() {
  return (
    <>
      <Helmet>
        <title>Datenschutz | Philadelphia International Ministry</title>
        <meta
          name="description"
          content="Datenschutzhinweise von Philadelphia International Ministry: Kontaktformular, Karte und Cookies."
        />
      </Helmet>
      <Header />
      <main className="bg-[#f7f4ef] px-4 py-16 text-[#231c18] md:px-8">
        <article className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d99b43]">Rechtliches</p>
          <h1 className="font-serif text-4xl md:text-5xl">Datenschutz</h1>
          <p>
            Philadelphia International Ministry nimmt den Schutz Ihrer Daten ernst. Diese Seite beschreibt, welche Angaben
            auf dieser Website verarbeitet werden.
          </p>
          <section>
            <h2 className="mb-2 text-xl">Kontaktformular</h2>
            <p>
              Wenn Sie uns über das{" "}
              <Link className="underline" to="/kontakt">
                Kontaktformular
              </Link>{" "}
              schreiben, speichern wir Name, E-Mail-Adresse und Nachricht, um Ihre Anfrage zu beantworten. Die Angaben
              werden nicht verkauft und nicht für Werbung an Dritte weitergegeben.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl">Karte und Anfahrt</h2>
            <p>
              Auf der Kontaktseite ist eine Google-Karte eingebunden. Beim Laden der Karte kann Google technische Daten
              wie Ihre IP-Adresse verarbeiten. Die Karte wird erst angezeigt, wenn die Seite geöffnet wird.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl">Cookies</h2>
            <p>
              Notwendige Cookies halten die Seite funktionsfähig. Analyse- oder Marketing-Cookies werden nur gesetzt,
              wenn Sie im Hinweis am Seitenrand zustimmen.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl">Ihre Rechte</h2>
            <p>
              Sie können Auskunft, Berichtigung oder Löschung Ihrer Angaben verlangen. Schreiben Sie uns dazu über die
              Kontaktseite.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
