import { cache } from "react";

export const revalidate = 3600; // revalidate the data at most every hour

export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id });
  return item;
});
