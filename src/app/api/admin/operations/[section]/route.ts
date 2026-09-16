import { randomUUID } from "node:crypto";
import { z } from "zod";
import { requireAdmin } from "@/lib/platform/auth";
import { list, save, transaction, removeOperation } from "@/lib/platform/store";
import { errorResponse, imageUrl } from "@/lib/platform/validation";

const text = z.string().trim().min(1).max(200);
const schemas = {
  fleet: z.object({ name: text, category: text, driverName: text, dailyRate: z.coerce.number().min(0), image: imageUrl, status: z.enum(["Available", "On Chauffeur Duty", "Maintenance"]) }),
  dining: z.object({ name: text, category: z.enum(["Fine Dining", "Breakfast", "Room Service Bar", "Artisanal Cocktails"]), price: z.coerce.number().min(0), description: z.string().trim().max(2000), available: z.boolean() }),
  housekeeping: z.object({ roomId: text, unit: text, assignedHousekeeper: z.string().trim().max(200), cleaningStatus: z.enum(["Not inspected", "Clean & Inspected", "Turnover In Progress", "Dirty / Needs Cleaning", "Out of Service"]) }),
};
type Context = { params: Promise<{ section: string }> };
async function sectionOf(context: Context) {
  const { section } = await context.params;
  if (!Object.hasOwn(schemas, section)) throw new Error("Unknown operations section");
  return section as keyof typeof schemas;
}
export async function GET(_req: Request, context: Context) {
  try {
    await requireAdmin();
    return Response.json({ success: true, data: await list(await sectionOf(context)) });
  } catch (e) { return errorResponse(e); }
}
async function write(req: Request, context: Context, update: boolean) {
  try {
    await requireAdmin();
    const section = await sectionOf(context);
    const body = await req.json();
    const fields = schemas[section].parse(body);
    const data = await transaction(async () => {
      const existing = update ? (await list(section)).find(r => r.id === body.id) : undefined;
      if (update && !existing) throw new Error("Record not found");
      if (section === "housekeeping") {
        const housekeeping = fields as z.infer<typeof schemas.housekeeping>;
        if (!(await list("rooms")).some(r => r.id === housekeeping.roomId)) throw new Error("Choose an existing room");
      }
      return save(section, { ...existing, ...fields, id: existing?.id || `${section}-${randomUUID()}`,
        ...(section === "housekeeping" ? { lastCleaned: "cleaningStatus" in fields && fields.cleaningStatus === "Clean & Inspected" && existing?.cleaningStatus !== fields.cleaningStatus ? new Date().toISOString() : existing?.lastCleaned || "" } : {}) });
    });
    return Response.json({ success: true, data }, { status: update ? 200 : 201 });
  } catch (e) { return errorResponse(e); }
}
export const POST = (req: Request, context: Context) => write(req, context, false);
export const PATCH = (req: Request, context: Context) => write(req, context, true);

export async function DELETE(req: Request, context: Context) {
  try {
    await requireAdmin();
    const section = await sectionOf(context);
    const { id } = z.object({ id: z.string().min(1) }).parse(await req.json());
    await removeOperation(section, id);
    return Response.json({ success: true });
  } catch (e) { return errorResponse(e); }
}
