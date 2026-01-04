"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [invoiceId, setInvoiceId] = useState<string | null>(null);

  useEffect(() => {
    const storedInvoice = localStorage.getItem("havilahInvoiceId");
    if (storedInvoice) {
      setInvoiceId(storedInvoice);
    }
  }, []);

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          Havilah Writers
        </Link>

        {/* MAIN NAV */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4 text-sm">
          
          {/* CLIENT PORTAL BADGE */}
          {invoiceId && (
            <Link
              href={`/portal?invoice=${invoiceId}`}
              className="flex items-center gap-2 border px-4 py-2 rounded bg-green-50 text-green-700 hover:bg-green-100"
            >
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
              Client Portal
            </Link>
          )}

          <Link
            href="/pricing"
            className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
