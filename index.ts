import { makeRssFeed } from './src/make-rss-feed/make-rss-feed';
import { getUserInformation } from './src/my-anime-list-api';
import { uploadFile } from './src/upload-file';

const main = async () => {
  await getUserInformation();

  const rssFile = await makeRssFeed();

  await uploadFile({ pathname: 'feed/naruto.xml', content: rssFile });
};

main();
