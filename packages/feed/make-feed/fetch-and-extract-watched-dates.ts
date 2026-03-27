import { fetchWatchedDates } from '../mal-api/mal-api-watched-dates.ts';
import { extractWatchedDates } from '../mal-api/mal-extract-watched-dates/mal-extract-watched-dates';
import type { EpisodeFullData } from '../shared/types.ts';

import shippudenDb from '../jikan-api/anime-1735-cached.json';
import narutoDb from '../jikan-api/anime-20-cached.json';
import type { EpisodeData } from '../shared/types.ts';

const getAnimeData = (animeId: number) => {
  // this is not very generic, but whatever :p
  const dbToUse = animeId === 20 ? narutoDb : shippudenDb;
  const hashMap: Record<number, EpisodeData> = dbToUse.reduce(
    (acc, curr) => {
      acc[curr.mal_id] = { filler: curr.filler, title: curr.title };
      return acc;
    },
    {} as Record<number, EpisodeData>,
  );

  return hashMap;
};

export const fetchAndExtractWatchedDates = async (
  animeId: number,
  accessToken: string,
): Promise<EpisodeFullData[]> => {
  const watchedDates = await fetchWatchedDates(animeId, accessToken).then(
    (html) => extractWatchedDates(html),
  );

  const animeData = getAnimeData(animeId);
  const episodeFullData: EpisodeFullData[] = watchedDates.map((x) => {
    const epData = animeData[x.episode];
    if (!epData) {
      throw new Error(
        `Could not find data for episode ${x.episode} in anime ${animeId}`,
      );
    }
    return {
      ...x,
      ...epData,
    };
  });

  return episodeFullData;
};
