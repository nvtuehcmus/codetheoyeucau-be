import AWS from 'aws-sdk';
export class S3Instance {
  private instance: AWS.S3;
  constructor() {
    this.instance = new AWS.S3();
    const credentials = new AWS.SharedIniFileCredentials({
      profile: process.env.AWS_PROFILE,
    });
  }

  public getImageByUsername(username: string, filename: string) {
    return new Promise((resolve, reject) => {
      this.instance.getObject(
        {
          Bucket: process.env.AVATAR_S3_BUTKET ?? '',
          Key: `${username}/${filename}`,
        },
        (err: any, data: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.Body);
          }
        }
      );
    });
  }

  public putImage(username: string, filename: string, image: Buffer) {
    return new Promise((resolve, reject) => {
      this.instance.upload(
        {
          Bucket: process.env.AVATAR_S3_BUTKET ?? '',
          Key: `${username}/${filename}`,
          Body: image,
          ContentType: 'image/jpeg',
        },
        (err: any, data: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.Location);
          }
        }
      );
    });
  }
}
