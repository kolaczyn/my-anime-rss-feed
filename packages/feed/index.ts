import { fetchAndExtractWatchedDates } from './make-feed/fetch-and-extract-watched-dates.ts';
import { makeJsonFeed } from './make-feed/make-json-feed.ts';
import { makeTsvFeed } from './make-feed/make-tsv-feed.ts';
import { narutoId, shippuudenId } from './shared/config.ts';
import { uploadFile } from './upload-file/upload-file.ts';

// This fixes timezone issues in Github actions
process.env.TZ = 'Europe/Warsaw';

const main = async () => {
  const [epNaruto, epShippuuden] = await Promise.all([
    fetchAndExtractWatchedDates(narutoId),
    fetchAndExtractWatchedDates(shippuudenId),
  ]);
  await Promise.all([
    uploadFile({
      pathname: 'feed/naruto.json',
      content: JSON.stringify(makeJsonFeed(epShippuuden)),
    }),
    uploadFile({
      pathname: 'feed/naruto.tsv',
      content: makeTsvFeed([...epNaruto, ...epShippuuden]),
    }),
  ]);
};

await main();
