import { makeJsonFeed } from './make-feed/make-json-feed.ts';
import { makeTsvFeed } from './make-feed/make-tsv-feed.ts';
import { fetchWatchedDates } from './mal-api/mal-api-watched-dates.ts';
import { extractWatchedDates } from './mal-api/mal-extract-watched-dates/mal-extract-watched-dates';
import { narutoId, narutoShippuudenId } from './shared/config.ts';
import { uploadFile } from './upload-file/upload-file.ts';

const fetchAndExtractWatchedDates = (animeId: number) =>
  fetchWatchedDates(animeId).then((html) => extractWatchedDates(html));

const main = async () => {
  const [epNaruto, epNarutoShippuuden] = await Promise.all([
    fetchAndExtractWatchedDates(narutoId),
    fetchAndExtractWatchedDates(narutoShippuudenId),
  ]);
  await Promise.all([
    uploadFile({
      pathname: 'feed/naruto.json',
      content: JSON.stringify(makeJsonFeed(epNarutoShippuuden)),
    }),
    uploadFile({
      pathname: 'feed/naruto.tsv',
      content: makeTsvFeed([...epNaruto, ...epNarutoShippuuden]),
    }),
  ]);
};

await main();
