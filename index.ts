import { makeJsonFeed } from './src/make-rss-feed/make-json-feed';
import { makeRssFeed } from './src/make-rss-feed/make-rss-feed';
import { uploadJson, uploadRssFeed } from './src/upload-file/upload-file';
import { fetchWatchedDates } from './src/mal-api/mal-api-watched-dates';
import { extractWatchedDates } from './src/mal-api/mal-extract-watched-dates';
import { narutoShippuudenId, uploadType } from './src/shared/config';

const main = async () => {
  const watchedDatesHtml = await fetchWatchedDates(narutoShippuudenId);
  const episodesNum = extractWatchedDates(watchedDatesHtml);

  if (uploadType === 'json') {
    const feed = makeJsonFeed(episodesNum);
    await uploadJson({
      pathname: 'feed/naruto.json',
      content: feed,
    });
  } else {
    const feed = makeRssFeed(episodesNum);
    await uploadRssFeed({
      pathname: 'feed/naruto.json',
      content: feed,
    });
  }
};

await main();
