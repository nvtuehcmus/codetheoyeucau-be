import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';

export class S3Instance {
  private instance: S3Client;

  constructor() {
    const credentials = fromIni({ profile: 'default' });
    this.instance = new S3Client({
      credentials
    });
  }

  public putImage(username: string, filename: string, image: Buffer): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const params = {
        Bucket: process.env.AVATAR_S3_BUTKET ?? '',
        Key: `${username}/${filename}`,
        Body: image
      };
      const command = new PutObjectCommand(params);

      this.instance
        .send(command)
        .then((response) => {
          if (response['$metadata'].httpStatusCode === 200) {
            const avatarUrl = `https://${process.env.AVATAR_S3_BUTKET}.s3.${process.env['AWS_REGION']}.amazonaws.com/${username}/${filename}`;
            resolve(avatarUrl);
          } else {
            reject(response);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
