import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "lib/invoices/invoices.json");

type Invoice = {
  id: string;
  service: string;
  amount: number;
  currency: "NGN";
  status: "pending" | "paid";
  createdAt: string;
};

function loadInvoices(): Invoice[] {
  if (!fs.existsSync(DATA_PATH)) return [];
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function saveInvoices(invoices: Invoice[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(invoices, null, 2));
}

export function createInvoice(service: string, amount: number): Invoice {
  const invoices = loadInvoices();

  const invoice: Invoice = {
    id: `INV-${Date.now()}`,
    service,
    amount,
    currency: "NGN",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  invoices.push(invoice);
  saveInvoices(invoices);

  return invoice;
}

export function markInvoicePaid(invoiceId: string) {
  const invoices = loadInvoices();
  const invoice = invoices.find((i) => i.id === invoiceId);
  if (!invoice) return null;

  invoice.status = "paid";
  saveInvoices(invoices);

  return invoice;
}
