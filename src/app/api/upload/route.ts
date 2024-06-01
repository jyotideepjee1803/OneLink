import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

const Bucket = process.env.S3_BUCKET
const region = process.env.S3_REGION
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  if (formData.has('file')) {
    const file = formData.get('file') as File;

    const randomId = uuidv4();
    const ext = file?.name.split('.').pop();
    const newFilename = randomId + '.' + ext;

    const Body = (await file.arrayBuffer()) as Buffer;

    const data = await s3Client.send(new PutObjectCommand({
      Bucket,
      Key: newFilename,
      ACL: 'public-read',
      Body,
      ContentType: file?.type,
    }));

    const link = `https://${Bucket}.s3.${region}.amazonaws.com/${newFilename}`;

    return NextResponse.json(link);
  }
}