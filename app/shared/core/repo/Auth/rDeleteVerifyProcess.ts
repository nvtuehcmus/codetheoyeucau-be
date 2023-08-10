import { COLLECTION, DB } from 'shared/types/db';

export const rDeleteVerifyProcess = async (username: string): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.VERIFY);

  await collection.deleteOne({ username });
};
