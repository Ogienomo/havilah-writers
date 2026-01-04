import { NextResponse } from "next/server";
import { createInvoice } from "../../../../lib/invoices/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reference, expectedAmount, programme, package: pkg, requirements } = body;

    if (!reference || !expectedAmount) {
      return NextResponse.json(
        { error: "Missing payment reference or amount" },
        { status: 400 }
      );
    }

    // 🔐 Verify with Paystack
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.status) {
      return NextResponse.json(
        { error: "Paystack verification failed" },
        { status: 400 }
      );
    }

    const paidAmount = verifyData.data.amount / 100; // Kobo → NGN

    if (paidAmount !== expectedAmount) {
      return NextResponse.json(
        { error: "Payment amount mismatch" },
        { status: 400 }
      );
    }

    // 🧾 Create invoice (SERVER SIDE ONLY)
    const invoice = createInvoice({
      programme,
      package: pkg,
      amount: paidAmount,
      reference,
      requirements,
      status: "paid",
    });

    // ✅ Return data to client — NO browser logic here
    return NextResponse.json({
      success: true,
      invoiceId: invoice.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
