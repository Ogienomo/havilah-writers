"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

export default function OperationsPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-3">Operations & SOPs</h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-8">
          Key operational standards from the Havilah Staff Handbook — distilled for clients and
          internal users. Use the triage estimator to check likely resource needs, or download the
          full handbook.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <QuickLinks />
            <WhyMatters />
            <StaffResources />
          </div>

          <div className="space-y-6">
            <div className="p-6 border rounded-2xl">
              <h2 className="text-xl font-semibold mb-4">Project Triage — quick estimator</h2>
              <TriageCalculator />
            </div>

            <div className="p-6 border rounded-2xl">
              <h3 className="text-lg font-semibold mb-3">Interpretation</h3>
              <p className="text-gray-600">
                The triage score is an estimator. Official quotes follow once you submit a formal
                request through our intake form. For staff: triage score maps to resourcing (JRW,
                SRW, Editor, Analyst).
              </p>
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-4">
          <SOPAccordion
            title="Project Intake & Scope Definition"
            content="Use the Client Brief template at intake. Key fields: project type, word count, deadline, methodology, and target outlet. We triage projects on scope, technical complexity, urgency and special requirements to assign the right team."
          />

          <SOPAccordion
            title="Pricing & Quote Workflow"
            content="Quotes are itemised (writing, analysis, referencing, plagiarism report, revision rounds). Complexity multipliers: Low=1.0, Medium=1.25, High=1.5, Critical=2.0. Discounts >10% require Manager approval."
          />

          <SOPAccordion
            title="Research & Writing Workflow"
            content="Standard flow: Intake → Search & Plan → Data Extraction → Drafting → SRW technical review (if required) → Senior Editor copyedit → Final QA → Client handoff. Milestones & version control ensure transparency."
          />

          <SOPAccordion
            title="QA & Plagiarism Policy"
            content="Every final draft is checked with Turnitin/iThenticate. Default similarity threshold ≤15% unless client specifies otherwise. Any major match triggers project hold and SRW investigation."
          />
        </section>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 rounded-full hover:opacity-95 transition"
          >
            Request a scoped quote
          </Link>
        </div>
      </section>
    </main>
  );
}

function QuickLinks() {
  return (
    <div className="p-6 border rounded-2xl">
      <h2 className="text-xl font-semibold mb-3">Quick links</h2>
      <ul className="text-gray-700 space-y-3">
        <li>
          <a href="/handbook.pdf" className="underline" target="_blank" rel="noreferrer">
            Download full Staff Handbook (PDF)
          </a>
        </li>
        <li>
          <Link href="/pricing" className="underline">
            View Pricing & Packages
          </Link>
        </li>
        <li>
          <a href="https://form.jotform.com/243364075001042" target="_blank" rel="noreferrer" className="underline">
            Project Intake & Quote (Service Request)
          </a>
        </li>
        <li>
          <Link href="/services" className="underline">
            Our Services (detailed descriptions)
          </Link>
        </li>
      </ul>
    </div>
  );
}

function WhyMatters() {
  return (
    <div className="p-6 border rounded-2xl">
      <h3 className="text-lg font-semibold mb-2">Why this matters</h3>
      <p className="text-gray-600">
        Clear SOPs reduce turnaround risk, ensure consistent quality and make pricing transparent.
        This public page shows client-facing processes; internal templates and checklists remain in
        the staff handbook.
      </p>
    </div>
  );
}

function StaffResources() {
  return (
    <div className="p-6 border rounded-2xl">
      <h3 className="text-lg font-semibold mb-2">Staff resources</h3>
      <p className="text-gray-600 mb-3">Internal tools & locations</p>
      <ul className="text-gray-700 space-y-2 text-sm">
        <li>Templates library: Google Drive — /Havilah Templates/</li>
        <li>Project management: Bitrix24</li>
        <li>Reference manager: Zotero (shared collections)</li>
        <li>Plagiarism checks: Turnitin / iThenticate</li>
      </ul>
    </div>
  );
}

function SOPAccordion({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-2xl">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-6 pb-6 text-gray-700">{content}</div>}
    </div>
  );
}

function TriageCalculator() {
  const [scope, setScope] = useState("short");
  const [complexity, setComplexity] = useState("general");
  const [urgency, setUrgency] = useState("standard");
  const [special, setSpecial] = useState(false);
  const [wordCount, setWordCount] = useState<number | "">(3000);

  const score = useMemo(() => {
    let s = 0;
    if (scope === "short") s += 1;
    if (scope === "chapter") s += 2;
    if (scope === "full") s += 3;
    if (complexity === "general") s += 1;
    if (complexity === "discipline") s += 2;
    if (complexity === "advanced") s += 3;
    if (urgency === "standard") s += 0;
    if (urgency === "fast") s += 1;
    if (urgency === "urgent") s += 2;
    if (special) s += 1;
    if (typeof wordCount === "number") {
      if (wordCount > 20000) s = Math.min(10, s + 1);
      if (wordCount > 50000) s = Math.min(10, s + 1);
    }
    return s;
  }, [scope, complexity, urgency, special, wordCount]);

  const interpretation = useMemo(() => {
    if (score <= 2) return { label: "Low", team: "JRW", multiplier: 1.0 };
    if (score <= 5) return { label: "Medium", team: "JRW + Editor", multiplier: 1.25 };
    if (score <= 8) return { label: "High", team: "SRW + Analyst + Editor", multiplier: 1.5 };
    return { label: "Critical", team: "SRW Lead + Priority Queue", multiplier: 2.0 };
  }, [score]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="text-sm">Scope</label>
        <select value={scope} onChange={(e) => setScope(e.target.value)} className="p-2 border rounded">
          <option value="short">Short edit (≤2k)</option>
          <option value="chapter">Single chapter (3–10k)</option>
          <option value="full">Full thesis (10k+)</option>
        </select>

        <label className="text-sm">Technical complexity</label>
        <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="p-2 border rounded">
          <option value="general">General essay / literature</option>
          <option value="discipline">Discipline methods / stats</option>
          <option value="advanced">Advanced methods / systematic review</option>
        </select>

        <label className="text-sm">Urgency</label>
        <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="p-2 border rounded">
          <option value="standard">Standard (≥14 days)</option>
          <option value="fast">Fast (3–13 days)</option>
          <option value="urgent">Urgent (≤72 hours)</option>
        </select>

        <label className="text-sm">Special requirements</label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={special} onChange={(e) => setSpecial(e.target.checked)} />
          <span className="text-sm text-gray-700">Formatting / journal guidelines / data analysis</span>
        </label>

        <label className="text-sm">Word count (estimate)</label>
        <input
          type="number"
          value={wordCount}
          onChange={(e) => setWordCount(e.target.value ? Number(e.target.value) : "")}
          className="p-2 border rounded"
        />
      </div>

      <div className="p-4 bg-gray-50 rounded">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Triage score</div>
            <div className="text-2xl font-bold">{score} / 10</div>
            <div className="text-sm text-gray-600 mt-1">{interpretation.label} complexity</div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">Suggested team</div>
            <div className="font-semibold">{interpretation.team}</div>
            <div className="text-sm text-gray-600">Multiplier ×{interpretation.multiplier}</div>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-700">
          This is an estimator. Submit a formal request for an itemised quote.
        </div>

        <div className="mt-4 text-right">
          <a href="https://form.jotform.com/243364075001042" target="_blank" rel="noreferrer" className="inline-block bg-black text-white px-4 py-2 rounded">
            Start a formal request
          </a>
        </div>
      </div>
    </div>
  );
}
