import { COLLECTION, DB } from 'shared/types/db';

export const rActiveStatus = async (userName: string): Promise<void> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);
  await collection.updateOne({ username: userName }, { $set: { active: true } });
};
