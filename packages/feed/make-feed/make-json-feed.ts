import type { EpisodeFullData } from '../shared/types.ts';
import type { JsonFeed } from './types.ts';

const getEpisodesInLastSevenDays = (episodes: EpisodeFullData[]): number => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const episodesInLastSevenDays = episodes.filter(
    (x) => +new Date(x.date) - +sevenDaysAgo > 0,
  );
  return episodesInLastSevenDays.length;
};

export const makeJsonFeed = (episodes: EpisodeFullData[]): JsonFeed => {
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
      watchDate: lastEp.date,
    },
    totalWatched: {
      naruto: 220,
      shippuden: lastEp.episode,
      lastSevenDays: getEpisodesInLastSevenDays(episodes),
    },
  };
};
