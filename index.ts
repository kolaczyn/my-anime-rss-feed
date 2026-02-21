import { put } from '@vercel/blob';
import { makeRssFeed } from './src/make-rss-feed/make-rss-feed';

const uploadFile = async () => {
  const rss = makeRssFeed();
  console.log(rss);

  // console.log('Saving Rss feed...');
  // const { url } = await put('feed/naruto.rss', rss, {
  //   access: 'public',
  //   allowOverwrite: true,
  // });
  // console.log('Saved on', url);
};

uploadFile();
