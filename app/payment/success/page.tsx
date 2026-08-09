import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-blue-900">
          Payment Successful!
        </h1>
        <p className="mt-4 leading-7 text-gray-600">
          Thank you for your booking! Your payment has been received and your
          cleaning appointment is confirmed. We&apos;ll be in touch shortly with
          the details.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
