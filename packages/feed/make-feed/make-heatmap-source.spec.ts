import { expect, test } from 'bun:test';
import type { EpisodeWatchedDate } from '../shared/types';
import { makeHeatmapSource } from './make-heatmap-source';

test('make-heatmap-source', () => {
  expect(makeHeatmapSource(exampleData)).toEqual([
    {
      date: '2025-07-03',
      value: 1,
    },
    {
      date: '2025-07-02',
      value: 2,
    },
  ]);
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
