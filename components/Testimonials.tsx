const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    quote:
      "Absolutely fantastic service! The team was professional, punctual, and my whole house sparkles. I highly recommend Diamond Cleaning Services.",
    initials: "SM",
  },
  {
    name: "James Carter",
    role: "Office Manager",
    quote:
      "We've been using Diamond for our office cleaning for months. Always reliable, thorough, and the staff are wonderful. Best decision we made.",
    initials: "JC",
  },
  {
    name: "Emma Wilson",
    role: "Tenant",
    quote:
      "The end of tenancy clean was spot on. I got my full deposit back because the property was immaculate. Worth every penny!",
    initials: "EW",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-blue-600 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-200">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Don&apos;t just take our word for it — here&apos;s what happy
            customers think.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex flex-col rounded-2xl bg-white/10 p-8 ring-1 ring-white/20 backdrop-blur"
            >
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L3.076 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.52-4.674z" />
                  </svg>
                ))}
              </div>
              <p className="mt-5 flex-1 leading-7 text-blue-50">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-700">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-blue-200">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
