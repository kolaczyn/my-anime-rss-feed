import type { EpisodeWatchedDate } from '../shared/types.ts';
import type { JsonFeed } from './types.ts';

export const makeJsonFeed = (episodes: EpisodeWatchedDate[]): JsonFeed => ({
  title: 'Naruto Shippuuden',
  lastBuildDate: new Date(),
  items: episodes.map((ep) => ({
    title: ep.episode.toString(),
    pubDate: ep.date,
  })),
});
