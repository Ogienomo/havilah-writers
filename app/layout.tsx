import "./globals.css";
import Script from "next/script";
import type { ReactNode } from "react";

export const metadata = {
  title: "Havilah Writers",
  description:
    "Precision research. Ethical writing. Global academic standards.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Paystack Inline Script */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />
      </head>

      <body>
        {children}
      </body>
    </html>
  );
}
