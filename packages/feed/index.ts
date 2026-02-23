import { makeJsonFeed } from './make-feed/make-json-feed.ts';
import { makeRssFeed } from './make-feed/make-rss-feed.ts';
import { fetchWatchedDates } from './mal-api/mal-api-watched-dates.ts';
import { extractWatchedDates } from './mal-api/mal-extract-watched-dates.ts';
import { narutoShippuudenId, uploadType } from './shared/config.ts';
import { uploadJson, uploadRssFeed } from './upload-file/upload-file.ts';

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
