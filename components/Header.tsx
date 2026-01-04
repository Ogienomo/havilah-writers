import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Havilah Writers
        </Link>

        <nav className="space-x-8 text-gray-700">
          <Link href="/services" className="hover:text-black">
            Services
          </Link>
          <Link href="/pricing" className="hover:text-black">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-black">
            About
          </Link>
          <Link href="/contact" className="hover:text-black">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
