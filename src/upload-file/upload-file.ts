import { put } from '@vercel/blob';

type Args = {
  pathname: string;
  content: string;
};

export const uploadFile = async ({ pathname, content }: Args) => {
  console.log('Saving Rss feed...');

  const result = await put(pathname, content, {
    access: 'public',
    allowOverwrite: true,
    contentType: 'application/rss+xml',
  });

  console.log('Saved on', result.url);
};
