import Link from "next/link";
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] text-black p-8 gap-5">
      <h1 className="font-serif text-4xl">This stay isn’t available</h1>
      <p className="text-sm text-neutral-600">
        The listing may have moved or is not yet published.
      </p>
      <Link href="/properties" className="bg-[#C6A15B] px-6 py-3 rounded-lg">
        Explore available stays
      </Link>
    </main>
  );
}
