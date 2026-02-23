import { put, type PutCommandOptions } from '@vercel/blob';

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

type UploadTsvArgs = {
  pathname: `${string}.tsv`;
  content: string;
};

export const uploadTsv = async ({ pathname, content }: UploadTsvArgs) => {
  console.log('Saving tsv...');

  const result = await put(pathname, content, {
    access: 'public',
    allowOverwrite: true,
  });
  console.log('Saved tsv on', result.url);
};
