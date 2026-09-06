import { publicRooms, findPublicRoom } from "@/lib/platform/store";
import { errorResponse } from "@/lib/platform/validation";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const room = await findPublicRoom(slug);
    return room
      ? Response.json({ success: true, data: room })
      : Response.json({ error: "Room not found" }, { status: 404 });
  } catch (e) {
    return errorResponse(e);
  }
}
