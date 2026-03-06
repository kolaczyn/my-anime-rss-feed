import type { JsonFeed } from "./types.ts";

export const fetchData = async (): Promise<JsonFeed> => {
  const feedUrl = `https://w6d9sazgkqmr96r5.public.blob.vercel-storage.com/feed/naruto.json?random=${Math.random()}`;
  const response = await fetch(feedUrl);
  return await response.json();
};
