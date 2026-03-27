import { storageSuffix } from "./storage-suffix.ts";
import type { HeatmapSource, JsonFeed } from "./types.ts";

export const fetchData = async (): Promise<JsonFeed> => {
  const feedUrl = `https://w6d9sazgkqmr96r5.public.blob.vercel-storage.com/feed/v2/naruto.json${storageSuffix}`;
  const response = await fetch(feedUrl);
  return await response.json();
};

export const fetchHeatmapSource = async (): Promise<HeatmapSource> => {
  const feedUrl = `https://w6d9sazgkqmr96r5.public.blob.vercel-storage.com/feed/v2/naruto-heatmap-source.json${storageSuffix}`;
  const response = await fetch(feedUrl);
  return await response.json();
};
