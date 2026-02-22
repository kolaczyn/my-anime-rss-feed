import type { EpisodeWatchedDate } from '../shared/types';
import type { JsonFeed } from './types';

export const makeJsonFeed = (episodes: EpisodeWatchedDate[]): JsonFeed => ({
  title: 'Naruto Shippuuden',
  lastBuildDate: new Date(),
  items: episodes.map((ep) => ({
    title: ep.episode.toString(),
    pubDate: ep.date,
  })),
});
