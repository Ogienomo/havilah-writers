import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const MSG_FILE = path.join(DATA_DIR, "messages.json");

async function ensure() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(MSG_FILE);
  } catch {
    await fs.writeFile(MSG_FILE, "[]");
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const invoiceId = url.searchParams.get("invoiceId") || "";
  await ensure();
  const raw = await fs.readFile(MSG_FILE, "utf8");
  const msgs = JSON.parse(raw) as any[];
  const filtered = invoiceId ? msgs.filter((m) => m.invoiceId === invoiceId) : msgs;
  return NextResponse.json({ messages: filtered });
}

export async function POST(req: Request) {
  await ensure();
  const body = await req.json();
  const { invoiceId, name, message } = body;
  if (!invoiceId || !name || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const raw = await fs.readFile(MSG_FILE, "utf8");
  const msgs = JSON.parse(raw) as any[];

  const item = {
    id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    invoiceId,
    name,
    message,
    ts: Date.now(),
  };

  msgs.push(item);
  await fs.writeFile(MSG_FILE, JSON.stringify(msgs, null, 2));
  return NextResponse.json({ success: true, message: item });
}
