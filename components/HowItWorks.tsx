const steps = [
  {
    number: "01",
    title: "Book Online",
    description:
      "Choose your service, pick a date and time, and tell us what you need. It only takes a few minutes.",
  },
  {
    number: "02",
    title: "We Confirm",
    description:
      "Our team confirms your booking and sends a professional cleaner to your location at the scheduled time.",
  },
  {
    number: "03",
    title: "Enjoy Your Clean",
    description:
      "Sit back and relax while we work our magic. You're left with a sparkling, spotless, fresh space.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-blue-900 md:text-4xl">
            Book in Three Easy Steps
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Getting a professionally cleaned home or office has never been
            simpler.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full translate-x-1/2 bg-blue-200 md:block" />
              )}
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-lg font-extrabold text-white shadow-lg">
                {step.number}
              </div>
              <h3 className="mt-6 text-xl font-bold text-blue-900">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs leading-7 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#booking"
            className="inline-block rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700"
          >
            Get Started — Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
