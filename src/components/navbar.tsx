import Link from "next/link";
import { UserIcon } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "#bookings" },
  { label: "Admin", href: "#admin" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto flex h-14 w-full items-center justify-between px-4">

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-sm transition-colors hover:text-primary ${
                  link.active
                    ? "font-medium text-primary underline underline-offset-4"
                    : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-tight text-[#0e7a8a] hover:opacity-80"
        >
          Wanderlast
        </Link>


        <div className="ml-auto flex items-center gap-6">
          <Link
            href="#profile"
            className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary"
          >
            <UserIcon className="size-4" />
            Profile
          </Link>
          <Link href="#login" className="text-sm text-foreground hover:text-primary">
            Login
          </Link>
          <Link href="#signup" className="text-sm text-foreground hover:text-primary">
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
