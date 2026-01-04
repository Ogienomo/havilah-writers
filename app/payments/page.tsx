import { Suspense } from "react";
import PaymentsClient from "./payments-client";

export default function PaymentsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentsClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Loading payment details…</p>
    </main>
  );
}
