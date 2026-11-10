import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
  private readonly logger = new Logger(AwsService.name);
  private s3: S3Client;
  private bucket: string;
  private region: string;

  constructor() {
    this.region = process.env.AWS_REGION || 'us-east-1';
    this.bucket = process.env.BUCKET_NAME || 'nest-oxxo-test';

    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_BUCKET || '',
        secretAccessKey: process.env.SECRET_KEY_BUCKET || '',
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = file.originalname;

    const url =
      this.region === 'us-east-1'
        ? `https://${this.bucket}.s3.amazonaws.com/${key}`
        : `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;

    if (!process.env.ACCESS_KEY_BUCKET || !process.env.SECRET_KEY_BUCKET) {
      this.logger.warn(
        'AWS S3 credentials (ACCESS_KEY_BUCKET / SECRET_KEY_BUCKET) not found in environment. Mocking upload URL.',
      );
      return url;
    }

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    const response = await this.s3.send(command);
    this.logger.log(
      `File ${key} uploaded successfully to S3 bucket ${this.bucket}. HTTP status: ${response.$metadata.httpStatusCode}`,
    );

    return url;
  }
}
