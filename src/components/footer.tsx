import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Destinations", href: "#destinations" },
      { label: "My Bookings", href: "#bookings" },
      { label: "My Profile", href: "#profile" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#help" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div>
          <Link
            href="/"
            className="font-serif text-6xl font-bold tracking-tight md:text-8xl"
          >
            Wanderlast
          </Link>
          <p className="mt-4 text-base text-zinc-400">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1fr_1fr_1fr]">
          <div className="md:col-span-1">
            <h3 className="text-xs font-medium tracking-widest text-zinc-300 uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-zinc-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-4 flex max-w-xs items-center bg-zinc-800">
              <input
                type="email"
                required
                placeholder="Enter email"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-zinc-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-3 py-3 text-zinc-400 transition-colors hover:text-white"
              >
                <ArrowUpRightIcon className="size-4" />
              </button>
            </form>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-medium tracking-widest text-zinc-300 uppercase">
                {column.title}
              </h3>
              <ul className="mt-6 space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-base text-zinc-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-medium tracking-widest text-zinc-300 uppercase">
              Contact Us
            </h3>
            <div className="mt-6 space-y-4 text-base">
              <p>
                <a
                  href="tel:+17869011622"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@wandarland.com"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  info@wandarland.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 text-sm text-zinc-500 sm:flex-row">
          <p>© 2026 Wanderlust. All rights reserved.</p>
          <div className="flex gap-8">
            <a
              href="https://x.com"
              aria-label="X (Twitter)"
              className="text-white transition-colors hover:text-zinc-300"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-white transition-colors hover:text-zinc-300"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-white transition-colors hover:text-zinc-300"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07Zm0-2.16C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84Zm0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 3.99Zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
