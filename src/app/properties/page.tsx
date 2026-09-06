import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import PropertySearch from "@/components/properties/PropertySearch";
import { publicProperties } from "@/lib/platform/store";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Hotels, Apartments & Residences by Location | Stay Connect",
  description:
    "Find your next stay by city or area. Explore Stay Connect Residence and verified hotels, apartments and residences in Nigeria.",
};
export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const key of ["checkIn", "checkOut", "guests"])
    if (typeof params[key] === "string") query.set(key, params[key] as string);
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111]">
      <Navbar />
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-5 sm:px-8">
        <header className="max-w-2xl mb-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#947137]">
            Find your place
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl">
            Exceptional stays.
            <br />
            The right location.
          </h1>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Discover hotels, serviced apartments and private residences. Search
            your preferred neighbourhood and find a place that feels right for
            you.
          </p>
        </header>
        <PropertySearch
          properties={await publicProperties()}
          initialLocation={String(params.location || params.city || "")}
          initialCategory={String(params.category || "")}
          query={query.toString()}
        />
      </main>
      <Footer />
    </div>
  );
}
