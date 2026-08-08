const services = [
  {
    title: "Domestic Cleaning",
    description:
      "Regular home cleaning tailored to your schedule. We keep your living space spotless, fresh, and welcoming.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    title: "End of Tenancy Cleaning",
    description:
      "Deep professional cleaning to help you get your deposit back and leave your old property in pristine condition.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Commercial Cleaning",
    description:
      "Professional cleaning for offices, shops, and businesses. Keep your workplace clean and productive for your team and clients.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: "Deep Cleaning",
    description:
      "A thorough, top-to-bottom clean reaching every corner, built-up dirt, and hidden grime for a truly fresh home.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5h2M9 5h6M10 9h4M8 9h8M7 13h10M5 17h14M12 3v2M12 21v-2"
        />
      </svg>
    ),
  },
  {
    title: "Carpet Cleaning",
    description:
      "Professional steam and dry carpet cleaning that removes stains, odours, and allergens, leaving carpets like new.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7h18M3 12h18M3 17h18"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-blue-900 md:text-4xl">
            Professional Cleaning Solutions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From homes to businesses, we offer a complete range of cleaning
            services tailored to your needs.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-blue-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="mt-6 text-xl font-bold text-blue-900">
                {service.title}
              </h3>
              <p className="mt-3 leading-7 text-gray-600">
                {service.description}
              </p>
              <a
                href="#booking"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Book this service
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          ))}

          <div className="flex flex-col items-center justify-center rounded-2xl bg-blue-600 p-8 text-center text-white">
            <h3 className="text-xl font-bold">Need a Custom Package?</h3>
            <p className="mt-3 leading-7 text-blue-100">
              We tailor cleaning plans to your specific needs. Get in touch for
              a personalised quote.
            </p>
            <a
              href="#contact"
              className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
