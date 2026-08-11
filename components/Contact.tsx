import BookingForm from "./BookingForm";

export default function Contact() {
  return (
    <section id="contact" className="bg-blue-50/60 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Contact Us
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-blue-900 md:text-4xl">
            Book Online or Get In Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have a question or ready to book? Reach out — we&apos;d love to
            help.
          </p>
        </div>

        <div
          id="booking"
          className="mt-14 grid scroll-mt-24 gap-10 lg:grid-cols-2 lg:items-start"
        >
          <BookingForm />

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-900">
              Contact Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
<a
                    href="tel:0256731144"
                    className="text-blue-600 hover:underline"
                  >
                    0256731144
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
<a
                    href="mailto:hello@diamondcleaningservices.com"
                    className="text-blue-600 hover:underline"
                  >
                    hello@diamondcleaningservices.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
<p className="font-semibold text-gray-800">Location</p>
                  <p className="text-gray-600">United Kingdom</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-lg">
              <h4 className="text-lg font-bold">Office Hours</h4>
              <ul className="mt-3 space-y-2 text-blue-100">
                <li className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-semibold text-white">8am – 6pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold text-white">9am – 5pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold text-white">Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
