"use client";

import { useState } from "react";
import Image from "next/image";
import diamondLogo from "./diamond.jpeg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3">
          <Image
            src={diamondLogo}
            alt="Diamond Cleaning Services logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
<span className="text-xl font-bold text-blue-900">
            Diamond <span className="text-blue-600">Clean Services</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
<a
            href="tel:+447477133182"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            +447477133182
          </a>
          <a
            href="#booking"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Book Now
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-blue-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-blue-100 bg-white px-6 py-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
              >
                Book Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
