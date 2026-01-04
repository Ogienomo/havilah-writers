import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

/* =========================================================
   CONFIG
========================================================= */

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const UPLOADS_META_FILE = path.join(DATA_DIR, "uploads.json");
const INVOICES_FILE = path.join(DATA_DIR, "invoices.json");

const ALLOWED_MIME_TYPES: Record<string, string> = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
  "image/png": "PNG",
};

/* =========================================================
   HELPERS
========================================================= */

async function ensureFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  for (const file of [UPLOADS_META_FILE, INVOICES_FILE]) {
    try {
      await fs.access(file);
    } catch {
      await fs.writeFile(file, "[]", "utf8");
    }
  }
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function readableFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/* =========================================================
   POST — CLIENT FILE UPLOAD
========================================================= */

export async function POST(req: Request) {
  try {
    await ensureFiles();

    const body = await req.json();
    const { invoiceId, filename, mimeType, base64, note } = body;

    /* ---------- BASIC VALIDATION ---------- */

    if (!invoiceId || typeof invoiceId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid invoiceId" },
        { status: 400 }
      );
    }

    if (!filename || typeof filename !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid filename" },
        { status: 400 }
      );
    }

    if (!mimeType || !ALLOWED_MIME_TYPES[mimeType]) {
      return NextResponse.json(
        {
          error: "File type not allowed",
          allowed: Object.values(ALLOWED_MIME_TYPES),
        },
        { status: 400 }
      );
    }

    if (!base64 || typeof base64 !== "string") {
      return NextResponse.json(
        { error: "Missing file content" },
        { status: 400 }
      );
    }

    /* ---------- INVOICE VALIDATION ---------- */

    const invoicesRaw = await fs.readFile(INVOICES_FILE, "utf8");
    const invoices = JSON.parse(invoicesRaw) as any[];

    const invoice = invoices.find(
      (inv) => inv.invoiceId === invoiceId
    );

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 403 }
      );
    }

    if (invoice.status !== "PAID") {
      return NextResponse.json(
        {
          error: "Uploads allowed only after payment confirmation",
          status: invoice.status,
        },
        { status: 403 }
      );
    }

    /* ---------- WRITE FILE ---------- */

    const buffer = Buffer.from(base64, "base64");

    const safeName = sanitizeFilename(filename);
    const timestamp = Date.now();

    const storedFilename = `${invoiceId}_${timestamp}_${safeName}`;
    const filePath = path.join(UPLOADS_DIR, storedFilename);

    await fs.writeFile(filePath, buffer);

    /* ---------- SAVE METADATA ---------- */

    const uploadsRaw = await fs.readFile(UPLOADS_META_FILE, "utf8");
    const uploads = JSON.parse(uploadsRaw) as any[];

    const record = {
      invoiceId,
      filename: storedFilename,
      originalFilename: filename,
      fileType: ALLOWED_MIME_TYPES[mimeType],
      mimeType,
      size: buffer.length,
      sizeReadable: readableFileSize(buffer.length),
      uploadedAt: new Date().toISOString(),
      note: note || "",
      url: `/uploads/${storedFilename}`,
    };

    uploads.unshift(record);

    await fs.writeFile(
      UPLOADS_META_FILE,
      JSON.stringify(uploads, null, 2),
      "utf8"
    );

    /* ---------- RESPONSE ---------- */

    return NextResponse.json({
      success: true,
      upload: record,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
