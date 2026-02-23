import type { EpisodeWatchedDate } from '../shared/types';

const pad = (num: Number) => (String(num).length == 1 ? `0${num}` : num);

const getItemDate = (episode: EpisodeWatchedDate): string => {
  const year = episode.date.getFullYear();
  const month = episode.date.getMonth() + 1;
  const day = episode.date.getDate();
  return `${year}-${pad(month)}-${pad(day)}`;
};

export const makeTsvFeed = (episodes: EpisodeWatchedDate[]): string => {
  const header = 'date\twatched';

  let aggregate: Record<string, number> = {};
  for (let ep of episodes) {
    const date = getItemDate(ep);
    if (aggregate[date] == null) {
      aggregate[date] = 1;
    } else {
      aggregate[date] += 1;
    }
  }
  const body = Object.entries(aggregate)
    .map(([date, count]) => `${date}\t${count}`)
    .join('\n');

  return [header, body].join('\n');
};
