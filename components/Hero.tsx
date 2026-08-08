import Image from "next/image";
import diamondImage from "./diamond.jpeg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-blue-950 text-white"
    >
      {/* Decorative background glows */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/40 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl" />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left: Content */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-sm font-semibold text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Rated 5.0 by 500+ happy customers
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              A Cleaner Home,
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                A Brighter Life.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-200">
              From sparkling homes to spotless offices, Diamond Clean Services
              brings professional, eco-friendly cleaning right to your door.
              Book online in under a minute.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#booking"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3.5 text-sm font-bold text-blue-950 shadow-xl shadow-blue-500/30 transition-transform hover:scale-105"
              >
                Book Online Now
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8">
              <div>
                <p className="text-3xl font-extrabold text-cyan-300">500+</p>
                <p className="text-sm text-blue-300">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-cyan-300">10+</p>
                <p className="text-sm text-blue-300">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-cyan-300">5.0</p>
                <p className="text-sm text-blue-300">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right: Image with floating cards */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-3xl ring-4 ring-cyan-400/30">
              <Image
                src={diamondImage}
                alt="Diamond Clean Services"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Floating badge - top */}
            <div className="absolute -right-4 top-8 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl lg:-right-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-blue-950">Guaranteed</p>
                <p className="text-xs text-gray-500">Satisfaction</p>
              </div>
            </div>

            {/* Floating badge - bottom */}
            <div className="absolute -left-4 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl lg:-left-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-blue-950">24 hr</p>
                <p className="text-xs text-gray-500">Fast Response</p>
              </div>
            </div>

            {/* Eagle / stat chip */}
            <div className="absolute -bottom-5 right-1/3 hidden rounded-2xl bg-white px-5 py-3 text-center shadow-xl sm:block">
              <p className="text-2xl font-extrabold text-blue-600">10k+</p>
              <p className="text-xs text-gray-500">Rooms Cleared</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
