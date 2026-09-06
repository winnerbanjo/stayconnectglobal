import Link from "next/link";
import { Plane, ArrowRight, Globe2 } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
export const metadata = {
  title: "Flights — Coming Soon | Stay Connect",
  description:
    "Your journey, connected. Flight booking is coming to Stay Connect. Explore accommodation and airport transfers today.",
};
export default function FlightsPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />
      <main className="pt-36 pb-24 px-6 max-w-6xl mx-auto">
        <section className="relative overflow-hidden rounded-3xl border border-[#C6A15B]/30 bg-gradient-to-br from-[#29251e] to-[#111111] px-6 py-16 md:p-20">
          <Globe2
            aria-hidden
            className="absolute -right-28 top-10 w-[450px] h-[450px] text-[#C6A15B]/10 stroke-[0.5]"
          />
          <div className="relative max-w-2xl space-y-7">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A15B]/40 text-[#E6C98C] uppercase tracking-[0.2em] text-xs">
              <Plane size={16} /> Flights · Coming soon
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl leading-tight">
              A great stay begins
              <br />
              <span className="text-[#C6A15B]">with the journey.</span>
            </h1>
            <p className="text-neutral-300 max-w-lg text-base leading-relaxed">
              Soon, you’ll be able to book your flight through Stay Connect. One
              place to bring your travel plans together, from take-off to
              check-in.
            </p>
            <p className="text-sm text-neutral-400">
              Flight booking is not available yet. In the meantime, discover
              your next stay or arrange an airport transfer.
            </p>
            <div className="flex flex-wrap gap-4 pt-3">
              <Link
                href="/properties"
                className="bg-[#C6A15B] text-black px-6 py-4 rounded-lg text-sm font-semibold inline-flex gap-3 items-center"
              >
                Explore stays
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/transfers"
                className="border border-[#777] px-6 py-4 rounded-lg text-sm"
              >
                Airport transfers
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
