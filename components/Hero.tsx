import Image from "next/image";
import diamondImage from "./diamond.jpeg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white"
    >
      <div className="absolute inset-0">
        <Image
          src={diamondImage}
          alt="Diamond Cleaning background"
          fill
          priority
          className="h-full w-full object-cover opacity-20"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-blue-100 ring-1 ring-white/30">
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
                d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3L4.3 7.6l5.3-.8L12 2z"
              />
            </svg>
            Trusted &amp; Professional Cleaning
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Sparkling Clean Spaces,{" "}
            <span className="text-blue-200">Every Time</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Diamond Cleaning Services delivers professional, reliable cleaning
            for homes and businesses. Book online in minutes and enjoy a
            spotless space you&apos;ll love.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#booking"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition-transform hover:scale-105"
            >
              Book Online Now
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-extrabold">500+</p>
              <p className="text-sm text-blue-200">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold">5.0</p>
              <p className="text-sm text-blue-200">Star Rating</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold">100%</p>
              <p className="text-sm text-blue-200">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
