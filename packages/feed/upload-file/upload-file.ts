import { put, type PutCommandOptions } from '@vercel/blob';

type UploadRssFeedArgs = {
  pathname: string;
  content: string;
};

export const uploadRssFeed = async ({
  pathname,
  content,
}: UploadRssFeedArgs) => {
  console.log('Saving Rss feed...');

  const result = await put(pathname, content, {
    access: 'public',
    allowOverwrite: true,
    contentType: 'application/rss+xml',
  });

  console.log('Saved Rss feed on', result.url);
};

type UploadJsonArgs = {
  pathname: `${string}.json`;
  content: object;
};

export const uploadJson = async ({ pathname, content }: UploadJsonArgs) => {
  console.log('Saving json...');

  const result = await put(pathname, JSON.stringify(content), {
    access: 'public',
    allowOverwrite: true,
  });

  console.log('Saved json on', result.url);
};
