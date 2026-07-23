import {
  S3Client,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:
      process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey:
      process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const IMAGE_REGEX =
  /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i;

export async function getAllGalleryImages(): Promise<
  string[]
> {
  const cdnUrl =
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

  if (!cdnUrl) {
    throw new Error(
      'NEXT_PUBLIC_R2_PUBLIC_URL is not configured'
    );
  }

  const files: {
    key: string;
    lastModified: Date;
  }[] = [];

  let continuationToken:
    | string
    | undefined;

  do {
    const response = await s3.send(
      new ListObjectsV2Command({
        Bucket:
          process.env.R2_BUCKET!,
        Prefix: 'tours/',
        ContinuationToken:
          continuationToken,
      })
    );

    for (const item of response.Contents ?? []) {
      const key = item.Key;

      if (
        !key ||
        !IMAGE_REGEX.test(key)
      ) {
        continue;
      }

      files.push({
        key,
        lastModified:
          item.LastModified ??
          new Date(0),
      });
    }

    continuationToken =
      response.NextContinuationToken;
  } while (continuationToken);

  files.sort(
    (a, b) =>
      b.lastModified.getTime() -
      a.lastModified.getTime()
  );

  return files.map(
    ({ key }) =>
      `${cdnUrl.replace(
        /\/$/,
        ''
      )}/${key}`
  );
}