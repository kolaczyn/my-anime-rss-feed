import { makeJsonFeed } from './make-feed/make-json-feed.ts';
import narutoDb from './jikan-api/anime-20-cached.json';
import shippudenDb from './jikan-api/anime-1735-cached.json';
import { makeTsvFeed } from './make-feed/make-tsv-feed.ts';
import { fetchWatchedDates } from './mal-api/mal-api-watched-dates.ts';
import { extractWatchedDates } from './mal-api/mal-extract-watched-dates/mal-extract-watched-dates';
import { narutoId, shippuudenId } from './shared/config.ts';
import { uploadFile } from './upload-file/upload-file.ts';
import type { EpisodeData, EpisodeFullData } from './shared/types.ts';

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

const fetchAndExtractWatchedDates = async (
  animeId: number,
): Promise<EpisodeFullData[]> => {
  const watchedDates = await fetchWatchedDates(animeId).then((html) =>
    extractWatchedDates(html),
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

const main = async () => {
  const [epNaruto, epShippuuden] = await Promise.all([
    fetchAndExtractWatchedDates(narutoId),
    fetchAndExtractWatchedDates(shippuudenId),
  ]);
  await Promise.all([
    uploadFile({
      pathname: 'feed/naruto.json',
      content: JSON.stringify(makeJsonFeed(epShippuuden)),
    }),
    uploadFile({
      pathname: 'feed/naruto.tsv',
      content: makeTsvFeed([...epNaruto, ...epShippuuden]),
    }),
  ]);
};

await main();
