import { COLLECTION, DB } from 'shared/types/db';
import { S3Instance } from 'shared/core/libs/AWS';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';

export const rUpdateUserProfile = async (
  username: string,
  lastName: string,
  firstName: string,
  address: string,
  email: string,
  avatarImg: Buffer,
  dob: string
): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);

  const payload: { [key: string]: string | undefined } = {
    last_name: lastName,
    first_name: firstName,
    address,
    email,
    dob,
  };

  Object.keys(payload).map((key) => {
    if (payload[key] === undefined) {
      delete payload[key];
    }
  });

  await collection.updateOne(
    { username },
    {
      $set: payload,
    }
  );

  if (!avatarImg) {
    return;
  }

  const s3Instance = new S3Instance();
  s3Instance
    .putImage(username, 'avatar.jpg', avatarImg)
    .then(async (data) => {
      await collection.updateOne(
        { username },
        {
          $set: { avatar_url: data },
        }
      );
    })
    .catch((e) => {
      throw new LogError(ErrorVars.E025_UPLOAD_DATA_FAILURE, 'INTEGRATION', {}, e);
    });
};
