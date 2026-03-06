import { put } from '@vercel/blob';

type UploadFileArgs = {
  pathname: string;
  content: string;
};

export const uploadFile = async ({ pathname, content }: UploadFileArgs) => {
  console.log(`Saving ${pathname}...`);

  const result = await put(pathname, content, {
    access: 'public',
    allowOverwrite: true,
  });

  console.log(`Saved ${pathname} on ${result.url}`);
};
