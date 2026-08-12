import Link from "next/link";

export default function BookingRequestCancelled() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-blue-900">
          Booking Request Cancelled
        </h1>
        <p className="mt-4 leading-7 text-gray-600">
          Your booking request was not submitted. You can try again anytime and
          we&apos;ll be happy to help.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/#booking"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
