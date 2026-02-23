import { makeJsonFeed } from './make-feed/make-json-feed.ts';
import { makeTsvFeed } from './make-feed/make-tsv-feed.ts';
import { fetchWatchedDates } from './mal-api/mal-api-watched-dates.ts';
import { extractWatchedDates } from './mal-api/mal-extract-watched-dates.ts';
import { narutoId, narutoShippuudenId } from './shared/config.ts';
import { uploadJson, uploadTsv } from './upload-file/upload-file.ts';

const getNarutoEpisodes = async () => {
  const watchedDatesHtml = await fetchWatchedDates(narutoId);
  const episodesNum = extractWatchedDates(watchedDatesHtml);
  return episodesNum;
};

const getNarutoShippuudenEpisodes = async () => {
  const watchedDatesHtml = await fetchWatchedDates(narutoShippuudenId);
  const episodesNum = extractWatchedDates(watchedDatesHtml);
  return episodesNum;
};

const main = async () => {
  const [epNaruto, epNarutoShippuuden] = await Promise.all([
    getNarutoEpisodes(),
    getNarutoShippuudenEpisodes(),
  ]);
  await Promise.all([
    uploadJson({
      pathname: 'feed/naruto.json',
      content: makeJsonFeed(epNarutoShippuuden),
    }),
    uploadTsv({
      pathname: 'feed/naruto.tsv',
      content: makeTsvFeed([...epNaruto, ...epNarutoShippuuden]),
    }),
  ]);
};

await main();
