"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-brand-soft text-brand-dark font-body">
      {/* ======================================
          HERO SECTION
      ====================================== */}
      <section className="relative overflow-hidden">
        {/* Soft floating accent */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-brand-dark/10 rounded-full blur-3xl animate-pulseSoft" />

        <div className="max-w-content mx-auto px-6 py-28 relative z-10 animate-fade">
          <div className="max-w-3xl">
            <span className="uppercase tracking-wideSoft text-sm text-brand-gold font-semibold">
              Academic Writing & Research Consultancy
            </span>

            <h1 className="font-heading text-5xl md:text-6xl leading-tight mt-4">
              Clarity, Rigor & Integrity  
              <br />
              <span className="text-brand-gold">For Serious Research</span>
            </h1>

            <p className="mt-6 text-lg text-brand-muted leading-relaxed">
              Havilah Writers supports students, researchers, and professionals
              with ethically produced academic writing, research consulting,
              and publication-ready manuscripts — delivered through structured
              workflows and uncompromising quality standards.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-dark text-white rounded-lg shadow-soft hover:shadow-gold transition"
              >
                Explore Services
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 border border-brand-dark rounded-lg text-brand-dark hover:bg-brand-dark hover:text-white transition"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          TRUST / VALUE STRIP
      ====================================== */}
      <section className="border-t border-brand-line bg-white">
        <div className="max-w-content mx-auto px-6 py-14 grid md:grid-cols-3 gap-8 text-center">
          <div className="animate-fade">
            <h3 className="font-heading text-xl mb-2">Research Integrity</h3>
            <p className="text-brand-muted text-sm">
              Every project follows documented SOPs, plagiarism screening,
              and peer-reviewed academic standards.
            </p>
          </div>

          <div className="animate-fade">
            <h3 className="font-heading text-xl mb-2">Structured Workflow</h3>
            <p className="text-brand-muted text-sm">
              From intake to delivery, your work moves through clear milestones,
              technical review, and quality assurance.
            </p>
          </div>

          <div className="animate-fade">
            <h3 className="font-heading text-xl mb-2">Global Reach</h3>
            <p className="text-brand-muted text-sm">
              Supporting undergraduate, postgraduate, doctoral and professional
              research clients worldwide.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
