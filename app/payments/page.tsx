"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

/* --------------------------------
   Helpers
--------------------------------- */
const formatNGN = (n: number) => `₦${n.toLocaleString("en-NG")}`;

/* --------------------------------
   Page
--------------------------------- */
export default function PaymentsPage() {
  const params = useSearchParams();

  const programme = params.get("programme"); // global | nigeria
  const pkg = params.get("package");
  const amountParam = params.get("amount");
  const estimateParam = params.get("estimate");

  const amount = useMemo(() => {
    if (programme === "nigeria") return Number(amountParam);
    if (programme === "global") return Number(estimateParam);
    return 0;
  }, [programme, amountParam, estimateParam]);

  /* --------------------------------
     Nigerian Eligibility Gate
  --------------------------------- */
  const [eligible, setEligible] = useState(programme !== "nigeria");

  /* --------------------------------
     Project Requirements
  --------------------------------- */
  const [requirements, setRequirements] = useState({
    font: "",
    reference: "",
    guidelines: "",
    communication: "",
  });

  /* --------------------------------
     Paystack Init
  --------------------------------- */
  function startPayment() {
  if (typeof window === "undefined" || !(window as any).PaystackPop) {
    alert("Payment service not ready. Please refresh and try again.");
    return;
  }

  const handler = (window as any).PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email: "client@example.com",
    amount: amount * 100,
    currency: "NGN",
    ref: `HW-${Date.now()}`,
    callback: (response: any) => {
      verifyPayment(response.reference);
    },
  });

  handler.openIframe();
  }

  async function verifyPayment(reference: string) {
    await fetch("/api/payments/paystack/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference,
        expectedAmount: amount,
        programme,
        package: pkg,
        requirements,
      }),
    });

    alert("Payment submitted. Verification in progress.");
  }

  /* --------------------------------
     Guard Clause
  --------------------------------- */
  if (!programme || !amount) {
    return <p className="p-10">Invalid payment session.</p>;
  }

  return (
    <main>
      {/* HERO */}
      <section className="section bg-brand-dark text-white relative overflow-hidden">
        <div className="container-max relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl animate-fade">
            Secure Payment
          </h1>
          <p className="mt-4 max-w-xl text-gray-200">
            Review your invoice, confirm eligibility (where applicable), and
            securely complete payment.
          </p>
        </div>

        <div className="absolute top-12 right-10 w-48 h-48 bg-brand-gold/20 rounded-full animate-float" />
      </section>

      {/* CONTENT */}
      <section className="section container-max grid lg:grid-cols-3 gap-8">
        {/* INVOICE */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card">
            <h2 className="font-heading text-xl mb-4">Invoice Summary</h2>
            <p>
              Programme: <strong>{programme}</strong>
            </p>
            {pkg && (
              <p>
                Package: <strong>{pkg}</strong>
              </p>
            )}
            <p className="mt-3 text-lg font-semibold">
              Total Amount:{" "}
              <span className="text-brand-gold">
                {formatNGN(amount)}
              </span>
            </p>
          </div>

          {/* ELIGIBILITY */}
          {programme === "nigeria" && !eligible && (
            <div className="card border-l-4 border-brand-gold bg-yellow-50">
              <h3 className="font-semibold mb-3">
                Nigerian Access Eligibility
              </h3>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  onChange={(e) => setEligible(e.target.checked)}
                />
                <span>
                  I confirm that I am a Nigerian research client and eligible for
                  the Nigerian Research Access Programme. I understand that
                  verification may be required.
                </span>
              </label>
            </div>
          )}

          {/* REQUIREMENTS */}
          <div className="card">
            <h3 className="font-heading text-lg mb-4">
              Project Requirements
            </h3>

            <input
              placeholder="Preferred font (e.g. Times New Roman, 12pt)"
              className="w-full border p-2 mb-3 rounded"
              onChange={(e) =>
                setRequirements({ ...requirements, font: e.target.value })
              }
            />

            <input
              placeholder="Reference style (APA, Harvard, Chicago)"
              className="w-full border p-2 mb-3 rounded"
              onChange={(e) =>
                setRequirements({ ...requirements, reference: e.target.value })
              }
            />

            <textarea
              placeholder="Institutional or departmental guidelines"
              className="w-full border p-2 mb-3 rounded"
              rows={4}
              onChange={(e) =>
                setRequirements({
                  ...requirements,
                  guidelines: e.target.value,
                })
              }
            />

            <input
              placeholder="Preferred communication (Email / WhatsApp)"
              className="w-full border p-2 rounded"
              onChange={(e) =>
                setRequirements({
                  ...requirements,
                  communication: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* PAYMENT ACTION */}
        <aside className="card h-fit">
          <h3 className="font-heading text-lg mb-4">Complete Payment</h3>
          <p className="text-sm text-muted mb-6">
            Payments are processed securely via Paystack. You will receive
            confirmation once verification is complete.
          </p>

          <button
            onClick={startPayment}
            disabled={programme === "nigeria" && !eligible}
            className="btn-primary w-full disabled:opacity-50"
          >
            Pay {formatNGN(amount)}
          </button>
        </aside>
      </section>
    </main>
  );
}
