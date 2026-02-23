import { makeJsonFeed } from './make-feed/make-json-feed.ts';
import { makeTsvFeed } from './make-feed/make-tsv-feed.ts';
import { fetchWatchedDates } from './mal-api/mal-api-watched-dates.ts';
import { extractWatchedDates } from './mal-api/mal-extract-watched-dates.ts';
import { narutoShippuudenId } from './shared/config.ts';
import { uploadJson, uploadTsv } from './upload-file/upload-file.ts';

const main = async () => {
  const watchedDatesHtml = await fetchWatchedDates(narutoShippuudenId);
  const episodesNum = extractWatchedDates(watchedDatesHtml);

  await Promise.all([
    uploadJson({
      pathname: 'feed/naruto.json',
      content: makeJsonFeed(episodesNum),
    }),
    uploadTsv({
      pathname: 'feed/naruto.tsv',
      content: makeTsvFeed(episodesNum),
    }),
  ]);
};

await main();
