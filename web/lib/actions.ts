import { prisma } from "@/lib/prisma";

export async function getProperties() {
  return await prisma.properties.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
}
