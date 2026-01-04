import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { reference, expectedAmount } = await req.json();

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = await res.json();

  if (!data.status) {
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }

  const paidAmount = data.data.amount / 100;

  if (paidAmount !== expectedAmount) {
    return NextResponse.json(
      { error: "Amount mismatch" },
      { status: 400 }
    );
  }

  // TODO: save invoice, requirements, payment status to DB

  return NextResponse.json({ success: true });
}
// After successful Paystack verification
localStorage.setItem("havilahInvoiceId", invoiceId);

// Redirect client
window.location.href = "/portal";
