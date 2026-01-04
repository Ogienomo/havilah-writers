import { NextResponse } from "next/server";
import { createInvoice } from "../../../../lib/invoices/store";

export async function POST(req: Request) {
  const { service, amount } = await req.json();

  if (!service || !amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const invoice = createInvoice(service, amount);

  return NextResponse.json(invoice);
}
