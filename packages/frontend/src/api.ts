import { storageSuffix } from "./storage-suffix.ts";
import type { JsonFeedV2 } from "./types.ts";

export const fetchData = async (): Promise<JsonFeedV2> => {
  const feedUrl = `https://w6d9sazgkqmr96r5.public.blob.vercel-storage.com/feed/v2/naruto.json${storageSuffix}`;
  const response = await fetch(feedUrl);
  return await response.json();
};
