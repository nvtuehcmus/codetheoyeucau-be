import { COLLECTION, DB } from 'shared/types/db';

export const rUpdateUserImage = async (username: string, avatarUrl: string): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);

  await collection.updateOne(
    { username },
    {
      $set: {
        avatar_url: avatarUrl
      }
    }
  );
};
