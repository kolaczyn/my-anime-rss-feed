import type { EpisodeWatchedDate } from '../shared/types';
import type { HeatmapSource } from './types';

const pad = (num: Number) => (String(num).length == 1 ? `0${num}` : num);

const getItemDate = (episode: EpisodeWatchedDate): string => {
  const year = episode.date.getFullYear();
  const month = episode.date.getMonth() + 1;
  const day = episode.date.getDate();
  return `${year}-${pad(month)}-${pad(day)}`;
};

export const makeHeatmapSource = (
  episodes: EpisodeWatchedDate[],
): HeatmapSource => {
  let aggregate: Record<string, number> = {};
  for (let ep of episodes) {
    const date = getItemDate(ep);
    if (aggregate[date] == null) {
      aggregate[date] = 1;
    } else {
      aggregate[date] += 1;
    }
  }
  const source = Object.entries(aggregate).map(([date, value]) => ({
    date,
    value,
  }));

  return source;
};
