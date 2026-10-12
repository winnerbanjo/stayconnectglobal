import { publicProperties } from "@/lib/platform/store";
import PropertiesClientView from "./PropertiesClientView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Stays by Location | Stay Connect Global",
  description:
    "Find your next stay by city or area. Explore verified luxury serviced residences across Nigeria.",
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
    <PropertiesClientView
      properties={await publicProperties()}
      initialLocation={String(params.location || params.city || "")}
      initialCategory={String(params.category || "")}
      query={query.toString()}
    />
  );
}
