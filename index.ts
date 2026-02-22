import { makeRssFeed } from './src/make-rss-feed/make-rss-feed';
import { fetchWatchedDates } from './src/mal-api/mal-api-watched-dates';
import { extractWatchedDates } from './src/mal-api/mal-extract-watched-dates';
import { uploadFile } from './src/upload-file/upload-file';

const narutoShippuudenId = 1735;

const main = async () => {
  const watchedDatesHtml = await fetchWatchedDates(narutoShippuudenId);
  const episodesNum = extractWatchedDates(watchedDatesHtml);

  const rssFile = await makeRssFeed(episodesNum);

  await uploadFile({ pathname: 'feed/naruto.xml', content: rssFile });
};

main();
