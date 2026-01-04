"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* ---------------------------------
   Helpers
---------------------------------- */
const formatNGN = (n: number) => `₦${n.toLocaleString("en-NG")}`;

/* ---------------------------------
   GLOBAL ESTIMATOR
---------------------------------- */
function GlobalEstimator() {
  const [words, setWords] = useState(3000);
  const [level, setLevel] = useState("msc");
  const [urgency, setUrgency] = useState("standard");

  const rates: Record<string, number> = {
    bsc: 20,
    msc: 25,
    phd: 35,
    professional: 30,
  };

  const urgencyMultiplier: Record<string, number> = {
    standard: 1,
    fast: 1.25,
    urgent: 1.5,
  };

  const estimate = useMemo(() => {
    return Math.round(
      words *
        (rates[level] ?? rates.msc) *
        (urgencyMultiplier[urgency] ?? 1)
    );
  }, [words, level, urgency]);

  return (
    <div className="card bg-white">
      <h3 className="text-xl font-heading mb-4">
        Global Project Cost Estimator
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">Word Count</label>
          <input
            type="number"
            value={words}
            min={100}
            onChange={(e) => setWords(Number(e.target.value))}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Academic Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="bsc">BSc / Undergraduate</option>
            <option value="msc">MSc / Postgraduate</option>
            <option value="phd">PhD / Doctoral</option>
            <option value="professional">Professional / Corporate</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Urgency</label>
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="standard">Standard</option>
            <option value="fast">Fast</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      <div className="mt-6 text-lg font-semibold">
        Estimated Cost:{" "}
        <span className="text-brand-gold">{formatNGN(estimate)}</span>
      </div>

      <Link
        href={`/payments?programme=global&estimate=${estimate}`}
        className="btn-primary mt-6"
      >
        Proceed to Payment
      </Link>
    </div>
  );
}

/* ---------------------------------
   NIGERIAN CARD
---------------------------------- */
function NigerianCard({
  title,
  price,
  amount,
  slug,
  children,
}: any) {
  return (
    <div className="card bg-white flex flex-col justify-between">
      <div>
        <h4 className="font-heading text-lg">{title}</h4>
        <div className="text-2xl font-bold text-brand-gold mt-2">
          {price}
        </div>
        <div className="mt-4 text-sm space-y-1">{children}</div>
      </div>

      <Link
        href={`/payments?programme=nigeria&package=${slug}&amount=${amount}`}
        className="btn-primary mt-6"
      >
        Proceed to Payment
      </Link>
    </div>
  );
}

/* ---------------------------------
   PAGE
---------------------------------- */
export default function PricingPage() {
  return (
    <main>
      {/* HERO */}
      <section className="section bg-brand-dark text-white relative overflow-hidden">
        <div className="container-max relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl animate-fade">
            Pricing & Packages
          </h1>
          <p className="mt-4 max-w-2xl text-gray-200">
            Transparent, structured pricing for global clients and a dedicated
            Nigerian Research Access Programme.
          </p>
        </div>

        <div className="absolute top-10 right-10 w-40 h-40 bg-brand-gold/20 rounded-full animate-float" />
      </section>

      {/* GLOBAL */}
      <section className="section container-max">
        <h2 className="font-heading text-3xl mb-4">
          Standard (Global) Pricing
        </h2>
        <p className="max-w-3xl text-muted mb-6">
          Global pricing is calculated per word and adjusted based on academic
          level, urgency and project complexity.
        </p>

        <GlobalEstimator />
      </section>

      {/* NIGERIAN */}
      <section className="section bg-gray-50">
        <div className="container-max">
          <h2 className="font-heading text-3xl mb-4">
            Nigerian Research Access Programme (2026)
          </h2>

          <p className="max-w-3xl text-muted mb-10">
            Fixed-rate, subsidised packages designed exclusively for Nigerian
            research clients.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <NigerianCard
              title="Journal Article (≤6,000 words)"
              price={formatNGN(80000)}
              amount={80000}
              slug="journal"
            >
              <p>• Journal-compliant manuscript</p>
              <p>• Final comprehensive correction</p>
              <p>• Publishing guide & support</p>
            </NigerianCard>

            <NigerianCard
              title="BSc Research Writing"
              price={formatNGN(100000)}
              amount={100000}
              slug="bsc"
            >
              <p>• Chapters 1–5</p>
              <p>• One correction per chapter</p>
            </NigerianCard>

            <NigerianCard
              title="MSc Research Writing"
              price={formatNGN(200000)}
              amount={200000}
              slug="msc"
            >
              <p>• Chapters 1–5</p>
              <p>• One correction per chapter</p>
            </NigerianCard>

            <NigerianCard
              title="PhD Research Writing"
              price={formatNGN(400000)}
              amount={400000}
              slug="phd"
            >
              <p>• Chapters 1–5</p>
              <p>• Multiple corrections</p>
            </NigerianCard>
          </div>

          <div className="mt-12 p-6 border rounded-xl bg-white">
            <h3 className="font-semibold mb-2">Pricing Integrity Notice</h3>
            <p className="text-sm text-muted">
              Nigerian Access pricing is eligibility-controlled. Misrepresentation
              voids subsidised pricing and reverts billing to global rates.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
