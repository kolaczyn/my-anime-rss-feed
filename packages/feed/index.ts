import { fetchAndExtractWatchedDates } from './make-feed/fetch-and-extract-watched-dates.ts';
import { makeJsonFeed } from './make-feed/make-json-feed.ts';
import { makeHeatmapSource } from './make-feed/make-heatmap-source.ts';
import { fetchAccessToken } from './mal-api/mal-api-auth.ts';
import { narutoId, shippuudenId } from './shared/config.ts';
import { uploadFile } from './upload-file/upload-file.ts';

// This fixes timezone issues in Github actions
process.env.TZ = 'Europe/Warsaw';

const main = async () => {
  const accessToken = (await fetchAccessToken()).access_token;

  const [epNaruto, epShippuuden] = await Promise.all([
    fetchAndExtractWatchedDates(narutoId, accessToken),
    fetchAndExtractWatchedDates(shippuudenId, accessToken),
  ]);
  await Promise.all([
    uploadFile({
      pathname: 'feed/v2/naruto.json',
      content: JSON.stringify(makeJsonFeed(epShippuuden)),
    }),
    uploadFile({
      pathname: 'feed/v2/naruto-heatmap-source.json',
      content: JSON.stringify(
        makeHeatmapSource([...epNaruto, ...epShippuuden]),
      ),
    }),
  ]);
};

await main();
