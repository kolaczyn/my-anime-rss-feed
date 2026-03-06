import type { EpisodeFullData, EpisodeWatchedDate } from '../shared/types.ts';
import type { JsonFeed } from './types.ts';

export const makeJsonFeed = (episodes: EpisodeFullData[]): JsonFeed => ({
  title: 'Naruto Shippuuden',
  lastBuildDate: new Date(),
  items: episodes.map((ep) => ({
    title: ep.episode.toString(),
    episodeTitle: ep.title,
    pubDate: ep.date,
  })),
});
