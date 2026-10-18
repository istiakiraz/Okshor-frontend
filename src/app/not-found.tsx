import Link from "next/link";
import { Home} from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
          404 Error
        </p>

        <h1 className="mt-4 text-6xl font-bold tracking-tight text-gray-900 sm:text-8xl">
          404
        </h1>

        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
          Page not found
        </h2>

        <p className="mt-3 text-base leading-7 text-gray-500">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          It may have been moved or deleted.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-800"
          >
            <Home size={18} />
            Back to Home
          </Link>

        
        </div>
      </div>
    </main>
  );
}
