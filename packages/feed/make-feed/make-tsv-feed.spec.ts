import { expect, test } from 'bun:test';
import type { EpisodeWatchedDate } from '../shared/types';
import { makeTsvFeed } from './make-tsv-feed';

test('make-tsv-feed', () => {
  expect(makeTsvFeed(exampleData)).toMatchInlineSnapshot(`
    "date	watched
    2025-07-03	1
    2025-07-02	2"
  `);
});

const exampleData: EpisodeWatchedDate[] = [
  {
    episode: 101,
    date: new Date(2025, 6, 3, 15, 30),
  },
  {
    episode: 100,
    date: new Date(2025, 6, 2, 13, 50),
  },
  {
    episode: 99,
    date: new Date(2025, 6, 2, 13, 40),
  },
];
