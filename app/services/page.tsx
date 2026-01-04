"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Service = {
  id: string;
  title: string;
  tag: string;
  blurb: string;
  image: string;
};

const services: Service[] = [
  {
    id: "research",
    title: "Research Writing",
    tag: "Academic & thesis support",
    blurb:
      "Complete theses, chapters, journal-ready manuscripts and literature reviews with rigorous methods and referencing.",
    image: "/images/service-research.jpg",
  },
  {
    id: "assignment",
    title: "Assignment Help",
    tag: "Coursework & assignments",
    blurb:
      "High-quality solutions and explanations for coursework, case studies and graded assignments.",
    image: "/images/service-assignment.jpg",
  },
  {
    id: "book",
    title: "Book Writing",
    tag: "Ghostwriting & manuscripts",
    blurb:
      "From outline to final draft — fiction and non-fiction manuscripts with optional ghostwriting.",
    image: "/images/service-book.jpg",
  },
  {
    id: "business",
    title: "Business Plans & SOPs",
    tag: "Corporate & startup",
    blurb:
      "Investor-ready business plans, SOPs and strategic documents with clear financials and market analysis.",
    image: "/images/service-business.jpg",
  },
  {
    id: "sop",
    title: "Statement of Purpose",
    tag: "Applications & admissions",
    blurb:
      "Compelling SOPs tailored to your academic or professional program, highlighting fit and potential.",
    image: "/images/service-sop.jpg",
  },
  {
    id: "proof",
    title: "Proofreading & Corrections",
    tag: "Polish & compliance",
    blurb:
      "Detail-focused proofreading, formatting and final checks to ensure clarity and compliance.",
    image: "/images/service-proof.jpg",
  },
];

export default function ServicesPage(): ReactNode {
  return (
    <main>
      {/* HERO */}
      <section className="section bg-brand-dark text-white relative overflow-hidden">
        <div className="container-max relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl animate-fade">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl text-gray-200">
            Academic, professional and publishing-focused writing services —
            delivered with precision, ethics and global standards.
          </p>
        </div>

        <div className="absolute top-20 right-10 w-40 h-40 bg-brand-gold/20 rounded-full animate-float" />
      </section>

      {/* SERVICES GRID */}
      <section className="section container-max">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.id}
              className="card hover:shadow-gold transition"
            >
              <div className="h-40 rounded-lg overflow-hidden mb-4">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-heading text-xl mb-1">{s.title}</h3>
              <p className="text-sm text-brand-gold mb-3">{s.tag}</p>
              <p className="text-sm text-muted mb-6">{s.blurb}</p>

              <div className="flex items-center justify-between">
                <Link
                  href={`/pricing#${s.id}`}
                  className="text-sm font-medium underline"
                >
                  View pricing
                </Link>

                <a
                  href="https://form.jotform.com/243364075001042"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-sm"
                >
                  Request quote
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
