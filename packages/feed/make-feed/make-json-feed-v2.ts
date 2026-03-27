import type { EpisodeFullData } from '../shared/types.ts';
import type { JsonFeedV2 } from './types.ts';

export const makeJsonFeedV2 = (episodes: EpisodeFullData[]): JsonFeedV2 => {
  const lastEp = episodes[0];
  if (!lastEp) {
    throw new Error(
      'Could not make json feed, because there is not last episode',
    );
  }
  return {
    buildDate: new Date(),
    lastWatchedEpisode: {
      title: lastEp.title,
      episodeNumber: lastEp.episode,
      wikiUrl: `https://naruto.fandom.com/wiki/${lastEp.title}`,
    },
    totalWatched: {
      naruto: 220,
      shippuden: lastEp.episode,
    },
  };
};
