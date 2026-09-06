"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#FAF9F6] text-black gap-5">
      <h1 className="text-4xl font-serif">We couldn’t load this page</h1>
      <p className="text-neutral-600 text-sm">
        Please try again. Your saved information is still safe.
      </p>
      <button onClick={reset} className="px-6 py-3 bg-[#C6A15B] rounded-lg">
        Try again
      </button>
    </main>
  );
}
