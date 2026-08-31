const serviceLinks = [
  "Domestic Cleaning",
  "End of Tenancy Cleaning",
  "Commercial Cleaning",
  "Deep Cleaning",
  "Carpet Cleaning",
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-100">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3L4.3 7.6l5.3-.8L12 2z"
                  />
                </svg>
              </span>
<span className="text-xl font-bold text-white">
                Diamond <span className="text-blue-300">Clean Services</span>
              </span>
            </div>
            <p className="mt-4 leading-7 text-blue-200">
Professional, reliable cleaning services for homes and businesses
              in the UK. Sparkling results, every single time.
            </p>
            <div className="mt-6 flex gap-3">
              {["Facebook", "Instagram", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-blue-200 transition-colors hover:bg-blue-600 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h-2v-2h2V8a3 3 0 013-3h2v2h-2v2h2l-1 2h-1v6z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-blue-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#booking"
                    className="text-blue-200 transition-colors hover:text-white"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-blue-200">
              <li>
<a
                  href="tel:+447477133182"
                  className="hover:text-white"
                >
                  +447477133182
                </a>
              </li>
              <li>
<a
                  href="mailto:hello@diamondcleaningservices.com"
                  className="hover:text-white"
                >
                  hello@diamondcleaningservices.com
                </a>
              </li>
              <li>123 Baker Street, London</li>
              <li>United Kingdom</li>
            </ul>
            <a
              href="#booking"
              className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500"
            >
              Book Now
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-blue-900 pt-6 text-center text-sm text-blue-300">
          © {new Date().getFullYear()} Diamond Cleaning Services. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
