"use client";

import { useEffect, useState } from "react";

/* Small UI components in this file for simplicity */
function UploadForm({ invoiceId, onUploaded }: { invoiceId: string; onUploaded: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState("");

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return alert("Choose a file first.");
    setLoading(true);

    // read file as base64
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const payload = {
      invoiceId,
      filename: file.name,
      mimeType: file.type,
      base64,
      note,
    };

    const res = await fetch("/api/portal/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setFile(null);
      setNote("");
      onUploaded();
      alert("Upload successful");
    } else {
      const data = await res.json();
      alert("Upload failed: " + (data?.error || res.statusText));
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleUpload} className="border p-4 rounded-lg bg-white space-y-3">
      <label className="block text-sm font-medium">Upload file</label>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full"
      />
      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Short note about the file (optional)"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        disabled={!file || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}

function MessagesPanel({ invoiceId }: { invoiceId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [sending, setSending] = useState(false);

  async function fetchMessages() {
    const res = await fetch(`/api/portal/messages?invoiceId=${encodeURIComponent(invoiceId)}`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data.messages ?? []);
    } else {
      console.error("Failed to fetch messages");
    }
  }

  useEffect(() => {
    fetchMessages();
    const t = setInterval(fetchMessages, 5000); // poll every 5s
    return () => clearInterval(t);
  }, [invoiceId]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return alert("Please supply name and message");
    setSending(true);
    const res = await fetch("/api/portal/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoiceId,
        name,
        message: text,
      }),
    });
    if (res.ok) {
      setText("");
      fetchMessages();
    } else {
      alert("Failed to send message");
    }
    setSending(false);
  }

  return (
    <div className="border p-4 rounded-lg bg-white">
      <h3 className="font-semibold mb-3">Messages</h3>

      <div className="space-y-2 max-h-72 overflow-auto mb-3">
        {messages.length === 0 && <div className="text-sm text-gray-500">No messages yet.</div>}
        {messages.map((m) => (
          <div key={m.id} className="p-3 rounded border">
            <div className="text-xs text-gray-500">{new Date(m.ts).toLocaleString()}</div>
            <div className="font-semibold">{m.name}</div>
            <div className="whitespace-pre-wrap">{m.message}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="space-y-2">
        <input
          className="w-full border p-2 rounded"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Write your message..."
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}

export default function PortalPage() {
  const [invoice, setInvoice] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [uploadsMeta, setUploadsMeta] = useState<any[]>([]);
  const [loadingUploads, setLoadingUploads] = useState(false);

  async function openPortal(e?: React.FormEvent) {
    e?.preventDefault();
    if (!invoice.trim()) return alert("Enter invoice ID");
    // simple existence check - will succeed even if no data yet
    setAccessGranted(true);
    await fetchUploads();
  }

  async function fetchUploads() {
    setLoadingUploads(true);
    const res = await fetch(`/api/portal/uploads?invoiceId=${encodeURIComponent(invoice)}`);
    if (res.ok) {
      const data = await res.json();
      setUploadsMeta(data.uploads ?? []);
    } else {
      setUploadsMeta([]);
    }
    setLoadingUploads(false);
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Client Portal</h1>

      {!accessGranted && (
        <form onSubmit={openPortal} className="mb-6">
          <label className="block text-sm font-medium mb-2">Invoice / Project ID</label>
          <input
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
            className="w-full p-2 border rounded mb-3"
            placeholder="Enter invoice or project ID (e.g., 00123)"
          />
          <button className="bg-black text-white px-4 py-2 rounded">Open Portal</button>
        </form>
      )}

      {accessGranted && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold mb-3">Uploads</h2>
              <UploadForm invoiceId={invoice} onUploaded={fetchUploads} />
              <div className="mt-4 border rounded p-3 bg-white">
                <h4 className="font-medium mb-2">Uploaded files</h4>
                {loadingUploads && <div className="text-sm text-gray-500">Loading...</div>}
                {!loadingUploads && uploadsMeta.length === 0 && (
                  <div className="text-sm text-gray-500">No files uploaded yet.</div>
                )}
                <ul className="space-y-2">
                  {uploadsMeta.map((u) => (
                    <li key={u.filename} className="flex items-center justify-between border rounded p-2">
                      <div>
                        <a className="font-medium" href={u.url} target="_blank" rel="noreferrer">
                          {u.originalFilename}
                        </a>
                        <div className="text-xs text-gray-500">{new Date(u.ts).toLocaleString()}</div>
                        {u.note && <div className="text-sm text-gray-700 mt-1">{u.note}</div>}
                      </div>
                      <div className="text-xs text-gray-500">{u.sizeReadable}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <MessagesPanel invoiceId={invoice} />
            </div>
          </div>
        </>
      )}
    </main>
  );

}
