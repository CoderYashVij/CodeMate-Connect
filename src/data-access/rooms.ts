import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { eq, or, ilike } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  if (!search || !search.trim()) {
    const rooms = await db.query.room.findMany();
    return rooms;
  }

  const searchLower = search.toLowerCase().trim();
  
  // Only match if search term starts any word in tags (case insensitive)
  // Patterns to match word beginnings:
  // 1. At the very beginning of tags
  // 2. After a space (word boundary)
  // 3. After a comma (tag separator)
  const patterns = [
    `${searchLower}%`,        // starts at beginning: "py" matches "Python, JavaScript"
    `% ${searchLower}%`,      // starts after space: "py" matches "JavaScript Python"
    `,${searchLower}%`,       // starts after comma: "py" matches "JavaScript,Python"  
    `, ${searchLower}%`,      // starts after comma+space: "py" matches "JavaScript, Python"
  ];
  
  // Build OR conditions for word-start matching only
  const whereConditions = patterns.map(pattern => 
    ilike(room.tags, pattern)
  );

  const rooms = await db.query.room.findMany({
    where: or(...whereConditions),
  });
  
  return rooms;
}

export async function getUserRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated");
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });

  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  const inserted = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning();
  return inserted[0];
}

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning();
  return updated[0];
}
