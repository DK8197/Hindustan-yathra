import {
  S3Client,
  PutObjectCommand,
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

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get('file') as File;

    const slug =
      formData.get('slug') as string;

    const fileName =
      formData.get('fileName') as string;

    if (!file) {
      return Response.json(
        {
          error: 'No file uploaded',
        },
        { status: 400 }
      );
    }

    if (!fileName) {
      return Response.json(
        {
          error:
            'fileName is required',
        },
        { status: 400 }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const key = `tours/${slug}/${fileName}`;

    // console.log(
    //   'Uploading to:',
    //   key
    // );

    await s3.send(
      new PutObjectCommand({
        Bucket:
          process.env.R2_BUCKET!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;

    return Response.json({
      success: true,
      url: publicUrl,
      key,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          'Failed to upload file',
      },
      { status: 500 }
    );
  }
}