import React from "react";

const IMAGE =
  "https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/6ac8680de068fe1a5335ed5efb4cdd2c.jpg";

const DOCS = [
  {
    title: "Neue Hoffnung nach Jahren der Flucht",
    subtitle: "Das Zeugnis von Maluk",
    href: "https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/3ba60ba347982db22342c0d94f1e943c.pdf",
  },
  {
    title: "Gerettet auf dem Mittelmeer",
    subtitle: "Das Zeugnis von Sunday",
    href: "https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/0122ae25d3e49f204aa36edc3b051f41.pdf",
  },
  {
    title: "Sommercamp 2026",
    subtitle: "21.–24. August · Biblische Wiedergeburt",
    href: "https://horizons-cdn.hostinger.com/4da9d7fd-50bd-455b-82aa-c08bc73b5a2d/63665ba419043f64844bfe43e118ca33.pdf",
  },
];

export default function SectionDokumente() {
  return (
    <section id="dokumente" className="bg-[#f7f4ef] px-4 py-16 text-[#231c18] md:px-8 md:py-20">
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#d99b43]">
          Berichte &amp; Dokumente
        </p>
        <h2 className="mb-4 font-serif text-4xl font-normal md:text-5xl">Komm und sieh!</h2>
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-[#231c18]/80">
          Aktueller Missionsbrief, Gebetsanliegen und Zeugnisse aus dem Philadelphia Bayt in Athen.
        </p>

        <figure className="overflow-hidden rounded-2xl border border-[#231c18]/10 bg-white shadow-sm">
        <a
          href={IMAGE}
          target="_blank"
          rel="noreferrer"
          className="block"
          title="Missionsbrief in Originalgröße öffnen"
        >
          <img
            src={IMAGE}
            alt="Missionsbrief: Komm und sieh, Gebetsanliegen und Dank für Unterstützung"
            className="block h-auto w-full [filter:contrast(1.06)_saturate(1.05)]"
          />
        </a>
        </figure>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {DOCS.map((doc) => (
            <article
              key={doc.href}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#231c18]/10 bg-white shadow-sm"
            >
              <iframe
                title={doc.title}
                src={doc.href}
                className="h-72 w-full border-0 bg-[#f7f4ef]"
              />
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="text-lg font-medium leading-snug">{doc.title}</h3>
                  <p className="mt-1 text-sm text-[#231c18]/70">{doc.subtitle}</p>
                </div>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex w-fit items-center rounded-full bg-[#231c18] px-4 py-2 text-sm text-white transition hover:bg-[#d99b43]"
                >
                  PDF öffnen
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
