import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/pages/builder/shared/Header";
import Footer from "@/pages/builder/shared/Footer";

export default function ImpressumPage() {
  return (
    <>
      <Helmet>
        <title>Impressum | Philadelphia International Ministry</title>
        <meta
          name="description"
          content="Impressum von Philadelphia International Ministry und dem Philadelphia Bayt in Athen."
        />
      </Helmet>
      <Header />
      <main className="bg-[#f7f4ef] px-4 py-16 text-[#231c18] md:px-8">
        <article className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d99b43]">Rechtliches</p>
          <h1 className="mb-8 font-serif text-4xl md:text-5xl">Impressum</h1>
          <div className="space-y-6 text-base leading-relaxed">
            <section>
              <h2 className="mb-2 text-xl">Anbieter</h2>
              <p>
                Philadelphia International Ministry
                <br />
                Philadelphia Bayt
                <br />
                Athen, Griechenland
              </p>
            </section>
            <section>
              <h2 className="mb-2 text-xl">Vertreten durch</h2>
              <p>Petros, Hadja, Moshe, Yamima und das Team von Philadelphia International Ministry in Griechenland.</p>
            </section>
            <section>
              <h2 className="mb-2 text-xl">Kontakt</h2>
              <p>
                Die vollständige Anschrift und Kontaktwege finden Sie auf der{" "}
                <Link className="underline" to="/kontakt">
                  Kontaktseite
                </Link>
                .
              </p>
            </section>
            <section>
              <h2 className="mb-2 text-xl">Inhaltlich verantwortlich</h2>
              <p>Philadelphia International Ministry, Athen.</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
